<template>
  <div 
    class="card cursor-pointer"
    :class="{ 'opacity-75': isFull && !isBooked }"
    @click="$emit('click', workshop)"
  >
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ workshop.title }}</h3>
        <p class="text-sm text-gray-500">{{ workshop.instructor }}</p>
      </div>
      <span 
        class="badge"
        :class="statusBadgeClass"
      >
        {{ statusText }}
      </span>
    </div>

    <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ workshop.description }}</p>

    <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ formattedDate }}
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ workshop.time }}
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ workshop.location }}
      </div>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <div class="flex items-center gap-2">
        <div class="w-full bg-gray-200 rounded-full h-2 w-24">
          <div 
            class="h-2 rounded-full transition-all duration-300"
            :class="progressBarClass"
            :style="{ width: `${occupancyPercent}%` }"
          ></div>
        </div>
        <span class="text-xs text-gray-500">
          {{ workshop.currentBookings }}/{{ workshop.maxSlots }} slots
        </span>
      </div>
      <div class="flex items-center gap-1 text-medical-blue-600 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
        </svg>
        {{ workshop.creditCost }} credit{{ workshop.creditCost > 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  workshop: {
    type: Object,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  bookingStatus: {
    type: String,
    default: null
  }
})

defineEmits(['click'])

const isFull = computed(() => props.workshop.currentBookings >= props.workshop.maxSlots)
const occupancyPercent = computed(() => 
  Math.min(100, (props.workshop.currentBookings / props.workshop.maxSlots) * 100)
)

const formattedDate = computed(() => {
  const date = new Date(props.workshop.date)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
})

const statusText = computed(() => {
  if (props.bookingStatus === 'confirmed') return 'Booked'
  if (props.bookingStatus === 'waitlisted') return 'Waitlisted'
  if (isFull.value) return 'Full'
  return 'Available'
})

const statusBadgeClass = computed(() => {
  if (props.bookingStatus === 'confirmed') return 'badge-success'
  if (props.bookingStatus === 'waitlisted') return 'badge-warning'
  if (isFull.value) return 'badge-danger'
  return 'badge-info'
})

const progressBarClass = computed(() => {
  if (occupancyPercent.value >= 100) return 'bg-red-500'
  if (occupancyPercent.value >= 80) return 'bg-yellow-500'
  return 'bg-green-500'
})
</script>
