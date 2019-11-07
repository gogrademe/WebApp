/// <reference path="../../../node_modules/@types/node/index.d.ts" />

import * as request from "superagent";
import * as Promise from "bluebird";
import { EventEmitter } from "eventemitter3";

let toString$ = {}.toString;
let auth = {
  token: localStorage.getItem("id_token") || null
};

let promisifyReq = function(req) {
  return new Promise((resolve, reject) => {
    return req
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", localStorage.getItem("id_token") ? "Bearer " + localStorage.getItem("id_token") : null)
      .end((error, res) => {
        if (error || res.status >= 400) {
          if (res.status === 401) {
            types.session.del();
          }
          return reject(res) || error;
        } else {
          return resolve(res.body);
        }
      });
  });
};
const add = (x: number) => (y: number) => x + y;
const httpGet = (uri, opts) => {
  return promisifyReq(request.get(uri).query(opts));
};
const httpPost = uri => data => promisifyReq(request.post(uri).send(data));

const httpPut = uri => data => promisifyReq(request.put(uri).send(data));

const httpDel = uri => promisifyReq(request.del(uri));

const url = function(type: string, id?: number) {
  var parts;
  parts = [module.exports.baseUrl || "/api", type, id].filter(function(it) {
    return it !== undefined;
  });

  return parts.join("/");
};

let statusByName = {
  ok: 200,
  created: 201,
  notAuthorized: 401,
  notFound: 404,
  conflict: 409,
  badRequest: 400
};
let res$ = {};
for (let key in statusByName) {
  const value = statusByName[key];
  res$[value] = key;
}
let statusByNumber = res$;
let baseApi = {
  get(id) {
    var that,
      this$ = this;
    switch (false) {
      case !(that = this.cache[id]):
        return Promise.resolve(that);
      default:
        return baseApi.doGet
          .call(this, this.type, id)
          .then(function() {
            return this$.cache[id];
          })
          .catch((e, a) => console.log(e, a));
    }
  },
  find(opts = {}) {
    return baseApi.doGet.call(this, this.type, void 8, opts);
  },
  update(id, data) {
    var this$ = this;
    return baseApi.doPut.call(this, this.type, id, data).then(function() {
      return this$.cache[id];
    });
  },
  create(data) {
    switch (false) {
      case !(this.findSimilar && this.findSimilar(data)):
        return Promise.reject({
          status: statusByName.conflict,
          message: "This " + this.type + " already exists"
        });
      default:
        return baseApi.doPost.call(this, this.type, data);
    }
  },
  del(id) {
    return baseApi.doDel.call(this, this.type, id);
  },
  doGet(type, id, opts) {
    return httpGet(url(this.type, id), opts).then(d => responseToCaches(type, d));
  },
  doPost(type, data) {
    var this$ = this;
    return httpPost(url(type))(data)
      ["catch"](function(it) {
        var status, ref$, data, ref1$;
        status = it.status || ((ref$ = it.body) != null ? ref$.status : void 8);
        data = {
          statusCode: status,
          status: statusByNumber[status],
          message: ((ref1$ = it.body) != null ? ref1$.message : void 8) || statusByName[status]
        };
        throw mergeInto(data, it);
      })
      .then(d => responseToCaches(type, d))
      .then(function(it) {
        // FIXME: assuming 'it' will always be an array
        return this$.get(it[0][`${type}Id`]);
      });
  },
  doPut(type, id, data) {
    var this$ = this;
    return httpPut(url(this.type, id))(data)
      ["catch"](function(it) {
        var status, ref$, data, ref1$;
        status = it.status || it.statusCode || ((ref$ = it.body) != null ? ref$.status : void 8);
        data = {
          statusCode: status,
          status: statusByNumber[status],
          message: ((ref1$ = it.body) != null ? ref1$.message : void 8) || statusByName[status]
        };
        throw mergeInto(data, it);
      })
      .then(d => responseToCaches(type, d))
      .then(function() {
        return this$.get(data.id);
      });
  },
  doDel(type, id) {
    return httpDel(url(type, id));
  }
};

