<template>
  <div class="max-w-[716px]">
    <div class="flex flex-row justify-between items-center | mb-4">
      <h1>Account Users</h1>
      <div class="flex flex-row items-center space-x-2">
        <SearchInput />
        <Button large klaus-blue text="Connect " />
      </div>
    </div>

    <div class="w-full | bg-white rounded-lg | p-4">
      <div class="flex flex-row items-center space-x-4 | mb-4">
        <h1 class="text-black text-md">
          {{ store.selectedAmount }} users selected
        </h1>
        <div class="flex flex-row items-center space-x-2">
          <Button icon="edit" text="Edit" />
          <Button icon="delete" text="Delete" @click="deleteSelectedUsers" />
        </div>
      </div>

      <UserListItem
        v-for="user in store.truncatedList"
        :user="user"
        @select="(selected: boolean) => selectUser(selected, user)"
        @delete="() => deleteUser(user)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
    import UserListItem from "@/components/UserListItem.vue";
    import SearchInput from "@/components/SearchInput.vue";
    import Button from "@/components/Button.vue";
    import type { User } from "@/types/users";
    import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";

    const store = userStore();
const { allUsers } = storeToRefs(store);
    

    const selectUser = (selected: boolean, selectedUser: User) : void => {
        store.selectUser(selected, selectedUser);
    }
      
    const deleteUser = (selectedUser: User): void => {
        store.deleteUser(selectedUser)
    }
      
    const deleteSelectedUsers = (): void => {
        store.deleteSelectedUsers()
    }

    const usersResponse = await fetch(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
    )
      .then((res) => res.json())
      .then((res) => res.users);

    store.setAllUsers(usersResponse);
    
</script>
