<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div><p>List Name: <input type="text" v-model="newUserList.list_name"></p>
    <button v-on:click="createUserList()"> Create new list</button>
    </div>
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
    <!-- <div id="home">
      <SearchBar />
    </div> -->
  </div>

</template>

<style>
/* import SearchBar from '@/components/SearchBar.vue'

export default {
  name: "home",
  components: {
    SearchBar
  }
}; */
</style>

<script>
  import axios from 'axios'
  export default {
    data: function () {
      return {
        message: "YummyList",
        restaurantLists: {},
        restaurants: {},
        newUserList: {},
        userLists: []

      }
    },
    created: function () {
      this.indexRestaurantLists();
      this.indexRestaurants();
      this.createUserList() ;
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
      },
      createUserList: function () {
        console.log("create new list")
        axios.post("/user_lists", this.newUserList).then(response => {
          console.log(response.data);
          this.userLists.push(response.data);
          this.newUserList={};
        }); 
      }
    }
  };
</script>