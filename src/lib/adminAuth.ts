import { createHmac, timingSafeEqual, randomUUID } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";

/**
 * Credenciais de administrador.
 *
 * NUNCA deixe usuários/senhas no código-fonte (isso já causou o incidente
 * apontado pela Exent). As credenciais válidas vêm da variável de ambiente
 * ADMIN_USERS, configurada apenas no painel da Vercel (Project Settings >
 * Environment Variables), no formato JSON:
 *
 *   ADMIN_USERS={"vendrix":"senha-forte-1","marketing":"senha-forte-2"}
 *
 * Gere senhas novas e fortes ao configurar — as senhas antigas que estavam
 * no código (GAuys87H98*71ts / Ricco9885*) foram expostas no histórico do
 * Git e devem ser consideradas comprometidas.
 */
function getValidUsers(): Record<string, string> {
  const raw = process.env.ADMIN_USERS;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, string>;
    }
  } catch {
    console.error(">>> ADMIN_USERS mal formatado (esperado JSON). Verifique a variável de ambiente.");
  }
  return {};
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Compara sempre contra um buffer do mesmo tamanho para não vazar o
  // comprimento da senha correta por tempo de resposta.
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/** Valida usuário/senha contra ADMIN_USERS. Retorna o usuário autenticado ou null. */
export function verifyAdminCredentials(username: string, password: string): string | null {
  const users = getValidUsers();
  const expected = users[username];
  if (!expected) return null;
  return timingSafeStringEqual(expected, password) ? username : null;
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET não configurado. Defina essa variável de ambiente (uma string longa e aleatória) nas configurações do projeto na Vercel."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

/**
 * Cria o valor assinado do cookie de sessão. O valor não é apenas um texto
 * fixo (como "autenticado" antes) — isso permitia que qualquer pessoa
 * forjasse a sessão manualmente pelo DevTools do navegador. Agora o valor
 * inclui usuário + validade + um nonce, e é assinado com HMAC usando um
 * segredo que só existe no servidor.
 */
export function createAdminSessionToken(username: string): string {
  const issuedAt = Date.now();
  const nonce = randomUUID();
  const payload = `${username}:${issuedAt}:${nonce}`;
  const signature = sign(payload);
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

function verifyAdminSessionToken(token: string): boolean {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  } catch {
    return false;
  }

  const expectedSignature = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expBuf)) return false;

  // payload = username:issuedAt:nonce — expira em 7 dias, igual ao maxAge do cookie.
  const parts = payload.split(":");
  const issuedAt = Number(parts[1]);
  if (!issuedAt || Number.isNaN(issuedAt)) return false;
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - issuedAt > SEVEN_DAYS_MS) return false;

  return true;
}

/** Lê e valida o cookie de sessão de administrador na requisição atual (Server Component ou Route Handler). */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    return verifyAdminSessionToken(token);
  } catch {
    return false;
  }
}

/** Valida o cookie de sessão a partir de um objeto Request (útil quando não se pode usar next/headers). */
export function isAdminAuthenticatedFromRequest(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  if (!match) return false;
  const token = decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1));
  try {
    return verifyAdminSessionToken(token);
  } catch {
    return false;
  }
}
