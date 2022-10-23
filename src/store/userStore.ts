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
    searchTerm: "",
    currentPage: 1,
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
    updateState(data: ApiResponse | undefined ): void {
      if (data!.results) {
        this.userList = [...this.userList, ...data!.results];
        this.currentPage = data!.currentPage;
        this.nextPage = data!.nextPage;
        this.totalAmount = data!.totalAmount;
      }
    },
    reset() {
      this.userList = [];
      this.currentPage = 1;
      this.nextPage = 1;
      this.totalAmount = 0;
    },
    search(searchWord: string): void {
      this.searchTerm = searchWord;
      this.reset();
    },
    selectUser(selected: boolean | undefined, selectedUser: User): void {
      if (selected) {
        this.selectedUsers.push(selectedUser);
      }
      if (!selected) {
        this.selectedUsers = this.selectedUsers.filter(
          (user) => user !== selectedUser
        );
      }
    },
    deleteUser(selectedUser: User): void {
      this.selectedUsers = this.selectedUsers.filter(
        (user) => user !== selectedUser
      );
      this.userList = this.userList.filter((user) => {
        return user !== selectedUser;
      });
      this.reset();
    },
    deleteSelectedUsers(): void {
      this.userList = this.userList.filter(
        (user: User) => !this.selectedUsers.includes(user)
      );
      this.selectedUsers = [];
      this.reset();
    },
    changeSortDirection(): void {
      this.descending = !this.descending;
      this.reset()
    },
  },
});
