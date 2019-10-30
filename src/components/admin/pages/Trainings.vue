<template>
  <trainings-table></trainings-table>
</template>

<script>
  import { mapActions } from 'vuex';
  import TrainingsTable from '../trainings/Table';

  export default {
    name: 'adminTrainings',
    components: {
      TrainingsTable
    },
    methods: {
      ...mapActions([
        'getTrainings'
      ])
    },
    mounted() {
      this.getTrainings();
    }
  }
</script>
