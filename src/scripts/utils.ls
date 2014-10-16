require!{
  moment
}

decode64 = (input) ->
  false

# Date validating functions
moment-invalid-date = -> not moment(it).is-valid!
year-is-one = -> moment(it).year! is 1 or moment(it).year! is 0
invalid-date = -> (moment-invalid-date it) or (year-is-one it)

date = (x) -> match x
  | (not)         => ""
  | invalid-date  => ""
  | otherwise     => moment(x).format('L')


date-for-upload = ->
  moment it .format "YYYY-DD-MM"

module.exports =
  decode64: decode64
  formatDate: date
  forUpload: date-for-upload
