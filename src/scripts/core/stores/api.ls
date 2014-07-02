{}= require 'react'



# https://github.com/hkjels/superapi/blob/master/index.js
SuperApi = (baseurl, headers) ->
  baseurl = baseurl or ""
  request.baseurl = baseurl.replace(/\/$/, "") + "/"
  request.headers = headers or null
  utils.forEach methods, (method) ->
    request[method] = (uri, data, fn) ->
      url = request.baseurl + uri.replace(/^\//, "")
      req = request(method.toUpperCase(), url)
      if "function" is typeof data
        fn = data
        data = null
      req.set request.headers  if request.headers
      req.send data  if data
      req.end fn  if fn
      req

    return

  request.del = (url, fn) ->
    req = request("DELETE", url)
    req.set request.headers  if request.headers
    req.end fn  if fn
    req

  request
utils = require("../../utils")
request = require("superagent")
methods = [
  "get"
  "post"
  "put"
  "patch"
  "head"
]
module.exports = SuperApi(AppCfg.apiUrl,
  Authorization: "Bearer " + localStorage.token
)