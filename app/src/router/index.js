import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: 'Dashboard' }
    },
    {
        path: '/workshops',
        name: 'Workshops',
        component: () => import('../views/WorkshopsView.vue'),
        meta: { title: 'Book Workshops' }
    },
    {
        path: '/bookings',
        name: 'Bookings',
        component: () => import('../views/BookingsView.vue'),
        meta: { title: 'My Bookings' }
    },
    {
        path: '/workshop/:id',
        name: 'WorkshopDetail',
        component: () => import('../views/WorkshopDetailView.vue'),
        meta: { title: 'Workshop Details' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Update document title
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title || 'Syria-Med Connect'} | Syria-Med Connect`
    next()
})

export default router
