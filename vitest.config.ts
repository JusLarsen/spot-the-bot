import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // `server-only` throws on import outside a Server Component, which is what
      // keeps the answer key out of the browser bundle. That same guard blocked
      // any test from ever reading the question bank. The package ships a no-op
      // for exactly this (its own "react-server" condition points at it), so the
      // real build-time protection is untouched — see questions.test.ts, which
      // asserts the public bank still carries no answers.
      "server-only": fileURLToPath(new URL("./node_modules/server-only/empty.js", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
  },
});
