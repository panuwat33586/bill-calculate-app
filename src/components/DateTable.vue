<template>
  <div class="datetable-container">
    <div class="table-responsive">
      <table class="table" id="datatable">
        <thead class="black white-text">
          <tr>
            <th scope="col">name</th>
            <th scope="col">total</th>
            <th
              v-for="(tableheader, $tableheaderIndex) in datetableheaders"
              :key="$tableheaderIndex"
              scope="col"
            >
              {{ tableheader.day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, $dataIndex) in skuData" :key="$dataIndex">
            <td>
              {{ data.name }}
            </td>
            <td>
              {{
                datetablecontents[data.sku]
                  ? datetablecontents[data.sku][sortmode]
                  : "0"
              }}
            </td>
            <td
              v-for="(tableheader, $tableheaderIndex) in datetableheaders"
              :key="$tableheaderIndex"
            >
              <!-- {{datetablecontents[tableheader.key][data.sku]?datetablecontents[tableheader.key][data.sku][sortmode]:'0'}} -->
              {{
                datetablecontents[data.sku] &&
                datetablecontents[data.sku][tableheader.key]
                  ? datetablecontents[data.sku][tableheader.key][sortmode]
                  : "0"
              }}
            </td>
          </tr>
          <tr>
            <td>total</td>
            <td>{{ overalltotal[sortmode] }}</td>
            <td
              v-for="(tableheader, $tableheaderIndex) in datetableheaders"
              :key="$tableheaderIndex"
            >
               {{totaldatebydate[tableheader.key]?totaldatebydate[tableheader.key][sortmode]:'0'}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { skuData } from "../mockData/sku";
export default {
  data() {
    return {
      skuData,
    };
  },
  props: {
    datetableheaders: {
      required: true,
    },
    datetablecontents: {
      required: true,
    },
    sortmode: {
      required: true,
    },
    overalltotal: {
      required: true,
    },
    totaldatebydate: {
      required: true,
    },
  },
};
</script>

<style>
.datetable-container {
  margin-top: 10px;
}
</style>