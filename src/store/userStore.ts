import { defineStore } from "pinia";
import type { User } from "@/types/users";

declare module 'pinia' {
  export interface PiniaCustomProperties {
    allUsers: User[];
    get truncatedList(): User[];
    get selectedAmount(): number;
    set setAllUsers(allUsers);
    set selectUser(allUsers);
    set deleteUsers(allUsers);
    set deleteSelectedUsers(allUsers);
  }
}

export const userStore = defineStore("users", {
  state: () => ({
    allUsers: [],
  }),
  getters: {
    selectedAmount(): number {
      return this.allUsers.filter((user) => user.checked === true).length;
      },
      truncatedList(): User[] {
        return this.allUsers.slice(0,10)
    }
  },
  actions: {
    setAllUsers(users: User[]): void {
      this.allUsers = users;
      this.allUsers.forEach((user) => (user.checked = false));
    },
    selectUser(selected: boolean, selectedUser: User): void {
      const index = this.allUsers.indexOf(selectedUser);
      this.allUsers[index].checked = selected;
    },
    deleteUser(selectedUser: User): void {
      this.allUsers = this.allUsers.filter((user) => {
        return user !== selectedUser;
      });
    },
    deleteSelectedUsers(): void {
      this.allUsers = this.allUsers.filter((user) => {
        return user.checked === false;
      });
    },
  },
});
