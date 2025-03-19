<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-black text-white py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold">Мир Кораблей: Галерея</h1>
        <p class="mt-2">Полная коллекция боевых кораблей</p>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <template v-if="loading">
        <div class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"
          ></div>
          <p class="mt-2">Загрузка данных о кораблях...</p>
        </div>
      </template>

      <template v-else-if="error">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{{ error }}</p>
          <button
            @click="loadVehicles"
            class="mt-2 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          >
            Попробовать снова
          </button>
        </div>
      </template>

      <template v-else>
        <FilterPanel :vehicles="vehicles" v-model="filter" />
        <ShipGallery :vehicles="vehicles" :filter="filter" />
      </template>
    </main>

    <footer class="bg-gray-100 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 Мир Кораблей. Все права защищены.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import type { Vehicle, FilterState } from '@/types/types'
import { fetchVehicles } from '@/services/api'
import FilterPanel from '@/components/FilterPanel.vue'
import ShipGallery from '@/components/ShipGallery.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    FilterPanel,
    ShipGallery,
  },
  setup() {
    const vehicles = ref<Vehicle[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)
    const filter = ref<FilterState>({
      level: null,
      nation: null,
      type: null,
    })

    const loadVehicles = async () => {
      try {
        loading.value = true
        error.value = null
        const data = await fetchVehicles()
        vehicles.value = data.vehicles
      } catch (err) {
        error.value = 'Не удалось загрузить данные о кораблях. Пожалуйста, повторите попытку позже.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadVehicles()
    })

    return {
      vehicles,
      loading,
      error,
      filter,
      loadVehicles,
    }
  },
})
</script>
