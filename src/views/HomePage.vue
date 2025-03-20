<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header class="bg-blue-950 text-white py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold">Мир Кораблей: Галерея</h1>
        <p class="mt-2">Полная коллекция боевых кораблей</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 flex-grow">
      <template v-if="vehiclesStore.loading">
        <div class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"
          ></div>
          <p class="mt-2">Загрузка данных о кораблях...</p>
        </div>
      </template>

      <template v-else-if="vehiclesStore.error">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{{ vehiclesStore.error }}</p>
          <button
            @click="vehiclesStore.loadVehicles"
            class="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Попробовать снова
          </button>
        </div>
      </template>

      <template v-else>
        <FilterPanel />
        <ShipGallery />
      </template>
    </main>

    <footer class="bg-gray-100 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 Мир Кораблей. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useVehiclesStore } from '@/stores/vehicles'
import FilterPanel from '@/components/FilterPanel.vue'
import ShipGallery from '@/components/ShipGallery.vue'

const vehiclesStore = useVehiclesStore()

onMounted(() => {
  vehiclesStore.loadVehicles()
})
</script>
