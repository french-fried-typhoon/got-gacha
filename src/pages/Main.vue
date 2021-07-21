<script setup lang="ts">
import { ref } from 'vue'
import { useGotAngu1Weapon, useGotAngu2Weapon, useGotGofuWeapon, useGotLongDistanceWeapon, useGotRole, useGotTachiWeapon } from '../composables/gacha'
import { shuffle } from '../utils/array'

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
</script>

<template>
  <div class="Main">
    <div class="container">
      <div class="header">
        <h1 class="title">GOT GACHA</h1>
        <p class="lead">A STORM IS COMING</p>
      </div>

      <div class="action">
        <button class="action-button" @click="startGacha">
          START GACHA
        </button>
      </div>

      <div class="data">
        <div class="item">
          <p class="label">役目</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotRole?.text ?? '???' }}
            </p>
          </transition>
        </div>
        <div class="item">
          <p class="label">太刀</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotTachiWeapon?.text ?? '???' }}
            </p>
          </transition>
        </div>
        <div class="item">
          <p class="label">遠距離</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotLongDistanceWeapon?.text ?? '???' }}
            </p>
          </transition>
        </div>
        <div class="item">
          <p class="label">護符</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotGofuWeapon?.text ?? '???' }}
            </p>
          </transition>
        </div>
        <div class="item">
          <p class="label">暗具1</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotAngu1Weapon?.text ?? '???' }}
            </p>
          </transition>
        </div>
        <div class="item">
          <p class="label">暗具2</p>
          <transition name="fade" mode="out-in">
            <p :key="count" class="value">
              {{ gotAngu2Weapon?.text ?? '???' }}
            </p>
          </transition>
        </div>
      </div>

      <footer class="footer">
        <p class="footer-text">Created by French Fried Typhoon</p>
      </footer>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.Main {
  padding: 64px 32px 96px;
}

.container {
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;

  @media (min-width: 768px) {
    line-height: 48px;
    font-size: 48px;
    font-weight: 700;
  }
}

.lead {
  padding-top: 4px;
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
  padding-top: 16px;

  @media (min-width: 768px) {
    padding-top: 24px;
  }
}

.action-button {
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  padding: 0 24px;
  max-width: 192px;
  letter-spacing: 1px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background-color: #b63424;
  transition: background-color .25s;

  &:hover {
    background-color: #aa3021;
  }

  &:active {
    background-color: #9a291c;
    transition: background-color .1s;
  }

  @media (min-width: 768px) {
    padding: 0 32px;
    max-width: 256px;
    line-height: 48px;
    font-size: 16px;
  }
}

.data {
  margin: 24px auto 0;
  border: 1px solid rgba(60, 60, 67, .24);
  border-radius: 8px;
  padding: 32px;
  max-width: 288px;

  @media (min-width: 768px) {
    margin: 32px auto 0;
    padding: 48px 64px;
    max-width: 392px;
  }
}

.item {
  display: flex;
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

.label {
  position: relative;
  flex-shrink: 0;
  padding-right: 24px;
  width: 80px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(60, 60, 67, .75);

  @media (min-width: 768px) {
    font-size: 20px;
    width: 96px;
  }
}

.label::after {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  margin-right: 12px;
  color: rgba(60, 60, 67, .75);
  content: ":";
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
  filter: blur(48px);
  transform: translateX(24px) scale(2);
}

.value.fade-leave-to {
  opacity: 0;
  filter: blur(16px);
  transform: translateX(-8px) scale(.8);
}

.footer {
  padding-top: 16px;

  @media (min-width: 768px) {
    padding-top: 24px;
  }
}

.footer-text {
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: rgba(60, 60, 67, .75);

  @media (min-width: 768px) {
    font-size: 14px;
  }
}
</style>
