import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vehicle, FilterState } from '@/types/types'
import { fetchVehicles } from '@/services/api'

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = ref<Vehicle[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const filter = ref<FilterState>({
    level: null,
    nation: null,
    type: null,
    search: '',
  })
  const currentPage = ref(1)
  const itemsPerPage = ref(12)
  const selectedShip = ref<Vehicle | null>(null)

  const filteredVehicles = computed(() => {
    return vehicles.value.filter((vehicle) => {
      const levelMatch = filter.value.level === null || vehicle.level === filter.value.level
      const nationMatch =
        filter.value.nation === null || vehicle.nation.title === filter.value.nation
      const typeMatch = filter.value.type === null || vehicle.type.title === filter.value.type
      const searchMatch = vehicle.title.toLowerCase().includes(filter.value.search.toLowerCase())

      return levelMatch && nationMatch && typeMatch && searchMatch
    })
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredVehicles.value.length / itemsPerPage.value)
  })

  const paginatedVehicles = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return filteredVehicles.value.slice(startIndex, endIndex)
  })

  const levels = computed(() => {
    return [...new Set(vehicles.value.map((vehicle) => vehicle.level))].sort((a, b) => a - b)
  })

  const nations = computed(() => {
    return [...new Set(vehicles.value.map((vehicle) => vehicle.nation.title))]
  })

  const types = computed(() => {
    return [...new Set(vehicles.value.map((vehicle) => vehicle.type.title))]
  })

  async function loadVehicles() {
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

  function updateFilter(newFilter: Partial<FilterState>) {
    filter.value = { ...filter.value, ...newFilter }
    currentPage.value = 1 // Сбрасываем страницу при изменении фильтров
  }

  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function selectShip(vehicle: Vehicle) {
    selectedShip.value = vehicle
  }

  function clearSelectedShip() {
    selectedShip.value = null
  }

  return {
    // State
    vehicles,
    loading,
    error,
    filter,
    currentPage,
    itemsPerPage,
    selectedShip,

    // Getters
    filteredVehicles,
    totalPages,
    paginatedVehicles,
    levels,
    nations,
    types,

    // Actions
    loadVehicles,
    updateFilter,
    setPage,
    selectShip,
    clearSelectedShip,
  }
})
