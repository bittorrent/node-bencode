var Bencode = module.exports

Bencode.STRING = 0x60
Bencode.INT = 0x69
Bencode.LIST = 0x6C
Bencode.DICT = 0x64

Bencode.encode = require( './encode' )
Bencode.decode = require( './decode' )
