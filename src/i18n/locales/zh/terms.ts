import type { Terms } from '../en/terms';

const terms: Terms = {
  meta: {
    title: '服务条款',
    lastUpdated: '2026年9月24日',
    description: 'Tuwa——训练负荷与恢复管理应用的服务条款。',
  },
  disclaimer: {
    text: '此为翻译版本。英文版为具有法律效力的正式文件。',
  },
  intro: {
    p1: '本服务条款（"条款"）规范您对 Hanwen Ma（"我们"）开发的 Tuwa 移动应用（"本应用"）的使用。下载、安装或使用本应用即表示您同意接受本条款约束。',
  },
  useOfApp: {
    heading: '1. 应用使用',
    p1: 'Tuwa 是一款训练负荷与恢复管理工具。您可将其用于个人体能追踪。您同意：',
    items: [
      '在创建账户时提供准确信息',
      '妥善保管您的登录凭据',
      '依照所有适用法律使用本应用',
    ],
  },
  accounts: {
    heading: '2. 账户',
    p1: '使用 Tuwa 需要注册账户。您对账户下的所有活动负责。如您怀疑存在未经授权的访问，请立即联系我们。',
  },
  subscriptions: {
    heading: '3. 订阅',
    p1: 'Tuwa 提供免费方案与付费自动续期订阅 Tuwa Pro。可选订阅时长及其价格会在购买前于应用内及 App Store 产品页面显示。付费订阅通过 Apple App Store 计费，并由 RevenueCat 管理。',
    items: [
      {
        label: '计费',
        description: '确认购买时，费用将从您的 Apple 账户扣除。订阅将按相同价格与相同时长自动续期，除非您在当前周期结束前至少 24 小时取消；续期费用将在当前周期结束前 24 小时内扣除。',
      },
      {
        label: '取消',
        description: '您可随时通过设备的"设置 > Apple ID > 订阅"取消。取消将在当前计费周期结束时生效。',
      },
      {
        label: '退款',
        description: '退款申请依据 Apple App Store 政策由 Apple 处理。',
      },
      {
        label: '价格变更',
        description: '我们可能会调整订阅价格。价格上涨前我们将提前通知您。',
      },
    ],
  },
  healthKitData: {
    heading: '4. HealthKit 数据',
    p1: 'Tuwa 在您明确授权的前提下读取 Apple HealthKit 中的健康数据。我们从不向 HealthKit 写入数据。原始 HealthKit 数据保留在您的设备上——仅计算得出的综合评分会同步至我们的服务器。您可随时通过 iOS 设置撤回 HealthKit 访问权限。',
  },
  acceptableUse: {
    heading: '5. 可接受使用',
    p1: '您同意不得：',
    items: [
      '对本应用进行逆向工程、反编译或篡改',
      '将本应用用于任何违法目的',
      '尝试未经授权访问我们的服务器或其他用户的数据',
      '转售或再分发本应用或其内容',
    ],
  },
  intellectualProperty: {
    heading: '6. 知识产权',
    p1: '本应用，包括其设计、代码和内容，归 Hanwen Ma 所有。您使用本应用不授予您任何所有权。',
  },
  disclaimerSection: {
    heading: '7. 免责声明',
    p1: 'Tuwa 提供的训练负荷和恢复数据仅供参考，不构成医疗建议。在做出任何健康或训练决策前，请务必咨询合格的医疗专业人员。对于因使用本应用引发的受伤、过度训练或健康问题，我们概不负责。',
    informationalStrong: '仅供参考',
  },
  limitationOfLiability: {
    heading: '8. 责任限制',
    p1: '在法律允许的最大范围内，我们不对因您使用本应用而产生的任何间接、附带或后果性损害承担责任。我们的总责任以您在索赔前 12 个月内为本应用支付的金额为限。',
  },
  termination: {
    heading: '9. 终止',
    p1: '如您违反本条款，我们可能暂停或终止您的账户。您可随时在应用中前往「个人资料 → 删除账户」，或通过联系我们删除账户。',
  },
  changes: {
    heading: '10. 条款变更',
    p1: '我们可能会不时更新本条款。变更内容将连同更新日期一并发布至本页面。在变更后继续使用本应用即视为接受变更。',
  },
  appStore: {
    heading: '11. Apple App Store 条款',
    p1: 'Tuwa 通过 Apple App Store 分发。以下条款适用于该分发方式；如与上文任何内容冲突，以以下条款为准：',
    items: [
      '本协议仅在您与 Hanwen Ma 之间订立，Apple 并非本协议一方。Apple 不对本应用或其内容负责。',
      '您获得一项不可转让的许可，可在您拥有或控制的任何 Apple 品牌产品上按 App Store 使用规则使用本应用；此外，与您关联的其他账户亦可通过家人共享或批量购买访问本应用。',
      'Hanwen Ma 独自负责维护与技术支持。Apple 没有提供任何维护或支持服务的义务。',
      'Hanwen Ma 独自承担任何明示或默示的产品保证责任。若本应用不符合适用的保证，您可通知 Apple，Apple 将向您退还本应用的购买价款。在法律允许的最大范围内，Apple 对本应用不承担任何其他保证义务。',
      '对于与本应用相关的任何主张，包括产品责任主张、本应用不符合法律或监管要求的主张，以及依据消费者保护、隐私或类似法规提出的主张，均由 Hanwen Ma 而非 Apple 负责处理。',
      '如第三方主张本应用或您对本应用的使用侵犯其知识产权，由 Hanwen Ma 独自负责该主张的调查、抗辩、和解与了结。',
      '您声明：您不位于受美国政府禁运或被美国政府认定为"支持恐怖主义"的国家，且未被列入任何美国政府的禁止或受限方名单。',
      'Apple 及其子公司为本协议的第三方受益人；在您接受本条款后，Apple 有权作为第三方受益人对您强制执行本协议。',
    ],
  },
  contact: {
    heading: '12. 联系我们',
    intro: '如对本条款有任何疑问：',
    emailLabel: '电子邮件',
    email: 'support@tuwa.app',
  },
};

export default terms;
