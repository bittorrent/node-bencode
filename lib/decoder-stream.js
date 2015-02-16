var Bencode = require( './bencode' )
var Stream = require( 'stream' )
var inherit = require( 'bloodline' )

/**
 * Decoder Constructor
 * @return {Decoder}
 */
function Decoder( options ) {
  
  if( !(this instanceof Decoder) )
    return new Decoder( options )
  
  options = options != null ?
    options : {}
  options.objectMode = true
  
  // Inherit from transform stream
  Stream.Transform.call( this, options )
  
}

/**
 * Decoder Prototype
 * @type {Object}
 */
Decoder.prototype = {
  
  constructor: Decoder,
  
  _transform: function( data, encoding, next ) {
    next()
  },
  
}

// Inherit from transform stream
inherit( Decoder, Stream.Transform )
// Exports
module.exports = Decoder
