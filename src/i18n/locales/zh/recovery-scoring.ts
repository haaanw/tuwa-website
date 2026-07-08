import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = {
  meta: {
    title: '每日建议',
    description:
      '针对你计划中的力量训练，给出每日 go、modify 或 hold 建议、调整后的顶组数字，以及一句原因。',
  },
  hero: {
    outcomeStatement: 'go、modify 或 hold，并告诉你为什么',
    hookLine: 'Tuwa 把 HRV、睡眠、静息心率、训练历史、酸痛和比赛临近情况，转化为对你原计划力量训练的调整建议。',
    screenshotAlt:
      'Tuwa 应用 Insights 恢复界面，显示恢复评分、心率变异性、静息心率、睡眠和恢复趋势',
  },
  howItWorks: {
    heading: '工作原理',
    deviceAlt: 'Tuwa 应用 Insights 恢复界面，显示恢复评分、心率变异性、静息心率、睡眠和恢复趋势',
    p1: '每天早晨，Tuwa 读取你已经通过 HealthKit 收集的生理信号：HRV、静息心率和睡眠。它再结合你的训练历史、酸痛和比赛临近情况，评估你原本计划的力量训练。',
    p2: '输出刻意保持实用：go、modify 或 hold，加上调整后的顶组数字和一句原因。例如："周六比赛——限制顶组，跳过回退组。" 你会在热身前看到建议，那时训练仍然可以调整。',
    threeZonesHeading: '三种建议，由运动员确认',
    p3: 'Go 表示原计划剂量仍适合今天。Modify 表示保留训练结构，但减少剂量：限制 RPE、降低重量，或在比赛临近时改成 microdose。Hold 表示 Tuwa 看到足够多疲劳背景，建议推迟最硬的部分。它们都不是命令；最终由你确认。',
  },
  deviceCompatibility: {
    heading: 'HealthKit 生理信号，加上你的篮球背景',
    p1: 'Tuwa 使用应用可读取的 HealthKit 信号——HRV、静息心率和睡眠——再加入普通可穿戴分数通常看不到的内容：你自己写的计划、即将执行的力量训练，以及上一场场上训练是野球、对抗还是正式比赛强度。',
  },
  personalBaseline: {
    heading: 'strike zone 每天都会移动',
    p1: 'HRV 数字因人而异。真正重要的是你的信号是否高于或低于自己的近期趋势，以及这个趋势如何影响今天计划中的力量训练。Tuwa 用这些上下文，在你上重量前移动当天的 strike zone。',
  },
  scienceSection: {
    heading: '背后的科学原理',
    p1: '心率变异性是连续心跳之间时间间隔的变化量，以毫秒为单位。完全规律的心跳——每次间隔完全相同——实际上是压力的信号。健康的心脏会产生细微的逐搏变异，因为它在响应自主神经系统的调控，平衡交感神经（战斗或逃跑）与副交感神经（休息与消化）的活动。',
    p2: '恢复良好时，副交感神经活性占主导，心率变异性更高。疲劳、压力过大或身体不适时，交感神经张力增强，心率变异性下降。正因如此，过去二十年间心率变异性已成为运动科学领域研究最广泛的生物标志物之一——它是你神经系统当前状态的窗口。',
    p3: '但心率变异性本身存在噪声。睡眠不足、一场很晚的比赛，或闹钟提前，都会影响单次测量结果。因此 Tuwa 把生理数据当作建议的一部分，而不是全部。计划训练、比赛临近、酸痛和近期训练历史，给这些信号补上训练上下文。',
  },
};

export default recoveryScoring;
