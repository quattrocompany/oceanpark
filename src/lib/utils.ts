export function formatarDataBrasilia(dataUtc: string) {
  if (!dataUtc) return "";
  return new Date(dataUtc).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}