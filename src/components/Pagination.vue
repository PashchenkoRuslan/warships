<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-2">
    <button
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &laquo;
    </button>

    <template v-for="page in paginationItems" :key="page">
      <button
        v-if="typeof page === 'number'"
        @click="$emit('page-change', page)"
        class="px-3 py-1 rounded border"
        :class="
          currentPage === page
            ? 'bg-blue-500 text-white border-blue-500'
            : 'border-gray-300 hover:bg-gray-100'
        "
      >
        {{ page }}
      </button>
      <span v-else class="px-2">{{ page }}</span>
    </template>

    <button
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &raquo;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['page-change'],
  setup(props) {
    const paginationItems = computed(() => {
      const items = []

      if (props.totalPages <= 7) {
        for (let i = 1; i <= props.totalPages; i++) {
          items.push(i)
        }
      } else {
        items.push(1)

        if (props.currentPage <= 3) {
          items.push(2, 3, 4, '...', props.totalPages)
        } else if (props.currentPage >= props.totalPages - 2) {
          items.push(
            '...',
            props.totalPages - 3,
            props.totalPages - 2,
            props.totalPages - 1,
            props.totalPages,
          )
        } else {
          items.push(
            '...',
            props.currentPage - 1,
            props.currentPage,
            props.currentPage + 1,
            '...',
            props.totalPages,
          )
        }
      }

      return items
    })

    return {
      paginationItems,
    }
  },
})
</script>
