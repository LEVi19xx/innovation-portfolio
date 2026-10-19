// Postbuild: move inline <script> bodies in out/*.html into external files so
// the CSP can use script-src 'self' (no 'unsafe-inline'). A plain external
// script (no async/defer) runs at the same spot in parse order, so behavior
// is unchanged.
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = join(import.meta.dirname, "..", "out");
const dir = join(out, "_next", "static", "inline");
mkdirSync(dir, { recursive: true });

for (const page of readdirSync(out).filter((f) => f.endsWith(".html"))) {
  const file = join(out, page);
  const html = readFileSync(file, "utf8").replace(
    /<script((?:(?!\ssrc=)[^>])*)>([^<][\s\S]*?)<\/script>/g,
    (_, attrs, body) => {
      const name = createHash("sha256").update(body).digest("hex").slice(0, 16) + ".js";
      writeFileSync(join(dir, name), body);
      return `<script${attrs} src="/_next/static/inline/${name}"></script>`;
    },
  );
  writeFileSync(file, html);
}
