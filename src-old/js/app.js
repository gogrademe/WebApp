/** @jsx React.DOM */

var React = require('react');



var url = {
  subscribe: function(fn) {
    // TODO: make this a single hashchange/pushstate listener and push handlers
    // into it
    window.addEventListener('hashchange', fn, false);
  },

  unsubscribe: function(fn) {
    window.removeEventListener('hashchange', fn);
  }
};

var Routed = {

  getInitialState: function() {
    return {activeChild: null};
  },

  componentWillMount: function(path) {
    this.handleRouteChange();
    url.subscribe(this.handleRouteChange);
  },

  componentWillUnmount: function() {
    url.unsubscribe(this.handleRouteChange);
  },

  handleRouteChange: function() {
    var path = location.hash.substr(1);
    var match = matchedChildRoute(path, this);
    this.setState({
      activeChild: match,
      params: lastParams
    });
  },

  outlet: function() {
    var children = this.props.children;
    if (!children) throw new Error("you don't have any children, why are you calling outlet()?");
    return this.state.activeChild;
  }

};

var currentUrl;

function pushUrl(path) {
  location.hash = path;
  currentUrl = path;
}

function toArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

function childrenArray(component) {
  return component.props.children ? toArray(component.props.children) : [];
}

function startsWith(match, str) {
  return str.charAt(0) === match;
}

var lastParams = {};

function pathMatches(actualPath, testPath) {
  var testSegments = testPath.split('/');
  var actualSegments = actualPath.split('/');
  // HEADS UP GLOBAL STATE SIDE-EFFECTS! http://img.pandawhale.com/46707-dog-I-have-no-idea-what-Im-doi-xPst.jpeg
  lastParams = {};
  for (var i = 0, l = testSegments.length; i < l; i ++) {
    if (actualSegments[i] === '' && testSegments[i] === '') {
      // its a '/', who cares ...
      continue;
    }
    if (actualSegments[i] == null) {
      return false;
    }
    if (startsWith(':', testSegments[i])) {
      var segmentName = testSegments[i].substr(1);
      lastParams[segmentName] = actualSegments[i];
    } else {
      if (testSegments[i] !== actualSegments[i]) {
        return false;
      }
    }
  }
  return true;
}

function matchedChildRoute(actualPath, component) {
  var children = childrenArray(component);
  for (var i = 0, l = children.length; i < l; i ++) {
    if (pathMatches(actualPath, children[i].props.path)) {
      return children[i];
    }
    if (children[i].props.children) {
      var matchedGrandchild = matchedChildRoute(actualPath, children[i]);
      if (matchedGrandchild) {
        return children[i];
      }
    }
  }
  return false;
}

function linkIsActive(link) {
  return link.props.to === currentUrl;
}

var Link = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    var path = this.props.to;
    pushUrl(path);
  },

  render: function() {
    var className = linkIsActive(this) ? 'active' : '';
    return (
      <a
        href={this.props.to}
        onClick={this.handleClick}
        className={className}
      >{this.props.children}</a>
    );
  }
});


var App = React.createClass({
  mixins: [Routed],

  render: function() {
    return (
      <Root>
        <Index path="/"/>
        <Users path="/users/"/>
        <User path="/user/:id"/>
        <About path="/about">
          <AboutIndex path="/about/"/>
          <Company path="/about/company"/>
          <Contact path="/contact"/>
        </About>
      </Root>
    );
  }
});

var Root = React.createClass({
  mixins: [Routed],

  render: function() {
    return (
      <div className="Root">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/users/">Users</Link></li>
        </ul>
        {this.outlet()}
      </div>
    );
  }
});

var Index = React.createClass({
  mixins: [Routed],
  render: function() {
    return (
      <div className="Index">
        <h1>Index</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
});

var Users = React.createClass({
  mixins: [Routed],

  statics: {
    cache: null
  },

  getInitialState: function() {
    return {users: Users.cache || []};
  },

  componentDidMount: function() {

  },

  render: function() {
    var users = this.state.users.map(function(user) {
      var url = "/user/"+user.id;
      return <Link to={url}>{user.first} {user.last}</Link>;
    });
    var content = !users.length ? 'Loading users...' : users;
    return <div className="Users">{content}</div>;
  }
});

var User = React.createClass({
  mixins: [Routed],

  statics: {
    cache: null
  },

  getInitialState: function() {
    return { user: User.cache || null };
  },

  componentDidMount: function() {
    if (User.cache) {
      return;
    }
    var url = api+'/'+this.state.params.id;
    $.getJSON(url).then(function(res) {
      User.cache = res.contact;
      this.setState({ user: res.contact });
    }.bind(this));
  },

  render: function() {
    var content = User.cache ? <h2>User: {this.state.user.first}</h2> : null;
    return (
      <div className="User">
        {content}
      </div>
    );
  }
});

var About = React.createClass({
  mixins: [Routed],
  render: function() {
    return (
      <div className="About">
        <h1>About</h1>
        <ul>
          <li><Link to="/about/company">Company</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {this.outlet()}
      </div>
    );
  }
});

var AboutIndex = React.createClass({
  mixins: [Routed],
  render: function() {
    return (
      <div className="Index">
        <h1>About Index</h1>
        <p>Lorem ipsum sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    );
  }
});

var Company = React.createClass({
  mixins: [Routed],
  render: function() {
    return <div className="Company"><h2>Company</h2></div>;
  }
});

var Contact = React.createClass({
  mixins: [Routed],
  render: function() {
    return <div className="About"><h2>Contact</h2></div>;
  }
});

React.renderComponent(<App/>, document.body);