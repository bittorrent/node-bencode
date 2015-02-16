var Bencode = require( './bencode' )
var Stream = require( 'stream' )
var inherit = require( 'bloodline' )

/**
 * Encoder Constructor
 * @return {Encoder}
 */
function Encoder( options ) {
  
  if( !(this instanceof Encoder) )
    return new Encoder( options )
  
  options = options != null ?
    options : {}
  options.objectMode = true
  
  // Inherit from transform stream
  Stream.Transform.call( this, options )
  
}

/**
 * Encoder Prototype
 * @type {Object}
 */
Encoder.prototype = {
  
  constructor: Encoder,
  
  _transform: function( data, encoding, next ) {
    next()
  },
  
}

// Inherit from transform stream
inherit( Encoder, Stream.Transform )
// Exports
module.exports = Encoder
