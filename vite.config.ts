// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: {
      entry: "server",
      // Workaround: @tanstack/start-plugin-core@1.171.24 defaults don't apply to nested
      // objects when the parent defaults to {}. Provide the values explicitly so the
      // plugin doesn't crash reading startConfig.server.build.inlineCss.enabled.
      build: { inlineCss: { enabled: false } },
    },
    // Workaround for the same nested-defaults bug: the plugin reads
    // startConfig.serverFns.disableCsrfMiddlewareWarning before the schema default is applied.
    serverFns: { disableCsrfMiddlewareWarning: false },
    // Workaround for the same nested-defaults bug: the plugin reads
    // startConfig.dev.ssrStyles.enabled before the schema default is applied.
    dev: { ssrStyles: { enabled: true } },
  },
});
