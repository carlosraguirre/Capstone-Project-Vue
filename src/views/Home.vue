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
      <button v-on:click="goToShowRestaurantsLists()"> See restaurants in collection</button>
    </div>
    <br>
    <hr />
    <div v-for="restaurant in restaurantLists">
      <p>{{ restaurant.restaurant["restaurant_name"] }}</p>
      <!-- Link to Show Restaurants List -->
      <!-- <router-link v-bind:to="`/restaurant_lists/${restaurantLists.id}/ShowRestaurantsLists`">See restaurants in collection</router-link> -->
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
        restaurantLists: {},
      }
    },
    created: function () {
      this.indexListNames();
      this.indexRestaurantLists();
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
      indexRestaurantLists: function () {
        console.log("indexing restaurant lists")
        axios.get("/restaurant_lists").then(response => {
          console.log(response.data);
          this.restaurantLists = response.data
        });
      },
      goToShowRestaurantsLists: function () {
        this.$router.push("/ShowRestaurantsLists");
      }      
    }
  };
</script>