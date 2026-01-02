import { defineStore } from 'pinia'
import { db } from '../firebase/config'

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    unsubscribe: null,
    error: null
  }),

  actions: {
    // 🔄 Charger les tâches d'un projet
    fetchTasks(projectId) {
      const q = query(
        collection(db, 'projects', projectId, 'tasks'),
        orderBy('createdAt')
      )

      this.unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          this.error = null
          this.tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        },
        (error) => {
          console.error('Erreur lors du chargement des tâches:', error)
          this.error = error.message
          // Si l'index n'existe pas, chargeons sans orderBy
          if (error.code === 'failed-precondition') {
            const qWithoutOrder = collection(db, 'projects', projectId, 'tasks')
            this.unsubscribe = onSnapshot(qWithoutOrder, (snapshot) => {
              this.tasks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })).sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0
                const bTime = b.createdAt?.toMillis?.() || 0
                return aTime - bTime
              })
            })
          }
        }
      )
    },

    // ➕ Ajouter une tâche
    async addTask(projectId, task) {
      await addDoc(
        collection(db, 'projects', projectId, 'tasks'),
        {
          ...task,
          status: 'todo',
          createdAt: serverTimestamp()
        }
      )
    },

    // 🔄 Changer le statut
    async updateStatus(projectId, taskId, status) {
      await updateDoc(
        doc(db, 'projects', projectId, 'tasks', taskId),
        { status }
      )
    },

    // 🗑️ Supprimer
    async deleteTask(projectId, taskId) {
      await deleteDoc(
        doc(db, 'projects', projectId, 'tasks', taskId)
      )
    },

    clearTasks() {
      if (this.unsubscribe) {
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.tasks = []
    }
  }
})