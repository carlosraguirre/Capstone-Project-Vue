<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="restaurantList in restaurantLists">
      <p>{{ restaurantList.user_list.list_name }}</p>
      <!-- <p>{{ restaurantList }}</p> -->
      <!-- <p>{{ restaurantList.restaurant_id.restaurant_name }}</p> -->
      <br>
      <!-- <button v-on:click="showRestaurant()"> -->
      <hr />
      <br>
    </div>
    <div v-for ="restaurant in restaurants">
      <p>{{ restaurant.restaurant_name }}</p>
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
        message: "YummyList",
        restaurantLists: {},
        restaurants: {}

      }
    },
    created: function () {
      this.indexRestaurantLists();
      this.indexRestaurants();
    },
    methods: {
      indexRestaurantLists: function() {
        console.log('indexing restaurant lists')
        axios.get("/restaurant_lists").then(response => {
          console.log(response.data);
          this.restaurantLists = response.data
        });
      },
      indexRestaurants: function() {
        console.log('indexing restaurants')
        axios.get("/restaurants").then(response => {
          console.log(response.data);
          this.restaurants = response.data
        });
      }
    },
  };
</script>