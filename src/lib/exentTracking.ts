/**
 * Exent Tracking — port do plugin WordPress "Exent Tracking" (exent-utmzcookie.js + exent-tracking.js).
 *
 * - `captureTracking()` roda uma vez por carregamento de página e grava os mesmos cookies do plugin:
 *     __utmzz     origem do visitante no formato do antigo __utmz do GA (6 meses)
 *     __utmzzses  marca de sessão, evita que navegação interna sobrescreva a origem
 *     utm_* / parâmetros ValueTrack do Google Ads (24h)
 * - `getTrackingPayload()` devolve os campos que o plugin injetava como inputs ocultos, mais `exhub_media`.
 *
 * Correções em relação ao plugin:
 * - Visitas só com gclid/gbraid/wbraid (sem utm_source) agora saem como "Google Ads", e não "Internet".
 * - gbraid/wbraid são tratados como clique pago do Google, igual ao gclid.
 * - Valores de cookie codificados (um ";" ou "=" no valor não quebra mais o cookie).
 * - Valores da URL decodificados e sem "|" (que quebraria o formato do __utmzz).
 * - Não quebra quando o __utmzz não existe.
 * - Origem comparada sem diferenciar maiúsculas; fb/ig/instagram/meta também contam como Facebook Ads.
 * - Se o navegador recusar o cookie no domínio raiz (ex.: *.vercel.app, que é sufixo público),
 *   grava o cookie só no host.
 */

const UTMZ_COOKIE = "__utmzz";
const SESSION_COOKIE = "__utmzzses";
const UTMZ_MAX_AGE = 60 * 60 * 24 * 30 * 6; // 6 meses
const PARAM_MAX_AGE = 60 * 60 * 24; // 24h

// Parâmetros de URL guardados em cookie por 24h (mesma lista do plugin + ids de clique do Google)
const URL_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_content",
  "utm_term",
  "campaignsource",
  "campaignmedium",
  "campaignid",
  "adgroupid",
  "keyword",
  "creative",
  "adposition",
  "matchtype",
  "network",
  "device",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

const UTMZ_KEY_MAP: Record<string, string> = {
  utm_source: "utmcsr",
  utm_medium: "utmcmd",
  utm_campaign: "utmccn",
  utm_content: "utmcct",
  utm_term: "utmctr",
  gclid: "utmgclid",
  gbraid: "utmgbraid",
  wbraid: "utmwbraid",
  dclid: "utmdclid",
};

// Domínio do buscador -> [parâmetro da busca, nome da origem]
const SEARCH_ENGINES: Record<string, [string, string]> = {
  "daum.net": ["q", "daum"],
  "eniro.se": ["search_word", "eniro"],
  "naver.com": ["query", "naver"],
  "yahoo.com": ["p", "yahoo"],
  "msn.com": ["q", "msn"],
  "bing.com": ["q", "live"],
  "aol.com": ["q", "aol"],
  "lycos.com": ["q", "lycos"],
  "ask.com": ["q", "ask"],
  "altavista.com": ["q", "altavista"],
  "search.netscape.com": ["query", "netscape"],
  "cnn.com": ["query", "cnn"],
  "about.com": ["terms", "about"],
  "mamma.com": ["query", "mama"],
  "alltheweb.com": ["q", "alltheweb"],
  "voila.fr": ["rdata", "voila"],
  "search.virgilio.it": ["qs", "virgilio"],
  "baidu.com": ["wd", "baidu"],
  "alice.com": ["qs", "alice"],
  "yandex.com": ["text", "yandex"],
  "najdi.org.mk": ["q", "najdi"],
  "seznam.cz": ["q", "seznam"],
  "search.com": ["q", "search"],
  "wp.pl": ["szukaj", "wirtulana polska"],
  "online.onetcenter.org": ["qt", "o*net"],
  "szukacz.pl": ["q", "szukacz"],
  "yam.com": ["k", "yam"],
  "pchome.com": ["q", "pchome"],
  "kvasir.no": ["q", "kvasir"],
  "sesam.no": ["q", "sesam"],
  "ozu.es": ["q", "ozu"],
  "terra.com": ["query", "terra"],
  "mynet.com": ["q", "mynet"],
  "ekolay.net": ["q", "ekolay"],
  "rambler.ru": ["words", "rambler"],
  google: ["q", "google"],
};

