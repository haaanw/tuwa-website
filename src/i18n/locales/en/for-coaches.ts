import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "Tuwa for Coaches — Roster Readiness at a Glance",
    "description": "See every athlete's recovery and workload between sessions. Connect by code, email, or NFC. Athletes share composite scores, never raw health data."
  },
  "hero": {
    "outcomeStatement": "See how every athlete is recovering — before you prescribe the next session",
    "hookLine": "Tuwa closes the gap between training days, giving coaches roster-wide readiness, workload trends, and prescribed workouts without ever exposing an athlete's raw health data."
  },
  "sections": [
    {
      "heading": "The problem: you coach in the dark between sessions",
      "body": [
        "Most coaching happens in the gap you can't see. An athlete trains hard on Monday, sleeps poorly Tuesday, skips a meal Wednesday, and shows up Thursday looking fine while their nervous system is anything but. By the time you read it in their warm-up — or worse, in a tweaked hamstring — the decision that mattered was already made.",
        "The usual workarounds don't scale. Group chats fill with screenshots. Spreadsheets go stale. Wearable apps report data to the athlete, not to you, and they report everything — raw heart rate, sleep stages, individual readings — which is both more than you need and a privacy line most athletes won't cross with a coach.",
        "Tuwa is built around what a coach actually needs to decide: is this athlete primed to push today, or do they need lighter work? That answer should be waiting on your screen before the first conversation, not reconstructed after the session is already over."
      ]
    },
    {
      "heading": "What Tuwa gives you",
      "subheading": "Roster-wide visibility, in one dashboard",
      "body": [
        "Every linked athlete appears on a single coach dashboard with their current recovery score, ACWR (acute:chronic workload ratio) trend, and recent session history. No switching accounts, no chasing updates — the data is ready before your first athlete walks in.",
        "Visibility only matters if it changes the next decision, so Tuwa surfaces the signals that drive prescription: who is in the green, who is trending toward a dangerous load spike, and who needs a deload before it becomes mandatory."
      ],
      "bullets": [
        "Daily readiness at a glance — color-coded green / yellow / red zones tell you instantly who can handle a hard session and who needs lighter work today.",
        "ACWR trend monitoring — spot athletes whose acute load is climbing too fast against their chronic baseline, and intervene before an injury forces the conversation.",
        "Prescribed workouts via smart templates — build a session once with target sets, reps, weight, and RPE (rate of perceived exertion) ranges, then assign it to an individual or a whole group; it loads straight into the athlete's log.",
        "Log on behalf of athletes — capture sets, reps, and RPE during in-person sessions so accurate training data lands in their workload calculations without anyone typing mid-set.",
        "Automatic PR tracking — new personal records surface from logged sessions without the athlete needing to flag them."
      ]
    },
    {
      "heading": "How athletes connect — and what stays private",
      "body": [
        "Linking an athlete takes seconds, with three methods so you can use whatever fits the moment: share a six-character invite code verbally or by text, send an email invitation the athlete taps to connect instantly, or hold two phones together for an NFC tap during an in-person onboarding. The moment they accept, your dashboard updates with their data.",
        "Consent runs in one direction and the athlete holds the controls. They choose to link, they choose what their profile shares, and they can unlink at any time from their Profile screen — the connection is severed immediately, with no grace period and no residual access for the coach.",
        "Crucially, you never see raw HealthKit data. Individual HRV (heart-rate variability) measurements, raw heart rate, and sleep-stage detail stay on the athlete's device and are never transmitted. What syncs to you are composite scores and workout summaries: the recovery score (0–100), the ACWR ratio, the 28-day workload trend, and session logs with exercise names, sets, reps, and RPE. Enough to coach well — not enough to compromise privacy."
      ]
    },
    {
      "heading": "Who it's for",
      "body": [
        "Tuwa fits coaches who make load decisions for real people and want the evidence in front of them, not behind them. The model works whether you train one athlete remotely or run a small squad in person.",
        "Strength coaches use ACWR trends and PR tracking to progress lifters safely and prescribe sessions that match the day. Endurance coaches lean on readiness and workload trends to time hard efforts, recovery weeks, and taper. Small teams and clubs use roster-wide visibility and group prescriptions to manage many athletes from one account, with each athlete's data fully isolated from the others.",
        "If you're already evaluating Tuwa for your athletes, the coaching feature page, the readiness score breakdown, and the methodology behind the numbers are the natural next reads."
      ]
    }
  ],
  "related": {
    "heading": "Keep exploring",
    "links": [
      {
        "label": "Coach + Athlete features",
        "href": "/features/coaching"
      },
      {
        "label": "The readiness score, explained",
        "href": "/readiness-score"
      },
      {
        "label": "Our methodology",
        "href": "/methodology"
      }
    ]
  }
};

export default content;
