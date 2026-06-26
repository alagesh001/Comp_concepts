import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import obfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ mode }) => ({
  base: "/csmodule/",
  plugins: [
    react(),
    tailwindcss(),

    mode === "production" &&
      obfuscator({
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        stringArray: true,
        selfDefending: true,
      }),
  ].filter(Boolean),
}));