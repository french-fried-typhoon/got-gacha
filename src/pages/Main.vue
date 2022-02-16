<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  useGotAngu1Weapon,
  useGotAngu2Weapon,
  useGotGofuWeapon,
  useGotLongDistanceWeapon,
  useGotRole,
  useGotTachiWeapon,
  decideCommonItem
} from '../composables/gacha'
import GCheckbox from '../components/GCheckbox.vue'
import GBrushStroke from '../components/GBrushStroke.vue'
import GBrushLine from '../components/GBrushLine.vue'
import GBrushLineShort from '../components/GBrushLineShort.vue'
import GTwitterShareButton from '../components/GTwitterShareButton.vue'
import { shuffle } from '../utils/array'

const { locale, t } = useI18n({
  useScope: 'global',
  inheritLocale: false
})

const count = ref(0)

const isRetroMode = ref(false)

const { gotRole, startGacha: startGotRoleGacha } = useGotRole()
const { gotTachiWeapon, startGacha: startGotTachiWeaponGacha } = useGotTachiWeapon()
const { gotLongDistanceWeapon, startGacha: startGotLongDistanceWeaponGacha } = useGotLongDistanceWeapon()
const { gotGofuWeapon, startGacha: startGotGofuWeaponGacha } = useGotGofuWeapon()
const { gotAngu1Weapon, startGacha: startGotAngu1WeaponGacha } = useGotAngu1Weapon()
const { gotAngu2Weapon, startGacha: startGotAngu2WeaponGacha } = useGotAngu2Weapon()

const gachaWeaponItems = [
  gotTachiWeapon,
  gotLongDistanceWeapon,
  gotGofuWeapon,
  gotAngu1Weapon,
  gotAngu2Weapon
]

const weaponGachas: ((gotRole: string, excludeGodItem?: boolean) => void)[] = shuffle([
  startGotTachiWeaponGacha,
  startGotLongDistanceWeaponGacha,
  startGotGofuWeaponGacha,
  startGotAngu1WeaponGacha,
  startGotAngu2WeaponGacha
])

const godItemCount = computed(() => {
  return ([
    gotTachiWeapon.value,
    gotLongDistanceWeapon.value,
    gotGofuWeapon.value,
    gotAngu1Weapon.value,
    gotAngu2Weapon.value
  ]).reduce((sum, weapon) => {
    sum += weapon?.isGodItem ? 1 : 0
    return sum
  }, 0)
})

const result = computed(() => {
  return `
    ${t('shareTitle')} %0a
    ${t('item.class')}: ${gotRole.value?.name ? t('class.' + gotRole.value.name) : t('undecided') } %0a
    ${t('item.katana')}: ${gotTachiWeapon.value?.name ? t('katana.' + getWeaponItemName(gotTachiWeapon.value)) : t('undecided') } %0a
    ${t('item.ranged')}: ${gotLongDistanceWeapon.value?.name ? t('ranged.' + getWeaponItemName(gotLongDistanceWeapon.value)) : t('undecided') } %0a
    ${t('item.charm')}: ${gotGofuWeapon.value?.name ? t('charm.' + getWeaponItemName(gotGofuWeapon.value)) : t('undecided') } %0a
    ${t('item.ghostWeapon1')}: ${gotAngu1Weapon.value?.name ? t('ghostWeapon1.' + getWeaponItemName(gotAngu1Weapon.value)) : t('undecided') } %0a
    ${t('item.ghostWeapon2')}: ${gotAngu2Weapon.value?.name ? t('ghostWeapon2.' + getWeaponItemName(gotAngu2Weapon.value)) : t('undecided') } %0a
  `
})

function startGacha() {
  count.value++

  // Role Gacha
  startGotRoleGacha()

  // Weapon Gacha
  weaponGachas.forEach(gacha => {
    godItemCount.value >= 3
      ? gacha(gotRole.value?.name!, true)
      : gacha(gotRole.value?.name!, false)
  })

  isRetroMode.value && startRetro()
}

function startRetro() {
  setTimeout(() => decideCommonItem(gachaWeaponItems), 13000)
}

function isCommonWeaponItem(weaponItem: any) {
  return weaponItem?.isCommon
}

function getWeaponItemName(weaponItem: any) {
  return isCommonWeaponItem(weaponItem) ? 'common' : weaponItem.name
}
</script>

