<template>
  <div id="app">
    <div id="page-top">
      /* <!-- Navigation--> */
      <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
          <div class="container">
              <a class="navbar-brand" href="#page-top">YummyList</a>
              <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  Menu
                  <i class="fas fa-bars"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav ms-auto">
                      <li class="nav-item mx-0 mx-lg-1" v-if="isLoggedIn()">
                        <a class="nav-link py-3 px-0 px-lg-3 rounded" href="#your-lists">Your Lists</a></li>
                      <li class="nav-item mx-0 mx-lg-1" v-if="isLoggedIn()"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="#search">Search Restaurants</a></li>
                      <li class="nav-item mx-0 mx-lg-1" v-if="!isLoggedIn()"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="#signup">Signup</a></li>                      
                      <li class="nav-item mx-0 mx-lg-1" v-if="!isLoggedIn()"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="#login">Login</a></li>
                      <li class="nav-item mx-0 mx-lg-1" v-if="isLoggedIn()" v-on:click="logout()" ><a class="nav-link py-3 px-0 px-lg-3 rounded" href="#login">Logout</a></li>
                  </ul>
              </div>
          </div>
      </nav>
        /* <!-- Masthead--> */
      <header class="masthead bg-primary text-white text-center">
          <div class="container d-flex align-items-center flex-column">
              <div v-if="!isLoggedIn()">              
                <h1 class="masthead-heading text-uppercase mb-0">Welcome to YummyList!</h1>
              </div>
              <div v-if="isLoggedIn()">              
                <h1 class="masthead-heading text-uppercase mb-0">Welcome back to YummyList {{ user.name}}!</h1>
              </div>              
              <!-- Icon Divider-->
              <div class="divider-custom divider-light">
                  <div class="divider-custom-line"></div>
                  <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                  <div class="divider-custom-line"></div>
              </div>
              <!-- Masthead Subheading-->
              <div v-if="!isLoggedIn()">              
                <p class="masthead-subheading font-weight-light mb-0">Search restaurants and save them to custom lists</p>
              </div>
          </div>
      </header>
    </div>
    <!-- ROUTER VIEW -->
    <router-view/>
    <footer class="footer text-center">
        <div class="container">
            <div class="row">
            </div>
        </div>
    </footer>    
  </div>
</template>

<script>
import axios from "axios"
export default {
  data: function() {
    return {
      user: ""
    };
  },
  created: function() {
    this.userShow()
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }      
    },
    logout: function() {
    console.log("logging out")
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");    
    window.location.reload();    
    },
    userShow: function() {
      axios.get(`/users/${localStorage.user_id}`).then((response) => {console.log(response)
      this.user = response.data;
      });
    } 
  }
}
</script>