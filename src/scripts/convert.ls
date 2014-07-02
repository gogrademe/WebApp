{find, cat} = require 'shelljs'
{transform} = require 'react-tools'
{build} = require 'js2coffee'

files = find('.')
jsx-files = files.filter -> it.slice(-4) is '.jsx'

to-cs = (code) ->
  build code

to-js = (code) ->
  transform code

extract-dom = (code) ->
  things = []
  code = code.replace (/React\.DOM\.(\w+)/g), (m, type) ->
    if things.index-of type is -1
      things.push type
    return type

  code .=replace 'React = require("react")', ''
 
  idents = things.join ', '
  "{" + idents + "}" +  "= require 'react'\n#code"

require! fs

for let file in jsx-files
  code = cat file |> to-js |> to-cs
  fp = file.replace '.jsx', '.ls'   
  console.log "Writing to #fp"
#  fs.write-file fp, code, -> console.log "Wrote #fp"

