require! {
  React: 'react'
  moment
}

decode64 = (input) ->
  false

# Date validating functions
moment-invalid-date = -> not moment(it).is-valid!
year-is-one = -> moment(it).year! is 1
invalid-date = -> (moment-invalid-date it) or (year-is-one it)

# Format Dates
date = (x) -> match x
  | (not)         => ""
  | invalid-date  => ""
  | otherwise     => moment(x).format('L')

module.exports =
  decode64: decode64
  formatDate: date
