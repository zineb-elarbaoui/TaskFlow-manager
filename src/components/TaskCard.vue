<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updateStatus', 'delete'])

const statusOptions = [
  { value: 'todo', label: 'À faire', color: 'bg-gray-200' },
  { value: 'doing', label: 'En cours', color: 'bg-yellow-200' },
  { value: 'done', label: 'Terminé', color: 'bg-green-200' }
]

const currentStatus = computed(() => {
  return statusOptions.find(s => s.value === props.task.status)
})

const isOverdue = computed(() => {
  if (!props.task.dueDate) return false
  const dueDate = new Date(props.task.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dueDate < today && props.task.status !== 'done'
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow border-l-4"
    :class="{
      'border-gray-400': task.status === 'todo',
      'border-yellow-500': task.status === 'doing',
      'border-green-500': task.status === 'done'
    }"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-bold text-lg flex-1">{{ task.title }}</h3>
      <span
        class="px-2 py-1 text-xs rounded-full"
        :class="currentStatus.color"
      >
        {{ currentStatus.label }}
      </span>
    </div>

    <p v-if="task.description" class="text-gray-600 text-sm mb-3">
      {{ task.description }}
    </p>

    <div v-if="task.dueDate" class="mb-3">
      <span
        class="text-xs"
        :class="isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'"
      >
        📅 {{ formatDate(task.dueDate) }}
        <span v-if="isOverdue" class="ml-1">⚠️ En retard</span>
      </span>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button
        v-if="task.status !== 'todo'"
        @click="emit('updateStatus', 'todo')"
        class="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition"
      >
        ← À faire
      </button>
      <button
        v-if="task.status !== 'doing'"
        @click="emit('updateStatus', 'doing')"
        class="px-3 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded transition"
      >
        {{ task.status === 'todo' ? 'En cours →' : '← En cours' }}
      </button>
      <button
        v-if="task.status !== 'done'"
        @click="emit('updateStatus', 'done')"
        class="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 rounded transition"
      >
        Terminé →
      </button>
      <button
        @click="emit('delete')"
        class="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded transition ml-auto"
      >
        🗑️ Supprimer
      </button>
    </div>
  </div>
</template>

