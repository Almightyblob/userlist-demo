import { defineStore } from "pinia";
import type { User } from "@/types/users";

declare module 'pinia' {
  export interface PiniaCustomProperties {
    allUsers: User[];
    get truncatedList(): User[];
    get selectedAmount(): number;
    set setAllUsers(allUsers: User[]);
    set selectUser(allUsers: User[]);
    set deleteUsers(allUsers: User[]);
    set deleteSelectedUsers(allUsers: User[]);
  }
}

export const userStore = defineStore("users", {
  state: () => ({
    allUsers: [] as User[],
  }),
  getters: {
    selectedAmount(): number {
      return this.allUsers.filter((user: User) => user.checked === true).length;
      },
      truncatedList(): User[] {
        return this.allUsers.slice(0,10)
    }
  },
  actions: {
    setAllUsers(users: User[]): void {
      this.allUsers = users;
      this.allUsers.forEach((user: User) => (user.checked = false));
    },
    selectUser(selected: boolean | undefined, selectedUser: User): void {
      const index = this.allUsers.indexOf(selectedUser);
      this.allUsers[index].checked = selected;
    },
    deleteUser(selectedUser: User): void {
      this.allUsers = this.allUsers.filter((user) => {
        return user !== selectedUser;
      });
    },
    deleteSelectedUsers(): void {
      this.allUsers = this.allUsers.filter((user: User) => {
        return user.checked === false;
      });
    },
  },
});
