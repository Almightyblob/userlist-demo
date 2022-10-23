import { defineStore } from "pinia";
import type { User } from "@/types/users";
import _ from "lodash";

interface ApiResponse {
  results: User[];
  totalAmount: number;
  currentPage: number;
  nextPage: number | null;
}

export const userStore = defineStore("users", {
  state: () => ({
    userList: [] as User[],
    selectedUsers: [] as User[],
    searchWord: "",
    nextPage: 1 as number | null,
    totalAmount: 0,
    usersToDisplay: 100,
    descending: true,
  }),

  getters: {
    selectedAmount(): number {
      return this.selectedUsers.length;
    },

    usersDisplayed(): number {
      return this.userList.length;
    },
  },

  actions: {
    updateState(data: ApiResponse | undefined): void {
      if (data!.results) {
        this.userList = [...this.userList, ...data!.results];
        this.nextPage = data!.nextPage;
        this.totalAmount = data!.totalAmount;
      }
    },

    reset() {
      this.userList = [];
      this.nextPage = 1;
      this.totalAmount = 0;
    },

    updateSearchWord(searchWord: string): void {
      this.searchWord = searchWord;
      this.reset();
    },

    selectUser(selected: boolean | undefined, selectedUser: User): void {
      if (selected) {
        this.selectedUsers.push(selectedUser);
      }
      if (!selected) {
        this.selectedUsers = this.selectedUsers.filter(
          (user) => user.email !== selectedUser.email
        );
      }
      console.log(this.selectedUsers);
    },

    updateSelectedUsers(users: User[]) {
      this.selectedUsers = this.selectedUsers.filter(
        (user) =>
          !users.some((deleteUser: User) => deleteUser.email === user.email)
      );
    },

    changeSortDirection(): void {
      this.descending = !this.descending;
      this.reset();
    },
  },
});
