const { Transform } = require('stream');
const { encode, decode } = require('./cipher');

class CaesarCipherTransform extends Transform {
  constructor({ shift, action }) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, encoding, done) {
    try {
      const action = this.action === 'encode' ? encode : decode;
      this.push(action(this.shift, chunk.toString()));
      done();
    } catch (err) {
      done(err);
    }
  }
}

module.exports = { CaesarCipherTransform };
