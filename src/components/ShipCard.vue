<template>
  <div
    class="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
  >
    <div
      class="h-48 bg-cover bg-center"
      :style="{
        backgroundImage: `url(${vehicle.icons.medium})`,
        backgroundColor: vehicle.nation.color || '#f0f0f0',
      }"
    ></div>
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-lg truncate">{{ vehicle.title }}</h3>
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Ур. {{ vehicle.level }}
        </span>
      </div>

      <div class="flex items-center mb-3">
        <div class="flex items-center mr-4">
          <img
            v-if="vehicle.nation.icons.small"
            :src="vehicle.nation.icons.small"
            :alt="vehicle.nation.title"
            class="w-5 h-5 mr-1"
          />
          <span class="text-sm">{{ vehicle.nation.title }}</span>
        </div>

        <div class="flex items-center">
          <img
            v-if="vehicle.type.icons.default"
            :src="vehicle.type.icons.default"
            :alt="vehicle.type.title"
            class="w-5 h-5 mr-1"
          />
          <span class="text-sm">{{ vehicle.type.title }}</span>
        </div>
      </div>

      <p class="text-sm text-gray-600 line-clamp-3">{{ vehicle.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Vehicle } from '@/types/types';

export default defineComponent({
  name: 'ShipCard',
  props: {
    vehicle: {
      type: Object as PropType<Vehicle>,
      required: true,
    },
  },
})
</script>
