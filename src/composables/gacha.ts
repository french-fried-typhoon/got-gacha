import { Ref } from 'vue'

export interface GachaItem {
  name: string
  text: string
  probability: number
}

export interface GachaWeaponItem extends GachaItem {
  isGodItem: boolean
  belongRole: GotRole[]
}

function gacha<T extends GachaItem>(items: T[]): T | null {
  const rand = Math.floor(Math.random()*100) + 1 // 1~100
  let current = 0
  const sum = items.reduce((sum, item) => {
    sum += item.probability
    return sum
  }, 0)
  for (let i=0; i<items.length; i++) {
    const adjusted = items[i].probability/sum * 100
    current += adjusted
    if (current >= rand) {
      return items[i]
    }
  }
  return null
}


/**
 * 役目
 * - 侍 samurai
 * - 弓取り hunter
 * - 牢人 ronin
 * - 刺客 assassin
 */
export type GotRole = 'samurai' | 'hunter' | 'ronin' | 'assassin'
export interface GotRoleGachaItem extends GachaItem {
  name: GotRole
}
const allGotRole: GotRole[] = ['samurai', 'hunter', 'ronin', 'assassin']

const gotRoleGachaItems: GotRoleGachaItem[]  = [
  { name: 'samurai', text: '侍', probability: 25 },
  { name: 'hunter', text: '弓取', probability: 25 },
  { name: 'ronin', text: '牢人', probability: 25 },
  { name: 'assassin', text: '刺客', probability: 25 }
]

export function useGotRole() {
  const gotRole: Ref<GotRoleGachaItem | null> = ref(null)
  function startGacha() {
    gotRole.value = gacha(gotRoleGachaItems)
  }
  return { gotRole, startGacha}
}

/**
 * 太刀
 * - 達人の太刀 mastersKatana
 * - 正宗の至宝 masamunesEdge
 * - 岩斬刀 stoneStriker
 * - 義経の腕 yoshitsunesHand
 * - 討魔の剣 demonCutter
 * - 水の太刀 waterKatana
 * - 月の太刀 moonKatana
 * - 風の太刀 windKatana
 * - 石の太刀 stoneKatana
 */
export type GotTachiWeapon = 'mastersKatana' | 'masamunesEdge' | 'stoneStriker' | 'yoshitsunesHand'
  | 'demonCutter' | 'waterKatana' | 'moonKatana' | 'windKatana' | 'stoneKatana'
export interface GotTachiWeaponGachaItem extends GachaWeaponItem {
  name: GotTachiWeapon
}

const gotTachiWeaponGachaItems: GotTachiWeaponGachaItem[]  = [
  { name: 'mastersKatana', text: '達人の太刀', probability: 10, isGodItem: true, belongRole: allGotRole },
  { name: 'masamunesEdge', text: '正宗の至宝', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'stoneStriker', text: '岩斬刀', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'yoshitsunesHand', text: '義経の腕', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'demonCutter', text: '討魔の剣', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'waterKatana', text: '水の太刀', probability: 8, isGodItem: false, belongRole: allGotRole },
  { name: 'moonKatana', text: '月の太刀', probability: 8, isGodItem: false, belongRole: allGotRole },
  { name: 'windKatana', text: '風の太刀', probability: 16, isGodItem: false, belongRole: allGotRole },
  { name: 'stoneKatana', text: '石の太刀', probability: 16, isGodItem: false, belongRole: allGotRole }
]

export function useGotTachiWeapon() {
  const gotTachiWeapon: Ref<GotTachiWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem = false) {
    gotTachiWeapon.value = excludeGodItem
      ? gacha(gotTachiWeaponGachaItems
          .filter(item => !item.isGodItem && item.belongRole.includes(gotRole))
        )
      : gacha(gotTachiWeaponGachaItems
          .filter(item => item.belongRole.includes(gotRole))
        )
  }
  return { gotTachiWeapon, startGacha }
}

/**
 * 遠距離武器
 * - 浮遊の弓 theWeightlessSpirit
 * - 飛石の弓 stoneSkippingBow
 * - 禁制の火薬 forbiddenMedicine
 * - 天降る牙 heavensSting
 * - 半弓 halfBow
 * - 吹き針 blowgun
 * - 腰袋 bombPack
 * - 長弓 longBow
 */
