import { ReactNode } from "react";

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[url('/img/bg-blue.jpg')] bg-cover bg-center bg-fixed overflow-x-hidden">
      {children}
    </div>
  );
}