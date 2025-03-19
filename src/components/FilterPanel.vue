<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow mb-6">
    <h3 class="font-bold text-lg mb-3">Фильтры</h3>
    <div class="flex flex-wrap justify-between">
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col">
          <label for="level-filter" class="mb-1 text-sm">Уровень</label>
          <select
            id="level-filter"
            class="border rounded p-2"
            :value="modelValue.level === null ? 'all' : modelValue.level"
            @change="handleLevelChange"
          >
            <option value="all">Все уровни</option>
            <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="nation-filter" class="mb-1 text-sm">Нация</label>
          <select
            id="nation-filter"
            class="border rounded p-2"
            :value="modelValue.nation === null ? 'all' : modelValue.nation"
            @change="handleNationChange"
          >
            <option value="all">Все нации</option>
            <option v-for="nation in nations" :key="nation" :value="nation">{{ nation }}</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label for="type-filter" class="mb-1 text-sm">Класс</label>
          <select
            id="type-filter"
            class="border rounded p-2"
            :value="modelValue.type === null ? 'all' : modelValue.type"
            @change="handleTypeChange"
          >
            <option value="all">Все классы</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
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
          :value="modelValue.search"
          @input="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import debounce from 'lodash.debounce'
import type { Vehicle, FilterState } from '@/types/types'

const props = defineProps<{
  vehicles: Vehicle[]
  modelValue: FilterState
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterState): void
}>()

const levels = computed(() => {
  return [...new Set(props.vehicles.map((vehicle) => vehicle.level))].sort((a, b) => a - b)
})

const nations = computed(() => {
  return [...new Set(props.vehicles.map((vehicle) => vehicle.nation.title))]
})

const types = computed(() => {
  return [...new Set(props.vehicles.map((vehicle) => vehicle.type.title))]
})

const handleLevelChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : parseInt(target.value)
  emit('update:modelValue', { ...props.modelValue, level: value })
}

const handleNationChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : target.value
  emit('update:modelValue', { ...props.modelValue, nation: value })
}

const handleTypeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value === 'all' ? null : target.value
  emit('update:modelValue', { ...props.modelValue, type: value })
}

const handleSearch = debounce((e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', { ...props.modelValue, search: value })
}, 300)
</script>
