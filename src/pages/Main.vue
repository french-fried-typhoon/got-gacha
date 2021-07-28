<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  useGotAngu1Weapon,
  useGotAngu2Weapon,
  useGotGofuWeapon,
  useGotLongDistanceWeapon,
  useGotRole,
  useGotTachiWeapon
} from '../composables/gacha'
import GBrushStroke from '../components/GBrushStroke.vue'
import GBrushLine from '../components/GBrushLine.vue'
import GTwitterShareButton from '../components/GTwitterShareButton.vue'
import { shuffle } from '../utils/array'

const { locale, t } = useI18n({
  useScope: 'global',
  inheritLocale: false
})

const count = ref(0)

const { gotRole, startGacha: startGotRoleGacha } = useGotRole()
const { gotTachiWeapon, startGacha: startGotTachiWeaponGacha } = useGotTachiWeapon()
const { gotLongDistanceWeapon, startGacha: startGotLongDistanceWeaponGacha } = useGotLongDistanceWeapon()
const { gotGofuWeapon, startGacha: startGotGofuWeaponGacha } = useGotGofuWeapon()
const { gotAngu1Weapon, startGacha: startGotAngu1WeaponGacha } = useGotAngu1Weapon()
const { gotAngu2Weapon, startGacha: startGotAngu2WeaponGacha } = useGotAngu2Weapon()

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
    【GoT GACHA 結果】%0a
    役目： ${gotRole.value?.text ?? '未決定' } %0a
    太刀： ${gotTachiWeapon.value?.text ?? '未決定' } %0a
    遠距離： ${gotLongDistanceWeapon.value?.text ?? '未決定' } %0a
    護符： ${gotGofuWeapon.value?.text ?? '未決定' } %0a
    暗具 壱： ${gotAngu1Weapon.value?.text ?? '未決定' } %0a
    暗具 弍： ${gotAngu2Weapon.value?.text ?? '未決定' } %0a
  `
})

function startGacha() {
  count.value++

  // Role Gacha
  startGotRoleGacha()

  // Weapon Gacha
  weaponGachas.forEach(gacha => {
    godItemCount.value >= 2
      ? gacha(gotRole.value?.name!, true)
      : gacha(gotRole.value?.name!, false)
  })
}

function changeLocale(toLocale: 'ja' | 'en') {
  locale.value = toLocale
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
            <p :key="count" class="value">
              {{ gotTachiWeapon?.name ? t(`katana.${gotTachiWeapon?.name}`) : '???' }}
            </p>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ranged') }}</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotLongDistanceWeapon?.name ? t(`ranged.${gotLongDistanceWeapon?.name}`) : '???' }}
            </p>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.charm') }}</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotGofuWeapon?.name ? t(`charm.${gotGofuWeapon?.name}`) : '???' }}
            </p>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ghostWeapon1') }}</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotAngu1Weapon?.name ? t(`ghostWeapon1.${gotAngu1Weapon?.name}`) : '???' }}
            </p>
          </transition>
          <GBrushLine class="line" />
        </div>
        <div class="item">
          <p class="label">{{ t('item.ghostWeapon2') }}</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotAngu2Weapon?.name ? t(`ghostWeapon2.${gotAngu2Weapon?.name}`) : '???' }}
            </p>
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
        <a class="locale-text" :class="{ inactive: locale === 'ja' }" @click="changeLocale('ja')">日本語</a> |
        <a class="locale-text" :class="{ inactive: locale === 'en' }" @click="changeLocale('en')">English</a>
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
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 20px;
  }
}

.value.fade-enter-active {
  transition: opacity 2s, transform 2s ease, filter 2s ease;
}

.value.fade-leave-active {
  transition: opacity .15s, transform .15s, filter .15s;
}

.value.fade-enter-from {
  opacity: 0;
  filter: blur(32px);
  transform: translateX(24px) scale(8);
}

.value.fade-leave-to {
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
