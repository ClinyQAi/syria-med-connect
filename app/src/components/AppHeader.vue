<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span class="text-xl font-semibold text-gray-900 hidden sm:block">Syria-Med Connect</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'active': $route.path === '/' }"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/workshops" 
            class="nav-link"
            :class="{ 'active': $route.path === '/workshops' }"
          >
            Workshops
          </router-link>
          <router-link 
            to="/bookings" 
            class="nav-link"
            :class="{ 'active': $route.path === '/bookings' }"
          >
            My Bookings
          </router-link>
        </div>

        <!-- User Credits -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            <span class="font-semibold text-blue-700">{{ credits }}</span>
            <span class="text-blue-600 text-sm hidden sm:inline">Credits</span>
          </div>

          <!-- User Avatar -->
          <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
            {{ userInitials }}
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-500 hover:text-gray-700 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200">
      <div class="px-4 py-3 space-y-2">
        <router-link to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Dashboard</router-link>
        <router-link to="/workshops" class="mobile-nav-link" @click="mobileMenuOpen = false">Workshops</router-link>
        <router-link to="/bookings" class="mobile-nav-link" @click="mobileMenuOpen = false">My Bookings</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const mobileMenuOpen = ref(false)

const credits = computed(() => userStore.credits)
const userInitials = computed(() => {
  const name = userStore.displayName
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})
</script>

<style scoped>
@reference "../style.css";

.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors;
}

.nav-link.active {
  @apply text-blue-600 bg-blue-50;
}

.mobile-nav-link {
  @apply block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100;
}
</style>
