<template>
  <div class="datatable-container">
    <div class="table-responsive">
    <table class="table" id="datatable">
      <thead class="black white-text">
        <tr>
          <th
            v-for="(tableheader, $tableheaderIndex) in tableheaders"
            :key="$tableheaderIndex"
            scope="col"
          >
            {{ tableheader.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, $dataIndex) in tablecontents" :key="$dataIndex">
          <td
            v-for="(tableheader, $tableheaderIndex) in tableheaders"
            :key="$tableheaderIndex"
          >
            {{ data[tableheader.key] }}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tablecontents: {
      required: true,
    },
    tableheaders:{
      required:true
    }
  }
};
</script>

<style>
.datatable-container {
  margin-top: 10px;
}
</style>