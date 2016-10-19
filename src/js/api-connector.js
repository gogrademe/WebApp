import {
  connect
} from 'react-refetch'
import urlJoin from 'url-join'

const baseUrl = 'http://localhost:5000'

export default connect.defaults({
  buildRequest: function (mapping) {
    const options = {
      method: mapping.method,
      headers: mapping.headers,
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      body: mapping.body
    }

    options.headers['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`

    return new Request(urlJoin(baseUrl, mapping.url), options)
  }
})
