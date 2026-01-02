<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'
import { useProjectStore } from '../stores/projectStore'
import TaskCard from '@/components/TaskCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const projectStore = useProjectStore()

const title = ref('')
const description = ref('')
const dueDate = ref('')
const showTaskForm = ref(false)
const error = ref('')

const project = computed(() => {
  return projectStore.projects.find(p => p.id === route.params.id)
})

onMounted(() => {
  taskStore.fetchTasks(route.params.id)
  if (projectStore.projects.length === 0) {
    projectStore.fetchProjects()
  }
})

onUnmounted(() => {
  taskStore.clearTasks()
})

const addTask = async () => {
  if (!title.value.trim()) {
    error.value = 'Le titre est requis'
    return
  }
  
  error.value = ''
  try {
    await taskStore.addTask(route.params.id, {
      title: title.value.trim(),
      description: description.value.trim(),
      dueDate: dueDate.value || null
    })
    
    title.value = ''
    description.value = ''
    dueDate.value = ''
    showTaskForm.value = false
  } catch (err) {
    error.value = err.message || 'Erreur lors de l\'ajout de la tâche'
  }
}

const updateStatus = async (taskId, status) => {
  await taskStore.updateStatus(route.params.id, taskId, status)
}

const deleteTask = async (taskId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    await taskStore.deleteTask(route.params.id, taskId)
  }
}

const todo = computed(() =>
  taskStore.tasks.filter(t => t.status === 'todo')
)
const doing = computed(() =>
  taskStore.tasks.filter(t => t.status === 'doing')
)
const done = computed(() =>
  taskStore.tasks.filter(t => t.status === 'done')
)
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="mb-6">
      <button
        @click="router.push('/dashboard')"
        class="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
      >
        ← Retour au Dashboard
      </button>
      <div class="flex items-center gap-4 mb-4">
        <div
          v-if="project"
          class="w-4 h-4 rounded-full"
          :style="{ backgroundColor: project.color }"
        ></div>
        <h1 class="text-4xl font-bold text-gray-800">
          {{ project?.name || 'Projet' }}
        </h1>
      </div>
      <p v-if="project?.description" class="text-gray-600 mb-4">
        {{ project.description }}
      </p>
    </div>

    <div class="mb-6">
      <button
        @click="showTaskForm = !showTaskForm"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
      >
        {{ showTaskForm ? 'Annuler' : '+ Ajouter une tâche' }}
      </button>
    </div>

    <div v-if="showTaskForm" class="bg-white border-2 border-blue-200 rounded-lg p-6 mb-6 shadow-md">
      <h2 class="text-xl font-bold mb-4">Nouvelle tâche</h2>
      
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input
            v-model="title"
            type="text"
            placeholder="Titre de la tâche"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keyup.enter="addTask"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="description"
            placeholder="Description de la tâche"
            rows="3"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
          <input
            v-model="dueDate"
            type="date"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          @click="addTask"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Ajouter la tâche
        </button>
      </div>
    </div>

    <LoadingSpinner v-if="taskStore.tasks.length === 0 && !taskStore.unsubscribe" />

    <div v-if="taskStore.tasks.length === 0 && taskStore.unsubscribe" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">Aucune tâche</h3>
      <p class="text-gray-500">Créez votre première tâche pour commencer</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- To Do Column -->
      <div class="bg-gray-50 rounded-lg p-4 min-h-[400px]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg text-gray-700">
            À faire
            <span class="ml-2 text-sm font-normal text-gray-500">({{ todo.length }})</span>
          </h2>
        </div>
        <div class="space-y-3">
          <TaskCard
            v-for="task in todo"
            :key="task.id"
            :task="task"
            @update-status="(status) => updateStatus(task.id, status)"
            @delete="deleteTask(task.id)"
          />
        </div>
      </div>

      <!-- Doing Column -->
      <div class="bg-yellow-50 rounded-lg p-4 min-h-[400px]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg text-gray-700">
            En cours
            <span class="ml-2 text-sm font-normal text-gray-500">({{ doing.length }})</span>
          </h2>
        </div>
        <div class="space-y-3">
          <TaskCard
            v-for="task in doing"
            :key="task.id"
            :task="task"
            @update-status="(status) => updateStatus(task.id, status)"
            @delete="deleteTask(task.id)"
          />
        </div>
      </div>

      <!-- Done Column -->
      <div class="bg-green-50 rounded-lg p-4 min-h-[400px]">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg text-gray-700">
            Terminé
            <span class="ml-2 text-sm font-normal text-gray-500">({{ done.length }})</span>
          </h2>
        </div>
        <div class="space-y-3">
          <TaskCard
            v-for="task in done"
            :key="task.id"
            :task="task"
            @update-status="(status) => updateStatus(task.id, status)"
            @delete="deleteTask(task.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
