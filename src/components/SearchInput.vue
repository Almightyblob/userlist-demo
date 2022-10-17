<template>
  <div class="relative">
    <input
      v-model="searchTerm"
      class="h-10 | text-sm | border border-[#E2E8F0] rounded | pl-8 pr-2"
      type="text"
      placeholder="search"
      @input="handleInput"
    />
    <font-awesome-icon class="absolute top-3 left-3 text-[#A0AEC0]" icon="fa-magnifying-glass"/>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['updated'])

const searchTerm = ref('')

function handleInput() {
    console.log(searchTerm.value)
    emit('updated', searchTerm.value)
}
</script>

