import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import mockApi from '../api/mockService'

export const useUserStore = defineStore('user', () => {
    // State
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // Getters
    const isLoggedIn = computed(() => !!user.value)
    const credits = computed(() => user.value?.creditsRemaining || 0)
    const displayName = computed(() => user.value?.name || 'Guest')

    // Actions
    async function fetchUser() {
        loading.value = true
        error.value = null
        try {
            user.value = await mockApi.getCurrentUser()
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    function deductCredits(amount) {
        if (user.value && user.value.creditsRemaining >= amount) {
            user.value.creditsRemaining -= amount
            // Persist to localStorage for offline access
            localStorage.setItem('user', JSON.stringify(user.value))
        }
    }

    function refundCredits(amount) {
        if (user.value) {
            user.value.creditsRemaining += amount
            localStorage.setItem('user', JSON.stringify(user.value))
        }
    }

    // Initialize from localStorage if available (offline support)
    function initFromCache() {
        const cached = localStorage.getItem('user')
        if (cached) {
            try {
                user.value = JSON.parse(cached)
            } catch {
                localStorage.removeItem('user')
            }
        }
    }

    return {
        user,
        loading,
        error,
        isLoggedIn,
        credits,
        displayName,
        fetchUser,
        deductCredits,
        refundCredits,
        initFromCache
    }
})