export type GotLongDistanceWeapon = 'theWeightlessSpirit' | 'stoneSkippingBow' | 'forbiddenMedicine' | 'heavensSting'
  | 'halfBow' | 'blowgun' | 'bombPack' | 'longBow'
export interface GotLongDistanceWeaponGachaItem extends GachaWeaponItem {
  name: GotLongDistanceWeapon
}

const gotLongDistanceWeaponGachaItems: GotLongDistanceWeaponGachaItem[]  = [
  { name: 'theWeightlessSpirit', text: '浮遊の弓', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'stoneSkippingBow', text: '飛石の弓', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'forbiddenMedicine', text: '禁制の火薬', probability: 8, isGodItem: true, belongRole: ['ronin', 'assassin'] },
  { name: 'heavensSting', text: '天降る牙', probability: 15, isGodItem: true, belongRole: ['ronin', 'assassin'] },
  { name: 'halfBow', text: '半弓', probability: 15, isGodItem: true, belongRole: allGotRole },
  { name: 'blowgun', text: '吹き針', probability: 15, isGodItem: false, belongRole: ['ronin', 'assassin'] },
  { name: 'bombPack', text: '腰袋', probability: 13, isGodItem: false, belongRole: ['ronin', 'assassin'] },
  { name: 'longBow', text: '長弓', probability: 13, isGodItem: false, belongRole: allGotRole }
]

export function useGotLongDistanceWeapon() {
  const gotLongDistanceWeapon: Ref<GotLongDistanceWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem = false) {
    gotLongDistanceWeapon.value = excludeGodItem
      ? gacha(gotLongDistanceWeaponGachaItems
          .filter(item => !item.isGodItem && item.belongRole.includes(gotRole))
        )
      : gacha(gotLongDistanceWeaponGachaItems
          .filter(item => item.belongRole.includes(gotRole))
        )
  }
  return { gotLongDistanceWeapon, startGacha }
}

/**
 * 護符
 * - 円浄の嘆き enjosRemorse
 * - 不撓不屈 lastBreath
 * - 鋼の宿怨 sacredIron
 * - 弁慶の庇護 benkeisLastStand
 * - 将軍の守り shogunsFortitune
 * - 守りの護符 defenseCharm
 * - 利益の護符 utilityCharm
 * - 刺客の護符 assassinCharm
 * - 攻めの護符 meleeCharm
 * - 侍の護符 samuraiCharm
 * - 遠距離の護符 rangedCharm
 * - 牢人の護符 roninCharm
 * - 隠密の護符 stealthCharm
 * - 弓取の護符 hunterCharm
 */
export type GotGofuWeapon = 'enjosRemorse' | 'lastBreath' | 'sacredIron' | 'benkeisLastStand'
  | 'shogunsFortitune' | 'defenseCharm' | 'utilityCharm' | 'assassinCharm' | 'meleeCharm'
  | 'samuraiCharm' | 'rangedCharm' | 'roninCharm' | 'stealthCharm' | 'hunterCharm'
export interface GotGofuWeaponGachaItem extends GachaWeaponItem {
  name: GotGofuWeapon
}

