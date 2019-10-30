<template>
  <v-app>
    <a-navbar></a-navbar>

    <a-drawer></a-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import ANavbar from "../components/admin/Navbar";
  import ADrawer from "../components/admin/Drawer"

  export default {
    name: 'Admin',
    components: { ANavbar, ADrawer },
    data: () => ({
      //
    }),
  };
</script>
