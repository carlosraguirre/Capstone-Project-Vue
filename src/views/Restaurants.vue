<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for ="restaurant in restaurants">
      <p>{{ restaurant.restaurant_name }}</p>
      <!-- <p>{{ restaurant.address }}</p>
      <p>{{ restaurant.longitude }}</p>
      <p>{{ restaurant.latitude }}</p> -->
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
      };
    },
    created: function () {
      this.indexRestaurants();
    },
    methods: {
       indexRestaurants: function() {
        console.log('indexing restaurants')
        axios.get("/restaurants").then(response => {
          console.log(response.data);
          this.restaurants = response.data
        });
      },     
    },
  };
</script>