export interface resource {
  type?: string;
  events?: any;
  cache?: {};
  del?(id?: number): any;
  get?(id: number): any;
  create?({  }: any): any;
  update?(id: number, data: any): any;
  find?(any?): any;
}

export interface types {
  person: resource;
  course: resource;
  enrollment: resource;
  term: resource;
  school_year: resource;
  group: resource;
  assignment: resource;
  attempt: resource;
  school: resource;
  account: resource;
  level: resource;

  auth?: resource;
  session?: resource;
}

let types: types = {
  person: {} as resource,
  course: {} as resource,
  enrollment: {} as resource,
  term: {} as resource,
  school_year: {} as resource,
  group: {} as resource,
  assignment: {} as resource,
  attempt: {} as resource,
  school: {} as resource,
  account: {} as resource,
  level: {} as resource
};
const cacheSet = (type: string, cache, data) => {
  const id = data[type + "Id"];
  switch (false) {
    case !cache[id]:
      return mergeInto(data, cache[id]);
    case !id:
      return (cache[id] = data);
    default:
      throw new Error("cannot set item without id ." + JSON.stringify(data));
  }
};

let responseToCaches = function(type: string, data) {
  var i$, len$, item;
  if (data === null) {
    return [];
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  for (i$ = 0, len$ = data.length; i$ < len$; ++i$) {
    item = data[i$];
    cacheSet(type, types[type].cache, item);
  }

  return data;
};

const mergeInto = (source, target) => {
  var key, value;
  for (key in source) {
    value = source[key];
    target[key] = fn$();
  }
  return target;

  function fn$() {
    switch (toString$.call(value).slice(8, -1)) {
      case "Array":
        return (target[key] || []).concat(value);
      case "String":
        return value;
      case "Number":
        return value;
      case "Null":
        return value;
      case "Object":
        return mergeInto(value, target[key] || {});
      default:
        return value;
    }
  }
};

for (let i$ in types) {
  fn$.call(this, i$, types[i$]);
}

types.session = {
  cache: [],
  get() {
    switch (false) {
      case !localStorage.getItem("id_token"):
        return localStorage.getItem("id_token");
      default:
        return null;
    }
  },
  del: () => {
    localStorage.removeItem("id_token");
  },
  create: function({ email, password }) {
    return new Promise(function(resolve, reject) {
      return request
        .post(url("session"))
        .send({
          email: email,
          password: password
        })
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .end(function(error, resp) {
          var statusCode, message, ref$;
          if (error || resp === null || (resp != null ? resp.status : void 8) >= 400) {
            statusCode = (resp != null ? resp.status : void 8) || 400;
            message =
              (resp != null ? ((ref$ = resp.body) != null ? ref$.message : void 8) : void 8) ||
              statusByNumber[statusCode];
            return reject({
              statusCode: statusCode,
              message: message
            });
          } else {
            auth.token = resp != null ? resp.body.token : void 8;
            types.session.cache[0] = resp != null ? resp.body : void 8;
            return resolve(resp);
          }
        });
    });
  }
};
types.auth = auth;
// module.exports = types;

export default types;

function fn$(key, thing: resource) {
  thing.events = new EventEmitter();
  thing.cache = {};
  thing.type = key;
  thing.get = function(id) {
    return baseApi.get.call(this, id);
  };
  thing.find = function(opts?) {
    return baseApi.find.call(this, opts);
  };
  thing.create = function(data) {
    return baseApi.create.call(this, data).then(it => {
      this.events.emit("change", this.cache);
      return it;
    });
  };
  thing.update = function(id, data) {
    return baseApi.update.call(this, id, data).then(() => {
      return this.events.emit("change", this.cache);
    });
  };
  thing.del = function(id: number) {
    return baseApi.del
      .call(this, id)
      .then(() => {
        delete this.cache[id];
        this.events.emit("change", this.cache);
      })
      .return(true);
  };
}

export var baseUrl: string = null;
// module.exports.baseUrl = null;
