<template>
  <users-table></users-table>
</template>

<script>
  import { mapActions } from 'vuex';
  import UsersTable from '../users/Table'

  export default {
    name: 'adminUsers',
    components: {
      UsersTable
    },
    methods: {
      ...mapActions([
        'getUsers'
      ])
    },
    mounted() {
      this.getUsers();
    }
  }
</script>
