<template>
  <div class="container">
    <div class="login">
      <div id="login">
        <form v-on:submit.prevent="submit()">
          <h1>Login</h1>
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
</template>

<style>
  #login {
text-align: center;
padding: 2em
  }
</style>


<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        newSessionParams: {},
        errors: [],
      };
    },
    methods: {
      submit: function () {
        axios
          .post("/sessions", this.newSessionParams)
          .then((response) => {
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
            localStorage.setItem("jwt", response.data.jwt);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error.response);
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          });
      },
    },
  };
</script>
