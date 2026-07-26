import type { Home } from '../en/home';

const home: Home = {
  // Pavilion 主页文案（新版结构）。数字、动效与素材与英文版完全一致，只翻译文字。
  meta: {
    title: '每一次训练都留在你的 strike zone',
    description: 'Tuwa 是给认真力量训练的自我训练篮球运动员准备的运动科学后方团队。',
  },
  heroScrub: {
    sectionAria: 'Tuwa——你的计划，变得更安全、更优',
    scoreAria: '准备状态评分 82',
    scoreCaption: '今日准备状态',
    lines: ['你的计划。', '更安全，', '也更优。'],
    lead: 'Tuwa 是自我训练运动员的运动科学后方团队。它读取你的身体信号——心率变异、睡眠、静息心率、训练历史——再据此调整你自己写的计划：今天的具体数字、一个 go / modify / hold 判定，以及负荷的走向。它从不替你写课表。',
    sub: '为同时练专项技术和力量的运动员而设计。',
    cta: '在 App Store 下载',
    ctaNote: 'iOS 17+ · iPhone',
    scrollCue: '下滑',
  },
  marquee: {
    sectionAria: '产品词汇',
    srText: 'Strike zone、microdose、比赛临近度、准备状态、一个疲劳预算、go / modify / hold。',
    terms: ['strike zone', 'microdose', '比赛临近度', '准备状态', '一个疲劳预算', 'go / modify / hold'],
    pauseLabel: '暂停',
    playLabel: '播放',
  },
  showcase: {
    kicker: '01 · 今天',
    heading: '每天一个决定',
    body: '每次训练从一个判定开始：go、modify 还是 hold。Tuwa 把今晨的生理状态和昨天的负荷变成具体的数字调整——顶组降 5%、给体能部分设上限，或者选 microdose 方案，保住动作模式、省下代价。',
    lottieAria: '动画：判定对勾与平静的脉冲圆环',
    lottieCaption: '平静给出的判定',
    aside: '不用聊天，也不用自己解读数据。一个判定、背后的数字，以及你本来就打算练的那堂课。',
    steps: [
      {
        title: '判定',
        body: 'go、modify 还是 hold——附上今天训练的确切数字调整，由你的准备状态和你在计划中的位置算出。',
      },
      {
        title: 'Strike zone',
        body: '实时查看急性与慢性负荷比值，把它稳在适应快过受伤风险的那条区间里。',
      },
      {
        title: '负荷趋势',
        body: '专项技术、力量和体能共用一个疲劳预算——并看清它在未来几周的走向。',
      },
    ],
    verdictAlt: 'Tuwa 判定界面：go / modify / hold 与具体数字调整',
    strikeZoneAlt: 'Tuwa strike zone 条显示急性与慢性负荷比值',
    workloadAlt: 'Tuwa 训练负荷图表与 ACWR 趋势',
  },
  zoneScrub: {
    kicker: '02 · 训练负荷',
    heading: '一个疲劳预算',
    body: '专项技术、力量、体能消耗的是同一个油箱。Tuwa 把它们记成同一份负荷——急性对慢性——并把比值保持在 strike zone 内。当趋势指向超负荷，你会在身体有感觉之前几天就看到。',
    barMicro: '急性 : 慢性负荷比值',
    zoneLabels: [
      '训练不足——还有加量空间',
      '正处在 strike zone',
      '偏热——该 modify 了',
      '超负荷风险——hold',
    ],
    zoneCopy: '这个比值把最近 7 天的负荷和最近 4 周做对比。Tuwa 的职责就是把它稳在 strike zone 里。',
    legend: ['低于 0.8——训练不足', '0.8–1.3——strike zone', '1.3–1.5——注意', '高于 1.5——危险'],
    foot: '区间名称永远写成文字——颜色只是辅助，从不是信息本身。',
    dashboardAlt: 'Tuwa 主界面：准备状态卡片显示 82 分与各项指标',
    lottieAria: '动画：准备状态表盘，石灰华色指针扫过刻度弧线',
    lottieCaption: '测量出来的准备状态',
    aside: '指针由你自己的历史驱动，而不是人群平均值。同样的输入，同样的答案——引擎是确定性的。',
  },
  statsBand: {
    sectionAria: '关键数字',
    labels: ['个动作收录在动作库中', '分准备状态，每天早晨评出', '天的负荷预测'],
  },
  recovery: {
    kicker: '03 · 恢复',
    heading: '看得懂的准备状态',
    body: '夜间心率变异、睡眠和静息心率会对照你自己的滚动基线打分——不是人群标准——再压缩成一个数字，配上直白的原因。你拿到的不是一块要自己解读的仪表盘，而是一个分数和它背后的为什么。',
    shotAlt: 'Tuwa 恢复界面：心率变异与睡眠趋势对照个人基线',
    quote: '职业队的后方团队——计划、生理数据和一个决定——给自我执教的运动员。',
  },
  logging: {
    kicker: '04 · 记录',
    heading: '组间快速记录',
    body: '1,324 个动作的动作库，放在一个搜索优先的选择器后面。重量、次数、完成——为沾满镁粉的拇指设计的记录方式，让记录跟上训练，而不是拖慢它。',
    movementBankAlt: 'Tuwa 动作库：可搜索的 1,324 个动作目录',
    activeWorkoutAlt: 'Tuwa 进行中训练：实时记录每一组',
    workoutLogAlt: 'Tuwa 训练日志：历史训练记录',
  },
  privacyClose: {
    kicker: '05 · 隐私',
    heading: '你的数据留在你的手机上',
    body: 'Tuwa 只读取 HealthKit——从不写入——原始健康数据也永远不会离开设备。只有合成分数会同步。',
    bullets: [
      'HealthKit 权限为只读',
      '原始心率变异、睡眠和心率样本留在设备本地',
      '只有合成分数会同步到你的账户',
      '需要 iOS 17 或更高版本',
    ],
    cta: '在 App Store 下载',
    ctaNote: '你的计划，变得更安全、更优',
  },
  // 以下为旧版组件（Hero / FeatureGrid / StatsCounter / LandingCTA）遗留文案，
  // 已无页面使用，删除旧组件时一并清理。
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
      desc: '心率变异、静息心率、睡眠、酸痛、比赛临近情况和力量训练历史，会一起移动当天最合适的训练强度区间。',
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
