<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div><p>List Name: <input type="text" v-model="newUserList.list_name"></p>
    <button v-on:click="createUserList()"> Create new list</button>
    </div>
    <br>
    <hr />    
    <div v-for="userList in userLists">
      <p>{{ userList.list_name }}</p>
      <div v-for="restaurant in restaurants">
        <p>{{ restaurant.restaurant_name }}</p>
      </div>
      <br>
      <hr />      

      <!-- render restaurants inside of backend user_lists index action/show 
      fornt end just render userlists  -->
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
        newUserList: [],
        userLists: {},
        restaurants: {},        
      }
    },
    created: function () {
      this.indexRestaurantLists();
      this.indexUserLists();
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
      createUserList: function () {
        console.log("create new list")
        axios.post("/user_lists", this.newUserList).then(response => {
          console.log(response.data);
          this.newUserList = response.data
        }); 
      },
      indexUserLists: function() {
        console.log('indexing user lists')
        axios.get("/user_lists").then(response => {
          console.log(response.data);
          this.userLists = response.data
        });
      },
       indexRestaurants: function() {
        console.log('indexing restaurants')
        axios.get("/restaurants").then(response => {
          console.log(response.data);
          this.restaurants = response.data
        });
      },                 
    }
  };
</script>