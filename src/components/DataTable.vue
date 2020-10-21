<template>
<div class="datatable-container">
  <table class="table">
  <thead class="black white-text">
    <tr>
      <th v-for="(tableheader,$tableheaderIndex) in tableheaders" 
      :key="$tableheaderIndex"
      scope="col">
      {{tableheader.name}}
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(data,$dataIndex) in sortDisplaydata"
    :key="$dataIndex"
    >
      <td v-for="(tableheader,$tableheaderIndex) in tableheaders" 
       :key="$tableheaderIndex"
      >
         {{data[tableheader.key]}}
      </td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
         return{
             tableheaders:[{name:'group',key:'sku'},{name:'name',key:'name'},{name:'quantity',key:'quantity'},{name:'amount',key:'amount'}]
         }
    },
    props:{
        sortDisplaydata:{
            required:true
        }
    },
   computed:{
       ...mapState(['displayData'])
   }
}
</script>

<style>
.datatable-container{
    margin-top:10px
}
</style>