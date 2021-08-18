<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="restaurant in restaurantLists">
      <p>{{ restaurant.restaurant["restaurant_name"] }}</p>
    </div>   
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "Restaurants in your [blank] list",
        indexRestaurantLists: {}

      };
    },
    created: function () {
      this.indexRestaurantLists();
    },
    methods: {
      indexRestaurantLists: function () {
        console.log("indexing restaurant lists")
        axios.get("/restaurant_lists").then(response => {
          console.log(response.data);
          this.restaurantLists = response.data
        });
      },
    },
  };
</script>
