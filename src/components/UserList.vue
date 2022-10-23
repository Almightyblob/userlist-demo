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
          />
          <span class="text-xs text-gray-dark font-bold">Users </span>
        </div>

        <div class="w-5/12 | pl-2">
          <div
            class="flex flex-row items-center space-x-2 | hover:cursor-pointer"
            @click="changeSortDirection"
          >
            <span class="text-xs text-gray-dark font-bold">Permission</span>
            <font-awesome-icon
              class="text-xs text-gray-dark"
              :icon="store.descending ? 'arrow-down' : 'arrow-up'"
            />
          </div>
        </div>
      </div>
      <div ref="el" class="h-[600px] overflow-y-scroll">
        <p
          v-if="store.userList.length === 0"
          class="text-center text-gray-dark mt-8"
          v-text="'No results'"
        />
        <UserListItem
          v-else
          v-for="user in store.userList"
          :user="user"
          :is-checked="store.selectedUsers.includes(user)"
          @select="(selected: boolean) => selectUser(selected, user)"
          @delete="() => deleteUser(user)"
          :check-all="checkedAllUsers"
        />
      </div>
      <button class="text-xs text-gray-dark font-bold">
        {{ store.usersDisplayed }} of {{ store.totalAmount }}
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
import { useInfiniteScroll } from "@vueuse/core";
import _ from "lodash";
import { toRaw } from "vue";

const el = ref<HTMLElement>();

useInfiniteScroll(
  el,
  async () => {
    // load more
    store.updateState(
      await API.getUsers(store.searchWord, store.descending, store.nextPage)
    );
  },
  { distance: 100 }
);
const store = userStore();

let checkedAllUsers = ref(false);

async function handleSearch(enteredsearchWord: string) {
  scrollToTop();
  store.updateSearchWord(enteredsearchWord);
  store.updateState(
    API.getUsers(store.searchWord, store.descending, store.nextPage)
  );
}

const selectUser = (selected: boolean, selectedUser: User): void => {
  store.selectUser(selected, selectedUser);
};

const deleteUser = (selectedUser: User): void => {
  store.deleteUser(selectedUser);
  API.deleteUsers([toRaw(selectedUser)]);
};

const deleteSelectedUsers = (): void => {
  scrollToTop();
  API.deleteUsers(store.selectedUsers);
  store.deleteSelectedUsers();
  checkedAllUsers.value = false;
};

const changeSortDirection = (): void => {
  scrollToTop();
  store.changeSortDirection();
  store.updateState(
    API.getUsers(store.searchWord, store.descending, store.nextPage)
  );
};

const scrollToTop = (): void => {
  el.value!.scrollTop = 0;
};

interface ApiResponse {
  results: User[];
  totalAmount: number;
  currentPage: number;
  nextPage: number | null;
}

// Creating a fake and messy API, just to have something to work with.
const API = {
  allUsers: [] as User[],
  getUsers(
    searchWord: string,
    rolesDescending: boolean,
    page: number | null
  ): ApiResponse | undefined {
    if (page === null) {
      return;
    } else {
      page = page <= 0 ? 0 : page - 1;

      let result = this.allUsers;
      if (searchWord) {
        result = result.filter((user: User) =>
          user.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
      let totalAmount = result.length;
      result.sort((userA: User, userB: User) => {
        return rolesDescending
          ? userA.role.localeCompare(userB.role)
          : userB.role.localeCompare(userA.role);
      });
      // @ts-ignore
      result = _.chunk(result, 100);
      console.log({
        results: result[page],
        totalAmount,
        currentPage: page + 1,
        nextPage: page + 1 >= result.length ? null : page + 2,
      });
      return {
        // @ts-ignore
        results: result[page],
        totalAmount,
        currentPage: page + 1,
        nextPage: page + 1 >= result.length ? null : page + 2,
      };
    }
  },
  deleteUsers(usersToBeDeleted: User[]) {
    this.allUsers = this.allUsers.filter(
      (user: User) => !usersToBeDeleted.includes(user)
    );
    //update userlist after deletions
    store.updateState(
      API.getUsers(store.searchWord, store.descending, store.currentPage)
    );
  },
};

// initial data load to feed fake API
const usersResponse = await fetch(
  "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
)
  .then((res) => res.json())
  .then((res) =>
    res.users
      .sort((userA: User, userB: User) => {
        return userA.name
          .split(" ")
          .pop()!
          .localeCompare(userB.name.split(" ").pop()!);
      })
      .sort((userA: User, userB: User) => {
        return userA.role.localeCompare(userB.role);
      })
  );
API.allUsers = usersResponse;
store.updateState(await API.getUsers(store.searchWord, store.descending, store.nextPage));
</script>
