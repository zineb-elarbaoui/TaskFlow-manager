<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const name = ref('')
const description = ref('')
const color = ref('#3b82f6')

watch(() => props.project, (newProject) => {
  if (newProject) {
    name.value = newProject.name || ''
    description.value = newProject.description || ''
    color.value = newProject.color || '#3b82f6'
  } else {
    name.value = ''
    description.value = ''
    color.value = '#3b82f6'
  }
}, { immediate: true })

const handleSave = () => {
  if (!name.value.trim()) return
  
  emit('save', {
    name: name.value.trim(),
    description: description.value.trim(),
    color: color.value
  })
  
  name.value = ''
  description.value = ''
  color.value = '#3b82f6'
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="handleClose"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 class="text-2xl font-bold mb-4">
        {{ project ? 'Modifier le projet' : 'Nouveau projet' }}
      </h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nom du projet *</label>
          <input
            v-model="name"
            type="text"
            placeholder="Nom du projet"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="handleSave"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="description"
            placeholder="Description du projet"
            rows="3"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Couleur</label>
          <div class="flex items-center gap-3">
            <input
              v-model="color"
              type="color"
              class="h-10 w-20 rounded cursor-pointer"
            />
            <span class="text-sm text-gray-600">{{ color }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="handleClose"
          class="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Annuler
        </button>
        <button
          @click="handleSave"
          :disabled="!name.trim()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {{ project ? 'Modifier' : 'Créer' }}
        </button>
      </div>
    </div>
  </div>
</template>

