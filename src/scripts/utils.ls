{}= require 'react'
decode64 = (input) -> 


  keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "="
  output = ""
  chr1 = undefined
  chr2 = undefined
  chr3 = ""
  enc1 = undefined
  enc2 = undefined
  enc3 = undefined
  enc4 = ""
  i = 0
  
  # remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  base64test = /[^A-Za-z0-9\+\/\=]/g
  if base64test.exec(input)
    console.log "There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding."
    return null
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
  loop
    enc1 = keyStr.indexOf(input.charAt(i++))
    enc2 = keyStr.indexOf(input.charAt(i++))
    enc3 = keyStr.indexOf(input.charAt(i++))
    enc4 = keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    output = output + String.fromCharCode(chr2)  unless enc3 is 64
    output = output + String.fromCharCode(chr3)  unless enc4 is 64
    chr1 = chr2 = chr3 = ""
    enc1 = enc2 = enc3 = enc4 = ""
    break unless i < input.length
  unescape output

module.exports =
  map: require("mout/array/map")
  camelCase: require("mout/string/camelCase")
  forEach: require("mout/array/forEach")
  pick: require("mout/object/pick")
  contains: require("mout/array/contains")
  find: require("mout/collection/find")
  decode64: decode64
  isEmpty: require("mout/lang/isEmpty")
  getParam: require("mout/queryString/getParam")