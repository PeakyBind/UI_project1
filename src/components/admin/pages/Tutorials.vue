<template>
  <tutorials-table></tutorials-table>
</template>

<script>
  import { mapActions } from 'vuex';
  import TutorialsTable from '../tutorials/Table'

  export default {
    name: 'adminTutorials',
    components: {
      TutorialsTable
    },
    methods: {
      ...mapActions([
        'getTutorials'
      ])
    },
    mounted() {
      this.getTutorials();
    }
  }
</script>
