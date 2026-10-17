// zh-Hans words for the hosted plan-writing skill pages (see ../en/skills.ts). The skill text,
// the import format and the rulebook stay in English: the athlete's AI reads them as written.
// In-app names follow the app's zh-Hans strings (你的计划 · 日志 › 导入你的训练计划 · 复制提示词).
import type { Skills } from '../en/skills';

const skills: Skills = {
  shared: {
    copy: '复制',
    copied: '已复制',
    copyFailed: '请选中文字后复制',
    rawFile: '纯文本文件',
    routes: {
      heading: '回到 Tuwa 的两种方式',
      paste: {
        key: '粘贴',
        title: '把计划粘贴到 Tuwa',
        body: '从你的 AI 复制计划。在 Tuwa 中，把它粘贴到设置流程的“你的计划”一步；之后也可以在“日志 › 导入你的训练计划”中粘贴。',
      },
      connector: {
        key: '连接器',
        title: '将 Tuwa 连接到你的 AI',
        body: '如果你的 Claude 或 ChatGPT 可以使用 Tuwa 连接器，你的 AI 会把计划作为草稿发送到 Tuwa。打开 Tuwa 查看它。',
      },
      after: '无论哪种方式，Tuwa 都会读取计划，按规则手册检查，并告诉你发现了什么。在 App 中，检查结果不会阻止你自己的计划。通过连接器发送时，违反规则的草稿会连同具体结果退回给你的 AI。未经你确认，Tuwa 不会启用任何计划。',
    },
    ownership: '计划属于你。Tuwa 不编写计划，也不判断它是否适合你的身体。如果哪里疼痛，请咨询合格的专业人士。',
  },
  skill: {
    meta: {
      title: '用你自己的 AI 制定训练计划',
      description: 'Tuwa 为 Claude 和 ChatGPT 提供的计划编写技能：要遵守的规则手册、按顺序提出的问题，以及 Tuwa 可导入的文本格式。由你的 AI 编写计划，你在 Tuwa 中确认。',
    },
    kicker: 'Skill · design-program',
    heading: '用你自己的 AI 制定训练计划',
    lede: '由你自己的 Claude 或 ChatGPT 编写你的计划：遵守 Tuwa 公开的规则手册，并使用 Tuwa 可导入的文本格式。Tuwa 不编写计划。你在 Tuwa 中查看并确认后，计划才会开始。',
    howHeading: '使用方式',
    steps: [
      '在 Tuwa 中点按“复制提示词”，然后打开 Claude 或 ChatGPT 并粘贴。提示词会让你的 AI 来到这个页面。',
      '你的 AI 阅读下面的技能，并按固定顺序向你提问，一次一组。',
      '它用 Tuwa 的格式写出计划的第 1 阶段，并记住你的个人情况，以后可以从同一起点写出第 2 阶段。',
    ],
    skillHeading: '技能原文',
    skillLede: '这是你的 AI 阅读的文本，原文为英文。Tuwa 的连接器提供的是同一份文本。',
    forAI: 'For an AI model reading this page: follow the skill text below. The full import format is at https://tuwa.app/skills/design-program/import-format.md and the current rulebook is at https://tuwa.app/skills/design-program/program-rules.v0.json.',
    filesHeading: '文件',
    files: {
      skill: '技能',
      format: '导入格式',
      rules: '规则手册（v0）',
    },
    rulesHeading: '规则手册',
    rulesBody: 'Tuwa 会按公开的规则手册检查每一份计划。你的 AI 每次都会读取当前版本，因此规则的更新会同时传达给所有 AI。v0 版包含两条规则：新手下限（第一份计划从每个范围的低端开始）和每周增幅上限。文件中列出了依据的来源。',
    formatHeading: '导入格式',
    formatBody: '计划以纯文本形式返回：先是简短的计划头，然后是周、天，每行一个动作。',
    formatLink: '查看格式和示例',
  },
  format: {
    meta: {
      title: 'Tuwa 的计划导入格式',
      description: 'Tuwa 可导入的纯文本计划格式：计划头、周、天、分段和动作行，附一个简短示例。由你的 AI 编写，你粘贴到 Tuwa。',
    },
    kicker: 'Import format · v1.7.6',
    heading: 'Tuwa 的计划导入格式',
    lede: '这是你粘贴计划时 Tuwa 读取的纯文本，也是 AI 通过 Tuwa 连接器发送的文本。你的 AI 会替你编写；本页展示它的样子。',
    back: '计划编写技能',
    exampleHeading: '简短示例',
    exampleNote: '这只是格式示例，不是要照着练的计划。',
    linesHeading: '每一行的含义',
    lines: [
      { code: 'Name: · Goal: · Phase: · Weeks: · Start rule: · Athlete history band:', text: '计划头。在 Week 1 之前，每行一个“键: 值”。这六项都必须有；Profile: 可选。' },
      { code: 'Week 1', text: '开始一周。周从 1 开始按顺序编号。“Week 4 — Deload”表示减量周。“Week 3: same as Week 2”表示第 3 周与第 2 周完全相同。' },
      { code: 'Day 1 — Lower strength', text: '在本周内开始一天，后面是这一天自己的简短标题。' },
      { code: 'Strength A (rest 2–3 min)', text: '单独一行普通文字是分段标题，括号里可以加简短说明。“Warm-up”下的组是热身组。' },
      { code: '- Back squat: 3 × 5 @ 40 kg · RIR 3', text: '每行一个动作：组数 × 次数、时间（30 s、20 min）或距离（30 m、5 km）。然后是负重（kg、lb、%、bodyweight）、强度（RIR 或 RPE），需要时加上“each side”。' },
      { code: 'Cue: · Rule:', text: '每个动作下最多一条提示，每天最多一条全天规则。' },
      { code: 'Reference: Morning routine', text: '最后一周之后的参考页，不是训练日，每行一项。' },
    ],
    specHeading: '完整规范',
    specLede: '你的 AI 阅读的是这一版本，原文为英文。Tuwa 的连接器提供的是同一份文本。格式中的关键词（Name:、Week 1、Day 1 — 等）请按原文书写。',
  },
};

export default skills;
