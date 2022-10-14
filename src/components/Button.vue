<template>
    <button class="h-8 | flex flex-row items-center space-x-2 | border border-gray-light rounded | py-4 px-2">
        <font-awesome-icon v-if="icon" class="text-gray-light" :icon="icon" />
        <span class="text-sm text-gray-dark font-bold" v-text="text" />
    </button>

</template>

<script lang="ts">
export default {
    props: {
        type: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: false
        }
    }
}

</script>