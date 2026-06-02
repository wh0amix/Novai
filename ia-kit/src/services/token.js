import { SignJWT, jwtVerify } from 'jose';

const SECRET_RAW = import.meta.env.VITE_JWT_SECRET ?? '';

function getKey() {
  return new TextEncoder().encode(SECRET_RAW);
}

export async function verifyIdentityToken(token) {
  if (!SECRET_RAW || !token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ['HS256'] });
    return {
      uid: String(payload.sub),
      nom: String(payload.nom ?? ''),
      prenom: String(payload.prenom ?? ''),
    };
  } catch {
    return null;
  }
}

export async function createIdentityToken({ nom, prenom }) {
  if (!SECRET_RAW) throw new Error('VITE_JWT_SECRET manquant dans .env');
  const uid = crypto.randomUUID();
  const token = await new SignJWT({ nom, prenom })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(uid)
    .setIssuedAt()
    .setExpirationTime('90d')
    .sign(getKey());
  return { token, uid };
}
