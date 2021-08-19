<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div><p>List Name: <input type="text" v-model="newListName.list_name"></p>
    <button v-on:click="createListName()"> Create new list</button>
    </div>
    <br>
    <hr />     
    <div v-for="list in listNames">
      <p>{{ list.list_name }}</p>
      <button v-on:click="goToShowRestaurantsList(list)"> See restaurants in collection</button>
    </div>
    <br>
    <hr />
  </div>
</template>

<style></style>

<script>
  import axios from "axios"
  export default {
    data: function () {
      return {
        message: "YummyList",
        newListName: {},
        listNames: [],
      }
    },
    created: function () {
      this.indexListNames();
    },
    methods: {
      createListName: function () {
        axios.post("/list_names", this.newListName).then(response => {
          console.log("create list", response);
          this.listNames.push(response.data);
          this.newListName = {}
        }); 
      },
      indexListNames: function() {
        console.log("indexing user lists")
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
        });
      },
      goToShowRestaurantsList: function (list) {
        this.$router.push("/list_names/" + list.id);
      }      
    }
  };
</script>