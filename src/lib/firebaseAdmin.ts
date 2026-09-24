import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

/**
 * Firebase Admin SDK — usado SOMENTE no servidor (rotas /api/admin/kit/*),
 * nunca no navegador. Ele usa uma conta de serviço (credenciais privadas),
 * não a chave pública NEXT_PUBLIC_FIREBASE_*, e por isso não pode ser
 * extraído do bundle do site como o SDK cliente.
 *
 * Configuração necessária (Vercel > Project Settings > Environment Variables):
 *   FIREBASE_SERVICE_ACCOUNT_KEY = o JSON da conta de serviço, em uma linha só
 *     (Firebase Console > Configurações do Projeto > Contas de serviço >
 *      Gerar nova chave privada), colado como está ou em base64.
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = já existe (mesmo bucket do site).
 */
function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY não configurado. Gere uma chave de conta de serviço no Firebase Console e defina essa variável de ambiente na Vercel."
    );
  }

  const decoded = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");

  try {
    return JSON.parse(decoded);
  } catch {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY inválido: não é um JSON válido (nem em base64).");
  }
}

let app: App;

function getAdminApp(): App {
  if (getApps().length) {
    return getApps()[0];
  }

  const serviceAccount = getServiceAccount();

  app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return app;
}

export function getAdminBucket() {
  return getStorage(getAdminApp()).bucket();
}
