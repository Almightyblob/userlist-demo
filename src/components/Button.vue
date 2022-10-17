<template>
  <button
    class="flex flex-row items-center space-x-2 | rounded | py-4 px-2 | transition-transform duration-100 hover:-translate-y-0.5 group"
    :class="`${buttonSize} | ${buttonColor.button}`"
  >
    <font-awesome-icon
      v-if="icon"
      class="text-gray-anthracite group-focus:text-white"
      :icon="iconName"
    />
    <span
      v-if="text"
      class="text-sm font-bold"
      :class="buttonColor.text"
      v-text="text"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonColor {
    button: string,
    text: string
}

const props = defineProps({
      icon: {
      type: String,
          default: '',
    },
    text: {
      type: String,
      default: '',
    },
    klausBlue: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
})

const iconName = computed(():string => {
    if (props.icon === "edit") return "fa-pencil";
      if (props.icon === "delete") return "fa-trash-can";
      return "";
  })

const buttonSize = computed((): string =>{
      return props.large ? "h-10" : "h-8";
})
    
    const buttonColor = computed(():ButtonColor => {
      return props.klausBlue
        ? {
            button:
              "bg-klaus-blue text-white focus:border focus:border-klaus-blue focus:bg-white",
            text: "text-white group-focus:text-klaus-blue",
          }
        : {
            button:
              "bg-white border border-gray-button-border shadow-sm shadow-gray-button-border focus:bg-klaus-blue",
            text: "text-[#4A5568] group-focus:text-white",
          };
    })

</script>
