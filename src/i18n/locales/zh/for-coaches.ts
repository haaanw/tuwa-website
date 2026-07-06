import type { TopicPageContent } from '../../topicPage';

const content: TopicPageContent = {
  meta: {
    title: '给自我训练篮球运动员的 Tuwa',
    description:
      'Tuwa 如何帮助认真打竞技篮球、也认真力量训练的业余运动员，调整自己计划中的力量训练。',
  },
  hero: {
    outcomeStatement: '自我训练，不必等于靠猜',
    hookLine:
      'Tuwa 把通常只有配备教练、队医和体能团队的运动员才有的运动科学后方团队，交到你手里。',
  },
  sections: [
    {
      heading: '问题：篮球和力量训练经常撞在一起',
      body: [
        '你自己写计划，认真打比赛，也想继续变强。困难通常不是要不要训练，而是昨晚场上训练之后，今天计划的顶组是否仍在 strike zone 内。',
        '通用恢复分数可以告诉你全身大概好或不好。训练日志可以告诉你计划了什么。但它们单独都很难说出：腿被比赛打累了，深蹲要调整，卧推仍然可以。',
        'Tuwa 就是为这个空隙设计的。它不接管编程，而是给出你希望后方团队提供的每日证据，再由你确认决定。',
      ],
    },
    {
      heading: 'Tuwa 给你什么',
      subheading: '你的计划、生理状态和比赛背景，合成一个决定',
      body: [
        'Tuwa 从你自己写的力量训练开始。它从 HealthKit 读取 HRV、静息心率和睡眠，加入训练历史、酸痛、比赛等级和比赛临近情况，然后给出 go、modify 或 hold 建议。',
        '建议会包含调整后的顶组数字和一句原因，让你在热身前就有具体决定。',
      ],
      bullets: [
        'Strike zone：每天随生理状态、训练历史和篮球背景移动的强度区间。',
        'Microdose：你原计划训练的削减版，比赛日前常见为一到两个有上限的顶组。',
        '比赛临近：当比赛在 48 小时内，建议会优先保护比赛新鲜度。',
        '跨项目疲劳：昨晚比赛可能降低深蹲准备状态，但不一定影响卧推。',
        'Suggest-and-confirm：Tuwa 解释调整建议；你决定是否执行。',
      ],
    },
    {
      heading: 'Tuwa 不做什么',
      body: [
        'Tuwa 不写训练计划，不通过聊天生成训练课，不命令你停止训练，也不替代医疗专业人士或声称预测伤病。',
        '这种克制正是重点。它服务于那些想继续掌握训练主导权、同时获得更精确当天调整的运动员。',
      ],
    },
    {
      heading: '适合谁',
      body: [
        'Tuwa 适合认真打竞技篮球、也认真力量训练的业余运动员，尤其是没有职业教练、队医或体能团队支持的人。',
        '如果你的训练周里有野球、对抗、正式比赛和计划力量训练，Tuwa 帮你让计划继续推进，同时不假装每一次高强度刺激成本都一样。',
        '你是自己身体的 CEO。Tuwa 是后方团队。',
      ],
    },
  ],
  related: {
    heading: '继续探索',
    links: [
      { label: '每日建议', href: '/features/recovery-scoring' },
      { label: '力量与比赛记录', href: '/features/workload-tracking' },
      { label: '对比 Tuwa', href: '/compare' },
    ],
  },
};

export default content;
