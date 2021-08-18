<template>
  <div class="home">
    <h1>{{ message }}</h1>
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
      };
    },
    created: function () {
      this.indexRestaurants();
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
          list_name_id: 88
        }
        axios.post("/restaurant_lists", params).then(response => {
          console.log(response.data);
        })
        console.log("adding to list")
      }
    },
  };
</script>
