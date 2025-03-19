<template>
  <div class="space-y-6">
    <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="filteredVehicles.length > 0">
        <ShipCard
          v-for="(vehicle, index) in paginatedVehicles"
          :key="`${vehicle.title}-${index}`"
          :vehicle="vehicle"
          @select-ship="openModal"
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

    <!-- Ship Modal -->
    <ShipModal
      v-if="selectedShip"
      :vehicle="selectedShip"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import type { Vehicle, FilterState } from '@/types/types'

import ShipCard from './ShipCard.vue'
import ShipModal from './ShipModal.vue'
import Pagination from './Pagination.vue'

const props = defineProps<{
  vehicles: Vehicle[]
  filter: FilterState
  itemsPerPage?: number
}>()

const itemsPerPage = props.itemsPerPage ?? 12

const currentPage = ref(1)
const selectedShip = ref<Vehicle | null>(null)
const isModalOpen = ref(false)

const filteredVehicles = computed(() => {
  return props.vehicles.filter((vehicle) => {
    const levelMatch = props.filter.level === null || vehicle.level === props.filter.level
    const nationMatch = props.filter.nation === null || vehicle.nation.title === props.filter.nation
    const typeMatch = props.filter.type === null || vehicle.type.title === props.filter.type
    const searchMatch = vehicle.title.toLowerCase().includes(props.filter.search.toLowerCase())

    return levelMatch && nationMatch && typeMatch && searchMatch
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredVehicles.value.length / itemsPerPage)
})

const paginatedVehicles = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredVehicles.value.slice(startIndex, endIndex)
})

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const openModal = (vehicle: Vehicle) => {
  selectedShip.value = vehicle
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''

  setTimeout(() => {
    selectedShip.value = null
  }, 300)
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

watch(
  () => props.filter,
  () => {
    currentPage.value = 1
  },
  { deep: true },
)
</script>
