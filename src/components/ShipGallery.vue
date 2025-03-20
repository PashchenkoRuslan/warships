<template>
  <div class="space-y-6">
    <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <template v-if="vehiclesStore.filteredVehicles.length > 0">
        <ShipCard
          v-for="(vehicle, index) in vehiclesStore.paginatedVehicles"
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
      :current-page="vehiclesStore.currentPage"
      :total-pages="vehiclesStore.totalPages"
      @page-change="vehiclesStore.setPage"
    />

    <ShipModal
      v-if="vehiclesStore.selectedShip"
      :vehicle="vehiclesStore.selectedShip"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import type { Vehicle } from '@/types/types'
import { useVehiclesStore } from '@/stores/vehicles'

import ShipCard from './ShipCard.vue'
import ShipModal from './ShipModal.vue'
import Pagination from './Pagination.vue'

const vehiclesStore = useVehiclesStore()
const isModalOpen = ref(false)

const openModal = (vehicle: Vehicle) => {
  vehiclesStore.selectShip(vehicle)
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false

  setTimeout(() => {
    vehiclesStore.clearSelectedShip()
  }, 300)
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
