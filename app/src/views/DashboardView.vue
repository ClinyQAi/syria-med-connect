<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-br from-medical-blue-600 to-medical-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {{ userStore.displayName }}! 👋
        </h1>
        <p class="text-medical-blue-100 text-sm sm:text-base">
          Your journey to becoming an excellent healthcare professional continues.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="card bg-white">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-medical-blue-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-medical-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ userStore.credits }}</p>
              <p class="text-sm text-gray-500">Credits Left</p>
            </div>
          </div>
        </div>

        <div class="card bg-white">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ workshopStore.confirmedBookings.length }}</p>
              <p class="text-sm text-gray-500">Confirmed</p>
            </div>
          </div>
        </div>

        <div class="card bg-white">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ workshopStore.waitlistedBookings.length }}</p>
              <p class="text-sm text-gray-500">Waitlisted</p>
            </div>
          </div>
        </div>

        <div class="card bg-white">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ workshopStore.workshops.length }}</p>
              <p class="text-sm text-gray-500">Workshops</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Workshops Section -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Upcoming Workshops</h2>
          <router-link to="/bookings" class="text-medical-blue-600 hover:text-medical-blue-700 text-sm font-medium">
            View All →
          </router-link>
        </div>

        <div v-if="workshopStore.upcomingBookings.length === 0" class="card text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Upcoming Workshops</h3>
          <p class="text-gray-500 mb-4">You haven't booked any workshops yet.</p>
          <router-link to="/workshops" class="btn-primary">
            Browse Workshops
          </router-link>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2">
          <div 
            v-for="booking in workshopStore.upcomingBookings.slice(0, 2)" 
            :key="booking.id"
            class="card border-l-4 border-medical-blue-500"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-900">{{ booking.workshop?.title }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ booking.workshop?.instructor }}</p>
              </div>
              <span class="badge badge-success">Confirmed</span>
            </div>
            <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(booking.workshop?.date) }}
              </span>
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ booking.workshop?.time }}
              </span>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ booking.workshop?.location }}</span>
              <button class="btn-secondary text-xs">View QR</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Available Workshops Quick View -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Available Workshops</h2>
          <router-link to="/workshops" class="text-medical-blue-600 hover:text-medical-blue-700 text-sm font-medium">
            View All →
          </router-link>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WorkshopCard 
            v-for="workshop in workshopStore.availableWorkshops.slice(0, 3)"
            :key="workshop.id"
            :workshop="workshop"
            :is-booked="workshopStore.isBooked(workshop.id)"
            :booking-status="workshopStore.getBookingStatus(workshop.id)"
            @click="navigateToWorkshop"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useWorkshopStore } from '../stores/workshopStore'
import WorkshopCard from '../components/WorkshopCard.vue'

const router = useRouter()
const userStore = useUserStore()
const workshopStore = useWorkshopStore()

onMounted(async () => {
  // Initialize from cache first (for offline)
  userStore.initFromCache()
  workshopStore.loadFromCache()

  // Then fetch fresh data
  await Promise.all([
    userStore.fetchUser(),
    workshopStore.fetchWorkshops()
  ])

  if (userStore.user) {
    await workshopStore.fetchUserBookings(userStore.user.id)
  }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}

function navigateToWorkshop(workshop) {
  router.push(`/workshop/${workshop.id}`)
}
</script>
