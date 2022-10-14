<template>
    <div class="h-16 w-full | flex flex-row justify-between items-center | rounded-md | px-4 | hover:bg-highlight-gray">
        <div class="flex flex-row space-x-2 items-center">
            <input class="accent-klaus-blue h-4 w-4" type="checkbox" />
            <UserDetails :image="image" :name="name" :email="email" />
        </div>
        
        <RolePill :role="role" />
        <div>
            Action buttons
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
    components: {UserDetails, RolePill}

}
</script>