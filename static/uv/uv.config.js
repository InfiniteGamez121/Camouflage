self.__uv$config = {
    prefix: '/static/learn/',
    bare:'https://bare.benrogo.net',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/static/uv/uv.handler.js',
    bundle: '/static/uv/uv.bundle.js',
    config: '/staticuv/uv.config.js',
    sw: '/static/uv/uv.sw.js',
};
