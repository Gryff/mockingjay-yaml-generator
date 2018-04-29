module.exports = mockingjayGETRequestBuilder

function mockingjayGETRequestBuilder(uri) {
  return {
    URI: uri,
    Method: 'GET',
    Body: '',
    Form: null
  }
}
