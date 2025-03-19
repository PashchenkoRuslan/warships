<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <template v-if="filteredVehicles.length > 0">
      <ShipCard
        v-for="(vehicle, index) in filteredVehicles"
        :key="`${vehicle.title}-${index}`"
        :vehicle="vehicle"
      />
    </template>
    <div v-else class="col-span-full text-center py-12 text-gray-500">
      По выбранным фильтрам кораблей не найдено
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import type { Vehicle, FilterState } from '@/types/types'
import ShipCard from './ShipCard.vue'

export default defineComponent({
  name: 'ShipGallery',
  components: {
    ShipCard,
  },
  props: {
    vehicles: {
      type: Array as PropType<Vehicle[]>,
      required: true,
    },
    filter: {
      type: Object as PropType<FilterState>,
      required: true,
    },
  },
  setup(props) {
    const filteredVehicles = computed(() => {
      return props.vehicles.filter((vehicle) => {
        const levelMatch = props.filter.level === null || vehicle.level === props.filter.level
        const nationMatch =
          props.filter.nation === null || vehicle.nation.name === props.filter.nation
        const typeMatch = props.filter.type === null || vehicle.type.name === props.filter.type

        return levelMatch && nationMatch && typeMatch
      })
    })

    return {
      filteredVehicles,
    }
  },
})
</script>
