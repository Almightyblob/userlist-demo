<template>
  <div class="max-w-[716px]">
    <div class="flex flex-row justify-between items-center | mb-4">
      <h1>Account Users</h1>
      <div class="flex flex-row items-center space-x-2">
        <SearchInput @updated="(input: string) => handleSearch(input)" />
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

      <div class="w-full | flex flex-row | px-4">
        <div class="w-7/12 | flex flex-row items-center space-x-2">
          <input
            v-model="checkedAllUsers"
            class="accent-klaus-blue h-4 w-4"
            type="checkbox"
            @change="selectAllUsers"
          />
          <span class="text-xs text-gray-dark font-bold">Users </span>
        </div>

        <div class="w-5/12 | pl-2">
          <div
            class="flex flex-row items-center space-x-2 | hover:cursor-pointer"
            @click="store.changeSortDirection"
          >
            <span class="text-xs text-gray-dark font-bold">Permission</span>
            <font-awesome-icon
              class="text-xs text-gray-dark"
              :icon="store.descending ? 'arrow-down' : 'arrow-up'"
            />
          </div>
        </div>
      </div>
      <div class="h-[640px] overflow-scroll">
        <UserListItem
          v-for="user in store.truncatedList"
          :user="user"
          @select="(selected: boolean) => selectUser(selected, user)"
          @delete="() => deleteUser(user)"
          :check-all="checkedAllUsers"
        />
      </div>
      <button class="text-xs text-gray-dark font-bold" @click="store.showMoreUsers">
        Show 10 more results ({{ store.usersDisplayed }} of
        {{ store.usersInList }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserListItem from "@/components/UserListItem.vue";
import SearchInput from "@/components/SearchInput.vue";
import Button from "@/components/Button.vue";
import type { User } from "@/types/users";
import { userStore } from "@/store/userStore";
import { ref } from "vue";

const store = userStore();

let checkedAllUsers = ref(false);

function handleSearch(enteredSearchTerm: string) {
  store.search(enteredSearchTerm);
}

const selectUser = (selected: boolean, selectedUser: User): void => {
  store.selectUser(selected, selectedUser);
};

const deleteUser = (selectedUser: User): void => {
  store.deleteUser(selectedUser);
};

const deleteSelectedUsers = (): void => {
  store.deleteSelectedUsers();
  checkedAllUsers.value = false;
};

const selectAllUsers = () => {
  console.log(checkedAllUsers);
};

const usersResponse = await fetch(
  "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
)
  .then((res) => res.json())
  .then((res) => res.users);

store.setAllUsers(usersResponse);
</script>
