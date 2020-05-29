<template>
  <div class="page-navbar">
    <nav>
      <ul>
        <li v-if="!user"><router-link v-bind:to="{name: 'singup'}">Singup</router-link></li>
        <li v-if="!user"><router-link v-bind:to="{name: 'login'}">Login</router-link></li>
        <li v-on:click="logout" v-if="user">Logout</li>
        <li v-if="user"><router-link v-bind:to="{name: 'profile'}">{{user.email}}</router-link></li>
      </ul>
    </nav>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'navbar',
  data(){
    return{
      user: null,
      name: localStorage.getItem('username')
    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then( ()=> {
        this.$router.push({
          name: 'login'
        })
      })
    }
  },
  created(){
    let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      }else{
        this.user = null
        this.name = localStorage.clear('username')
      }
    })
  }
}

</script>
<style scoped>
.page-navbar{
  position: absolute;
  top: 0;
}
 ul{
   list-style-type: none;
   display: flex;
 }
 li{
   padding: 10px 10px 0 10px;
   font-size: 20px;
   color: #333;
 }
</style>
