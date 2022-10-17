<template>
  <div class="flex flex-row space-x-2 items-center">
    <UserIcon :image="image" />
    <div>
      <p class="font-bold text-black text-sm" v-text="name" />
      <p class="text-gray-dark text-sm" v-text="email" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from "@/components/UserIcon.vue";

  const props = defineProps({
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
</script>
