<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div><p>List Name: <input type="text" v-model="newListName.list_name"></p>
    <button v-on:click="createUserList()"> Create new list</button>
    </div>
    <br>
    <hr /> 
    <!-- {{ restaurants.data[0].restaurant_name }}    -->
    <!-- <div v-for="userList in listNames">
      <p>{{ userList.list_name }}</p> -->
    
    <div v-for="list in listNames">
      <p>{{ list.list_name }}</p>
    </div>    
    <br>
    <hr />
    <div v-for="restaurant in restaurants.data">
      <p>{{ restaurant.restaurant_name }}</p>
    </div>
    <br>
    <hr />      

      <!-- render restaurants inside of backend user_lists index action/show 
      fornt end just render listNames  -->
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
        newListName: [],
        listNames: {},
        restaurants: {},        
      }
    },
    created: function () {
      this.indexRestaurantLists();
      this.indexlistNames();
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
        axios.post("/user_lists", this.newListName).then(response => {
          console.log(response.data);
          this.newListName = response.data
        }); 
      },
      indexlistNames: function() {
        console.log('indexing user lists')
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
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