import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import base32 from 'hi-base32';
import { sha3_256 } from 'js-sha3';

const derPrivKeyPrefix = Buffer.from('302e020100300506032b657004220420', 'hex');
const derPubKeyPrefix = Buffer.from('302a300506032b6570032100', 'hex');

export const genPrivKey = () => (
  crypto
    .generateKeyPairSync('ed25519')
    .privateKey
    .export({ format: 'der', type: 'pkcs8' })
    .subarray(derPrivKeyPrefix.length)
);

export const derivePubKeyFromPrivKey = (privKey: Buffer) => (
  crypto
    .createPublicKey(
      crypto.createPrivateKey({
        key: Buffer.concat([derPrivKeyPrefix, privKey]),
        format: 'der',
        type: 'pkcs8'
      })
    )
    .export({ format: 'der', type: 'spki' })
    .subarray(derPubKeyPrefix.length)
);

export const deriveHostnameFromPubKey = (pubKey: Buffer) => {
  const version = Buffer.from([0x03]);

/*
  const checksum = (
    crypto
      .createHash('sha3-256')
      .update(Buffer.from('.onion checksum'))
      .update(pubKey)
      .update(version)
      .digest()
      .subarray(0, 2)
  );
*/

  const checksum = Buffer.from(
    sha3_256
      .create()
      .update(Buffer.from('.onion checksum'))
      .update(pubKey)
      .update(version)
      .digest()
      .slice(0, 2)
  );
  const decoded = Buffer.concat([pubKey, checksum, version]);

  return base32.encode(Array.from(decoded)).toLowerCase() + '.onion';
};

export const deriveSecretKeyFromPrivKey = (privKey: Buffer) => {
  const secretKey = (
    crypto
      .createHash('sha512')
      .update(privKey)
      .digest()
  );

  secretKey[0] &= 248;
  secretKey[31] &= 127;
  secretKey[31] |= 64;

  return secretKey;
};

export const sign = (privKey: Buffer, message: Buffer) => (
  crypto.sign(
    null,
    message,
    crypto.createPrivateKey({
      key: Buffer.concat([derPrivKeyPrefix, privKey]),
      format: 'der',
      type: 'pkcs8'
    })
  )
);

export const verify = (pubKey: Buffer, message: Buffer, sig: Buffer) => (
  crypto.verify(
    null,
    message,
    crypto.createPublicKey({
      key: Buffer.concat([derPubKeyPrefix, pubKey]),
      format: 'der',
      type: 'spki'
    }),
    sig
  )
);

const hsPubKeyFilePrefix =  Buffer.from('3d3d206564323535313976312d7075626c69633a207479706530203d3d000000', 'hex');
const hsSecretKeyFilePrefix = Buffer.from('3d3d206564323535313976312d7365637265743a207479706530203d3d000000', 'hex');
export const save = (privKey: Buffer, hsPath: string) => {
  const pubKey = derivePubKeyFromPrivKey(privKey);
  const hostname = deriveHostnameFromPubKey(pubKey);
  const secretKey = deriveSecretKeyFromPrivKey(privKey);

  fs.mkdirSync(
    hsPath,
    {
      recursive: true,
      mode: 0o700,
    }
  );
  fs.writeFileSync(
    path.join(hsPath, 'hs_ed25519_public_key'),
    Buffer.concat([hsPubKeyFilePrefix, pubKey]),
    { mode: 0o600 }
  );
  fs.writeFileSync(
    path.join(hsPath, 'hs_ed25519_secret_key'),
    Buffer.concat([hsSecretKeyFilePrefix, secretKey]),
    { mode: 0o600 }
  );
  fs.writeFileSync(
    path.join(hsPath, 'hs_ed25519_private_key'),
    privKey,
    { mode: 0o600 }
  );
  fs.writeFileSync(
    path.join(hsPath, 'hostname'),
    hostname,
    { mode: 0o600 }
  );
};

export const load = (hsPath: string) => (
  fs.readFileSync(
    path.join(hsPath, 'hs_ed25519_private_key')
  )
);
