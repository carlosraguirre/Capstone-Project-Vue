<template>
  <div id="searchbox">
    <ejs-autocomplete :autofill='autofill' :dataSource='searchData' :fields='fields' :placeholder="waterMark" ></ejs-autocomplete>
  </div>
</template>
<style>
  @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
  @import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
    #searchbox {
  color: #008cff;
  height: 40px;
  left: 35%;
  position: absolute;
  top: 35%;
  width: 30%;
    }
</style>
<script>
  // import axios from "axios";
  import Vue from "vue";
  import { AutoCompletePlugin} from "@syncfusion/ej2-vue-dropdowns";

  Vue.use(AutoCompletePlugin);
  export default {
  name: 'searchbox',
    data () {
      return {
        waterMark: "Find a restaurant",
        searchData: [
          {Name: "McDonald's"},
          {Name: "Bluestone Lane"},
          {Name: "Smith's"},
          {Name: "Floriana"},
        ],
        fields: {value: "Name"},
        autofill: true
      }
    }
  }
</script>

// v-on:click and .push to list_nmae array