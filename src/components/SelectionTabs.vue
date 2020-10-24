<template>
  <div class="selectiontab-container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#group"
          role="tab"
          aria-controls="group"
          aria-selected="true"
          @click="switchMode(null)"
          >Group</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#group"
          role="tab"
          aria-controls="bestseller"
          aria-selected="false"
          @click="switchMode('amount')"
          >Best Seller</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#group"
          role="tab"
          aria-controls="quantity"
          aria-selected="false"
          @click="switchMode('quantity')"
          >Quantity</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#tablesortbydate"
          role="tab"
          aria-controls="tablesortbydate"
          aria-selected="false"
          >By date</a
        >
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="group"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <DataTable
          :tablecontents="sortDisplayData"
          :tableheaders="tableheadersbygroup"
        />
      </div>
      <div
        class="tab-pane fade show"
        id="tablesortbydate"
        role="tabpanel"
        aria-labelledby="tablesortbydate-tab"
      >
        <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="quantity"
            name="inlineMaterialRadiosExample"
            @click="switchDateTablesort('quantity')"
            checked
          />
          <label class="form-check-label" for="materialInline1">Quantity</label>
        </div>
         <div class="form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="amount"
            name="inlineMaterialRadiosExample"
            @click="switchDateTablesort('amount')"
          />
          <label class="form-check-label" for="materialInline1">Amount</label>
        </div>
        <DateTable
          :datetableheaders="generatedateTableHeaders"
          :datetablecontents="sortedByDate"
          :sortmode="datetablesortmode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "./DataTable";
import DateTable from "./DateTable";
import { getDateofMonth } from "../helper";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    DateTable,
  },
  data() {
    return {
      sortmode: null,
      datetablesortmode:'quantity',
      tableheadersbygroup: [
        { name: "group", key: "sku" },
        { name: "name", key: "name" },
        { name: "quantity", key: "quantity" },
        { name: "amount", key: "amount" },
        { name: "percent(%)", key: "percent" },
      ],
    };
  },
  computed: {
    ...mapState(["sortedByDate"]),
    sortDisplayData() {
      return this.$store.getters["sortDisplayData"](this.sortmode);
    },
    generatedateTableHeaders() {
      const sortDate = Object.keys(this.sortedByDate).sort((a, b) =>
        a < b ? -1 : 1
      );
      const dateHeaders = sortDate.map((date) => {
        return { name: getDateofMonth(date), key: date };
      });
      return dateHeaders;
    },
  },
  methods: {
    switchMode(type) {
      this.sortmode = type;
    },
    switchDateTablesort(type){
      this.datetablesortmode=type
    }
  },
};
</script>

<style>
.selectiontab-container {
  margin-top: 20px;
}
</style>