const ORGANIC_MEDIA: Record<string, string> = {
  google: "Google Orgânico",
  live: "Bing Orgânico",
  yahoo: "Yahoo Orgânico",
  yandex: "Yandex Orgânico",
};

const PAID_MEDIA: Record<string, string> = {
  google: "Google Ads",
  facebook: "Facebook Ads",
  fb: "Facebook Ads",
  ig: "Facebook Ads",
  instagram: "Facebook Ads",
  meta: "Facebook Ads",
  linkedin: "Linkedin Ads",
};

export type TrackingPayload = Record<(typeof URL_KEYS)[number] | "__utmzz" | "exhub_media", string>;

// ---------- Cookies ----------

function getCookie(name: string): string {
  const match = ("; " + document.cookie).split("; " + name + "=");
  if (match.length < 2) return "";
  const raw = match.pop()!.split(";")[0];
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function setCookie(name: string, value: string, maxAge?: number, domain?: string) {
  let str = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  if (maxAge) str += `; max-age=${maxAge}`;
  if (domain) str += `; domain=${domain}`;
  if (location.protocol === "https:") str += "; Secure";
  document.cookie = str;
}

/** Grava no domínio raiz (compartilha entre www e apex); se o navegador recusar, grava só no host. */
function setRootCookie(name: string, value: string, maxAge?: number) {
  const domain = getRootDomain(location.hostname);
  if (domain) {
    setCookie(name, value, maxAge, domain);
    if (getCookie(name) === value) return;
  }
  setCookie(name, value, maxAge);
}

// ---------- Helpers ----------

function getRootDomain(hostnameOrUrl: string): string | undefined {
  if (!hostnameOrUrl) return undefined;
  let hostname = hostnameOrUrl;
  try {
    hostname = new URL(hostnameOrUrl).hostname;
  } catch {
    // já é um hostname
  }
  return hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/)?.[0];
}

function cleanValue(value: string): string {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    // mantém o valor bruto
  }
  return decoded.replace(/\|/g, " ").trim().slice(0, 500);
}

