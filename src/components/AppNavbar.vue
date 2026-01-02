<script setup>
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.logout()
  router.push("/auth")
}
</script>

<template>
  <nav class="bg-white shadow-md border-b">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="flex items-center gap-2">
          <h1 class="text-2xl font-bold text-blue-600">TaskFlow</h1>
        </router-link>

        <div class="flex items-center gap-4">
          <router-link
            v-if="authStore.user"
            to="/dashboard"
            class="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Dashboard
          </router-link>
          
          <div v-if="authStore.user" class="flex items-center gap-3">
            <span class="text-sm text-gray-600">
              {{ authStore.user.email }}
            </span>
            <button
              @click="logout"
              class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition font-medium"
            >
              Déconnexion
            </button>
          </div>

          <router-link
            v-else
            to="/auth"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Connexion
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
