<template>
  <div class="space-y-6">
    <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="filteredVehicles.length > 0">
        <ShipCard
          v-for="(vehicle, index) in paginatedVehicles"
          :key="`${vehicle.title}-${index}`"
          :vehicle="vehicle"
        />
      </template>
      <div v-else class="col-span-full text-center py-12 text-gray-500">
        По выбранным фильтрам кораблей не найдено
      </div>
    </div>

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed, ref, watch } from 'vue'
import type { Vehicle, FilterState } from '@/types/types'
import ShipCard from './ShipCard.vue'
import Pagination from './Pagination.vue'

export default defineComponent({
  name: 'ShipGallery',
  components: {
    ShipCard,
    Pagination,
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
    itemsPerPage: {
      type: Number,
      default: 12,
    },
  },
  setup(props) {
    const currentPage = ref(1)

    const filteredVehicles = computed(() => {
      return props.vehicles.filter((vehicle) => {
        const levelMatch = props.filter.level === null || vehicle.level === props.filter.level
        const nationMatch =
          props.filter.nation === null || vehicle.nation.title === props.filter.nation
        const typeMatch = props.filter.type === null || vehicle.type.title === props.filter.type
        const searchMatch = vehicle.title.toLowerCase().includes(props.filter.search.toLowerCase())

        return levelMatch && nationMatch && typeMatch && searchMatch
      })
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredVehicles.value.length / props.itemsPerPage)
    })

    const paginatedVehicles = computed(() => {
      const startIndex = (currentPage.value - 1) * props.itemsPerPage
      const endIndex = startIndex + props.itemsPerPage
      return filteredVehicles.value.slice(startIndex, endIndex)
    })

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }

    watch(
      () => props.filter,
      () => {
        currentPage.value = 1
      },
      { deep: true },
    )

    return {
      filteredVehicles,
      paginatedVehicles,
      currentPage,
      totalPages,
      handlePageChange,
    }
  },
})
</script>
