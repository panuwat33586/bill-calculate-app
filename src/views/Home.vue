<template>
  <div class="home">
    <h1> sort item by each date</h1>
    {{sortedByDate}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  computed:{
     ...mapState(['transactions','sortedByDate'])
  },
  mounted(){
    this.$store.dispatch('sumTransactionsbyDatetoDate2',this.transactions)
  }
}
</script>
