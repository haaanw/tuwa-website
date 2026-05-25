import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: '隐私政策',
    lastUpdated: '2026年3月27日',
    description: 'Tuwa——训练负荷与恢复管理应用的隐私政策。',
  },
  disclaimer: {
    text: '此为翻译版本。英文版为具有法律效力的正式文件。',
  },
  intro: {
    p1: 'Tuwa（"本应用"）由 Hanwen Ma 开发。本政策说明应用收集哪些数据、如何使用，以及您的相关权利。',
  },
  whatWeCollect: {
    heading: '我们收集哪些数据',
    dataYouProvide: {
      heading: '您提供的数据',
      items: [
        {
          label: '账户信息',
          description: '电子邮件地址和显示名称（用于身份验证和教练-运动员配对）',
        },
        {
          label: '训练记录',
          description: '您输入的动作、组数、次数、重量、主观疲劳感、训练时长及备注',
        },
        {
          label: '身体状态自评',
          description: '您自主填写的睡眠质量、疲劳感、精力水平及压力评分',
        },
      ],
    },
    healthKitData: {
      heading: '来自 HealthKit 的数据（只读）',
      items: [
        '心率变异性（HRV）',
        '静息心率',
        '睡眠时长',
        '体温',
        '最大摄氧量',
        '运动心率',
      ],
    },
    healthKitNote: 'Tuwa 从不向 HealthKit 写入数据。HealthKit 访问权限为可选项，需您明确授权。',
    healthKitNoteStrong: '从不写入',
    dataWeCompute: {
      heading: '我们计算的数据',
      p1: '恢复评分、ACWR（急性与慢性训练负荷比）、训练压力指数及个人最佳成绩，均在您的设备上根据上述数据计算得出。',
    },
  },
  howDataIsStored: {
    heading: '数据存储方式',
    items: [
      {
        label: '存储在您的设备上',
        description: '所有数据均通过 SwiftData 存储在本地。应用可完全离线使用。',
      },
      {
        label: '存储在云端',
        description: '综合评分（恢复评分、训练负荷快照、身体状态评分、训练课概要及个人最佳成绩）会同步至 Supabase（托管于 AWS），以支持教练-运动员功能和多设备访问。',
      },
      {
        label: '原始 HealthKit 数据永不上传。',
        description: '仅同步从 HealthKit 数据中计算得出的综合评分。',
      },
    ],
  },
  coachAthleteSharing: {
    heading: '教练-运动员数据共享',
    intro: '若您与教练建立连接，教练可查看：',
    items: [
      '您的恢复评分和 ACWR 趋势',
      '训练课程概要',
      '个人最佳成绩',
      '身体状态评分',
    ],
    outro: '教练无法访问您的原始 HealthKit 数据，您随时可以解除与教练的连接。',
  },
  thirdPartyServices: {
    heading: '第三方服务',
    services: [
      {
        label: 'Supabase',
        description: '（身份验证与云同步）',
        url: 'https://supabase.com/privacy',
        urlDisplay: 'supabase.com/privacy',
      },
      {
        label: 'RevenueCat',
        description: '（订阅管理）',
        url: 'https://www.revenuecat.com/privacy',
        urlDisplay: 'revenuecat.com/privacy',
      },
    ],
    outro: '我们不使用任何广告网络、数据分析追踪器或第三方数据中介。',
  },
  dataRetention: {
    heading: '数据保留与删除',
    intro: '只要您的账户存在，我们即保留您的数据。如需删除所有数据，请：',
    steps: [
      '在应用中前往"个人资料 → 退出登录"',
      '通过以下邮件联系我们，申请从服务器完全删除您的账户和数据',
    ],
    stepOneStrong: '个人资料 → 退出登录',
    outro: '删除后，您的所有数据——包括训练记录、评分及教练关系——将从我们的服务器上永久移除。',
  },
  yourRights: {
    heading: '您的权利',
    intro: '您有权：',
    items: [
      '访问我们存储的您的数据',
      '要求更正不准确的数据',
      '要求删除您的账户及所有相关数据',
      '随时通过 iOS 设置 → 隐私与安全 → 健康撤回 HealthKit 权限',
    ],
  },
  children: {
    heading: '儿童',
    p1: 'Tuwa 不面向 13 岁以下儿童。我们不会故意收集儿童的数据。',
  },
  changes: {
    heading: '政策变更',
    p1: '我们可能会不时更新本政策。变更内容将连同更新日期一并发布至本页面。',
  },
  contact: {
    heading: '联系我们',
    intro: '如有隐私方面的疑问或数据删除请求：',
    emailLabel: '电子邮件',
    email: 'hanwenma09@gmail.com',
  },
};

export default privacy;
