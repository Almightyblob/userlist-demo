<template>
    <div 
        class="h-8 w-8 rounded-full bg-klaus-blue bg-center bg-contain" 
        :style="`background-image: url(${image}`"
    />
</template>

<script lang="ts">
export default {
    props: {
        image: {
            type: String,
            default: 'https://placekitten.com/g/200/200',
        }
    }
}
</script>