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
              <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-7">
                    <div class="form-floating mb-3" id="createList">
                      <input class="form-control" type="text" v-model="newListName.list_name" placeholder="List name">
                      <label for="name">List name</label>
                      <br>
                      <button class="btn btn-primary btn-xl" id="submitButton" v-on:click="createListName()"> Create new list</button>
                    </div>
                </div>
              </div>
              <br>
              <br>
              <br>
              <br>                 
              <!-- List Grid Items-->
              <div class="row justify-content-center">
                  <!-- List Item -->
                  <div id="listMessageCentered" v-if="noList()">
                    <h4>{{ noListMessage }}</h4>
                  </div>                   
                  <div v-for="list in listNames" class="col-md-6 col-lg-4 mb-5">                  
                    <div class ="container" id="tile_name">
                      <h5>{{ list.list_name }}</h5>
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
                                  <!-- List Modal - Text-->
                                  <h6>
                                    <p class="mb-4" v-for="restaurant in currentList.restaurants">{{ restaurant.restaurant_name }}
                                    <br>
                                    </p>
                                    <button class="btn btn-primary" v-on:click="deleteList(currentList)">
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
              <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-7">
                    <div class="form-floating mb-3" id="searchRestaurant">
                      <input class="form-control" type="text" v-model="filterValue" placeholder="Search restaurant">
                      <label for="name">Search restaurant</label>
                      <br>
                      <button class="btn btn-primary btn-xl" id="submitButton" v-on:click="filter()"> Search restaurant</button>
                      <div v-for ="restaurant in filterRestaurants">
                        <br>
                        <h5>{{ restaurant.restaurant_name }}</h5>
                        <h6>{{ restaurant.address }}</h6>
                        <button v-on:click="saveToList(restaurant)"> Save to list</button>                
                      </div>
                    </div>
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
          <h5>Welcome! Please sign up for an account and then login below.</h5>
          <br>
          <div class="signup">
            <form v-on:submit.prevent="submitSignup()">            
              <div class="row justify-content-center">
                <div class="col-lg-8 col-xl-7">
                  <!-- Name Input -->
                  <div class="form-floating mb-3">
                      <input class="form-control" id="name" type="text" placeholder="Name" v-model="newUserParams.name" />
                      <label for="name">Name</label>
                  </div>
                  <!-- Email Input -->
                  <div class="form-floating mb-3">
                      <input class="form-control" id="email" type="email" placeholder="Email" v-model="newUserParams.email" />
                      <label for="email">Email</label>
                  </div>
                  <!-- Password Input -->
                  <div class="form-floating mb-3">
                      <input class="form-control" id="password" type="password" placeholder="Password" v-model="newUserParams.password" />
                      <label for="password">Password</label>
                  </div>
                  <!-- Password Confirm Input -->
                  <div class="form-floating mb-3">
                      <input class="form-control" id="password confirmation" type="password" placeholder="Password confirmation" v-model="newUserParams.password_confirmation" />
                      <label for="password confirmation">Password confirmation</label>
                  </div>
                  <button class="btn btn-primary btn-xl" type="submit" value="Submit">Submit</button>                                                  
                </div>
              </div>
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
          <h5>Welcome back! Please login</h5>          
          <div class="login">
            <div id="login">
              <form v-on:submit.prevent="submitLogin()">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-xl-7">                
                    <ul>
                      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                    <!-- Email Input -->
                    <div class="form-floating mb-3">
                      <input class="form-control" type="email" v-model="newSessionParams.email" placeholder="email"/>
                      <label for="email">Email</label>                      
                    </div>
                    <!-- Password Input  -->
                    <div class="form-floating mb-3">
                      <input class="form-control" type="password" v-model="newSessionParams.password" placeholder="password"/>
                      <label for="password">Password</label>                      
                    </div>
                    <button class="btn btn-primary btn-xl" type="submit" value="Submit">Submit</button> 
                  </div>
                </div>
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
text-align: center
  }
#createList {
text-align: center
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
#searchRestaurant {
text-align: center
  }
#listMessageCentered {
text-align: center
  }
#restaurantListMessageCentered {
text-align: center
  }
#restaurantMessageCentered {
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
        restaurants: [],
        currentList: {},
        newSessionParams: {},
        errors: [],
        newUserParams: {},
        noListMessage: ""
      }
    },
    created: function () {
      this.indexListNames();
      this.indexRestaurantLists();
      this.indexRestaurants();
      this.noList();
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
        axios.get("/list_names").then(response => {
          console.log(response.data);
          this.listNames = response.data
        });
      },
      noList: function() {
        var list = this.listNames
        if(list.length == 0){
          this.noListMessage = "You have not created any lists yet"
          return true
        } else {
          this.noListMessage = ""
          return false
        }
      },
      goToShowRestaurantsList: function (list) {
        this.$router.push("/list_names/" + list.id);
      },
      indexRestaurantLists: function () {
        axios.get("/list_names/" + this.$route.params.id).then(response => {
          console.log(response.data);
          this.restaurantLists = response.data.restaurants;
        });
      },
      indexRestaurants: function() {
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
              this.filterRestaurants.push(restaurant)
            }         
        });        
      },
      saveToList: function (restaurant) {
        var params = {
          restaurant_id: restaurant.id,
          list_name_id: this.listNameId
        }
        axios.post("/restaurant_lists", params).then(response => {2
          console.log(response.data);
          window.location.reload();
        }).then(() => {
          alert("Restaurant saved to list")
        });
      },     
      showList: function (list) {
       this.currentList = list;
      },
      submitLogin: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            this.$router.push("#page-top");
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
      deleteList: function(listName) {
        console.log(listName);
        axios.delete(`/list_names/${listName.id}`, listName). then(response => {
          console.log(response.data);
          window.location.reload();                
        });
      },
      removeRestaurant: function(restaurant_id, currentList) {
        axios.delete("/restaurant_lists/" + restaurant_id.id, {list:currentList.id}).then(response => {
          console.log(response.data);       
        });
      }
    }
  };
</script>