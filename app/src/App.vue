<template>
  <div id="app" class="min-h-screen flex flex-col">
    <OfflineIndicator />
    <AppHeader />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import OfflineIndicator from './components/OfflineIndicator.vue'
import AppHeader from './components/AppHeader.vue'
</script>
