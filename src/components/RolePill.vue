<template>
    <span :class="pillClass(role)">
        {{roleList[role as keyof Roles]}}
    </span>
</template>

<script setup lang="ts">
import { roles } from '@/enums/roles'
import type { Roles } from '@/types/roles'
import { ref } from 'vue'

    const props = defineProps({
        role: {
            type: String,
            required: true,
            validator: (value: string) => {
                return ['AGENT', 'ADMIN', 'ACCOUNT_MANAGER', 'EXTERNAL_REVIEWER'].includes(value)
            }
        }
    })
const roleList = ref<Roles>(roles)
    
    function pillClass(role: string): string {
            let roleColours = ''

            switch (role) {
                case 'AGENT':
                    roleColours = 'bg-blue-light text-blue-dark'
                    break;
                case 'ADMIN':
                    roleColours = 'bg-purple-light text-purple-dark'
                    break;
                case 'ACCOUNT_MANAGER':
                    roleColours = 'bg-pink-light text-pink-dark'
                    break;
                case 'EXTERNAL_REVIEWER':
                    roleColours = 'bg-orange-light text-orange-dark'
                    break;

            }

            return 'py-[6px] px-[16px] rounded font-bold text-xs ' + roleColours

        }
</script>