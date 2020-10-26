<template>
  <div class="container-fluid">
    <Navbar/>
    <div class="app-container">
    <div class="row">
      <div class="col">
        <InputDate />
      </div>
    </div>
    <div class='row'>
       <div class="col">
         <SelectionTabs/>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import SelectionTabs from '../components/SelectionTabs'
import InputDate from "../components/InputDate";
import Navbar from '../components/Navbar';
import {mapState} from 'vuex'
export default {
  components: {
    InputDate,
    Navbar,
    SelectionTabs
  },
  created(){
        this.$store.dispatch('sumDisplayData',this.transactions)
        this.$store.dispatch('sumTotalQuantityAmount',this.transactions)
        this.$store.dispatch('sumTransactionsbyDatetoDate2',this.transactions)
        // this.$store.dispatch('sumTransactionsbyDatetoDate',this.transactions)
  },
  computed:{
    ...mapState(['transactions','displayData'])
  }
};
</script>

<style>
.app-container{
  margin-top: 20px;
}
</style>
