<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div><p>List Name: <input type="text" v-model="newListName.list_name"></p>
    <button v-on:click="createListName()"> Create new list</button>
    </div>
    <br>
    <hr />     
    <div v-for="list in listNames">
      <p>{{ list.list_name }}</p>
    </div>    
    <br>
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
        newListName: {},
        listNames: {},      
      }
    },
    created: function () {
      this.indexlistNames();
    },
    methods: {
      createListName: function () {
        console.log("create new list")
        console.log(this.newListName)
        axios.post("/list_names", this.newListName).then(response => {
          console.log(response.data);
          this.newListName = {}
        }); 
      },
      indexlistNames: function() {
        console.log('indexing user lists')
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
        });
      },                
    }
  };
</script>