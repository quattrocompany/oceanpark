import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import LeadsInterface from "./LeadsInterface";

export default async function PaginaLeads() {
  // Antes esta página tinha seu próprio formulário de senha fixa. Agora usa
  // a MESMA sessão de login do painel administrativo (/admin), assinada no
  // servidor.
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return <LeadsInterface />;
}
