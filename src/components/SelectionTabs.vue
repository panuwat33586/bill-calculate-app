<template>
  <div>
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
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="group"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <DataTable :sortDisplaydata="sortDisplayData"/>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "./DataTable";
export default {
  components: {
    DataTable,
  },
  data() {
    return {
      sortmode: null,
    };
  },
  computed: {
    sortDisplayData() {
      return this.$store.getters["sortDisplayData"](this.sortmode);
    },
  },
  methods: {
    switchMode(type) {
      this.sortmode = type;
    },
  },
};
</script>

<style>
</style>