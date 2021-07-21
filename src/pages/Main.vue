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
}

.lead {
  padding-top: 4px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.action {
  padding-top: 16px;
}

.action-button {
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  padding: 0 24px;
  max-width: 168px;
  letter-spacing: 1px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
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
}

.data {
  margin: 24px auto 0;
  border: 1px solid rgba(60, 60, 67, .24);
  border-radius: 8px;
  padding: 32px;
  max-width: 288px;
}

.item {
  display: flex;
}

.item + .item {
  padding-top: 8px;
}

.item:nth-child(1) .value { transition-delay: 0s; }
.item:nth-child(2) .value { transition-delay: .15s; }
.item:nth-child(3) .value { transition-delay: .3s; }
.item:nth-child(4) .value { transition-delay: .45s; }
.item:nth-child(5) .value { transition-delay: .6s; }
.item:nth-child(6) .value { transition-delay: .75s; }

.label {
  position: relative;
  flex-shrink: 0;
  padding-right: 24px;
  width: 80px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(60, 60, 67, .75);
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
  font-weight: 500;
}

.value.fade-enter-active {
  transition: opacity .75s, transform .75s, filter .75s;
}

.value.fade-leave-active {
  transition: opacity .15s, transform .15s, filter .15s;
}

.value.fade-enter-from {
  opacity: 0;
  filter: blur(32px);
  transform: translateX(16px) scale(1.5);
}

.value.fade-leave-to {
  opacity: 0;
  filter: blur(16px);
  transform: translateX(-8px) scale(.8);
}

.footer {
  padding-top: 16px;
}

.footer-text {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: rgba(60, 60, 67, .75);
}
</style>
