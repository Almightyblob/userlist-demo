<template>
    <div 
        class="relative | h-16 w-full | flex flex-row justify-between items-center | rounded-md | px-4 | overflow-hidden | hover:bg-highlight-gray"
        :class="checked && 'bg-highlight-gray'"
        >
        <div v-if="checked" class="absolute left-0 top-0 | h-full w-1 bg-klaus-blue" />
        <div class=" w-7/12 | flex flex-row items-center | space-x-2 ">
            <input v-model="checked" class="accent-klaus-blue h-4 w-4" type="checkbox" />
            <UserDetails :image="image" :name="name" :email="email" />
        </div>
        
        
        <div class="w-5/12 | flex flex-row justify-between">
            <RolePill :role="role" />
            <p>
                Action buttons
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import UserDetails from './UserDetails.vue'
import RolePill from './RolePill.vue'
export default {
    props: {
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            checked: false
        }
    },
    components: {UserDetails, RolePill}

}
</script>