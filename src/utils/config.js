const OPTIONS = [
  {
    show: false,
    checked: [],
    code: 'SKILL',
    name: '技能',
    group: [
      {label: '死灵法师技能', value: 'NEC_SKILL'},
      {label: '圣骑士技能', value: 'PAL_SKILL'},
      {label: '亚马逊技能', value: 'AMA_SKILL'},
      {label: '法师技能', value: 'SOR_SKILL'},
      {label: '野蛮人技能', value: 'BAR_SKILL'}
    ]
  },
  {
    show: false,
    checked: [],
    code: 'RES',
    name: '抗性',
    group: [
      {label: '全部抗性', value: 'R'},
      {label: '火焰抗性', value: 'FR'},
      {label: '冰冷抗性', value: 'CR'},
      {label: '毒素抗性', value: 'PR'},
      {label: '闪电抗性', value: 'LR'}
    ]
  },
  {
    show: false,
    checked: [],
    code: 'ATTR',
    name: '属性',
    group: [
      {label: '力量', value: 'STR'},
      {label: '敏捷', value: 'DEX'},
      {label: '生命', value: 'LIFE'},
      {label: '魔法', value: 'MANA'}
    ]
  },
  {
    show: false,
    checked: [],
    code: 'EFFECT',
    name: '特效',
    group: [
      {label: '生命偷取', value: 'LL'},
      {label: '法力偷取', value: 'LM'}
    ]
  }
]

module.exports = {
  OPTIONS
}
