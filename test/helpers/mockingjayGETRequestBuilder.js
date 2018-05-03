module.exports = mockingjayGETRequestBuilder

function mockingjayGETRequestBuilder(options) {
  return {
    URI: options.URI,
    Method: 'GET',
    Headers: options.Headers,
    Body: '',
    Form: null
  }
}
