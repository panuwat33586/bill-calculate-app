<template>
  <div class="datetable-container">
    <div class="table-responsive">
    <table class="table" id="datatable">
      <thead class="black white-text">
        <tr>
          <th
          scope="col"
          >
               name
          </th>
          <th
            v-for="(tableheader, $tableheaderIndex) in datetableheaders"
            :key="$tableheaderIndex"
            scope="col"
          >
            {{ tableheader.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, $dataIndex) in skuData" :key="$dataIndex">
          <td>
            {{data.name}}
          </td>
          <td
            v-for="(tableheader, $tableheaderIndex) in datetableheaders"
            :key="$tableheaderIndex"
          >
            {{datetablecontents[tableheader.key][data.sku]?datetablecontents[tableheader.key][data.sku][sortmode]:'0'}}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import {skuData} from '../mockData/sku'
export default {
    data(){
       return {
           skuData,
       }
    },
  props: {
    datetableheaders:{
      required:true
    },
    datetablecontents:{
      required:true
    },
    sortmode:{
      required:true
    }
  },
}
</script>

<style>
.datetable-container{
    margin-top: 10px;
}
</style>