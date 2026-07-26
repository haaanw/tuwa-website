import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "The Science Behind Tuwa: Methodology",
    "description": "How Tuwa builds your readiness score and training-load model — the sports science, the data sources, and the honest limits, explained plainly."
  },
  "hero": {
    "outcomeStatement": "The science behind every number Tuwa shows you",
    "hookLine": "No black boxes. Here is exactly how the readiness score and training-load model work, where the data comes from, and what they can and can't tell you."
  },
  "sections": [
    {
      "heading": "How the readiness score is composed",
      "subheading": "Four physiological signals, weighted against your own baseline",
      "body": [
        "Each morning, Tuwa pulls overnight physiological data from Apple HealthKit and combines it with a short wellness check-in to produce a single readiness number between 0 and 100. The inputs are not treated equally, and none of them is judged against a population norm — every signal is compared to your own recent trend.",
        "Heart-rate variability (HRV — the millisecond-level variation between consecutive heartbeats) is the heaviest-weighted input, because it tracks autonomic nervous-system balance more directly than any other consumer signal. Resting heart rate adds a second, slower-moving view of systemic stress. Sleep duration and consistency capture the recovery window itself. The morning wellness check-in — where you rate soreness, energy, and stress — adds the context no wearable can measure.",
        "Tuwa weights each factor by how far it sits above or below your personal baseline, then blends them. A score of 62 is never just a number: the app tells you that your HRV is tracking 8% below your recent baseline, your sleep ran short, but your resting heart rate is normal. You see the reasoning, not just the verdict."
      ]
    },
    {
      "heading": "The training-load model",
      "subheading": "Acute vs chronic load, ACWR, and the 0.8–1.3 band",
      "body": [
        "Every session you log is converted into a load value from volume and intensity (using RPE — rate of perceived exertion, the 1–10 scale for how hard a set felt — and optionally RIR, reps in reserve). Tuwa then maintains two views of that load: acute load, roughly the last week, which reflects current fatigue, and chronic load, roughly the last four weeks, which reflects your fitness base.",
        "The ratio between them is the acute:chronic workload ratio (ACWR). Research originating with Tim Gabbett and colleagues often uses a relative range around 0.8 to 1.3 as workload context. Below the range, you may be doing much less than your recent base; above it, the current week may be asking for a bigger jump than your recent training supports.",
        "Rather than crude rolling sums, Tuwa computes these loads with exponentially weighted moving averages (EWMA) — a smoothing method that gives recent sessions more weight than older ones. This lets your model respond quickly to a hard block or a deload instead of being anchored to weeks-old data, and it keeps recent workload context visible before you train."
      ]
    },
    {
      "heading": "Data and privacy",
      "subheading": "On-device by default, offline-capable, composite-only sync",
      "body": [
        "Your raw HealthKit data — every HRV reading, heart-rate sample, and sleep record — stays on your device. Tuwa reads it locally to compute your scores and never uploads the underlying physiological streams to a server.",
        "The app works fully offline. Scoring, load calculation, and logged-work spike detection all run on-device, so a flaky connection or a basement gym never interrupts the analysis.",
        "Cloud sync carries only the composite outputs — your readiness score and load metrics — never the raw biometric data behind them. The servers get the conclusion, not your nervous system's full record."
      ]
    },
    {
      "heading": "Honest limitations",
      "subheading": "What the model can and cannot do",
      "body": [
        "Tuwa is useful from day one because onboarding sets up your training profile and logged sessions immediately start building workload history. Readiness is more conservative: when personal recovery history is thin, Tuwa avoids pretending that a population baseline is your baseline. Over time it learns your own HRV, resting heart rate, sleep, wellness, and training patterns.",
        "No model built on consumer wearables is perfect. HRV is noisy — a glass of wine, an early alarm, or a poor night can move a single reading — which is exactly why Tuwa tracks trends rather than reacting to individual data points. The ACWR framework describes population-level workload associations, not individual guarantees or predictions; it informs decisions, it does not make them for you.",
        "Tuwa is a training tool, not a medical device. It does not diagnose illness, injury, or any health condition, and nothing in the app is medical advice. If a metric concerns you or you feel unwell, consult a qualified professional."
      ]
    }
  ],
  "references": {
    "heading": "Primary sources",
    "items": [
      {
        "label": "Gabbett TJ (2016). The training–injury prevention paradox: should athletes be training smarter and harder? British Journal of Sports Medicine, 50(5), 273–280.",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Hulin BT, Gabbett TJ, et al. (2016). Acute:chronic workload ratio research in British Journal of Sports Medicine, 50(4), 231–236.",
        "url": "https://bjsm.bmj.com/content/50/4/231"
      }
    ]
  },
  "related": {
    "heading": "Go deeper",
    "links": [
      {
        "label": "The daily verdict",
        "href": "/features/verdict"
      },
      {
        "label": "Recovery scoring",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "Workload tracking",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Readiness score explained",
        "href": "/readiness-score"
      },
      {
        "label": "Training load explained",
        "href": "/training-load"
      }
    ]
  }
};

export default content;
