import type { Home } from '../en/home';

const home: Home = {
  hero: {
    headline: '科学训练，精准恢复。',
    subtitle: 'Tuwa 将心率变异、睡眠、训练负荷和六维疲劳指标融合为一个准备状态评分——让你每天都知道该练多狠。',
    deviceAlt: 'Tuwa 应用显示今日恢复评分 82 分——心率变异处于绿色区间，睡眠 7.5 小时。',
    badgeAlt: '在 App Store 下载',
    badgeAriaLabel: '在 App Store 下载 Tuwa',
  },
  stats: {
    heading: '运动员为何信任这个评分',
    science: {
      title: '基于 ACWR 与 HRV',
      desc: '准备状态评分建立在急慢性负荷比和心率变异之上——这些是运动科学的公认指标，而非黑箱。',
    },
    privacy: {
      title: '隐私优先设计',
      desc: '原始 HealthKit 数据永不离开你的设备。应用完全离线可用；仅在你启用教练功能时同步综合评分。',
    },
    dayOne: {
      title: '第一天就能用',
      desc: '人群基线加上晨间自评，立刻给出真实建议——无需数周数据积累，Tuwa 即刻有用。',
    },
  },
  cta: {
    headline: '为认真对待训练的运动员而造。',
    body: '基于证据的负荷管理。没有花哨数据，没有干扰噪音。',
  },
  featureGrid: {
    heading: '训练不再靠猜测',
    features: [
      {
        title: '恢复评分',
        desc: '将心率变异、睡眠、心率和训练上下文综合为一个每日准备状态数值。',
        href: '/features/recovery-scoring',
      },
      {
        title: '负荷追踪',
        desc: '多因素疲劳追踪与负荷激增检测，让你始终处于最佳训练区间。',
        href: '/features/workload-tracking',
      },
      {
        title: '智能模板',
        desc: '内置目标组数、重量和次数的训练计划。',
        href: '/features/smart-templates',
      },
      {
        title: '冷启动方案',
        desc: '第一天就能用——无需数周基线数据积累。',
        href: '/features/cold-start',
      },
      {
        title: '教练 + 运动员',
        desc: '实时查看全队恢复状态，一键下发训练计划。',
        href: '/features/coaching',
      },
    ],
    segmentLabels: ['恢复', '负荷', '训练', '入门', '教练'],
    exploreCta: '了解详情',
  },
};

export default home;
