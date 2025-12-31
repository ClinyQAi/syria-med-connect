// Mock API Service - Simulates Laravel Backend
// In production, these would be real API calls

const MOCK_WORKSHOPS = [
    {
        id: 'ws-001',
        title: 'Emergency Suturing Techniques',
        description: 'Learn essential suturing skills for emergency situations. Hands-on practice with synthetic skin models.',
        date: '2026-01-15',
        time: '10:00 - 12:00',
        maxSlots: 20,
        currentBookings: 18,
        creditCost: 1,
        location: 'Damascus Medical School - Lab A',
        instructor: 'Dr. Ahmad Al-Hassan'
    },
    {
        id: 'ws-002',
        title: 'Pediatric Assessment Workshop',
        description: 'Comprehensive pediatric physical examination techniques for infants and children.',
        date: '2026-01-17',
        time: '14:00 - 16:00',
        maxSlots: 15,
        currentBookings: 15,
        creditCost: 1,
        location: 'Aleppo University Hospital - Room 203',
        instructor: 'Dr. Fatima Khaled'
    },
    {
        id: 'ws-003',
        title: 'ECG Interpretation Masterclass',
        description: 'From basics to advanced arrhythmia recognition. Bring your own cases for discussion.',
        date: '2026-01-20',
        time: '09:00 - 11:00',
        maxSlots: 30,
        currentBookings: 12,
        creditCost: 1,
        location: 'Virtual - Zoom',
        instructor: 'Dr. Mahmoud Nasser (SGMA Berlin)'
    },
    {
        id: 'ws-004',
        title: 'Basic Life Support (BLS) Certification',
        description: 'American Heart Association certified BLS course. Certificate valid for 2 years.',
        date: '2026-01-22',
        time: '08:00 - 12:00',
        maxSlots: 12,
        currentBookings: 8,
        creditCost: 2,
        location: 'Damascus Red Crescent Center',
        instructor: 'Dr. Layla Mansour'
    },
    {
        id: 'ws-005',
        title: 'Ultrasound-Guided Procedures',
        description: 'Point-of-care ultrasound for central line placement and paracentesis.',
        date: '2026-01-25',
        time: '13:00 - 17:00',
        maxSlots: 8,
        currentBookings: 6,
        creditCost: 2,
        location: 'Damascus University Hospital - ICU Training Room',
        instructor: 'Dr. Karim Yousef'
    }
]

const MOCK_USER = {
    id: 'user-001',
    name: 'Nour Al-Din',
    studentId: 'MED-2024-1547',
    creditsRemaining: 3,
    email: 'nour.aldin@student.edu.sy',
    avatar: null
}

const MOCK_BOOKINGS = [
    {
        id: 'bk-001',
        workshopId: 'ws-003',
        userId: 'user-001',
        status: 'confirmed',
        bookedAt: '2025-12-28T10:30:00Z'
    }
]

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
    // Workshops
    async getWorkshops() {
        await delay(300)
        return [...MOCK_WORKSHOPS]
    },

    async getWorkshop(id) {
        await delay(200)
        return MOCK_WORKSHOPS.find(w => w.id === id) || null
    },

    // User
    async getCurrentUser() {
        await delay(200)
        return { ...MOCK_USER }
    },

    async updateUserCredits(userId, newCredits) {
        await delay(100)
        MOCK_USER.creditsRemaining = newCredits
        return { ...MOCK_USER }
    },

    // Bookings
    async getUserBookings(userId) {
        await delay(300)
        return MOCK_BOOKINGS
            .filter(b => b.userId === userId)
            .map(booking => ({
                ...booking,
                workshop: MOCK_WORKSHOPS.find(w => w.id === booking.workshopId)
            }))
    },

    async createBooking(workshopId, userId) {
        await delay(400)

        const workshop = MOCK_WORKSHOPS.find(w => w.id === workshopId)
        if (!workshop) {
            throw new Error('Workshop not found')
        }

        if (workshop.currentBookings >= workshop.maxSlots) {
            // Add to waitlist instead
            const booking = {
                id: `bk-${Date.now()}`,
                workshopId,
                userId,
                status: 'waitlisted',
                bookedAt: new Date().toISOString()
            }
            MOCK_BOOKINGS.push(booking)
            return { ...booking, workshop }
        }

        // Check credits
        if (MOCK_USER.creditsRemaining < workshop.creditCost) {
            throw new Error('Insufficient credits')
        }

        // Deduct credits and create booking
        MOCK_USER.creditsRemaining -= workshop.creditCost
        workshop.currentBookings++

        const booking = {
            id: `bk-${Date.now()}`,
            workshopId,
            userId,
            status: 'confirmed',
            bookedAt: new Date().toISOString()
        }
        MOCK_BOOKINGS.push(booking)

        return { ...booking, workshop }
    },

    async cancelBooking(bookingId) {
        await delay(300)

        const index = MOCK_BOOKINGS.findIndex(b => b.id === bookingId)
        if (index === -1) {
            throw new Error('Booking not found')
        }

        const booking = MOCK_BOOKINGS[index]
        const workshop = MOCK_WORKSHOPS.find(w => w.id === booking.workshopId)

        if (booking.status === 'confirmed' && workshop) {
            // Refund credits
            MOCK_USER.creditsRemaining += workshop.creditCost
            workshop.currentBookings--
        }

        MOCK_BOOKINGS.splice(index, 1)
        return { success: true }
    }
}

export default mockApi
