<template>
  <categories-table></categories-table>
</template>

<script>
  import { mapActions } from 'vuex';
  import CategoriesTable from '../categories/Table'

  export default {
    name: 'adminCategories',
    components: {
      CategoriesTable
    },
    methods: {
      ...mapActions([
        'getCategories'
      ])
    },
    mounted() {
      this.getCategories();
    }
  }
</script>
