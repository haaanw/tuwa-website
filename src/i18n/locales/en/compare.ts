import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "Tuwa vs. Generic Fitness Trackers",
    "description": "How Tuwa differs from generic fitness trackers and black-box recovery apps — load and recovery in one readiness decision, grounded in ACWR and HRV."
  },
  "hero": {
    "outcomeStatement": "Pick the tool that actually answers \"how hard should I train today?\"",
    "hookLine": "Most trackers count what you did. Tuwa connects your training load to your recovery so you know what to do next."
  },
  "sections": [
    {
      "heading": "What generic trackers do well — and where they stop",
      "body": [
        "Generic fitness trackers are genuinely good at what they were built for. They count steps, estimate calories, log workouts, map your runs, and keep a tidy history of activity. If your goal is to move more, close some rings, and see a weekly summary, that is a perfectly fine fit — and Tuwa is not trying to replace that.",
        "The gap shows up the moment training gets serious. Steps and calories say nothing about whether today's prescribed session is wise given the last three weeks of work. Many trackers also surface a single \"recovery\" or \"readiness\" figure, but it arrives as a black box: a number with no visible inputs, no training context, and no explanation you can argue with. You are asked to trust it on faith.",
        "That black box is the real limitation. A readiness score built only from last night's sleep and heart rate ignores the other half of the equation — how much training stress you have actually accumulated. A score can read green while your acute load is spiking far above your chronic baseline, which is exactly the situation where injury risk climbs. Recovery and load are two halves of one decision; reading them separately leaves the most important question unanswered."
      ]
    },
    {
      "heading": "What Tuwa does differently",
      "body": [
        "Tuwa is built around a single question generic trackers don't fully answer: given everything my body is telling me and everything I've recently asked of it, how hard should I train today? Answering that means holding recovery and training load in the same view, not on separate screens in separate apps.",
        "On the recovery side, Tuwa synthesizes HRV (heart-rate variability), resting heart rate, sleep, and a short morning wellness check-in into one readiness score between 0 and 100 — then shows the reasoning factors behind it in plain language. On the load side, it tracks your acute load (roughly the last week) against your chronic load (roughly the last four weeks) using EWMA (exponentially weighted moving averages), which weight recent sessions more heavily, and flags load spikes before you execute a session rather than after.",
        "The scoring is transparent on purpose. Tuwa tells you not just that readiness is 62, but that your HRV is tracking below your recent baseline and your sleep ran short — so you can sanity-check the call against your own judgment. It is also useful from day one: population baselines from validated sports-science literature give real guidance immediately, then hand off progressively to your personal baseline as your own data accumulates."
      ]
    },
    {
      "heading": "Generic fitness tracker vs. Tuwa",
      "subheading": "A fit-for-purpose comparison, not a takedown",
      "body": [
        "Neither tool is universally \"better\" — they answer different questions. Here is the honest contrast for someone deciding what serious training actually requires."
      ],
      "comparison": {
    "columns": [
      "Dimension",
      "Generic fitness tracker",
      "Tuwa"
    ],
    "rows": [
      {
        "label": "Primary question",
        "generic": "“What did I do?” — activity history",
        "tuwa": "“What should I do today?” — a training decision"
      },
      {
        "label": "Recovery signal",
        "generic": "A black-box recovery number with hidden inputs",
        "tuwa": "Transparent readiness score: HRV, resting HR, sleep, wellness"
      },
      {
        "label": "Training load",
        "generic": "Steps, calories, workout logs — no acute:chronic context",
        "tuwa": "ACWR tracking with EWMA and pre-session spike detection"
      },
      {
        "label": "Load + recovery together",
        "generic": "Separate, or load context absent entirely",
        "tuwa": "Combined into one readiness decision"
      },
      {
        "label": "Science grounding",
        "generic": "Proprietary, often undocumented",
        "tuwa": "ACWR validated by Gabbett et al.; HRV heavily researched"
      },
      {
        "label": "Privacy",
        "generic": "Data typically processed in the cloud",
        "tuwa": "Raw HealthKit stays on-device; only composite scores sync"
      },
      {
        "label": "Time to useful",
        "generic": "Varies; some need weeks of baseline",
        "tuwa": "Useful from day one, then personalizes"
      }
    ]
  }
    },
    {
      "heading": "How to decide",
      "body": [
        "If you want general activity awareness — daily movement, calories, a casual workout log — a mainstream fitness tracker covers that well and Tuwa would be more than you need. There is no shame in fit-for-purpose; the best tool is the one matched to the job.",
        "Tuwa is for the case where the stakes are higher: you follow a real program, you push close to your limits, and a poorly-timed hard session costs you weeks. In that situation you need load and recovery read together, scoring you can interrogate, and data that stays yours. Tuwa works with the wearable you already own — Apple Watch, Whoop, Oura, Garmin, anything that writes HRV and sleep to Apple HealthKit — so choosing it doesn't mean buying new hardware.",
        "If you want to see exactly how the readiness score and load model are built before you trust them, the methodology page lays out the mechanisms in full."
      ]
    }
  ],
  "related": {
    "heading": "Go deeper",
    "links": [
      {
        "label": "Recovery scoring",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "Workload tracking",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Methodology",
        "href": "/methodology"
      }
    ]
  }
};

export default content;
