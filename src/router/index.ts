import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/categories/index.vue')
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: () => import('../views/ingredients/index.vue')
    },
    {
      path: '/recipes',
      children: [
        {
          path: '',
          name: 'recipes',
          component: () => import('../views/recipes/index.vue'),
        },
        {
          path: ':id(\\d+)',
          name: 'show_recipe',
          component: () => import('../views/recipes/show.vue')
        },
        {
          path: ':id(\\d+)/edit',
          name: 'edit_recipe',
          component: () => import('../views/recipes/edit.vue')
        },
      ]
    },
  ]
})

export default router
