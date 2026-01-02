import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

// Views
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectDetails from '../views/ProjectDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectDetails,
      meta: { requiresAuth: true }
    }
  ]
})

// 🔐 Auth Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const checkAuth = () => {
    // Si route protégée et utilisateur non connecté
    if (to.meta.requiresAuth && !authStore.user) {
      next('/auth')
      return
    }

    // Si déjà connecté, empêcher l'accès à /auth
    if (to.path === '/auth' && authStore.user) {
      next('/dashboard')
      return
    }

    next()
  }

  // Attendre Firebase Auth au refresh
  if (authStore.loading) {
    const unsubscribe = authStore.$subscribe(() => {
      unsubscribe()
      checkAuth()
    })
  } else {
    checkAuth()
  }
})

export default router
