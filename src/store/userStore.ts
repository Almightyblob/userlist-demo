import { defineStore } from "pinia";
import type { User } from "@/types/users";

export const userStore = defineStore("users", {
  state: () => ({
    allUsers: [] as User[],
    filteredUserList: [] as User[],
    usersToDisplay: 100,
    descending: true,
  }),
  getters: {
    selectedAmount(): number {
      return this.allUsers.filter((user: User) => user.checked === true).length;
    },
    usersInList(): number {
      return this.filteredUserList.length;
    },
    usersDisplayed(): number {
      return this.truncatedList.length;
    },
    truncatedList(): User[] {
      return this.filteredUserList
        .slice(0, this.usersToDisplay)
        .sort((userA, userB) => {
          return this.descending
            ? userA.role.localeCompare(userB.role)
            : userB.role.localeCompare(userA.role);
        });
    },
  },
  actions: {
    setAllUsers(users: User[]): void {
      this.allUsers = users;
      this.allUsers.forEach((user: User) => (user.checked = false));
      this.filteredUserList = [...this.allUsers];
    },
    search(searchWord: string): void {
      if (!searchWord) {
        this.filteredUserList = [...this.allUsers];
      }
      this.filteredUserList = this.allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      this.resetUsersToDisplay();
    },
    selectUser(selected: boolean | undefined, selectedUser: User): void {
      const index = this.filteredUserList.indexOf(selectedUser);
      this.filteredUserList[index].checked = selected;

      const index2 = this.allUsers.indexOf(selectedUser);
      this.allUsers[index2].checked = selected;
    },
    deleteUser(selectedUser: User): void {
      this.filteredUserList = this.filteredUserList.filter((user) => {
        return user !== selectedUser;
      });
      this.allUsers = this.allUsers.filter((user) => {
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
      this.allUsers = this.allUsers.filter(
        (user: User) => !usersToDelete.includes(user)
      );
    },
    showMoreUsers(): void {
      this.usersToDisplay = this.usersToDisplay + 100;
    },
    resetUsersToDisplay(): void {
      this.usersToDisplay = 100;
    },
    sortList(): void {
      this.filteredUserList.sort((userA, userB) => {
        return this.descending
          ? userA.role.localeCompare(userB.role)
          : userB.role.localeCompare(userA.role);
      });
    },
    changeSortDirection(): void {
      this.descending = !this.descending;
      this.sortList();
    },
  },
});
