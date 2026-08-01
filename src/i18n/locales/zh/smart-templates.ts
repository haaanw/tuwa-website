import type { SmartTemplates } from '../en/smart-templates';

const smartTemplates: SmartTemplates = {
  meta: {
    title: '输入你的计划',
    description:
      '把你自己的力量训练计划带进 Tuwa，让当天准备度建议调整顶组，而不是替你改写训练编排。',
  },
  hero: {
    outcomeStatement: '你的计划仍然属于你',
    hookLine: 'Tuwa 不写课表。它读取你自己安排的力量训练，再帮你判断今天该用多大剂量执行。',
    screenshotAlt: 'Tuwa 应用显示正在进行的 Bodyweight Circuit 训练课，包含课次设置、动作列表和训练控件',
  },
  howItWorks: {
    heading: '工作原理',
    p1: '搭建你本来就认可的力量训练：技术课后的下肢力量、野球夜之间的上肢训练，或围绕联赛日程安排的两天模板。每堂课都可以保留目标组数、次数区间、计划顶组重量、RPE 上限和备注。',
    prescriptionToExecutionHeading: '从你的计划到今天的判断',
    p2: '打开计划训练时，Tuwa 已经有足够结构来回答真正有用的问题：今天这个剂量还合适吗？它可以建议按计划顶组执行、给出调整后的数字，或把训练改成有上限的 microdose，而不是凭空生成另一堂课。',
    p3: '实际训练会与目标并排记录：组数、次数、重量、RPE 和 RIR。这条"计划 vs 实际"轨迹，让 Tuwa 能把你的编排和下一次准备度建议连接起来。',
    autoregulationHeading: '建议，而不是命令',
    p4: '计划训练是起点，不是命令。当比赛临近、HRV、睡眠、酸痛或近期负荷提示风险上升时，Tuwa 会建议更小剂量并说明原因。你确认调整，或继续执行原计划。',
    connectHeading: '没有聊天教练，也不生成课表',
    p5: '把 Tuwa 当作你自己计划背后的运动科学后方团队。它位于计划和执行之间：在力量房里足够安静，在当天调整时又足够具体。',
  },
  realProgramming: {
    heading: '为篮球加力量训练的真实一周而设计',
    p1: '你的训练周并不干净。一场高强度比赛、一次很晚的野球和下肢力量，可能都挤在 72 小时内。Tuwa 保留你的计划，同时用生理状态判断今天的剂量是否还在 strike zone 内。',
    p2: '比赛在 48 小时内时，力量训练的语境会改变。Tuwa 不会假装这堂课不存在，而是可以建议 microdose：保留动作模式，限制顶组，跳过回退组，让腿为比赛保持新鲜。',
    p3: '模板会随时间保留，因此你能复盘实际训练如何偏离原计划。如果高等级比赛后深蹲下降，而卧推保持正常，计划、日志和疲劳背景已经连接在一起。',
  },
};

export default smartTemplates;
