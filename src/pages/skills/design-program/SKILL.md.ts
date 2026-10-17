// tuwa.app/skills/design-program/SKILL.md — the skill as plain text, for the athlete's AI.
// One source: src/skills/design-program/SKILL.md (verbatim from the app repo).
import text from '../../../skills/design-program/SKILL.md?raw';

export function GET() {
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
