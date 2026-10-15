import type { OAuthConsent } from '../en/oauth-consent';

// The "reads" / "never" lines match the app's zh-Hans AI connector sheet (aiConnector.*).
const oauthConsent: OAuthConsent = {
  meta: {
    title: '连接你的 AI 应用',
    description: '登录 Tuwa，允许或拒绝请求连接的 AI 应用。',
  },
  loading: '正在检查请求…',
  signIn: {
    heading: '登录 Tuwa',
    lede: '一个 AI 应用请求连接你的 Tuwa 账号。请使用你在 Tuwa 应用中的登录方式。',
    apple: '通过 Apple 继续',
    google: '通过 Google 继续',
    or: '或',
    emailLabel: '邮箱',
    emailHint: '请使用你的 Tuwa 账号邮箱。我们会给你发送一次性验证码。',
    sendCode: '发送验证码',
    codeLabel: '邮件中的验证码',
    codeSentTo: '验证码已发送至 {email}。',
    linkNote: '如果邮件里是一个链接，请在这个浏览器中打开它。',
    verify: '登录',
    otherEmail: '使用其他邮箱',
  },
  consent: {
    heading: '{client} 请求连接你的 Tuwa 账号',
    returnTo: '做出选择后，你将返回 {host}。',
    readsKey: '可以读取',
    reads:
      '你的准备度和睡眠评分（仅综合评分——原始 Apple 健康读数从不离开你的手机）、当天的决定、你记录的训练和训练负荷、你的个人纪录，以及你的计划——它的进度位置和文本。',
    sendsKey: '可以发送',
    sends: '一份计划草稿。在你于 Tuwa 中启用之前，它一直是草稿。',
    cannotKey: '不能',
    cannot: '更改你的计划、记录训练或填写你的每日自评。',
    neverKey: '从不发送',
    never: '不发送任何来自 Apple 健康的数值——没有心率、HRV、睡眠时长、体温或周期数据。',
    accountKey: '登录信息',
    accountEmail: '你的账号邮箱',
    accountName: '你的账号名称',
    accountPhone: '你的手机号',
    account: '{client} 还会收到{items}。',
    providerKey: '你的 AI 服务商',
    provider: '它按其自身条款处理它读取的内容。',
    inApp: '只有你也在应用中允许连接器后，Tuwa 才会提供你的数据：档案 › 法律信息 › AI 连接器。',
    revoke: '你可以随时在 AI 应用的连接器设置中断开连接，或在 Tuwa › 档案 › 法律信息 › AI 连接器中关闭连接器。',
    signedInAs: '当前登录：{email}。',
    signOut: '不是你？退出登录',
    allow: '允许',
    deny: '拒绝',
  },
  done: {
    allowed: '已允许。正在返回 {client}…',
    denied: '已拒绝。正在返回 {client}…',
    manual: '没有跳转？继续',
  },
  errors: {
    missing: '这个页面会在你于 AI 应用中添加 Tuwa 连接器时打开。请回到你的 AI 应用重新开始。',
    expired: '这个请求已过期或已被使用。请回到你的 AI 应用重新开始。',
    generic: '出了点问题。请回到你的 AI 应用重新开始。',
    noAccount: '没有 Tuwa 账号使用这个邮箱。请先在 Tuwa 应用中创建账号，或通过 Apple 或 Google 登录。',
    badEmail: '请输入有效的邮箱。',
    badCode: '验证码无效。请检查，或重新发送验证码。',
    rateLimit: '尝试次数过多。请等一分钟后再试。',
    signInFailed: '登录没有完成。请重试。',
  },
};

export default oauthConsent;
