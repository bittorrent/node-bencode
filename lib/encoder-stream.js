var Bencode = require( './bencode' )
var Stream = require( 'stream' )
var inherit = require( 'bloodline' )

var INT_MAX = Math.pow( 2, 32 )

/**
 * Encoder Constructor
 * @param {Object} options
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

Encoder.INT = new Buffer([ Bencode.INT ])
Encoder.LIST = new Buffer([ Bencode.LIST ])
Encoder.DICT = new Buffer([ Bencode.DICT ])
Encoder.END = new Buffer([ Bencode.END ])

/**
 * Encoder Prototype
 * @type {Object}
 */
Encoder.prototype = {
  
  /**
   * Encoder Constructor
   * @type {Function}
   */
  constructor: Encoder,
  
  /**
   * [_transform description]
   * @param  {Buffer}   data
   * @param  {String}   encoding
   * @param  {Function} next
   */
  _transform: function( data, encoding, next ) {
    this._encode( data )
    next()
  },
  
  _encode: function( data ) {
    
    if( Buffer.isBuffer( data ) ) {
      this.push( new Buffer( data.length + ':' ) )
      this.push( data )
      return
    }
    
    switch( typeof data ) {
      case 'string':
        this._encodeBytes( data )
        break
      case 'number':
        this._encodeNumber( data )
        break
      default:
        Array.isArray( data ) ?
          this._encodeList( data ) :
          this._encodeDict( data )
        break
    }
    
  },
  
  _encodeBytes: function( data ) {
    var buffer = new Buffer( data )
    this.push( new Buffer( buffer.length + ':' ) )
    this.push( buffer )
  },
  
  _encodeNumber: function( data ) {
    
    var hi = ( data / INT_MAX ) << 0
    var lo = ( data % INT_MAX  ) << 0
    var number = ( hi * INT_MAX + lo )
    
    this.push( new Buffer( 'i' + number + 'e' ) )
    
  },
  
  _encodeList: function( data ) {
    
    this.push( Encoder.LIST )
    
    for( var i = 0; i < data.length; i++ ) {
      this._encode( data[i] )
    }
    
    this.push( Encoder.END )
    
  },
  
  _encodeDict: function( data ) {
    
    this.push( Encoder.DICT )
    
    var i, keys = Object.keys( data ).sort()
    
    for( i = 0; i < keys.length; i++ ) {
      this._encodeBytes( keys[i] )
      this._encode( data[ keys[i] ] )
    }
    
    this.push( Encoder.END )
    
  },
  
}

// Inherit from transform stream
inherit( Encoder, Stream.Transform )
// Exports
module.exports = Encoder
