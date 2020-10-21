<template>
  <div class="home">
    <h1>sort by duration</h1>
    {{duration}}
    <h1>SumData</h1>
     {{group}}
     <h1>sort Data by type</h1>
     {{sortData}}
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed:{
    duration(){
      return this.$store.getters['sortByDuration']({fromDate:"2020-10-22",toDate:"2020-10-30"})
    },
    group(){
      return this.$store.getters['sumData'](this.duration)
    },
    sortData(){
      return this.$store.getters['sortData'](this.duration,'date')
    }
  }
}
</script>
