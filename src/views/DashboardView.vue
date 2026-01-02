<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useProjectStore } from '../stores/projectStore'
import { useRouter } from 'vue-router'
import ProjectModal from '@/components/ProjectModal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const projectStore = useProjectStore()
const router = useRouter()

const showModal = ref(false)
const editingProject = ref(null)

onMounted(() => {
  projectStore.fetchProjects()
})

onUnmounted(() => {
  projectStore.clearProjects()
})

const openCreateModal = () => {
  editingProject.value = null
  showModal.value = true
}

const openEditModal = (project) => {
  editingProject.value = project
  showModal.value = true
}

const handleSave = async (projectData) => {
  if (editingProject.value) {
    await projectStore.updateProject(editingProject.value.id, projectData)
  } else {
    await projectStore.addProject(projectData)
  }
  showModal.value = false
  editingProject.value = null
}

const handleDelete = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    await projectStore.deleteProject(id)
  }
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Mes Projets</h1>
        <p class="text-gray-600">Gérez tous vos projets en un seul endroit</p>
      </div>
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
      >
        + Nouveau Projet
      </button>
    </div>

    <LoadingSpinner v-if="projectStore.projects.length === 0 && !projectStore.unsubscribe" />

    <div v-if="projectStore.projects.length === 0 && projectStore.unsubscribe" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">Aucun projet</h3>
      <p class="text-gray-500 mb-4">Créez votre premier projet pour commencer</p>
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Créer un projet
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projectStore.projects"
        :key="project.id"
        class="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform"
        :style="{ backgroundColor: project.color }"
        @click="router.push(`/project/${project.id}`)"
      >
        <div class="p-6 text-white">
          <div class="flex justify-between items-start mb-3">
            <h3 class="font-bold text-2xl flex-1">{{ project.name }}</h3>
            <div class="flex gap-2">
              <button
                @click.stop="openEditModal(project)"
                class="p-2 hover:bg-white hover:bg-opacity-20 rounded transition"
                title="Modifier"
              >
                ✏️
              </button>
              <button
                @click.stop="handleDelete(project.id)"
                class="p-2 hover:bg-white hover:bg-opacity-20 rounded transition"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
          <p v-if="project.description" class="text-sm opacity-90 mb-4 line-clamp-2">
            {{ project.description }}
          </p>
          <button
            @click.stop="router.push(`/project/${project.id}`)"
            class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition backdrop-blur-sm"
          >
            Ouvrir le projet →
          </button>
        </div>
      </div>
    </div>

    <ProjectModal
      :show="showModal"
      :project="editingProject"
      @close="showModal = false"
      @save="handleSave"
    />
  </div>
</template>
