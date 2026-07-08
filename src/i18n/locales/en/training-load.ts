import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  "meta": {
    "title": "What Is Training Load? How Tuwa Measures It",
    "description": "Training load is volume times intensity. Learn how acute vs chronic load and ACWR provide workload context, and how Tuwa surfaces recent load before you train."
  },
  "hero": {
    "outcomeStatement": "Understand your training load before it overtakes you",
    "hookLine": "What training load actually means, why load spikes deserve attention, and how Tuwa measures it from the sets you already log."
  },
  "sections": [
    {
      "heading": "What training load actually is",
      "subheading": "Volume times intensity, summed into a session load",
      "body": [
        "Training load is a single number that captures how much stress a workout placed on your body. At its simplest, it is volume multiplied by intensity: how much work you did, weighted by how hard that work was. A high-rep session at moderate weight and a low-rep session near your max can produce very different loads even when the total tonnage looks similar — because intensity matters as much as volume.",
        "To capture intensity honestly, you need a signal that reflects effort, not just the number on the bar. Tuwa uses RPE — rate of perceived exertion, a 1-to-10 scale measuring how hard a set felt — alongside RIR (reps in reserve), which tells you how many reps you had left before failure. An RPE 8 set with two reps in reserve carries different stress than an all-out set to failure, and combining both signals gives a more truthful intensity reading than weight and reps alone.",
        "Tuwa turns every set you log into a session load number, then stacks those session loads over time. That running record is the raw material for everything that follows: acute load, chronic load, and the ratio between them that helps you decide whether today's plan should push, hold, or adjust."
      ]
    },
    {
      "heading": "Acute load, chronic load, and the ACWR",
      "subheading": "Why a sudden spike should change the session conversation",
      "body": [
        "Two views of your training matter. Acute load is what you have done in roughly the last week — a measure of current fatigue and freshness. Chronic load is your training over roughly the last four weeks — your accumulated fitness base, the workload your body has actually been prepared for. Neither number means much in isolation. The insight lives in the ratio between them: the acute:chronic workload ratio, or ACWR.",
        "Your body adapts to gradual increases in load. Muscles get stronger, tendons toughen, the cardiovascular system grows more efficient — but only when stress rises at a pace adaptation can keep up with. A sudden jump is different. When your acute load rises far above your chronic baseline, one week may be demanding much more than your recent training supports. The ACWR makes that mismatch visible as a single number.",
        "This is why chasing a hard week after time off deserves caution: the work itself may be reasonable, but the spike relative to your recent base is the part to manage. A high ACWR is a prompt to review the plan, not a diagnosis or prediction."
      ]
    },
    {
      "heading": "How Tuwa computes it",
      "subheading": "EWMA, RPE plus RIR, and recent workload context before the session",
      "body": [
        "Tuwa models load using an exponentially weighted moving average (EWMA) — a smoothing method that gives recent sessions more weight than older ones. A training block you finished a month ago counts for less than what you did last week, so your baseline tracks who you are now rather than who you were five weeks ago. This makes the load model responsive instead of anchored to stale data.",
        "The inputs come straight from how you already train: exercises, sets, reps, weight, RPE, and RIR. You do not maintain a separate spreadsheet or convert anything by hand — the session load and the resulting ACWR are computed from the log you keep anyway.",
        "The part that changes how you train is timing. Tuwa shows your recent workload context before you execute the session, using the workouts you have already saved. If your latest ACWR is already out of range, you see that while you can still adjust — drop a set, cap the weight, or move volume to another day. Spike flags are computed from logged work, so the goal is to support the next planning decision with current context."
      ]
    },
    {
      "heading": "Using the 0.8 to 1.3 range",
      "subheading": "Progressive overload, not playing it safe",
      "body": [
        "Research on the ACWR — developed by sports scientist Tim Gabbett and colleagues, first in professional rugby and cricket and later discussed across other sports — often points to a useful range roughly between 0.8 and 1.3. Below the range, you may be doing much less than your recent base. Above it, the current week may be asking for a bigger jump than your recent training supports.",
        "Staying near that range is not cautious training. It is one way to keep progressive overload connected to the workload you have actually built. The athletes who make the most consistent long-term progress are usually the ones who keep load climbing steadily without repeated spikes that disrupt the plan.",
        "Read it as a planning target, not a universal safety rule. Tuwa keeps the ratio in front of you so the next hard week is a deliberate decision instead of an accidental jump."
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
        "label": "Hulin BT et al. Acute:chronic workload ratio research. Br J Sports Med, 2016.",
        "url": "https://bjsm.bmj.com/content/50/4/231"
      }
    ]
  }
};

export default content;
