<template>
  <div
    @click="$emit('select-ship', vehicle)"
    class="block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white cursor-pointer"
  >
    <div class="relative h-48 bg-gray-100">
      <img
        :src="shipImage"
        :alt="vehicle.title"
        class="h-full w-full object-cover object-center"
        loading="lazy"
        @error="handleImageError"
      />
      <div
        class="absolute top-2 right-2 bg-blue-100 text-blue-950 text-xs font-semibold px-2.5 py-0.5 rounded"
      >
        Ур. {{ vehicle.level }}
      </div>
    </div>
    <div class="p-4">
      <div class="mb-2">
        <h3 class="font-bold text-lg truncate">{{ vehicle.title }}</h3>
      </div>

      <div class="flex items-center mb-3">
        <div class="flex items-center mr-4">
          <img
            v-if="vehicle.nation.icons.small"
            :src="vehicle.nation.icons.small"
            :alt="vehicle.nation.title"
            class="w-5 h-5 mr-1"
            loading="lazy"
          />
          <span
            :style="{
              borderColor: vehicle.nation.color || '#f0f0f0',
            }"
            class="text-sm py-0.5 px-2 rounded border"
            >{{ vehicle.nation.title }}</span
          >
        </div>

        <div class="flex items-center">
          <img
            v-if="vehicle.type.icons.default"
            :src="vehicle.type.icons.default"
            :alt="vehicle.type.title"
            class="w-5 h-5 mr-1"
            loading="lazy"
          />
          <span class="text-sm">{{ vehicle.type.title }}</span>
        </div>
      </div>

      <p class="text-sm text-gray-600 line-clamp-3">{{ vehicle.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Vehicle } from '@/types/types'

const props = defineProps<{
  vehicle: Vehicle
}>()

defineEmits<{
  (e: 'select-ship', vehicle: Vehicle): void
}>()

const imageError = ref(false)

const shipImage = computed(() => {
  if (imageError.value) {
    return '/placeholder-ship.png'
  }
  return props.vehicle.icons.medium
})

const handleImageError = () => {
  imageError.value = true
}
</script>
