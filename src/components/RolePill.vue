<template>
    <span :class="pillClass(role)">
        {{roles[role as keyof Roles]}}
    </span>
</template>

<script lang="ts">
import { roles } from '../enums/roles'
import type {Roles} from '../enums/roles'
export default {
    props: {
        role: {
            type: String,
            required: true,
            validator: (value: string) => {
                return ['AGENT', 'ADMIN', 'ACCOUNT_MANAGER', 'EXTERNAL_REVIEWER'].includes(value)
            }
        }
    },
    data() {
        return {
            roles
        }
    },
    methods: {
        pillClass(role: string) {
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
    }
}
</script>