<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Browse Workshops</h1>
        <p class="text-gray-600">Find and book clinical training sessions. Fair allocation ensures everyone gets a chance.</p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <button 
          @click="filter = 'all'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="filter === 'all' ? 'bg-medical-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
        >
          All Workshops
        </button>
        <button 
          @click="filter = 'available'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="filter === 'available' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
        >
          Available ({{ workshopStore.availableWorkshops.length }})
        </button>
        <button 
          @click="filter = 'full'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="filter === 'full' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
        >
          Waitlist Only ({{ workshopStore.fullWorkshops.length }})
        </button>
      </div>

      <!-- Credits Reminder -->
      <div class="bg-medical-blue-50 border border-medical-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <div class="w-10 h-10 bg-medical-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-medical-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-medical-blue-800 font-medium">Fair Allocation System</p>
          <p class="text-medical-blue-600 text-sm">
            You have <strong>{{ userStore.credits }} credits</strong> remaining. Each workshop costs 1-2 credits to book.
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="workshopStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue-600"></div>
      </div>

      <!-- Workshop Grid -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WorkshopCard 
          v-for="workshop in filteredWorkshops"
          :key="workshop.id"
          :workshop="workshop"
          :is-booked="workshopStore.isBooked(workshop.id)"
          :booking-status="workshopStore.getBookingStatus(workshop.id)"
          @click="openWorkshopModal(workshop)"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!workshopStore.loading && filteredWorkshops.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No Workshops Found</h3>
        <p class="text-gray-500">Try changing your filters or check back later.</p>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="selectedWorkshop" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-bold text-gray-900">{{ selectedWorkshop.title }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-gray-600 mb-4">{{ selectedWorkshop.description }}</p>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ selectedWorkshop.instructor }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(selectedWorkshop.date) }} at {{ selectedWorkshop.time }}</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ selectedWorkshop.location }}</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Available Slots</span>
              <span class="font-semibold">
                {{ selectedWorkshop.maxSlots - selectedWorkshop.currentBookings }} / {{ selectedWorkshop.maxSlots }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Credit Cost</span>
              <span class="font-semibold text-medical-blue-600">{{ selectedWorkshop.creditCost }} credit(s)</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="bookingError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {{ bookingError }}
          </div>

          <!-- Already Booked -->
          <div v-if="workshopStore.isBooked(selectedWorkshop.id)" class="text-center py-4">
            <span class="badge badge-success text-base px-4 py-2">
              ✓ Already {{ workshopStore.getBookingStatus(selectedWorkshop.id) === 'confirmed' ? 'Booked' : 'Waitlisted' }}
            </span>
          </div>

          <!-- Book Button -->
          <div v-else class="flex gap-3">
            <button 
              @click="closeModal" 
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button 
              @click="bookWorkshop"
              :disabled="bookingInProgress || (isFull && userStore.credits < selectedWorkshop.creditCost)"
              class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="bookingInProgress">Booking...</span>
              <span v-else-if="isFull">Join Waitlist</span>
              <span v-else>Book Now ({{ selectedWorkshop.creditCost }} credit)</span>
            </button>
          </div>

          <!-- Insufficient Credits Warning -->
          <p v-if="userStore.credits < selectedWorkshop.creditCost && !workshopStore.isBooked(selectedWorkshop.id)" class="text-red-600 text-sm text-center mt-3">
            You don't have enough credits to book this workshop.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useWorkshopStore } from '../stores/workshopStore'
import WorkshopCard from '../components/WorkshopCard.vue'

const userStore = useUserStore()
const workshopStore = useWorkshopStore()

const filter = ref('all')
const selectedWorkshop = ref(null)
const bookingInProgress = ref(false)
const bookingError = ref(null)

const filteredWorkshops = computed(() => {
  switch (filter.value) {
    case 'available':
      return workshopStore.availableWorkshops
    case 'full':
      return workshopStore.fullWorkshops
    default:
      return workshopStore.workshops
  }
})

const isFull = computed(() => 
  selectedWorkshop.value && selectedWorkshop.value.currentBookings >= selectedWorkshop.value.maxSlots
)

onMounted(async () => {
  userStore.initFromCache()
  workshopStore.loadFromCache()
  
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
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  })
}

function openWorkshopModal(workshop) {
  selectedWorkshop.value = workshop
  bookingError.value = null
}

function closeModal() {
  selectedWorkshop.value = null
  bookingError.value = null
}

async function bookWorkshop() {
  if (!selectedWorkshop.value || !userStore.user) return

  bookingInProgress.value = true
  bookingError.value = null

  try {
    await workshopStore.bookWorkshop(selectedWorkshop.value.id, userStore.user.id)
    userStore.deductCredits(selectedWorkshop.value.creditCost)
    closeModal()
  } catch (error) {
    bookingError.value = error.message
  } finally {
    bookingInProgress.value = false
  }
}
</script>
