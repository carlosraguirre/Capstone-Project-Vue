<template>
  <div>
    <!-- Portfolio Section-->
    <section class="page-section portfolio" id="portfolio">
        <div class="container">
            <!-- Portfolio Section Heading-->
            <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Your Lists</h2>
            <!-- Icon Divider-->
            <div class="divider-custom">
                <div class="divider-custom-line"></div>
                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                <div class="divider-custom-line"></div>
            </div>
            <!-- Portfolio Grid Items-->
            <div class="row justify-content-center">
                <!-- Portfolio Item 1-->
                <div v-for="list in listNames" class="col-md-6 col-lg-4 mb-5">
                   <div class ="container">{{ list.list_name  }}</div>
                      <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                          <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                          </div>
                          <img class="img-fluid" src="assets/img/portfolio/cabin.png" alt="..." />
                      </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Portfolio Modals-->
    <!-- Portfolio Modal 1-->
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                <div class="modal-body text-center pb-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <!-- Portfolio Modal - Title-->
                                <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Log Cabin</h2>
                                <!-- Icon Divider-->
                                <div class="divider-custom">
                                    <div class="divider-custom-line"></div>
                                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                    <div class="divider-custom-line"></div>
                                </div>
                                <!-- Portfolio Modal - Image-->
                                <img class="img-fluid rounded mb-5" src="assets/img/portfolio/cabin.png" alt="..." />
                                <!-- Portfolio Modal - Text-->
                                <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                <button class="btn btn-primary" href="#!" data-bs-dismiss="modal">
                                    <i class="fas fa-times fa-fw"></i>
                                    Close Window
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- Contact Section-->
  <section class="page-section" id="contact">
      <div class="container">
          <!-- Contact Section Heading-->
          <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Search Restaurants</h2>
          <!-- Icon Divider-->
          <div class="divider-custom">
              <div class="divider-custom-line"></div>
              <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
              <div class="divider-custom-line"></div>
          </div>
          <!-- List Dropdown-->
          <select v-model="listNameId">
            <option v-for="list in listNames" v-bind:value="list.id">{{ list.list_name }}</option>
          </select>
          <!-- Searh Restaurants -->
          <div>
             <input type="text" v-model="filterValue">
             <button v-on:click="filter()"> Search restaurant</button>
             <div v-for ="restaurant in filterRestaurants">
               <p>{{ restaurant.restaurant_name }}</p>
               <button v-on:click="addToList(restaurant)"> Add to list</button>   
             </div>
          </div>
      </div>
  </section>    
 </div>   
</template>

<style></style>

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
        listNames: [],
        restaurants: {},        
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
      }            
    }
  };
</script>