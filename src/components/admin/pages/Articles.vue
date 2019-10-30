<template>
  <articles-table></articles-table>
</template>

<script>
  import { mapActions } from 'vuex';
  import ArticlesTable from '../articles/Table'

  export default {
    name: 'adminArticles',
    components: {
      ArticlesTable
    },
    methods: {
      ...mapActions([
        'getArticles'
      ])
    },
    mounted() {
      this.getArticles();
    }
  }
</script>
