<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="submitSearch">
        <div class="md-form form-group mt-5">
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInputMD"
            v-model="fromDate"
          />
          <label for="formGroupExampleInputMD">From</label>
        </div>
        <div class="md-form form-group mt-5">
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput2MD"
            v-model="toDate"
          />
          <label for="formGroupExampleInputMD">to</label>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fromDate:null,
      toDate:null
    }
  },
  methods:{
    submitSearch(){
       this.$store.dispatch('useDurationSort',{fromDate:this.fromDate,toDate:this.toDate})
       this.fromDate=null
       this.toDate=null
    }
  }
};
</script>

<style scoped>
</style>
