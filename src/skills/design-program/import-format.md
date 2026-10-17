# Tuwa's program import text format (v1.7.6)

This page defines the text an athlete pastes into Tuwa › Your plan, and the text an agent sends
with the MCP tool `propose_program`. It is served as the MCP resource
`tuwa://skills/design-program/import-format`. It is meant to be hosted at
https://tuwa.app/skills/design-program (the website lives in a separate repository; this file
is its source).

Tuwa reads the plan in two steps. A strict reader checks it against the rulebook first (the
header, the weeks, the days and every movement line). Then Tuwa's program parser turns it into
the program the athlete reviews. Text that does not follow this format may still import, but it
cannot be checked line by line.

## 1. The plan header

The first lines, before `Week 1`. One `Key: value` per line.

| Key | Required | Value |
|---|---|---|
| `Name` | yes | The plan's name. Not a file name, not a date. |
| `Goal` | yes | One sentence, in the athlete's words. |
| `Phase` | yes | `1 of 3` — this phase's number and the planned number of phases. |
| `Weeks` | yes | The number of weeks in this phase. |
| `Start rule` | yes | When week 1 starts: `Start on the next Monday`, `Start today`. |
| `Athlete history band` | yes | `none`, `under 6 months`, `6 months to 2 years` or `over 2 years`. |
| `Profile` | no | One line: sport, days per week, minutes, equipment, constraints in the athlete's words. |

A first line `Tuwa plan` is allowed and ignored.

## 2. Weeks

- `Week N` on its own line starts a week. Weeks are numbered from 1, in order, with no gaps.
- A deload week says so in its heading: `Week 4 — Deload`.
- A week that repeats an earlier week exactly: `Week 3: same as Week 2`. Anything that changes
  (one load, one set) means the week is written out in full.

## 3. Days

- `Day N — Title` starts a day inside the current week. `N` counts from 1 in each week. The
  title is short and is the day's own name ("Lower strength", "Court skill"), never the plan's
  name.
- A sport practice or a match is a day with one movement line: `- Basketball practice: 1 × 90 min · RPE 6`.

## 4. Sections

Any plain line inside a day (no `- ` in front, not `Rule:` or `Cue:`) is a section header:
`Warm-up`, `Strength A`, `Conditioning`. A short note may follow in parentheses:
`Strength A (rest 2–3 min)`. Sets under a section named `Warm-up` are warm-up sets.

## 5. Movement lines

One movement per line, starting with `- `:

```text
- <Movement>: <dose> [@ <load>] [· RIR <n> | · RPE <n>] [each side]
```

| Part | Written as | Examples |
|---|---|---|
| Sets × reps | `sets × reps`, a range with a dash | `3 × 5`, `3 × 8–10` (`x` also reads) |
| Sets × time | seconds `s` or minutes `min` | `3 × 30 s`, `1 × 20 min` |
| Sets × distance | `m`, `km` or `mi` | `4 × 30 m`, `1 × 5 km` |
| One continuous dose | `1 ×` and a time or distance | `- Easy run: 1 × 30 min` |
| Load | `@` and kg (or lb); `+` for added load | `@ 60 kg`, `@ 135 lb`, `@ +10 kg` |
| Percentage of a max | `@` and `%` | `@ 75 %` |
| Bodyweight | `@ bodyweight` | `- Pull-up: 3 × 5 @ bodyweight` |
| Effort | `· RIR n` or `· RPE n` | `· RIR 2`, `· RPE 7` |
| Per side | `each side` (or per leg, per arm) | `3 × 10 @ 14 kg · RIR 3 each side` |
| Pair label | the label first | `- A1 Bench press: 3 × 8 @ 40 kg` |

Different numbers for different sets are separate lines (`- Back squat: 1 × 5 @ 60 kg`,
`- Back squat: 2 × 5 @ 55 kg`).

## 6. Cue and rule lines

- `Cue: <one short line>` directly under a movement — the one thing to think about. At most one
  per movement.
- `Rule: <one line>` once per day, after its movements — a rule for the whole day
  ("Stop a set when the bar slows down").

## 7. Reference pages

After the last week, pages that are not training days: a daily routine, rules for every
session. Each starts with `Reference: <title>`; its lines follow, one item per line.

```text
Reference: Morning routine
- 5 min easy walk
- 2 × 10 hip circles
```

## 8. A complete example

```text
Tuwa plan
Name: Off-season base
Goal: Get stronger while keeping two court sessions a week.
Phase: 1 of 3
Weeks: 4
Start rule: Start on the next Monday.
Athlete history band: under 6 months
Profile: Basketball, 4 days a week, 60 minutes, full gym, left knee feels stiff after long runs.

Week 1
Day 1 — Lower strength
Warm-up
- Goblet squat: 2 × 8 @ 12 kg
Strength A (rest 2–3 min)
- Back squat: 3 × 5 @ 40 kg · RIR 3
  Cue: Brace, then sit between the heels.
- Romanian deadlift: 3 × 8 @ 30 kg · RIR 3
- Plank: 3 × 30 s
Rule: Stop a set when the bar slows down.

Day 2 — Court skill
- Basketball practice: 1 × 90 min · RPE 6

Day 3 — Upper strength
- Bench press: 3 × 8 @ 30 kg · RIR 3
- One-arm row: 3 × 10 @ 14 kg · RIR 3 each side
- Overhead press: 2 × 8 @ 20 kg · RIR 3

Week 2
Day 1 — Lower strength
- Back squat: 3 × 5 @ 42.5 kg · RIR 3
- Romanian deadlift: 3 × 8 @ 32.5 kg · RIR 3
Day 2 — Court skill
- Basketball practice: 1 × 90 min · RPE 6
Day 3 — Upper strength
- Bench press: 3 × 8 @ 32.5 kg · RIR 3
- One-arm row: 3 × 10 @ 16 kg · RIR 3 each side
- Overhead press: 2 × 8 @ 20 kg · RIR 3

Week 3: same as Week 2

Week 4 — Deload
Day 1 — Lower strength
- Back squat: 2 × 5 @ 35 kg · RIR 4

Reference: Morning routine
- 5 min easy walk
```

## 9. What Tuwa does with it

- With the connector: `propose_program` checks the plan against the rulebook (a rule break is
  refused with the exact findings), reads it with Tuwa's program parser, and stores it as a
  DRAFT. The athlete opens Tuwa, reviews it and confirms it. A newer draft replaces an older
  pending one.
- Without the connector: the athlete pastes the text into Tuwa › Your plan; the same review
  follows. In the app, findings are shown and never block the athlete's own plan.
- Tuwa never activates a plan the athlete did not confirm.