const gotGofuWeaponGachaItems: GotGofuWeaponGachaItem[]  = [
  { name: 'enjosRemorse', text: '円浄の嘆き', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'lastBreath', text: '不撓不屈', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'sacredIron', text: '鋼の宿怨', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'benkeisLastStand', text: '弁慶の庇護', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'shogunsFortitune', text: '将軍の守り', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'defenseCharm', text: '守りの護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'utilityCharm', text: '利益の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'assassinCharm', text: '刺客の護符', probability: 5, isGodItem: false, belongRole: ['assassin'] },
  { name: 'meleeCharm', text: '攻めの護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'samuraiCharm', text: '侍の護符', probability: 5, isGodItem: false, belongRole: ['samurai'] },
  { name: 'rangedCharm', text: '遠距離の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'roninCharm', text: '牢人の護符', probability: 5, isGodItem: false, belongRole: ['ronin'] },
  { name: 'stealthCharm', text: '隠密の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'hunterCharm', text: '弓取の護符', probability: 5, isGodItem: false, belongRole: ['hunter'] }
]

export function useGotGofuWeapon() {
  const gotGofuWeapon: Ref<GotGofuWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem = false) {
    gotGofuWeapon.value = excludeGodItem
      ? gacha(gotGofuWeaponGachaItems
          .filter(item => !item.isGodItem && item.belongRole.includes(gotRole))
        )
      : gacha(gotGofuWeaponGachaItems
          .filter(item => item.belongRole.includes(gotRole))
        )
  }
  return { gotGofuWeapon, startGacha }
}

/**
 * 暗具 壱
 * - くない・改 spiritKunai
 * - 卯麦御前の餞 ladySanjosSurprise
 * - 天の癒し theTouchOfHeaven
 * - くない kunai
 * - 泥投げ dirtThrow
 * - とりもち玉 stickyBomb
 */
export type GotAngu1Weapon = 'spiritKunai' | 'ladySanjosSurprise' | 'theTouchOfHeaven' | 'kunai'
  | 'dirtThrow' | 'stickyBomb'
export interface GotAngu1WeaponGachaItem extends GachaWeaponItem {
  name: GotAngu1Weapon
}

const gotAngu1WeaponGachaItems: GotAngu1WeaponGachaItem[]  = [
  { name: 'spiritKunai', text: 'くない・改', probability: 10, isGodItem: true, belongRole: allGotRole },
  { name: 'ladySanjosSurprise', text: '卯麦御前の餞', probability: 20, isGodItem: true, belongRole: allGotRole },
  { name: 'theTouchOfHeaven', text: '天の癒し', probability: 20, isGodItem: true, belongRole: allGotRole },
  { name: 'kunai', text: 'くない', probability: 20, isGodItem: false, belongRole: allGotRole },
  { name: 'dirtThrow', text: '泥投げ', probability: 15, isGodItem: false, belongRole: allGotRole },
  { name: 'stickyBomb', text: 'とりもち玉', probability: 15, isGodItem: false, belongRole: allGotRole }
]


export function useGotAngu1Weapon() {
  const gotAngu1Weapon: Ref<GotAngu1WeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem = false) {
    gotAngu1Weapon.value = excludeGodItem
      ? gacha(gotAngu1WeaponGachaItems
          .filter(item => !item.isGodItem && item.belongRole.includes(gotRole))
        )
      : gacha(gotAngu1WeaponGachaItems
          .filter(item => item.belongRole.includes(gotRole))
        )
  }
  return { gotAngu1Weapon, startGacha }
}

/**
 * 暗具 弍
 * - 矢形の霧 mistOfYagata
 * - 妖の種 demonSeeds
 * - 堅二の酒 kenjisSharedBrew
 * - 回復薬 healingGourd
 * - まきびし caltrops
 * - 煙玉 smokeBomb
 */
export type GotAngu2Weapon = 'mistOfYagata' | 'demonSeeds' | 'kenjisSharedBrew' | 'healingGourd'
  | 'caltrops' | 'smokeBomb'
export interface GotAngu2WeaponGachaItem extends GachaWeaponItem {
  name: GotAngu2Weapon
}

const gotAngu2WeaponGachaItems: GotAngu2WeaponGachaItem[]  = [
  { name: 'mistOfYagata', text: '矢形の霧', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'demonSeeds', text: '妖の種', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'kenjisSharedBrew', text: '堅二の酒', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'healingGourd', text: '回復薬', probability: 15, isGodItem: false, belongRole: allGotRole },
  { name: 'caltrops', text: 'まきびし', probability: 18, isGodItem: false, belongRole: allGotRole },
  { name: 'smokeBomb', text: '煙玉', probability: 13, isGodItem: false, belongRole: allGotRole }
]

export function useGotAngu2Weapon() {
  const gotAngu2Weapon: Ref<GotAngu2WeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem = false) {
    gotAngu2Weapon.value = excludeGodItem
      ? gacha(gotAngu2WeaponGachaItems
          .filter(item => !item.isGodItem && item.belongRole.includes(gotRole))
        )
      : gacha(gotAngu2WeaponGachaItems
          .filter(item => item.belongRole.includes(gotRole))
        )
  }
  return { gotAngu2Weapon, startGacha }
}
