---
name: design-program
description: Build a training plan for an athlete who uses Tuwa (tuwa.app) and has no plan yet, or write the next phase of their plan. Use when the athlete asks for a training plan, a program, a block or "phase 2" for Tuwa. Interviews the athlete in a fixed order, writes the plan inside Tuwa's published rulebook, in Tuwa's import text format, and hands it to Tuwa as a draft the athlete confirms.
---

# Design a Tuwa plan

Tuwa runs the athlete's plan and decides each day whether to go, modify or hold the planned
session. Tuwa never writes the plan. You, the model, write it with the athlete, inside Tuwa's
rulebook, and the athlete confirms it in Tuwa before it becomes active.

This file is the one source of this skill. It is served as the MCP resource
`tuwa://skills/design-program`, at https://tuwa.app/skills/design-program, and inside the Tuwa
plugin. The text format it asks for is specified in `import-format.md` beside it
(`tuwa://skills/design-program/import-format`).

## The voice (binding on every sentence you write for Tuwa)

- Describe readings, accumulation and the plan's own numbers. Never diagnose, never name a risk
  of injury, never forecast harm, and never frame a lighter week as protection.
- The plan is the athlete's. Write "your plan", never "Tuwa recommends".
- A pain or an ache the athlete mentions is recorded in their own words. You do not interpret
  it. When it changes how they want to train, plan around it as they ask, and suggest they talk
  to a qualified professional about it.

## 1. Standards — fetch them, never copy them

Before you write anything, read the CURRENT rulebook. Use the first of these that works:

1. the MCP resource `tuwa://rules/program-rules.v0`, or the tool `get_program_rules`;
2. https://tuwa.app/skills/design-program/program-rules.v0.json.

Do not rely on numbers you remember from an earlier conversation: the rulebook can change, and
Tuwa checks every draft against the version on its server. Rulebook v0 holds two rules:

- **The beginner floor.** For a first plan (training history "none" or "under 6 months", or a
  phase 1 with no history named), start at the low end of every range: few strength sessions a
  week, few hard sets per muscle group a week, and every working set at least 2 reps in
  reserve (RIR 2, about RPE 8). Aim a little below what the rules allow, not at it.
- **The week-to-week increase limit.** Outside a deload week, a movement's load or volume and
  the weekly hard-set total rise by no more than 10 % from one week to the next.

The rulebook names its numbers, how it counts (hard sets, strength sessions, deload weeks) and
its sources. Explain a limit to the athlete in your own words and cite the source the rulebook
names. Never quote a textbook.

## 2. The questions — ask them in this order, one group at a time

Do not write the plan before you have the answers. Keep each group short.

1. **Goal** — one sentence in the athlete's words.
2. **Sport and calendar** — the sport, the season phase, match or competition days, fixed team
   practices.
3. **Training history** — "How long have you trained with a written plan?" Exactly one of:
   none · under 6 months · 6 months to 2 years · over 2 years. Record the band as given.
4. **Time** — training days available per week and minutes per session.
5. **Equipment and place** — gym, home, court, what is available.
6. **Current lifts** — the movements the athlete already does, with recent loads and reps.
7. **Constraints** — aches or limits, as the athlete's own words. No diagnosis.
8. **Apple Health** — ask whether you may read Apple Health through YOUR OWN connection to it,
   if the athlete has granted you one. Tuwa never sends raw Apple Health data; it serves only
   its composite readings.

## 3. The context to collect before writing

- The answers above.
- When Tuwa is connected (the Tuwa tools are available): call `get_plan_position`,
  `get_recent_sessions`, `get_load_state` and `get_today`. Use what they return as readings:
  the sessions the athlete actually logged, the load trend, the recovery reading, the current
  plan and its week. Do not promise more than these readings hold.
- When Tuwa is not connected: work from the answers alone and say so once.

## 4. The output contract — Tuwa's import text format

Write the plan EXACTLY in the format of `import-format.md` (the resource
`tuwa://skills/design-program/import-format`). In short:

```text
Tuwa plan
Name: <plan name>
Goal: <one sentence>
Phase: 1 of <N>
Weeks: <number of weeks in this phase>
Start rule: <when week 1 starts, e.g. "Start on the next Monday">
Athlete history band: <none | under 6 months | 6 months to 2 years | over 2 years>
Profile: <one line: sport, days per week, minutes, equipment, constraints in their words>

Week 1
Day 1 — <day title>
<Section header> (<short section note>)
- <Movement>: <sets> × <reps> @ <load> · RIR <n>
  Cue: <one short coaching line>
- <Movement>: <sets> × <time or distance>
Rule: <one line that applies to the whole day>

Day 2 — <day title>
...

Week 2
...
Week 4 — Deload
...

Reference: <page title>
- <line>
```

Rules of the format: one plan header; `Week N` headings in order; `Day N — Title` headings;
section headers as plain lines; every movement on its own line starting with `- ` and carrying a
dose; at most one `Cue:` line under a movement; at most one `Rule:` line per day; reference pages
(a morning routine, rules for every session) after the last week as `Reference: <title>`. Loads
in kg unless the athlete uses lb; a percentage of a max as `@ 75 %`; bodyweight as
`@ bodyweight`. Effort as `RIR n` (or `RPE n`). A week that repeats an earlier one exactly may
be written `Week 3: same as Week 2`.

## 5. Long-term memory

Treat this plan as **phase 1 of a multi-phase plan** for this athlete. Keep the athlete's
profile (the answers to section 2) and a phase log (phase number, weeks, what changed and why)
in your memory or project notes, if you have them. When the athlete returns after the block,
read Tuwa's readings if connected, ask what changed, and write the next phase from the same
profile. The plan header repeats the profile and the phase number, so the next phase can start
from the pasted plan alone when you have no memory.

## 6. The hand-off

1. Check the draft first: if Tuwa is connected, call `evaluate_program` with the plan text and
   fix every finding marked `block`.
2. **If Tuwa is connected, send the plan with `propose_program`** (the plan text plus the
   header fields). If Tuwa refuses it, it lists the exact findings: fix them and send again.
   On success, tell the athlete: "Your plan is in Tuwa as a draft. Open Tuwa to review and
   confirm it."
3. **Otherwise, tell the athlete to copy the plan and paste it into Tuwa › Your plan.**

Tuwa never activates a plan the athlete did not confirm, and you never log a workout or answer
Tuwa's check-in for the athlete.
