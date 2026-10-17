// tuwa.app/skills/design-program/import-format.md — the import format as plain text.
// One source: src/skills/design-program/import-format.md (verbatim from the app repo).
import text from '../../../skills/design-program/import-format.md?raw';

export function GET() {
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
