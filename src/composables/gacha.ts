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
 * - 侍 Samurai
 * - 弓取り Yumitori
 * - 牢人 Rohnin
 * - 刺客 Shikaku
 */
export type GotRole = 'Samurai' | 'Yumitori' | 'Rohnin' | 'Shikaku'
export interface GotRoleGachaItem extends GachaItem {
  name: GotRole
}
const allGotRole: GotRole[] = ['Samurai', 'Yumitori', 'Rohnin', 'Shikaku']

const gotRoleGachaItems: GotRoleGachaItem[]  = [
  { name: 'Samurai', text: '侍', probability: 30 },
  { name: 'Yumitori', text: '弓取', probability: 20 },
  { name: 'Rohnin', text: '牢人', probability: 20 },
  { name: 'Shikaku', text: '刺客', probability: 30 }
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
 * - 達人の太刀 MasterSword
 * - 正宗の至宝 MasamuneTreasures
 * - 岩斬刀 RockSword
 * - 義経の腕 YoshitsuneArms
 * - 討魔の剣 BusterDevilSword
 * - 水の太刀 WaterSword
 * - 月の太刀 MoonSword
 * - 風の太刀 WindSword
 * - 石の太刀 StoneSword
 */
export type GotTachiWeapon = 'MasterSword' | 'MasamuneTreasures' | 'RockSword' | 'YoshitsuneArms' 
  | 'BusterDevilSword' | 'WaterSword' | 'MoonSword' | 'WindSword' | 'StoneSword'
export interface GotTachiWeaponGachaItem extends GachaWeaponItem {
  name: GotTachiWeapon
}

const gotTachiWeaponGachaItems: GotTachiWeaponGachaItem[]  = [
  { name: 'MasterSword', text: '達人の太刀', probability: 10, isGodItem: true, belongRole: allGotRole },
  { name: 'MasamuneTreasures', text: '正宗の至宝', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'RockSword', text: '岩斬刀', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'YoshitsuneArms', text: '義経の腕', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'BusterDevilSword', text: '討魔の剣', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'WaterSword', text: '水の太刀', probability: 8, isGodItem: false, belongRole: allGotRole },
  { name: 'MoonSword', text: '月の太刀', probability: 8, isGodItem: false, belongRole: allGotRole },
  { name: 'WindSword', text: '風の太刀', probability: 16, isGodItem: false, belongRole: allGotRole },
  { name: 'StoneSword', text: '石の太刀', probability: 16, isGodItem: false, belongRole: allGotRole }
]

export function useGotTachiWeapon() {
  const gotTachiWeapon: Ref<GotTachiWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem: boolean = false) {
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
 * - 浮遊の弓 FuyuBow
 * - 飛石の弓 HisekiBow
 * - 禁制の火薬 KinseiGunpowder
 * - 天降る牙 TenfuruFang
 * - 半弓 SmallBow
 * - 吹き針 Blowgun
 * - 腰袋 WaistBag
 * - 長弓 LongBow
 */
export type GotLongDistanceWeapon = 'FuyuBow' | 'HisekiBow' | 'KinseiGunpowder' | 'TenfuruFang' 
  | 'SmallBow' | 'Blowgun' | 'WaistBag' | 'LongBow'
export interface GotLongDistanceWeaponGachaItem extends GachaWeaponItem {
  name: GotLongDistanceWeapon
}

const gotLongDistanceWeaponGachaItems: GotLongDistanceWeaponGachaItem[]  = [
  { name: 'FuyuBow', text: '浮遊の弓', probability: 13, isGodItem: true, belongRole: allGotRole },
  { name: 'HisekiBow', text: '飛石の弓', probability: 8, isGodItem: true, belongRole: allGotRole },
  { name: 'KinseiGunpowder', text: '禁制の火薬', probability: 8, isGodItem: true, belongRole: ['Rohnin', 'Shikaku'] },
  { name: 'TenfuruFang', text: '天降る牙', probability: 15, isGodItem: true, belongRole: ['Rohnin', 'Shikaku'] },
  { name: 'SmallBow', text: '半弓', probability: 15, isGodItem: true, belongRole: allGotRole },
  { name: 'Blowgun', text: '吹き針', probability: 15, isGodItem: false, belongRole: ['Rohnin', 'Shikaku'] },
  { name: 'WaistBag', text: '腰袋', probability: 13, isGodItem: false, belongRole: ['Rohnin', 'Shikaku'] },
  { name: 'LongBow', text: '長弓', probability: 13, isGodItem: false, belongRole: allGotRole }
]

export function useGotLongDistanceWeapon() {
  const gotLongDistanceWeapon: Ref<GotLongDistanceWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem: boolean = false) {
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
 * - 円浄の嘆き EnjouMouring
 * - 不撓不屈 Indomitable
 * - 鋼の宿怨 SteelInnGrudge
 * - 弁慶の護符 BenkeiGofu
 * - 将軍の守り ShogunDefense
 * - 守りの護符 DefenseGofu
 * - 利益の護符 BenefitGofu
 * - 刺客の護符 ThugGofu
 * - 攻めの護符 OffenseGofu
 * - 侍の護符 SamuraiGofu
 * - 遠距離の護符 LongDistanceGofu
 * - 牢人の護符 RohninGofu
 * - 隠密の護符 OnmitsuGofu
 * - 弓取の護符 YumitoriGofu
 */
export type GotGofuWeapon = 'EnjouMouring' | 'Indomitable' | 'SteelInnGrudge' | 'BenkeiGofu' 
  | 'ShogunDefense' | 'DefenseGofu' | 'BenefitGofu' | 'ThugGofu' | 'OffenseGofu'
  | 'SamuraiGofu' | 'LongDistanceGofu' | 'RohninGofu' | 'OnmitsuGofu' | 'YumitoriGofu'
export interface GotGofuWeaponGachaItem extends GachaWeaponItem {
  name: GotGofuWeapon
}

const gotGofuWeaponGachaItems: GotGofuWeaponGachaItem[]  = [
  { name: 'EnjouMouring', text: '円浄の嘆き', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'Indomitable', text: '不撓不屈', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'SteelInnGrudge', text: '鋼の宿怨', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'BenkeiGofu', text: '弁慶の護符', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'ShogunDefense', text: '将軍の守り', probability: 7, isGodItem: true, belongRole: allGotRole },
  { name: 'DefenseGofu', text: '守りの護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'BenefitGofu', text: '利益の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'ThugGofu', text: '刺客の護符', probability: 5, isGodItem: false, belongRole: ['Shikaku'] },
  { name: 'OffenseGofu', text: '攻めの護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'SamuraiGofu', text: '侍の護符', probability: 5, isGodItem: false, belongRole: ['Samurai'] },
  { name: 'LongDistanceGofu', text: '遠距離の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'RohninGofu', text: '牢人の護符', probability: 5, isGodItem: false, belongRole: ['Rohnin'] },
  { name: 'OnmitsuGofu', text: '隠密の護符', probability: 9, isGodItem: false, belongRole: allGotRole },
  { name: 'YumitoriGofu', text: '弓取の護符', probability: 5, isGodItem: false, belongRole: ['Yumitori'] }
]

export function useGotGofuWeapon() {
  const gotGofuWeapon: Ref<GotGofuWeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem: boolean = false) {
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
 * - くない・改 KunaiKai
 * - 卯麦御前の餞 UmugigozenFarewell
 * - 天の癒し HeavenHealing
 * - くない Kunai
 * - 泥投げ MudThrowing
 * - とりもち玉 BirdlimeBall
 */
export type GotAngu1Weapon = 'KunaiKai' | 'UmugigozenFarewell' | 'HeavenHealing' | 'Kunai' 
  | 'MudThrowing' | 'BirdlimeBall'
export interface GotAngu1WeaponGachaItem extends GachaWeaponItem {
  name: GotAngu1Weapon
}

const gotAngu1WeaponGachaItems: GotAngu1WeaponGachaItem[]  = [
  { name: 'KunaiKai', text: 'くない・改', probability: 10, isGodItem: true, belongRole: allGotRole },
  { name: 'UmugigozenFarewell', text: '卯麦御前の餞', probability: 20, isGodItem: true, belongRole: allGotRole },
  { name: 'HeavenHealing', text: '天の癒し', probability: 20, isGodItem: true, belongRole: allGotRole },
  { name: 'Kunai', text: 'くない', probability: 20, isGodItem: false, belongRole: allGotRole },
  { name: 'MudThrowing', text: '泥投げ', probability: 15, isGodItem: false, belongRole: allGotRole },
  { name: 'BirdlimeBall', text: 'とりもち玉', probability: 15, isGodItem: false, belongRole: allGotRole }
]


export function useGotAngu1Weapon() {
  const gotAngu1Weapon: Ref<GotAngu1WeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem: boolean = false) {
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
 * - 矢形の霧 YagataFog
 * - 妖の種 YoukaiSeed
 * - 堅二の酒 KenjiSake
 * - 回復薬 Portion
 * - まきびし Makibishi
 * - 煙玉 SmokeBall
 */
export type GotAngu2Weapon = 'YagataFog' | 'YoukaiSeed' | 'KenjiSake' | 'Portion' 
  | 'Makibishi' | 'SmokeBall'
export interface GotAngu2WeaponGachaItem extends GachaWeaponItem {
  name: GotAngu2Weapon
}

const gotAngu2WeaponGachaItems: GotAngu2WeaponGachaItem[]  = [
  { name: 'YagataFog', text: '矢形の霧', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'YoukaiSeed', text: '妖の種', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'KenjiSake', text: '堅二の酒', probability: 18, isGodItem: true, belongRole: allGotRole },
  { name: 'Portion', text: '回復薬', probability: 15, isGodItem: false, belongRole: allGotRole },
  { name: 'Makibishi', text: 'まきびし', probability: 18, isGodItem: false, belongRole: allGotRole },
  { name: 'SmokeBall', text: '煙玉', probability: 13, isGodItem: false, belongRole: allGotRole }
]

export function useGotAngu2Weapon() {
  const gotAngu2Weapon: Ref<GotAngu2WeaponGachaItem | null> = ref(null)
  function startGacha(gotRole: GotRole, excludeGodItem: boolean = false) {
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
