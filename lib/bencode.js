var Bencode = module.exports

// Start (:) and End (e)
// marker byte values
Bencode.START = 0x3A
Bencode.END = 0x65

Bencode.INT = 0x69
Bencode.LIST = 0x6C
Bencode.DICT = 0x64

Bencode.Decoder = require( './decoder-stream' )
Bencode.Encoder = require( './encoder-stream' )

Bencode.encode = require( './encode' )
Bencode.decode = require( './decode' )
