<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow mb-6">
    <h3 class="font-bold text-lg mb-3">Фильтры</h3>
    <div class="flex flex-wrap gap-4 justify-between">
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col">
          <label for="level-filter" class="mb-1 text-sm">Уровень</label>
          <select
            id="level-filter"
            class="border rounded p-2"
            :value="vehiclesStore.filter.level === null ? 'all' : vehiclesStore.filter.level"
            @change="handleLevelChange"
          >
            <option value="all">Все уровни</option>
            <option v-for="level in vehiclesStore.levels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="nation-filter" class="mb-1 text-sm">Нация</label>
          <select
            id="nation-filter"
            class="border rounded p-2"
            :value="vehiclesStore.filter.nation === null ? 'all' : vehiclesStore.filter.nation"
            @change="handleNationChange"
          >
            <option value="all">Все нации</option>
            <option v-for="nation in vehiclesStore.nations" :key="nation" :value="nation">
              {{ nation }}
            </option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="type-filter" class="mb-1 text-sm">Класс</label>
          <select
            id="type-filter"
            class="border rounded p-2"
            :value="vehiclesStore.filter.type === null ? 'all' : vehiclesStore.filter.type"
            @change="handleTypeChange"
          >
            <option value="all">Все классы</option>
            <option v-for="type in vehiclesStore.types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="search-filter" class="mb-1 text-sm">Поиск по названию</label>
        <input
          id="search-filter"
          class="border rounded p-2"
          placeholder="Поиск..."
          type="text"
          :value="vehiclesStore.filter.search"
          @input="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
import { useVehiclesStore } from '@/stores/vehicles'

const vehiclesStore = useVehiclesStore()

const handleLevelChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : parseInt(target.value)
  vehiclesStore.updateFilter({ level: value })
}

const handleNationChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : target.value
  vehiclesStore.updateFilter({ nation: value })
}

const handleTypeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : target.value
  vehiclesStore.updateFilter({ type: value })
}

const handleSearch = debounce((e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value
  vehiclesStore.updateFilter({ search: value })
}, 300)
</script>
