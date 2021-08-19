<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div>
      <p> List ID: {{ listNameId }}</p>
      <select v-model="listNameId">
        <option v-for="list in listNames" v-bind:value="list.id">{{ list.list_name }}</option>
      </select>
    </div>
    <br>
    <br>
    <input type="text" v-model="filterValue">
    <button v-on:click="filter()"> Search restaurant</button>
    <div v-for ="restaurant in filterRestaurants">
      <p>{{ restaurant.restaurant_name }}</p>
      <button v-on:click="addToList(restaurant)"> Add to list</button>     
      <br>
      <hr />
      <hr />
    </div>    
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Restaurants",
        restaurants: {},
        filterRestaurants: {},
        filterValue: "",
        listNameId: 0,
        listNames: [],
      };
    },
    created: function () {
      this.indexRestaurants();
      this.indexListNames();
      axios.get("/list_names").then((response) => {
        console.log(response.data);
        this.listNames = response.data;
      });
    },
    methods: {
      indexRestaurants: function() {
        console.log("indexing restaurants")
        axios.get("/restaurants").then(response => {
          console.log(response.data);
          this.restaurants = response.data
          // this.filterRestaurants = this.restaurants
        });
      },   
      filter: function () {
        console.log(this.filterValue)
        this.filterRestaurants = []
        this.restaurants.forEach(restaurant => {
            if (restaurant.restaurant_name.includes(this.filterValue)) {
              this.filterRestaurants.push(restaurant);
            }
        });        
      },
      addToList: function (restaurant) {
        var params = {
          restaurant_id: restaurant.id,
          list_name_id: this.listNameId
        }
        axios.post("/restaurant_lists", params).then(response => {
          console.log(response.data);
        })
        console.log("adding to list")
      },
      indexListNames: function() {
        console.log("indexing user lists")
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
        });
      }
    }
  };
</script>
