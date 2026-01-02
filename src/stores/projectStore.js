import { defineStore } from 'pinia'
import { db } from '../firebase/config'
import { useAuthStore } from './authStore'

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    unsubscribe: null,
    error: null
  }),

  actions: {
    // 🔄 Charger les projets de l'utilisateur connecté (temps réel)
    fetchProjects() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      const q = query(
        collection(db, 'projects'),
        where('userId', '==', authStore.user.uid),
        orderBy('createdAt', 'desc')
      )

      this.unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          this.error = null
          this.projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        },
        (error) => {
          console.error('Erreur lors du chargement des projets:', error)
          this.error = error.message
          // Si l'index n'existe pas, essayons sans orderBy
          if (error.code === 'failed-precondition') {
            const qWithoutOrder = query(
              collection(db, 'projects'),
              where('userId', '==', authStore.user.uid)
            )
            this.unsubscribe = onSnapshot(qWithoutOrder, (snapshot) => {
              this.projects = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })).sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0
                const bTime = b.createdAt?.toMillis?.() || 0
                return bTime - aTime
              })
            })
          }
        }
      )
    },

    // ➕ Créer un projet
    async addProject(project) {
      const authStore = useAuthStore()

      if (!authStore.user) {
        throw new Error('Aucun utilisateur connecté')
      }

      try {
        await addDoc(collection(db, 'projects'), {
          ...project,
          userId: authStore.user.uid,
          createdAt: serverTimestamp()
        })
      } catch (error) {
        console.error('Erreur lors de la création du projet:', error)
        throw error
      }
    },

    // ✏️ Modifier un projet
    async updateProject(id, project) {
      await updateDoc(doc(db, 'projects', id), {
        ...project,
        updatedAt: serverTimestamp()
      })
    },

    // 🗑️ Supprimer un projet
    async deleteProject(id) {
      await deleteDoc(doc(db, 'projects', id))
    },

    // 🧹 Nettoyage (quand on quitte le dashboard)
    clearProjects() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.projects = []
    }
  }
})