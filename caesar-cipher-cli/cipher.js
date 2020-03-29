const alphabetSize = 26;

module.exports = {
  encode(shift, plaintext) {
    return caesar(shift, plaintext);
  },
  decode(shift, ciphertext) {
    return caesar((alphabetSize - shift) % alphabetSize, ciphertext);
  }
};

function caesar(shift, input) {
  if (!/^-?\d+$/.test(shift)) {
    console.error('Shift is not an integer');
  }
  if (shift >= alphabetSize) {
    shift = Math.abs(shift % alphabetSize);
  }

  if (!input) {
    console.error('Input is empty');
    return;
  }

  let output = '';
  const length = input.length;

  for (let i = 0; i < length; i++) {
    let c = input.charCodeAt(i);

    // Small fix for cedilla
    if (c === 231) {
      c = 99;
    }
    if (c === 199) {
      c = 67;
    }

    if (c >= 65 && c <= 90) {
      // upcase
      output += String.fromCharCode(((c - 65 + shift) % alphabetSize) + 65);
    } else if (c >= 97 && c <= 122) {
      // downcase
      output += String.fromCharCode(((c - 97 + shift) % alphabetSize) + 97);
    } else {
      output += input.charAt(i);
    }
  }
  return output;
}
