<template>
  <div>
    <!-- List Section-->
    <div v-if="isLoggedIn()">
      <section class="page-section portfolio" id="your-lists">
          <div class="container">
              <!-- List Section Heading-->
              <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Your Lists</h2>
              <!-- Icon Divider-->
              <div class="divider-custom">
                  <div class="divider-custom-line"></div>
                  <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                  <div class="divider-custom-line"></div>
              </div>
              <!-- Create List -->
              <div id="createList">
                <p><input type="text" v-model="newListName.list_name" placeholder="List Name"></p>
                <button v-on:click="createListName()"> Create new list</button>
              </div>
              <br>
              <br>             
              <!-- List Grid Items-->
              <div class="row justify-content-center">
                  <!-- List Item 1-->
                  <div v-for="list in listNames" class="col-md-6 col-lg-4 mb-5">
                    <div class ="container" id="tile_name">
                      <h6>{{ list.list_name }}</h6>
                    </div>
                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1" v-on:click="showList(list)">
                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="assets/img/portfolio/cake.png" alt="..." />
                        </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
    <!-- List Modals-->
    <div v-if="isLoggedIn()">
      <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal1" aria-hidden="true">
          <div class="modal-dialog modal-xl">
              <div class="modal-content">
                  <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                  <div class="modal-body text-center pb-5">
                      <div class="container">
                          <div class="row justify-content-center">
                              <div class="col-lg-8">
                                  <!-- List Modal - Title-->
                                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">{{ currentList.list_name }}</h2>
                                  <!-- Icon Divider -->
                                  <div class="divider-custom">
                                      <div class="divider-custom-line"></div>
                                      <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                      <div class="divider-custom-line"></div>
                                  </div>
                                  <!-- List Modal - Image-->
                                  <!-- <img class="img-fluid rounded mb-5" src="assets/img/portfolio/cabin.png" alt="..." /> -->
                                  <!-- List Modal - Text-->
                                  <h6>
                                    <p class="mb-4" v-for="restaurant in currentList.restaurants"> {{ restaurant.restaurant_name }}<button v-on:click="removeRestaurant()">Remove restaurant</button></p>
                                    <button class="btn btn-primary" v-on:click="deleteList()">
                                        <i class="fas fa-times fa-fw"></i>
                                        Delete List
                                    </button>
                                  </h6>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  <!-- Search Restaurants Section-->
  <div v-if="isLoggedIn()">
    <section class="page-section" id="search">
        <div class="container">
            <!-- Search Section Heading-->
            <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Search Restaurants</h2>
            <!-- Icon Divider-->
            <div class="divider-custom">
                <div class="divider-custom-line"></div>
                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                <div class="divider-custom-line"></div>
            </div>
            <!-- List Dropdown-->
            <div id="search">
              <select v-model="listNameId">
                <option v-for="list in listNames" v-bind:value="list.id">{{ list.list_name }}</option>
              </select>
              <br>
              <br>
              <!-- Search Restaurants -->
              <div>
                <input type="text" v-model="filterValue">
                <button v-on:click="filter()"> Search restaurant</button>
                <div v-for ="restaurant in filterRestaurants">
                  <p>{{ restaurant.restaurant_name }}</p>
                  <button v-on:click="addToList(restaurant)"> Add to list</button>   
                </div>
              </div>
            </div>
        </div>
    </section>
  </div>
  <!-- Signup -->
  <br>
  <div v-if="!isLoggedIn()">
    <section class="page-section" id="signup">  
      <div class="container">
          <!-- Contact Section Heading-->
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Signup</h2>
          <!-- Icon Divider-->
          <div class="divider-custom">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>     
          </div>
          <br>
          <div class="signup">
            <form v-on:submit.prevent="submitSignup()">
              <h5>Please signup if you don't have an account</h5>                        
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div>
                <input type="text" v-model="newUserParams.name" placeholder="Name" />
              </div>
              <div>
                <input type="email" v-model="newUserParams.email" placeholder="Email"/>
              </div>
              <div>
                <input type="password" v-model="newUserParams.password" placeholder="Password"/>
              </div>
              <div>
                <input type="password" v-model="newUserParams.password_confirmation" placeholder="Password Confirmation"/>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
      </div>
    </section>
  </div>
  <br>
  <!-- Login -->
  <div v-if="!isLoggedIn()">
    <section class="page-section" id="login">  
      <div class="container">
          <!-- Contact Section Heading-->
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Login</h2>
          <!-- Icon Divider-->
          <div class="divider-custom">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>     
          </div>
          <div class="login">
            <div id="login">
              <form v-on:submit.prevent="submitLogin()">
                <h5>Welcome back! Please login</h5>
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
                <div>
                  <input type="email" v-model="newSessionParams.email" placeholder="email"/>
                </div>
                <div>
                  <input type="password" v-model="newSessionParams.password" placeholder="password"/>
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
      </div>
    </section>
  </div>

 </div>   
