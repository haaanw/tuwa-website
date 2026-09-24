import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: '隐私政策',
    lastUpdated: '2026年9月24日',
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
          description: '电子邮件地址和显示名称（用于身份验证）',
        },
        {
          label: '训练记录',
          description: '您输入的动作、组数、次数、重量、主观疲劳感、训练时长及备注',
        },
        {
          label: '身体状态自评',
          description: '您自主填写的睡眠质量、疲劳感、精力水平及压力评分',
        },
        {
          label: '训练描述',
          description: '当您用一句话记录训练时，所打出的那段文字（详见下方"训练文本解析"）',
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
        description: '综合评分（恢复评分、训练负荷快照、身体状态评分、训练课概要及个人最佳成绩）会同步至 Supabase（托管于 AWS），以支持多设备访问。',
      },
      {
        label: '原始 HealthKit 数据永不上传。',
        description: '仅同步从 HealthKit 数据中计算得出的综合评分。',
      },
    ],
  },
  // 2026-09-24 更新，对应 app v1.7.4：训练语音记录已下线（HAN 裁定）。现在走
  // 这条通路的只有运动员打字提交的训练描述；上文的 HealthKit 条款没有任何
  // 改变，此处再次声明，避免二者被混淆。
  voiceParsing: {
    heading: '训练文本解析',
    p1: '当您通过打字描述来记录一次训练时，这段文字会发送到我们的解析服务，生成一份组数、次数与重量的草稿供您核对。',
    p2: '这段文字由第三方语言模型服务商（DeepSeek）代表我们处理。请求需要已登录的账户，并按用户设有每日额度上限。',
    items: [
      {
        label: '会发送什么',
        description: '仅有您打出的训练描述，以及您使用的单位。',
      },
      {
        label: '绝不会发送什么',
        description: '不含任何 HealthKit 数据，不含恢复或准备度评分，也不含电子邮件地址——只有您打出的文字。',
      },
      {
        label: '这是可选的',
        description: '手动录入可以完成同样的事。如果您从不打字描述训练，就不会有任何内容发送到解析服务。',
      },
    ],
    p3: '解析结果会作为草稿返回到您的设备。在您确认之前，不会有任何内容保存到训练记录中。',
    healthKitReminder: '这与上文的 HealthKit 条款相互独立，而该条款没有改变：原始 HealthKit 数据从不上传，无论是上传到本服务还是任何其他服务。',
    healthKitReminderStrong: '原始 HealthKit 数据从不上传',
  },
  // 2026-09-24 为 app v1.7.4 新增。导入训练计划是与上方训练记录完全独立的
  // 功能。自 v1.7.4 起，应用不再使用麦克风或语音识别——导入训练计划只能粘贴
  // 文字，或导入 PDF/照片，文字在设备上提取。
  programImport: {
    heading: '训练计划导入',
    p1: '您可以通过粘贴文字，或导入 PDF 或照片（文字会在您的设备上提取），把训练计划导入 Tuwa。',
    items: [
      {
        label: '会发送什么',
        description: '您粘贴的计划文字，或者从您设备上的 PDF 或照片中提取的文字——仅有文字。不发送任何录音、HealthKit 数据或评分。',
      },
      {
        label: '由谁处理',
        description: '第三方语言模型服务商（OpenAI）代表我们处理这段文字，将其转换为结构化的训练计划。',
      },
      {
        label: '您会得到什么',
        description: '一份计划草稿会返回到您的设备供您核对。在您确认之前，不会保存任何内容。',
      },
    ],
  },
  dataSharing: {
    heading: '数据共享',
    p1: 'Tuwa 不会将您的训练或恢复数据共享给教练、其他用户、广告商或数据经纪商。若日后新增共享功能，将需要您的明确同意。',
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
      {
        label: 'DeepSeek',
        description: '（将训练描述解析为组数的语言模型——仅文字）',
        url: 'https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html',
        urlDisplay: 'deepseek.com 隐私政策',
      },
      {
        label: 'OpenAI',
        description: '（解析导入训练计划的语言模型——仅文字）',
        url: 'https://openai.com/policies/privacy-policy/',
        urlDisplay: 'openai.com 隐私政策',
      },
    ],
    outro: '我们不使用任何广告网络、数据分析追踪器或第三方数据中介。',
  },
  dataRetention: {
    heading: '数据保留与删除',
    intro: '只要您的账户存在，我们即保留您的数据。如需删除您的账户及全部数据，请：',
    steps: [
      '在应用中前往"档案 → 删除账号"',
    ],
    outro: '此操作会从我们的数据库中删除您的账号及其数据——包括训练记录及评分。如有其他隐私相关请求，请通过下方邮箱联系我们。',
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
    email: 'support@tuwa.app',
  },
};

export default privacy;
