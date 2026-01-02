<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="max-w-6xl mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">
          TaskFlow
        </h1>
        <p class="text-2xl text-gray-600 mb-8">
          Gérez vos projets et tâches efficacement
        </p>
        <div class="flex gap-4 justify-center">
          <button
            v-if="!authStore.user"
            @click="router.push('/auth')"
            class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Commencer
          </button>
          <button
            v-else
            @click="router.push('/dashboard')"
            class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Accéder au Dashboard
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mt-20">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="text-4xl mb-4">📋</div>
          <h3 class="text-xl font-bold mb-2">Gestion de Projets</h3>
          <p class="text-gray-600">
            Créez et organisez vos projets avec des couleurs personnalisées
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="text-4xl mb-4">✅</div>
          <h3 class="text-xl font-bold mb-2">Tableau Kanban</h3>
          <p class="text-gray-600">
            Organisez vos tâches en colonnes : À faire, En cours, Terminé
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="text-4xl mb-4">⚡</div>
          <h3 class="text-xl font-bold mb-2">Temps Réel</h3>
          <p class="text-gray-600">
            Synchronisation instantanée sur tous vos appareils
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
