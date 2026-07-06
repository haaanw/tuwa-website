import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "What Is a Readiness Score? How to Use It",
    "description": "A daily readiness score turns HRV, resting heart rate, sleep, and a morning check-in into one number. Learn what it measures and how to act on it."
  },
  "hero": {
    "outcomeStatement": "Know exactly how hard to push today",
    "hookLine": "A readiness score is one transparent number that tells you whether to push, hold, or back off — built from everything your body is telling you."
  },
  "sections": [
    {
      "heading": "What a daily readiness score actually is",
      "body": [
        "A readiness score — sometimes called a recovery score — is a single number, typically on a 0 to 100 scale, that estimates how prepared your body is to absorb hard training today. It is not a verdict on your fitness or your discipline. It is a snapshot of your current physiological state: how well your nervous system has recovered overnight relative to how it usually looks.",
        "The reason a score is useful is that the underlying signals are hard to read in isolation. Your heart-rate variability (HRV — the variation in time between consecutive heartbeats) might be down, but your sleep was long and your resting heart rate is normal. Is that a green light or a red one? A readiness score does the weighing for you, collapsing several noisy inputs into one decision you can act on before you train.",
        "Critically, a good readiness score is always relative to you. An athlete with a resting HRV of 45 ms is not less recovered than one at 80 ms — the question is whether your HRV today sits above or below your own recent trend. That personal framing is what separates a meaningful readiness signal from a generic wellness gauge."
      ]
    },
    {
      "heading": "The four inputs and how they are weighted",
      "subheading": "HRV, resting heart rate, sleep, and a morning check-in",
      "body": [
        "Tuwa builds your score from four inputs, each compared against your personal baseline rather than a population average. Heart-rate variability is the strongest single signal: when you are well-recovered, parasympathetic (rest-and-digest) activity dominates and HRV rises; when you are fatigued, stressed, or fighting illness, sympathetic (fight-or-flight) tone climbs and HRV drops. Resting heart rate adds a confirming view — an elevated morning resting heart rate often corroborates a suppressed HRV.",
        "Sleep contributes both duration and quality. A short or fragmented night raises the cost of a hard session, so it pulls the score down even when your heart metrics look fine. The morning wellness check-in is where your subjective read enters the model: you rate soreness, energy, and stress, and those answers can override the physiology when, for example, you feel wrecked despite clean numbers.",
        "No single input dictates the score. The weighting leans on HRV and resting heart rate as objective physiological anchors, then adjusts for sleep and your self-report. Because everything is measured against your own evolving baseline — calculated with an averaging method that weights recent days more heavily than older ones — a single anomalous reading rarely swings the number on its own."
      ],
      "bullets": [
        "HRV: the primary signal of autonomic nervous-system recovery, compared to your recent trend",
        "Resting heart rate: a confirming marker that often moves opposite to HRV when you are fatigued",
        "Sleep duration and quality: short or broken sleep raises the real cost of hard training",
        "Morning wellness check-in: soreness, energy, and stress let your subjective state adjust the physiology"
      ]
    },
    {
      "heading": "How to act on your score: push, hold, or back off",
      "body": [
        "A score is only useful if it changes what you do. Tuwa maps readiness to three zones with concrete training implications. Green means full capacity — run your session as prescribed. Yellow means moderate recovery — train, but trim total volume by roughly 10 to 20% and cap how hard each set feels (your RPE, the rate of perceived exertion on a 1-to-10 scale). Red means your body is signaling a genuine recovery need — light movement, mobility, or rest.",
        "Readiness becomes far more powerful when you pair it with training load. A green score on a day when your acute workload is already spiking is not an invitation to add more — it is a cue to execute the planned hard session without bonus volume. A red score during a heavy block is a prompt to reduce, swap, or recover before the week gets away from you. Recovery tells you how much you may be able to spend today; load tells you how much you have already spent.",
        "The goal is not to chase a perfect number every morning. It is to stop having the same willpower argument with yourself at 6 a.m. When the data says back off, you back off without guilt; when it says go, you commit without hesitation. Over weeks, that consistency — pushing when you are ready and holding when you are not — is what compounds into adaptation instead of breakdown."
      ]
    },
    {
      "heading": "Why it is transparent, not a black box",
      "body": [
        "A score you do not understand is a score you will not trust — and one you will eventually ignore. That is why Tuwa pairs every number with plain-language reasoning. It does not just tell you your readiness is 62; it tells you that your HRV is tracking 8% below your recent baseline, your sleep was cut short, but your resting heart rate is normal. You see the score and the why behind it, so you can apply judgment the algorithm cannot.",
        "Transparency also means the data stays yours. Your raw HealthKit readings — individual HRV measurements, raw heart-rate data, sleep-stage detail — never leave your device. The scoring runs locally and works offline, so you get a number every morning whether or not you have signal. Only composite scores sync if you choose to share them with a coach.",
        "And the score is useful from day one. Tuwa starts with population baselines so you get sensible guidance immediately, then quietly shifts to your personal trend as it learns your individual patterns over the first weeks. You are never staring at a blank screen waiting for the model to warm up."
      ]
    }
  ],
  "related": {
    "heading": "Keep exploring",
    "links": [
      {
        "label": "Recovery scoring in the app",
        "href": "/features/recovery-scoring"
      },
      {
        "label": "The methodology behind Tuwa",
        "href": "/methodology"
      },
      {
        "label": "Training load and ACWR",
        "href": "/training-load"
      }
    ]
  },
  "references": {
    "heading": "Further reading",
    "items": [
      {
        "label": "Plews et al. — Heart rate variability monitoring in elite athletes",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23852425/"
      },
      {
        "label": "Gabbett — The training-injury prevention paradox (acute:chronic workload)",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Apple HealthKit — heart rate variability and sleep data",
        "url": "https://developer.apple.com/documentation/healthkit"
      }
    ]
  }
};

export default content;
