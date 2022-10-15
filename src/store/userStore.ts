import { defineStore } from "pinia";
import type { User } from "@/types/users";

interface UserStore {
  allUsers: User[];
}

export const userStore = defineStore<string, UserStore>("users", {
  state: () => ({
    allUsers: [],
  }),
  getters: {
    selectedAmount(): number {
      return this.allUsers.filter((user) => user.checked === true).length;
    },
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
