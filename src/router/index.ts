import { createRouter, createWebHistory } from 'vue-router'
import Session from 'supertokens-web-js/recipe/session';
import HomeView from '@/views/HomeView.vue'
import AuthView from '../views/AuthView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/auth/:pathMatch(.*)*",
      name: 'auth',
      component: AuthView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/categories/index.vue')
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: () => import('@/views/ingredients/index.vue')
    },
    {
      path: '/recipes',
      children: [
        {
          path: '',
          name: 'recipes',
          component: () => import('@/views/recipes/index.vue'),
        },
        {
          path: ':id(\\d+)',
          name: 'show_recipe',
          component: () => import('@/views/recipes/show.vue')
        },
        {
          path: ':id(\\d+)/edit',
          name: 'edit_recipe',
          component: () => import('@/views/recipes/edit.vue')
        },
        {
          path: 'new',
          name: 'new_recipe',
          component: () => import('@/views/recipes/edit.vue'),
        },
      ]
    },
    {
      path: '/schedules',
      children: [
        {
          path: '',
          name: 'schedules',
          component: () => import('@/views/schedules/index.vue'),
        },
        {
          path: ':id(\\d+)',
          name: 'show_schedule',
          component: () => import('@/views/schedules/show.vue'),
        },
      ]
    },
  ]
})


router.beforeEach(async (to, from) => {
  const isAuthenticated = await Session.doesSessionExist()
  if (!isAuthenticated && to.name !== 'auth') {
    // user has not logged in yet
    return { name: 'auth' }
  }
})

export default router