<template>
  <div class="Main" :class="locale">
    <div class="container">
      <div class="header">
        <h1 class="title">GoT GACHA</h1>
        <p class="lead">A Storm Is Coming</p>
      </div>

      <div class="action">
        <button class="action-button" @click="startGacha">
          <GBrushStroke class="action-brush" />
          <span class="action-text">{{ t('rollGacha') }}</span>
        </button>
        <GCheckbox
          class="action-checkbox"
          :label="t('retroMode')"
          :value="isRetroMode"
          @change="v => isRetroMode = v"
        />
      </div>

      <div class="data">
        <div class="item">
          <p class="label">{{ t('item.class') }}</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotRole?.name ? t(`class.${gotRole?.name}`) : '???' }}
            </p>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.katana') }}</p>
          <transition name="fade" mode="out-in">
            <div :key="count" class="value">
              <div class="value-text">
                {{ gotTachiWeapon?.name ? t(`katana.${gotTachiWeapon?.name}`) : '???' }}
                <GBrushLineShort v-if="isCommonWeaponItem(gotTachiWeapon)" class="strike" />
              </div>
              <transition name="fade">
                <span v-if="isCommonWeaponItem(gotTachiWeapon)" class="common">
                  {{ t('katana.common') }}
                </span>
              </transition>
            </div>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ranged') }}</p>
          <transition name="fade" mode="out-in">
            <div :key="count" class="value">
              <div class="value-text">
                {{ gotLongDistanceWeapon?.name ? t(`ranged.${gotLongDistanceWeapon?.name}`) : '???' }}
                <GBrushLineShort v-if="isCommonWeaponItem(gotLongDistanceWeapon)" class="strike" />
              </div>
              <transition name="fade">
                <span v-if="isCommonWeaponItem(gotLongDistanceWeapon)" class="common">
                  {{ t('ranged.common') }}
                </span>
              </transition>
            </div>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.charm') }}</p>
          <transition name="fade" mode="out-in">
            <div :key="count" class="value">
              <div class="value-text">
                {{ gotGofuWeapon?.name ? t(`charm.${gotGofuWeapon?.name}`) : '???' }}
                <GBrushLineShort v-if="isCommonWeaponItem(gotGofuWeapon)" class="strike" />
              </div>
              <transition name="fade">
                <span v-if="isCommonWeaponItem(gotGofuWeapon)" class="common">
                  {{ t('charm.common') }}
                </span>
              </transition>
            </div>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ghostWeapon1') }}</p>
          <transition name="fade" mode="out-in">
            <div :key="count" class="value">
              <div class="value-text">
                {{ gotAngu1Weapon?.name ? t(`ghostWeapon1.${gotAngu1Weapon?.name}`) : '???' }}
                <GBrushLineShort v-if="isCommonWeaponItem(gotAngu1Weapon)" class="strike" />
              </div>
              <transition name="fade">
                <span v-if="isCommonWeaponItem(gotAngu1Weapon)" class="common">
                  {{ t('ghostWeapon1.common') }}
                </span>
              </transition>
            </div>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ghostWeapon2') }}</p>
          <transition name="fade" mode="out-in">
            <div :key="count" class="value">
              <div class="value-text">
                {{ gotAngu2Weapon?.name ? t(`ghostWeapon2.${gotAngu2Weapon?.name}`) : '???' }}
                <GBrushLineShort v-if="isCommonWeaponItem(gotAngu2Weapon)" class="strike" />
              </div>
              <transition name="fade">
                <span v-if="isCommonWeaponItem(gotAngu2Weapon)" class="common">
                  {{ t('ghostWeapon2.common') }}
                </span>
              </transition>
            </div>
          </transition>
          <GBrushLine class="line" />
        </div>
      </div>

      <div class="sns">
        <GTwitterShareButton
          class="share-button"
          :label="t('shareResult')"
          :text="result"
          url="https://www.giteki.app"
          hashtags="GoTGACHA,GhostofTsushima"
        />
      </div>

      <footer class="footer">
        <p class="footer-text">
          {{ t('createdBy') }}<br>
          {{ t('fft') }}<br>
          <a class="footer-link" href="https://www.youtube.com/channel/UCv4sa8ugMHSuOeM1knvXf5Q" target="_blank">
            {{ t('giteki') }}
          </a>
        </p>
      </footer>

      <div class="locale">
        <RouterLink class="locale-text" to="/" :class="{ inactive: locale === 'ja' }">日本語</RouterLink> |
        <RouterLink class="locale-text" to="/en" :class="{ inactive: locale === 'en' }">English</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.Main {
  padding: 64px 0 96px;

  @media (min-width: 768px) {
    padding-top: 96px;
  }
}

.container {
  margin: 0 auto;
}

.title {
  letter-spacing: 2px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;

  @media (min-width: 768px) {
    line-height: 48px;
    font-size: 48px;
    font-weight: 700;
  }
}

