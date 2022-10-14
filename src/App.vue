<script setup lang="ts">
import RolePill from "./components/RolePill.vue";
import UserIcon from "./components/UserIcon.vue";
import UserDetails from "./components/UserDetails.vue";
import UserListItem from "./components/UserListItem.vue";
import UserList from "./components/UserList.vue";
import Button from './components/Button.vue'
</script>

<template class="bg-gray-light">
  <RolePill role="AGENT" />
  <RolePill role="ADMIN" />
  <RolePill role="ACCOUNT_MANAGER" />
  <RolePill role="EXTERNAL_REVIEWER" />
  <UserIcon image="https://randomuser.me/api/portraits/women/44.jpg" />
  <UserDetails
    image="https://randomuser.me/api/portraits/women/44.jpg"
    name="Dominik Antunovic"
    email="dominik.antunovic@gmail.com "
  />
  <UserListItem
    image="https://randomuser.me/api/portraits/women/44.jpg"
    name="Dominik Antunovic"
    email="dominik.antunovic@gmail.com"
    role="AGENT"
  />
  <UserList />
  <Button type="edit" text="Edit" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
