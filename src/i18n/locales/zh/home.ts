import type { Home } from '../en/home';

const home: Home = {
  hero: {
    headline: '每一次训练，都留在你的 strike zone。',
    subtitle: 'Tuwa 是给认真打比赛、也认真力量训练的自我训练篮球运动员准备的运动科学后方团队。你输入自己的计划、记录比赛强度，Tuwa 每天给出 go、modify 或 hold 建议、调整后的顶组数字，以及一句原因。',
    loopSteps: ['计划', '检查', '调整', '复盘'],
    loopAriaLabel: 'Tuwa 训练闭环',
    deviceAlt: 'Tuwa 今日界面显示准备状态建议、计划力量训练调整、恢复信号和训练负荷。',
    badgeAlt: '在 App Store 下载',
    badgeAriaLabel: '在 App Store 下载 Tuwa',
  },
  stats: {
    heading: '为篮球腿和认真力量训练而设计',
    science: {
      title: '会移动的 strike zone',
      desc: '心率变异、静息心率、睡眠、酸痛、比赛等级和力量训练历史，会一起移动当天最合适的训练强度区间。',
    },
    privacy: {
      title: '理解比赛临近',
      desc: '当比赛在 48 小时内，Tuwa 会把力量训练框定为 microdose：限制顶组、跳过回退组，优先保护比赛新鲜度。',
    },
    dayOne: {
      title: '看局部疲劳，不看一个全身分数',
      desc: '昨晚比赛可能把腿打废，但上肢状态没问题。Tuwa 会把这个背景带进今天深蹲或卧推的判断。',
    },
  },
  cta: {
    headline: '保留你的计划，调整今天。',
    body: 'Tuwa 不替你写课表，也不是聊天教练。你决定训练计划；Tuwa 让今天这堂力量训练更安全、更精确。',
  },
  featureGrid: {
    heading: '你的计划，按今天的身体状态变得更稳',
    features: [
      {
        title: '输入你的计划',
        desc: '把你本来就要做的力量训练带进来，保留目标、备注、RPE 上限和顶组意图。',
        href: '/features/smart-templates',
      },
      {
        title: '记录力量与比赛',
        desc: '记录组数、次数、重量、RPE、RIR，也记录昨晚是野球、对抗训练还是正式比赛强度。',
        href: '/features/workload-tracking',
      },
      {
        title: '每日建议',
        desc: '热身前看到 go、modify 或 hold 建议、调整后的顶组数字，以及一句清楚的原因。',
        href: '/features/recovery-scoring',
      },
      {
        title: '后方团队复盘',
        desc: '把训练负荷、恢复、比赛临近和力量进步放在一起看，不把课表交给 AI 教练。',
        href: '/training-load',
      },
    ],
    segmentLabels: ['计划', '记录', '建议', '复盘'],
    exploreCta: '了解详情',
  },
};

export default home;