</template>

<style>
  #search {
text-align: center;
padding: 2em
  }
  #createList {
text-align: center;
padding: 2em
  }
#login {
text-align: center;
padding: 2em
}
#signup {
text-align: center;
padding: 2em
}
#tile_name {
  text-align: center
}
</style>

<script>
  import axios from "axios"
  export default {
    data: function () {
      return {
        message: "YummyList",
        newListName: {},
        listNames: [],
        restaurantLists: {},
        filterRestaurants: {},
        filterValue: "",
        listNameId: 0,
        restaurants: {},
        currentList: {},
        newSessionParams: {},
        errors: [],
        newUserParams: {},
      }
    },
    created: function () {
      this.indexListNames();
      this.indexRestaurantLists();
      this.indexRestaurants();
      axios.get("/list_names").then((response) => {
        console.log(response.data);
        this.listNames = response.data;
      });      
    },
    methods: {
      createListName: function () {
        axios.post("/list_names", this.newListName).then(response => {
          console.log("create list", response);
          this.listNames.push(response.data);
          this.newListName = {}
        }); 
      },
      indexListNames: function() {
        console.log("indexing user lists")
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
        });
      },
      goToShowRestaurantsList: function (list) {
        this.$router.push("/list_names/" + list.id);
      } ,
      indexRestaurantLists: function () {
        console.log("indexing restaurant lists")
        axios.get("/list_names/" + this.$route.params.id).then(response => {
          console.log(response.data);
          this.restaurantLists = response.data.restaurants
        });
      },
      indexRestaurants: function() {
        console.log("indexing restaurants")
        axios.get("/restaurants").then(response => {
          console.log(response.data);
          this.restaurants = response.data
          // this.filterRestaurants = this.restaurants
        });
      },   
      filter: function () {
        console.log(this.filterValue)
        this.filterRestaurants = []
        this.restaurants.forEach(restaurant => {
            if (restaurant.restaurant_name.includes(this.filterValue)) {
              this.filterRestaurants.push(restaurant);
            }
            else {
              then(response => {{"no matches"}})
              // console.log("no results alert");
              // alert("No restaurants found");
            }
        });        
      },
      addToList: function (restaurant) {
        var params = {
          restaurant_id: restaurant.id,
          list_name_id: this.listNameId
        }
        axios.post("/restaurant_lists", params).then(response => {
          console.log(response.data);
        })
        console.log("adding to list")
      },
      showList: function (list) {
       console.log("running show list")
       this.currentList = list;
      },
      submitLogin: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      },
      submitSignup: function () {
        axios
          .post("/users", this.newUserParams)
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      isLoggedIn: function() {
        if (localStorage.getItem("jwt")) {
          return true;
        } else {
          return false;
        }      
      },
      deleteList: function() {
        console.log("deleting list");
        axios.delete("/list_names/" + this.$route.params.id). then(response => {
          console.log(response.data);
          // window.location.reload();          
        });
      },
      removeRestaurant: function() {
        console.log("removing restaurant");
        axios.delete("/restaurant_lists/" + this.$route.params.id). then(response => {
          console.log(response.data);
          // window.location.reload();           
        });
      }
    }
  };
</script>