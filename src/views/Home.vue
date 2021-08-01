<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="restaurantList in restaurantLists">
      <p>{{ restaurantList.user_list_id.list_name }}</p>
      <p>{{ restaurantList.restaurant_id.restaurant_name }}</p>
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
        restaurantLists: []
      };
    },
    created: function () {
      this.indexRestaurantLists();
    },
    methods: {
      indexRestaurantLists: function() {
        console.log('indexing restaurant lists')
        axios.get("/restaurant_lists").then(response => {
          console.log(response.data);
          this.restaurantLists = response.data
        });
      }
    },
  };
</script>