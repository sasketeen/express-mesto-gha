module.exports.isURL = (link) => /https?:\/\/(www\.)?([-\w]+)(\.[a-zA-Z.]+)([-\w()@:%_+.~#?&//=]+)/gmi.test(link);
