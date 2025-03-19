<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-blue-950 bg-opacity-75">
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div class="bg-gray-500 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 class="text-2xl font-bold">{{ vehicle.title }}</h2>
          <button @click="close" class="text-white hover:text-gray-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-0">
          <div class="relative w-full bg-gray-100" style="height: 360px">
            <img
              v-if="shipImage"
              :src="shipImage"
              :alt="vehicle.title"
              class="w-full h-full object-contain"
              loading="lazy"
            />
            <div
              class="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/70 to-transparent"
            >
              <div class="flex items-center">
                <img
                  v-if="vehicle.nation.icons.small"
                  :src="vehicle.nation.icons.small"
                  :alt="vehicle.nation.title"
                  class="w-8 h-8 mr-2"
                  loading="lazy"
                />
                <span
                  class="text-lg text-white border py-0.5 px-2 rounded"
                  :style="{
                    borderColor: vehicle.nation.color || '#f0f0f0',
                  }"
                  >{{ vehicle.nation.title }}</span
                >
              </div>
              <h2 class="text-3xl font-bold mt-2 text-white">{{ vehicle.title }}</h2>
              <div class="flex items-center mt-2">
                <img
                  v-if="vehicle.type.icons.default"
                  :src="vehicle.type.icons.default"
                  :alt="vehicle.type.title"
                  class="w-6 h-6 mr-2"
                  loading="lazy"
                />
                <span class="text-lg mr-4 text-white">{{ vehicle.type.title }}</span>
                <span class="bg-blue-950 text-white text-sm font-semibold px-3 py-1 rounded">
                  Уровень {{ vehicle.level }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-2xl font-bold mb-4">Описание</h3>
            <p class="text-gray-700 mb-6">{{ vehicle.description }}</p>

            <h3 class="text-2xl font-bold mb-4">Характеристики</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span class="text-gray-600">Нация:</span>
                  <span class="font-medium">{{ vehicle.nation.title }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Тип:</span>
                  <span class="font-medium">{{ vehicle.type.title }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-gray-600">Уровень:</span>
                  <span class="font-medium">{{ vehicle.level }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import type { Vehicle } from '@/types/types'

const props = defineProps<{
  vehicle: Vehicle
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const shipImage = computed(() => {
  return props.vehicle.icons.large || props.vehicle.icons.medium
})

const close = () => {
  document.body.style.overflow = ''
  emit('close')
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>
