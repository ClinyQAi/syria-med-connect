<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p class="text-gray-600">View and manage your workshop registrations.</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 border-b border-gray-200">
        <button 
          @click="activeTab = 'confirmed'"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'confirmed' 
            ? 'border-medical-blue-600 text-medical-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700'"
        >
          Confirmed ({{ workshopStore.confirmedBookings.length }})
        </button>
        <button 
          @click="activeTab = 'waitlisted'"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === 'waitlisted' 
            ? 'border-yellow-600 text-yellow-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700'"
        >
          Waitlisted ({{ workshopStore.waitlistedBookings.length }})
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="workshopStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue-600"></div>
      </div>

      <!-- Confirmed Bookings -->
      <div v-else-if="activeTab === 'confirmed'">
        <div v-if="workshopStore.confirmedBookings.length === 0" class="card text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Confirmed Bookings</h3>
          <p class="text-gray-500 mb-4">Book a workshop to see it here.</p>
          <router-link to="/workshops" class="btn-primary">
            Browse Workshops
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="booking in workshopStore.confirmedBookings" 
            :key="booking.id"
            class="card"
          >
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ booking.workshop?.title }}</h3>
                  <span class="badge badge-success">Confirmed</span>
                </div>
                <p class="text-gray-600 text-sm mb-3">{{ booking.workshop?.instructor }}</p>
                
                <div class="flex flex-wrap gap-4 text-sm text-gray-500">
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
                  <span class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ booking.workshop?.location }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div class="text-center">
                  <p class="text-xs text-gray-500 mb-1">Attendance QR Code</p>
                  <div class="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                    <!-- Simple QR Code placeholder pattern -->
                    <svg viewBox="0 0 100 100" class="w-20 h-20">
                      <rect fill="#000" x="10" y="10" width="10" height="10"/>
                      <rect fill="#000" x="20" y="10" width="10" height="10"/>
                      <rect fill="#000" x="30" y="10" width="10" height="10"/>
                      <rect fill="#000" x="10" y="20" width="10" height="10"/>
                      <rect fill="#000" x="30" y="20" width="10" height="10"/>
                      <rect fill="#000" x="10" y="30" width="10" height="10"/>
                      <rect fill="#000" x="20" y="30" width="10" height="10"/>
                      <rect fill="#000" x="30" y="30" width="10" height="10"/>
                      <rect fill="#000" x="50" y="10" width="10" height="10"/>
                      <rect fill="#000" x="60" y="20" width="10" height="10"/>
                      <rect fill="#000" x="50" y="30" width="10" height="10"/>
                      <rect fill="#000" x="60" y="10" width="10" height="10"/>
                      <rect fill="#000" x="70" y="10" width="10" height="10"/>
                      <rect fill="#000" x="80" y="10" width="10" height="10"/>
                      <rect fill="#000" x="70" y="20" width="10" height="10"/>
                      <rect fill="#000" x="80" y="30" width="10" height="10"/>
                      <rect fill="#000" x="70" y="30" width="10" height="10"/>
                      <rect fill="#000" x="80" y="20" width="10" height="10"/>
                      <rect fill="#000" x="10" y="50" width="10" height="10"/>
                      <rect fill="#000" x="20" y="60" width="10" height="10"/>
                      <rect fill="#000" x="30" y="50" width="10" height="10"/>
                      <rect fill="#000" x="40" y="40" width="10" height="10"/>
                      <rect fill="#000" x="50" y="50" width="10" height="10"/>
                      <rect fill="#000" x="60" y="60" width="10" height="10"/>
                      <rect fill="#000" x="10" y="70" width="10" height="10"/>
                      <rect fill="#000" x="20" y="70" width="10" height="10"/>
                      <rect fill="#000" x="30" y="70" width="10" height="10"/>
                      <rect fill="#000" x="10" y="80" width="10" height="10"/>
                      <rect fill="#000" x="30" y="80" width="10" height="10"/>
                      <rect fill="#000" x="70" y="70" width="10" height="10"/>
                      <rect fill="#000" x="80" y="70" width="10" height="10"/>
                      <rect fill="#000" x="70" y="80" width="10" height="10"/>
                      <rect fill="#000" x="80" y="80" width="10" height="10"/>
                    </svg>
                  </div>
                </div>
                <button 
                  @click="cancelBooking(booking)"
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Waitlisted Bookings -->
      <div v-else-if="activeTab === 'waitlisted'">
        <div v-if="workshopStore.waitlistedBookings.length === 0" class="card text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Waitlisted Bookings</h3>
          <p class="text-gray-500">You're not on any waitlists.</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="booking in workshopStore.waitlistedBookings" 
            :key="booking.id"
            class="card border-l-4 border-yellow-400"
          >
            <div class="flex items-start justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ booking.workshop?.title }}</h3>
              <span class="badge badge-warning">Waitlisted</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ booking.workshop?.instructor }}</p>
            
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
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

            <p class="text-gray-500 text-sm italic">
              We'll notify you if a slot becomes available.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useWorkshopStore } from '../stores/workshopStore'

const userStore = useUserStore()
const workshopStore = useWorkshopStore()

const activeTab = ref('confirmed')

onMounted(async () => {
  userStore.initFromCache()
  workshopStore.loadFromCache()

  await userStore.fetchUser()
  await workshopStore.fetchWorkshops()

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

async function cancelBooking(booking) {
  if (!confirm('Are you sure you want to cancel this booking? Credits will be refunded.')) {
    return
  }

  try {
    await workshopStore.cancelBooking(booking.id)
    userStore.refundCredits(booking.workshop?.creditCost || 1)
  } catch (error) {
    alert('Failed to cancel booking: ' + error.message)
  }
}
</script>
