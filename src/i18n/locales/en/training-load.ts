import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "What Is Training Load? How Tuwa Measures It",
    "description": "Training load is volume times intensity. Learn how acute vs chronic load and ACWR predict injury risk, and how Tuwa detects spikes before you train."
  },
  "hero": {
    "outcomeStatement": "Understand your training load before it overtakes you",
    "hookLine": "What training load actually means, why load spikes raise injury risk, and how Tuwa measures it from the sets you already log."
  },
  "sections": [
    {
      "heading": "What training load actually is",
      "subheading": "Volume times intensity, summed into a session load",
      "body": [
        "Training load is a single number that captures how much stress a workout placed on your body. At its simplest, it is volume multiplied by intensity: how much work you did, weighted by how hard that work was. A high-rep session at moderate weight and a low-rep session near your max can produce very different loads even when the total tonnage looks similar — because intensity matters as much as volume.",
        "To capture intensity honestly, you need a signal that reflects effort, not just the number on the bar. Tuwa uses RPE — rate of perceived exertion, a 1-to-10 scale measuring how hard a set felt — alongside RIR (reps in reserve), which tells you how many reps you had left before failure. An RPE 8 set with two reps in reserve carries different stress than an all-out set to failure, and combining both signals gives a more truthful intensity reading than weight and reps alone.",
        "Tuwa turns every set you log into a session load number, then stacks those session loads over time. That running record is the raw material for everything that follows: acute load, chronic load, and the ratio between them that actually predicts whether you are progressing safely or heading toward a breakdown."
      ]
    },
    {
      "heading": "Acute load, chronic load, and the ACWR",
      "subheading": "Why a sudden spike raises injury risk",
      "body": [
        "Two views of your training matter. Acute load is what you have done in roughly the last week — a measure of current fatigue and freshness. Chronic load is your training over roughly the last four weeks — your accumulated fitness base, the workload your body has actually been prepared for. Neither number means much in isolation. The insight lives in the ratio between them: the acute:chronic workload ratio, or ACWR.",
        "Your body adapts to gradual increases in load. Muscles get stronger, tendons toughen, the cardiovascular system grows more efficient — but only when stress rises at a pace adaptation can keep up with. A sudden jump is different. When your acute load spikes far above your chronic baseline — when one week demands dramatically more than your body has been built for — injury risk climbs sharply. The ACWR makes that mismatch visible as a single number.",
        "This is why chasing a hard week after time off is so risky: the work itself may be reasonable, but the spike relative to your recent base is what the body cannot absorb. A high ACWR is a warning that you are writing checks your tissue tolerance has not earned yet."
      ]
    },
    {
      "heading": "How Tuwa computes it",
      "subheading": "EWMA, RPE plus RIR, and spike detection before the session",
      "body": [
        "Tuwa models load using an exponentially weighted moving average (EWMA) — a smoothing method that gives recent sessions more weight than older ones. A training block you finished a month ago counts for less than what you did last week, so your baseline tracks who you are now rather than who you were five weeks ago. This makes the load model responsive instead of anchored to stale data.",
        "The inputs come straight from how you already train: exercises, sets, reps, weight, RPE, and RIR. You do not maintain a separate spreadsheet or convert anything by hand — the session load and the resulting ACWR are computed from the log you keep anyway.",
        "The part that changes how you train is timing. Tuwa detects load spikes before you execute the session, not after. If the workout you are about to do would push your ACWR out of the safe band, you see it while you can still adjust — drop a set, cap the weight, or move volume to another day. The goal is to catch the mistake at the planning stage, not to explain the injury afterward."
      ]
    },
    {
      "heading": "Staying in the 0.8 to 1.3 band",
      "subheading": "Progressive overload, not playing it safe",
      "body": [
        "Research on the ACWR — developed and validated by sports scientist Tim Gabbett and colleagues, first in professional rugby and cricket and since replicated across team sports, endurance, and resistance training — points to a sweet spot roughly between 0.8 and 1.3. Below 0.8 you are undertraining relative to your fitness base, and adaptation slows. Above 1.3 is where the injury-risk curve bends sharply upward.",
        "Staying inside that band is not cautious training. It is the condition under which progressive overload actually produces adaptation rather than breakdown. The athletes who make the most consistent long-term progress are usually the ones who keep load climbing steadily without the spikes that force time off — and time off is what erodes the chronic base they worked to build.",
        "Read it as a target range, not a speed limit. The band tells you how fast you can safely add stress, which is exactly the information progressive overload needs. Tuwa keeps the ratio in front of you so the next hard week pushes you forward instead of setting you back."
      ]
    }
  ],
  "related": {
    "heading": "Keep exploring",
    "links": [
      {
        "label": "Workload tracking in Tuwa",
        "href": "/features/workload-tracking"
      },
      {
        "label": "Our methodology",
        "href": "/methodology"
      },
      {
        "label": "Readiness score",
        "href": "/readiness-score"
      }
    ]
  },
  "references": {
    "heading": "References",
    "items": [
      {
        "label": "Gabbett TJ. The training-injury prevention paradox. Br J Sports Med, 2016.",
        "url": "https://bjsm.bmj.com/content/50/5/273"
      },
      {
        "label": "Hulin BT et al. The acute:chronic workload ratio predicts injury. Br J Sports Med, 2016.",
        "url": "https://bjsm.bmj.com/content/50/4/231"
      }
    ]
  }
};

export default content;
