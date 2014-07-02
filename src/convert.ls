{find, cat} = require 'shelljs'
{transform} = require 'react-tools'
{build} = require 'js2coffee'

files = find('./scripts')
jsx-files = files.filter -> it.slice(-4) is '.jsx'
js-files = files.filter -> it.slice(-3) is '.js'

to-cs = (code) ->
  build code

to-js = (code) ->
  transform code

extract-dom = (code) ->
  things = []
  code = code.replace (/React\.DOM\.(\w+)/g), (m, type) ->
    console.log m, type
    if things.index-of type is -1
      things.push type
    return type

  code .=replace 'React = require("react")', ''

  idents = things.join ', '
  return "{" + idents + "}" +  "= require 'react'\n#code"

remove-crap = (code) ->
  code .=replace /@jsx React.DOM/g, ''
  code .= replace /###/g, ''

require! fs

process = (f) ->
  for let file in f
    console.log file
    code = '/** @jsx React.DOM */'.concat cat file |> to-js |> to-cs |> remove-crap |> extract-dom
    #code = cat file |> to-js |> to-cs
    fp = file.replace '.jsx', '.ls'
    fp = file.replace '.js', '.ls'
    console.log "Writing to #fp"
    fs.write-file fp, code, -> console.log "Wrote #fp"


process jsx-files
process js-files
