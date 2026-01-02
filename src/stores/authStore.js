import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(auth.currentUser)

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password)
    user.value = res.user
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  return { user, login, logout }
})