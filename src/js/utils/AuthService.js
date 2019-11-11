import Auth0Lock from "auth0-lock";
import { observable, computed, action } from "mobx";
import { isTokenExpired } from "./jwtHelper";

class AuthService {
  @observable token = localStorage.getItem("id_token");
  @computed get isLoggedIn() {
    return !!this.token && !isTokenExpired(this.token);
  }

  // private lock: Auth0LockStatic;
  constructor(clientId, domain) {
    // Configure Auth0

    this.lock = new Auth0Lock(clientId, domain, {
      closable: false,
      languageDictionary: {
        title: "GoGradeMe"
      },
      auth: {
        responseType: "token"
      }
    });

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", ({ idToken }) => {
      this.setToken(idToken);
      this.lock.hide();
    });
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
  }

  login = () => {
    // Call the show method to display the widget.
    this.lock.show();
  };

  @action setToken = idToken => {
    // Saves user token to localStorage
    this.token = idToken;
    localStorage.setItem("id_token", idToken);
  };

  @action logout = () => {
    // Clear user token and profile data from localStorage
    this.token = null;
    localStorage.removeItem("id_token");
  };
}

const singleton = new AuthService(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN);
export default singleton;
