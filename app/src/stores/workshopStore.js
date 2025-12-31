import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import mockApi from '../api/mockService'

export const useWorkshopStore = defineStore('workshop', () => {
    // State
    const workshops = ref([])
    const bookings = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Getters
    const availableWorkshops = computed(() =>
        workshops.value.filter(w => w.currentBookings < w.maxSlots)
    )

    const fullWorkshops = computed(() =>
        workshops.value.filter(w => w.currentBookings >= w.maxSlots)
    )

    const confirmedBookings = computed(() =>
        bookings.value.filter(b => b.status === 'confirmed')
    )

    const waitlistedBookings = computed(() =>
        bookings.value.filter(b => b.status === 'waitlisted')
    )

    const upcomingBookings = computed(() => {
        const now = new Date()
        return confirmedBookings.value.filter(b => {
            const workshopDate = new Date(b.workshop?.date)
            return workshopDate >= now
        }).sort((a, b) => new Date(a.workshop?.date) - new Date(b.workshop?.date))
    })

    // Actions
    async function fetchWorkshops() {
        loading.value = true
        error.value = null
        try {
            workshops.value = await mockApi.getWorkshops()
            // Cache for offline
            localStorage.setItem('workshops', JSON.stringify(workshops.value))
        } catch (e) {
            error.value = e.message
            // Try to load from cache
            loadFromCache()
        } finally {
            loading.value = false
        }
    }

    async function fetchUserBookings(userId) {
        loading.value = true
        error.value = null
        try {
            bookings.value = await mockApi.getUserBookings(userId)
            localStorage.setItem('bookings', JSON.stringify(bookings.value))
        } catch (e) {
            error.value = e.message
            const cached = localStorage.getItem('bookings')
            if (cached) {
                bookings.value = JSON.parse(cached)
            }
        } finally {
            loading.value = false
        }
    }

    async function bookWorkshop(workshopId, userId) {
        loading.value = true
        error.value = null
        try {
            const booking = await mockApi.createBooking(workshopId, userId)
            bookings.value.push(booking)

            // Update local workshop data
            const workshop = workshops.value.find(w => w.id === workshopId)
            if (workshop && booking.status === 'confirmed') {
                workshop.currentBookings++
            }

            // Persist changes
            localStorage.setItem('bookings', JSON.stringify(bookings.value))
            localStorage.setItem('workshops', JSON.stringify(workshops.value))

            return booking
        } catch (e) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }

    async function cancelBooking(bookingId) {
        loading.value = true
        error.value = null
        try {
            await mockApi.cancelBooking(bookingId)

            const booking = bookings.value.find(b => b.id === bookingId)
            if (booking) {
                // Update workshop count
                const workshop = workshops.value.find(w => w.id === booking.workshopId)
                if (workshop && booking.status === 'confirmed') {
                    workshop.currentBookings--
                }
                // Remove booking
                bookings.value = bookings.value.filter(b => b.id !== bookingId)
            }

            localStorage.setItem('bookings', JSON.stringify(bookings.value))
            localStorage.setItem('workshops', JSON.stringify(workshops.value))
        } catch (e) {
            error.value = e.message
            throw e
        } finally {
            loading.value = false
        }
    }

    function loadFromCache() {
        const cachedWorkshops = localStorage.getItem('workshops')
        const cachedBookings = localStorage.getItem('bookings')

        if (cachedWorkshops) {
            try {
                workshops.value = JSON.parse(cachedWorkshops)
            } catch {
                localStorage.removeItem('workshops')
            }
        }

        if (cachedBookings) {
            try {
                bookings.value = JSON.parse(cachedBookings)
            } catch {
                localStorage.removeItem('bookings')
            }
        }
    }

    function getWorkshopById(id) {
        return workshops.value.find(w => w.id === id)
    }

    function isBooked(workshopId) {
        return bookings.value.some(b => b.workshopId === workshopId)
    }

    function getBookingStatus(workshopId) {
        const booking = bookings.value.find(b => b.workshopId === workshopId)
        return booking?.status || null
    }

    return {
        workshops,
        bookings,
        loading,
        error,
        availableWorkshops,
        fullWorkshops,
        confirmedBookings,
        waitlistedBookings,
        upcomingBookings,
        fetchWorkshops,
        fetchUserBookings,
        bookWorkshop,
        cancelBooking,
        loadFromCache,
        getWorkshopById,
        isBooked,
        getBookingStatus
    }
})
