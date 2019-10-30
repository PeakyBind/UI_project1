<template>
  <v-app>
    <navbar></navbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Navbar from "../components/Navbar";
  import Drawer from "../components/Drawer";

  export default {
    name: 'Default',
    components: { Navbar, Drawer },
    data: () => ({
      //
    }),
  };
</script>
