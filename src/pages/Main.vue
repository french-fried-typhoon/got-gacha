<script setup lang="ts">
import GButton from '~/components/parts/GButton.vue'
import { useGotAngu1Weapon, useGotAngu2Weapon, useGotGofuWeapon, useGotLongDistanceWeapon, useGotRole, useGotTachiWeapon } from '../composables/gacha'
import { shuffle } from '../utils/array'

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
    <GButton
      text="Start"
      @click="startGacha"
    />
    <div>役目: {{ gotRole?.text }}</div>
    <div>太刀: {{ gotTachiWeapon?.text }}</div>
    <div>遠距離: {{ gotLongDistanceWeapon?.text }}</div>
    <div>護符: {{ gotGofuWeapon?.text }}</div>
    <div>暗具1: {{ gotAngu1Weapon?.text }}</div>
    <div>暗具2: {{ gotAngu2Weapon?.text }}</div>
  </div>
</template>

<style lang="postcss" scoped>
.Main {
  width: 80%;
  margin: 64px auto 0px;
}
</style>
