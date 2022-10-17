<template>
  <div
    class="relative | h-16 w-full | flex flex-row justify-between items-center | rounded-md | px-4 | overflow-hidden | hover:bg-highlight-gray group"
    :class="checked && 'bg-highlight-gray'"
  >
    <div
      v-if="checked"
      class="absolute left-0 top-0 | h-full w-1 bg-klaus-blue"
    />

    <input
      v-model="checked"
      class="accent-klaus-blue h-4 w-4 | mr-2"
      type="checkbox"
      @change="$emit('select', checked)"
    />
    <div class="w-full | flex flex-row justify-between items-center">
      <div class="w-7/12 | flex flex-row items-center | space-x-2">
        <UserDetails
          :image="user.avatar"
          :name="user.name"
          :email="user.email"
        />
      </div>

      <div class="w-5/12 | flex flex-row md:justify-between items-center">
        <RolePill :role="user.role" />
        <div class="hidden flex-row space-x-2 items-center | group-hover:flex">
          <Button icon="edit" text="Edit" />
          <Button icon="delete" @click="emitDelete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserDetails from "@/components/UserDetails.vue";
import RolePill from "@/components/RolePill.vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  components: { UserDetails, RolePill, Button },
  props: {
    user: {
      type: Object,
      required: true,
      },
      checkAll: {
        type: Boolean,
        required: true
    }
  },
  data() {
    return {
      checked: this.user.checked,
    };
  },
  methods: {
    emitDelete(): void {
      this.$emit("delete");
      this.checked = false;
    },
  },
  watch: {
    user(): void {
      this.checked = this.user.checked;
      },
      checkAll(): void {
        this.checked = this.checkAll
        this.$emit('select', this.checkAll)
    }   
  },
});
</script>