/** Lê utm_* e ids de clique da query string e do hash (o plugin também olhava o hash). */
function getUrlParams(): Record<string, string> {
  const result: Record<string, string> = {};
  const sources = [location.search.replace(/^\?/, ""), location.hash.replace(/^#/, "")];
  for (const source of sources) {
    for (const pair of source.split("&")) {
      const [rawKey, ...rest] = pair.split("=");
      if (!rawKey) continue;
      const key = cleanValue(rawKey).toLowerCase();
      const value = cleanValue(rest.join("="));
      if (value && !(key in result)) result[key] = value;
    }
  }
  return result;
}

function parseUtmz(raw: string): Record<string, string> {
  const values: Record<string, string> = {};
  if (!raw) return values;
  for (const pair of raw.split("|")) {
    const [key, ...rest] = pair.split("=");
    // __utmz original do GA vem prefixado ("123.456.1.1.utmcsr")
    if (key) values[key.split(".").pop()!] = rest.join("=");
  }
  return values;
}

function serializeUtmz(values: Record<string, string>): string {
  return Object.entries(values)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}=${v}`)
    .join("|");
}

function parseReferrer(referrer: string, thisDomain?: string): { source: string; medium: string; term?: string } | null {
  if (!referrer) return null;
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return null;
  }
  let referringDomain = getRootDomain(url.hostname);
  if (url.hostname.includes("google")) referringDomain = "google";

  const engine = referringDomain ? SEARCH_ENGINES[referringDomain] : undefined;
  if (engine) {
    return { source: engine[1], medium: "organic", term: url.searchParams.get(engine[0]) || "" };
  }
  if (referringDomain !== thisDomain) {
    return { source: url.hostname, medium: "referral" };
  }
  return null;
}

// ---------- Captura ----------

/** Equivalente ao exent-utmzcookie.js + saveParamsToCookies() do plugin. Idempotente por página. */
export function captureTracking() {
  if (typeof window === "undefined") return;

  const urlParams = getUrlParams();

  // 1. Parâmetros da URL -> cookies de 24h
  for (const key of URL_KEYS) {
    if (urlParams[key]) setRootCookie(key, urlParams[key], PARAM_MAX_AGE);
  }

  // 2. Origem do visitante -> __utmzz
  const thisDomain = getRootDomain(location.hostname);
  const referringDomain = getRootDomain(document.referrer);
  const internalNavigation = !!getCookie(SESSION_COOKIE) && referringDomain === thisDomain;

  const hasCampaign = !!(urlParams.utm_source || urlParams.gclid || urlParams.gbraid || urlParams.wbraid || urlParams.dclid);
  const referrerInfo = internalNavigation ? null : parseReferrer(document.referrer, thisDomain);
  const stored = parseUtmz(getCookie("__utmz") || getCookie(UTMZ_COOKIE));

  let utmz: Record<string, string> = { utmcsr: "direct", utmcmd: "", utmccn: "" };

  if (!internalNavigation && hasCampaign) {
    for (const [param, utmzKey] of Object.entries(UTMZ_KEY_MAP)) {
      if (urlParams[param]) utmz[utmzKey] = urlParams[param];
    }
    if (urlParams.gclid || urlParams.gbraid || urlParams.wbraid) {
      utmz.utmcsr = urlParams.utm_source || "google";
      utmz.utmcmd = urlParams.utm_medium || "cpc";
    } else if (urlParams.dclid) {
      utmz.utmcsr = urlParams.utm_source || "google";
      utmz.utmcmd = urlParams.utm_medium || "cpm";
    }
  } else if (referrerInfo) {
    utmz.utmcsr = referrerInfo.source;
    utmz.utmcmd = referrerInfo.medium;
    if (referrerInfo.term) utmz.utmctr = referrerInfo.term;
  } else if (Object.keys(stored).length) {
    // Visita direta/interna não apaga a origem anterior
    utmz = stored;
  }

  setRootCookie(UTMZ_COOKIE, serializeUtmz(utmz), UTMZ_MAX_AGE);
  setRootCookie(SESSION_COOKIE, "1");
}

// ---------- Payload ----------

function getMedia(utmz: Record<string, string>, params: Record<string, string>): string {
  const utmcsr = (utmz.utmcsr || "").toLowerCase();
  const utmcmd = (utmz.utmcmd || "").toLowerCase();
  const source = (params.campaignsource || params.utm_source || utmcsr).toLowerCase();

  if (utmcmd === "organic") return ORGANIC_MEDIA[utmcsr] || "Orgânico";
  if (utmcmd === "referral") return "Referência";
  if (PAID_MEDIA[source]) return PAID_MEDIA[source];
  if (params.gclid || params.gbraid || params.wbraid || utmz.utmgclid || utmz.utmgbraid || utmz.utmwbraid) {
    return "Google Ads";
  }
  if (source === "direct") return "Direto";
  if (source) return source;
  return "Internet";
}

/** Campos que o plugin injetava nos formulários, prontos para enviar no corpo do lead. */
export function getTrackingPayload(): TrackingPayload {
  if (typeof window === "undefined") return {} as TrackingPayload;

  if (!getCookie(UTMZ_COOKIE)) captureTracking();

  const urlParams = getUrlParams();
  const utmzRaw = getCookie(UTMZ_COOKIE);
  const utmz = parseUtmz(utmzRaw);

  const params = {} as Record<(typeof URL_KEYS)[number], string>;
  for (const key of URL_KEYS) {
    params[key] = urlParams[key] || getCookie(key) || "";
  }

  // utm_* ausentes são completados com o __utmzz (ensureUTMFieldsExist do plugin)
  params.utm_source ||= utmz.utmcsr || "";
  params.utm_medium ||= utmz.utmcmd || "";
  params.utm_campaign ||= utmz.utmccn || "";
  params.utm_term ||= utmz.utmctr || "";
  params.utm_content ||= utmz.utmcct || "";
  params.gclid ||= utmz.utmgclid || "";
  params.gbraid ||= utmz.utmgbraid || "";
  params.wbraid ||= utmz.utmwbraid || "";

  return {
    ...params,
    __utmzz: utmzRaw,
    exhub_media: getMedia(utmz, params),
  };
}