.title-char {
  display: inline-block;
  transition: transform 1s;
}

.lead {
  padding-top: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 768px) {
    padding-top: 12px;
    line-height: 24px;
    font-size: 20px;
  }
}

.action {
  padding-top: 24px;

  @media (min-width: 768px) {
    padding-top: 32px;
  }
}

.action-button {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 512px;
  color: #ffffff;

  &:hover .action-brush {
    fill: #b63424;
  }

  &:active .action-brush {
    fill: #9a291c;
    fill: background-color .1s;
  }

  @media (min-width: 768px) {
    line-height: 48px;
    font-size: 16px;
  }
}

.action-text {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  letter-spacing: 2px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    padding-top: 2px;
    font-size: 20px;
  }
}

.action-brush {
  position: relative;
  transition: fill .25s;
}

.action-checkbox {
  margin: 16px auto;
  width: 100%;
  max-width: 512px;
  text-align: center;
}

.data {
  margin: 32px auto 0;
  max-width: 480px;

  @media (min-width: 768px) {
    margin: 48px auto 0;
  }
}

.item {
  position: relative;
  display: flex;
  padding: 0 32px 12px 32px;

  @media (min-width: 768px) {
    padding: 0 48px 16px 48px;
  }
}

.item + .item {
  padding-top: 8px;

  @media (min-width: 768px) {
    padding-top: 16px;
  }
}

.item:nth-child(1) .value.fade-enter-active { transition-delay: 0; }
.item:nth-child(2) .value.fade-enter-active { transition-delay: 2s; }
.item:nth-child(3) .value.fade-enter-active { transition-delay: 4s; }
.item:nth-child(4) .value.fade-enter-active { transition-delay: 6s; }
.item:nth-child(5) .value.fade-enter-active { transition-delay: 8s; }
.item:nth-child(6) .value.fade-enter-active { transition-delay: 10s; }

.item:nth-child(1) .line { right: -12px; left: -16px; }
.item:nth-child(2) .line { right: -2px; left: -6px; }
.item:nth-child(3) .line { right: 2px; left: -24px; }
.item:nth-child(4) .line { right: -6px; left: 4px; }
.item:nth-child(5) .line { right: 1px; left: -8px; }
.item:nth-child(6) .line { right: -4px; left: 4px; }

.label {
  position: relative;
  flex-shrink: 0;
  padding-right: 24px;
  width: 120px;
  font-weight: 700;
  color: rgba(60, 60, 67, .75);

  @media (min-width: 768px) {
    width: 128px;
  }
}

.ja .label { font-size: 16px; }
.en .label { font-size: 14px; }

@media (min-width: 768px) {
  .ja .label { font-size: 20px; }
  .en .label { font-size: 16px; }
}

.value {
  display: flex;
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.value-text {
  position: relative;
}

.strike {
  position: absolute;
  top: 6px;
  left: -6px;
  height: 10px;
  width: 112%;
  stroke: #000000;
  stroke-width: 5;
}

.common {
  margin-left: 24px;
}

.value.fade-enter-active, .common.fade-enter-active {
  transition: opacity 2s, transform 2s ease, filter 2s ease;
}

.value.fade-leave-active, .common.fade-leave-active {
  transition: opacity .15s, transform .15s, filter .15s;
}

.value.fade-enter-from, .common.fade-enter-from {
  opacity: 0;
  filter: blur(32px);
  transform: translateX(24px) scale(8);
}

.value.fade-leave-to, .common.fade-leave-to {
  opacity: 0;
  filter: blur(16px);
  transform: translateX(-8px) scale(.8);
}

.line {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  fill: #999999;
}

.sns {
  display: flex;
  justify-content: center;
  padding-top: 32px;
  max-width: 480px;
  margin: 0 auto;
}

.locale {
  text-align: center;
  padding: 16px;
}

.locale-text {
  color: rgba(60, 60, 67, .75);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: color .15s;

  &.inactive {
    color: rgba(60, 60, 67, 1);
  }

  &:hover:not(.inactive){
    color: rgba(60, 60, 67, 1);
  }
}

.footer {
  padding-top: 32px;

  @media (min-width: 768px) {
    padding-top: 48px;
  }
}

.footer-text {
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: rgba(60, 60, 67, .75);

  @media (min-width: 768px) {
    line-height: 24px;
    font-size: 16px;
  }
}

.footer-link {
  color: #000000;
  transition: color .25s;

  &:hover {
    color: rgba(60, 60, 67, .75);
  }
}
</style>
