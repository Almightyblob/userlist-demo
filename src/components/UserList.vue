<template>
  <div class="w-[716px]">
    <UserListItem
      v-for="user in users"
      :name="user.name"
      :email="user.email"
      :image="user.avatar"
      :role="user.role"
    />
  </div>
</template>

<script lang="ts">
import UserListItem from "./UserListItem.vue";

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
};

export default {
  components: { UserListItem },
  data() {
    return {
      users: [] as Array<User>,
    };
  },
  async mounted() {
    this.users = await fetch(
      "https://raw.githubusercontent.com/klausapp/frontend-engineer-test-task/master/users.json"
    )
      .then((res) => res.json())
      .then((res) => res.users.slice(0, 10));
  },
};
</script>
