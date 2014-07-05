FluxAppMixin = ->
  getInitialProps: ->
    flux: window.flux

module.exports = FluxAppMixin
