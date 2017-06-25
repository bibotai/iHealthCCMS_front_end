import {AES, enc, mode, pad} from 'crypto-js';
import {createCipher} from 'crypto';
//加密方法

export class Encrypt {

    encrypt(content, secretKey) {
        // Encrypt
        var ciphertext = AES.encrypt(content, enc.Utf8.parse(secretKey), {
            mode: mode.ECB,
            padding: pad.Pkcs7
        });
        return ciphertext.toString();
        // Decrypt var bytes = AES.decrypt(ciphertext.toString(), 'secret key 123'); var
        // plaintext = bytes.toString(enc.Utf8);

    }

}