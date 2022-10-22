<template>
    <div 
        class="h-8 w-8 rounded-full bg-klaus-blue bg-center bg-contain" 
        :style="`background-image: url(${image})`"
    />
</template>

<script setup lang="ts">
    const props = defineProps({
        image: {
            type: String,
            default: 'https://placekitten.com/g/200/200',
        }
    })
</script>