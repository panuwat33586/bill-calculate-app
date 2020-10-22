<template>
  <div class="container-fluid">
    <Navbar/>
    <div class="app-container">
    <div class="row">
      <div class="col-3">
        <InputDate />
      </div>
      <div class="col-9">
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
  mounted(){
        this.$store.dispatch('sumDisplayData',this.transactions)
        this.$store.dispatch('sumTotalQuantityAmount',this.transactions)
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
