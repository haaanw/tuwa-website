// tuwa.app/skills/design-program/program-rules.v0.json — the rulebook the skill tells the AI to
// fetch when it has no Tuwa connector. One source: src/skills/design-program/program-rules.v0.json
// (verbatim from the app repo's Supabase/functions/_shared/program-rules.v0.json).
import text from '../../../skills/design-program/program-rules.v0.json?raw';

export function GET() {
  return new Response(text, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
