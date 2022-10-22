import { defineStore } from "pinia";
import type { User } from "@/types/users";
import _ from 'lodash'

interface ApiResponse {
  results: [User[]];
  totalAmount: number;
  currentPage: number;
  nextPage: number | null;
}

export const userStore = defineStore("users", {
  state: () => ({
    userList: [] as User[],
    searchTerm: '',
    currentPage: 1,
    nextPage: 1 as number | null,
    totalAmount: 0,
    filteredUserList: [] as User[],
    usersToDisplay: 100,
    descending: true,
  }),
  getters: {
    selectedAmount(): number {
      return this.userList.filter((user: User) => user.checked === true).length;
    },
    usersInList(): number {
      return this.filteredUserList.length;
    },
    usersDisplayed(): number {
      return this.userList.length;
    },
  },
  actions: {
    updateState(data: ApiResponse): void {
      this.userList = [... this.userList, ...data.results];
      this.currentPage = data.currentPage;
      this.nextPage = data.nextPage;
      this.totalAmount = data.totalAmount;
      this.filteredUserList = [...this.userList];
      console.log('fresh', data.nextPage)
    },
    reset() {
      this.userList = [];
      this.currentPage = 1;
      this.nextPage = 1;
      this.totalAmount = 0
    },
    search(searchWord: string): void {
      this.searchTerm = searchWord
      this.resetUsersToDisplay();
    },
    selectUser(selected: boolean | undefined, selectedUser: User): void {
      const index = this.filteredUserList.indexOf(selectedUser);
      this.filteredUserList[index].checked = selected;

      const index2 = this.userList.indexOf(selectedUser);
      this.userList[index2].checked = selected;
    },
    deleteUser(selectedUser: User): void {
      this.filteredUserList = this.filteredUserList.filter((user) => {
        return user !== selectedUser;
      });
      this.userList = this.userList.filter((user) => {
        return user !== selectedUser;
      });
    },
    deleteSelectedUsers(): void {
      const usersToDelete = this.filteredUserList.filter((user: User) => {
        return user.checked !== false;
      });

      this.filteredUserList = this.filteredUserList.filter(
        (user: User) => !usersToDelete.includes(user)
      );
      this.userList = this.userList.filter(
        (user: User) => !usersToDelete.includes(user)
      );
    },
    showMoreUsers(): void {
      this.usersToDisplay = this.usersToDisplay + 100;
    },
    resetUsersToDisplay(): void {
      this.usersToDisplay = 100;
    },
    changeSortDirection(): void {
      this.descending = !this.descending;
    },
  },
});
