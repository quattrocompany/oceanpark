"use client";

import { useEffect } from "react";
import { captureTracking } from "@/lib/exentTracking";

// Captura origem/UTMs uma vez por carregamento de página (substitui o plugin WordPress Exent Tracking)
export default function ExentTracking() {
  useEffect(() => {
    captureTracking();
  }, []);

  return null;
}
