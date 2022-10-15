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
        <h1 class="text-black text-md">{{ store.selectedAmount }} users selected</h1>
        <div class="flex flex-row items-center space-x-2">
          <Button icon="edit" text="Edit" />
          <Button icon="delete" text="Delete" @click="deleteSelectedUsers" />
        </div>
      </div>

      <UserListItem
        v-for="user in allUsers"
        :user="user"
        @select="(selected: boolean) => selectUser(selected, user)"
        @delete="() => deleteUser(user)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import UserListItem from "@/components/UserListItem.vue";
import SearchInput from "@/components/SearchInput.vue";
import Button from "@/components/Button.vue";
import type { User } from "@/types/users";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = userStore();
    const { allUsers } = storeToRefs(store);

    return {
      allUsers,
      store,
    };
  },
  components: { UserListItem, Button, SearchInput },
  data() {
    return {
      users: [] as Array<User>,
    };
  },
  methods: {
    selectUser(selected: Boolean, selectedUser: User) : void{
        this.store.selectUser(selected, selectedUser);
      },
      deleteUser(selectedUser: User): void {
        this.store.deleteUser(selectedUser)
      },
      deleteSelectedUsers(): void {
        this.store.deleteSelectedUsers()
    }
  },
  async mounted() {
    const users = await fetch(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
    )
      .then((res) => res.json())
      .then((res) => res.users.slice(0, 10));

    this.store.setAllUsers(users);
  },
};
</script>
