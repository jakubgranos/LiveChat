<template>
  <div class="page-profile">
    <h2>User Settings</h2>
    <form v-on:submit.prevent="saveName">
      <label for="name">Ustaw swój Nick</label>
      <input type="text" v-model="name">
      <button> Zapisz</button>
      <p>twój nick to: {{this.newName}}</p>
    </form>
    <h3><router-link to="/">Powrot</router-link></h3>
  </div>
</template>
<script>
import database from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'profile',
  data(){
    return{
      profile: null,
      name: null,
      newName: localStorage.getItem('username')
    }
  },
  created(){
    let user = firebase.auth().currentUser
    console.log(user)
    firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        this.profile = user
      }else{
        this.profile = null
      }
    })
  },
  methods:{
    saveName(){
      let newName = localStorage.setItem('username', this.name)
    }
  }
}
</script>
<style scoped>
.page-profile{
  padding: 70px 0 0 45px;
}
</style>

