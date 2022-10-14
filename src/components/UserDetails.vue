<template>
  <div class="flex flex-row space-x-2 items-center">
    <UserIcon :image="image" />
    <div>
      <p class="font-bold text-black text-sm" v-text="name" />
      <p class="text-gray-dark text-sm" v-text="email" />
    </div>
  </div>
</template>

<script lang="ts">
import UserIcon from "./UserIcon.vue";

export default {
  props: {
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
  },
  components: { UserIcon },
};
</script>
