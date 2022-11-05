import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
 
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue')
 
  },
  {
    path: '/Calificaciones',
    name: 'Calificaciones',
    component: () => import('../views/Calificaciones/Calificaciones.vue')
 
  },
  {
    path: '/Notas',
    name: 'Notas',
    component: () => import('../views/Calificaciones/nota.vue')
 
  },
  {
    path: '/NuevaCalificacion',
    name: 'NuevaCalificacion',
    component: () => import('../views/Calificaciones/NuevaCalificacion.vue')
 
  },
  {
    path: '/nuevo',
    name: 'Nuevo',
    component: () => import('../views/Nuevo.vue')
  },
  {
    path: '/Horario',
    name: 'Horario',
    component: () => import('../views/Horario.vue')
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: () => import('../views/Usuarios.vue')
  },
  {
    path: '/Materias',
    name: 'Materias',
    component: () => import('../views/materias/Materias.vue')
  },
  {
    path: '/Grado',
    name: 'Grado',
    component: () => import('../views/grado/Grado.vue')
  },
  {
    path: '/Grado/nuevo',
    name: 'nuevo Grado',
    component: () => import('../views/grado/nuevogrado.vue')
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router