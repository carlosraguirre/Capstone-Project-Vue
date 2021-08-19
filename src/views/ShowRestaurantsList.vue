<template>
  <div class="home">
    <!-- <h1>{{ message }}</h1> -->
    <div v-for="restaurant in restaurantLists">
      <p>{{ restaurant["restaurant_name"] }}</p>
    </div>   
  </div>
</template>

<style></style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        restaurantLists: {}
      };
    },
    created: function () {
      this.indexRestaurantLists();
    },
    methods: {
      indexRestaurantLists: function () {
        console.log("indexing restaurant lists")
        axios.get("/list_names/" + this.$route.params.id).then(response => {
          console.log(response.data);
          this.restaurantLists = response.data.restaurants
        });
      },
    },
  };
</script>