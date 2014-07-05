request = require 'superagent'
Promise = require 'bluebird'

auth =
  token:
    switch
    | localStorage.token => localStorage.token
    | otherwise => null

promisify-req = (req) ->
  new Promise (resolve, reject) ->
    req
       .set 'Accept'            'application/json'
       .set 'Content-Type'      'application/json'
       .set 'Authorization'     if auth.token then "Bearer #{auth.token}" else null
       .end (error, res) ->
        switch
        | error or res?.status-code >= 400 => reject res or error
        | otherwise                  => resolve res.body

    console.log "-"*20
    console.log "#{req.method} #{req.url}"
    for own name, value of req.header
      console.log "#name: #value"
    # if req._data
    #   console.log ""
    #   console.log JSON.stringify(that, null, 4)
    console.log "-"*20

http-get = (url, opts) ->
  promisify-req request.get(url).query(opts)

http-post = (url, data) -->
  promisify-req request.post(url).send(data)

http-delete = (url) -->
  promisify-req request.delete url


# get the url for a resource
url = (type, id) ->
  parts = [module.exports.base-url or "/api", type, id].filter -> it and it.length
  parts.join '/'

# status codes
status-by-name =
  ok: 200
  created: 201
  not-authorized: 401
  not-found: 404
  conflict: 409
status-by-number =  {[value, key] for key, value of status-by-name}

base-api =
  get: (id) ->
    | @cache[id] => Promise.resolve that
    | otherwise  => base-api.do-get.call(@, @type, id).then ~> @cache[id]
  find: (opts={}) ->
    base-api.do-get.call @, @type,,opts
  create: (data) ->
    | @find-similar and @find-similar data =>
        Promise.reject {status: status.conflict, message: "This #{@type} already exists"}
    | otherwise => base-api.do-post.call @, @type, id
  delete: -> base-api.do-delete.call @, @type, id


  ## FIXME:
  # returning from cache for everything does not work yet!
  # It will just do requests forever since id is never set.
  do-get: (type, id, opts) ->
    (http-get (url @type, id), opts)
      #.get 'body'
      .then response-to-caches
      #.then ->
      #  @get id

  do-post: (type, id) ->
    http-post (url type) data
          .catch ->
            status = it.status or it.statusCode or it.body?.status
            data =
              status-code: status
              status: status-by-number[status]
              message: it.body?.message or status-by-name[status]
            throw (data `merge-into` it)
          .then response-to-caches
          .then ~> @get data.id

  do-delete: (type, id) ->
    http-delete (url type, id)

types =
  student: {}
  teacher: {}
  parent: {}
  person: {}
  class: {}
  term: {}
  assignment: {}
  grade: {}
  school: {}

# update the cache
cache-set = (cache, data) ->
  | cache[data.id] => data `merge-into` cache[data.id]
  | data.id        => cache[data.id] = data
  | otherwise      => throw new Error 'cannot set item without id .' + JSON.stringify data

response-to-caches = (data) ->
  for type, items of data
    for item in items
      cache-set types[type].cache, item

merge-into = (source, target) ->
  for key, value of source
    target[key] = switch typeof! value
    | 'Array'   => (target[key] or []) ++ value
    | 'String'  => value
    | 'Number'  => value
    | 'Null'    => value
    | 'Object'  => value `merge-into` (target[key] or {})
    | otherwise => value

  target

for let key, thing of types
  thing.cache = {}
  thing.type = key
  thing.get = (id) ->
    base-api.get.call this, id
  thing.find = (opts) -> base-api.find.call this, opts
  thing.create = (data) ->
    base-api.create.call this, id
     .get 'body'
  thing.delete = (id) ->
    base-api.delete.call this, id
     .return true


# session is special, and requres special treatment
types.session =
  cache: []
  get: -> ...
  create: ({email, password}) ->
    new Promise (resolve, reject) ->
      request.post (url 'session')
         .send {email, password}
         .set 'Accept'            'application/json'
         .set 'Content-Type'      'application/json'
         .end (error, resp) ->
          if error or (resp is null) or resp?.status-code >= 400
            status-code = resp?.status-code or 400
            message = resp?.body?.message or status-by-number[status-code]
            reject {status-code, message}
          else
            auth.token = resp?.body.session.0.token
            types.session.cache.0 = resp?.body.session.0
            resolve resp


types.auth = auth
module.exports = types
