<template>
  <div class="page-singup">
    <div class="container">
      <div class="wrapper">
        <form v-on:submit.prevent="singup">
          <h2>Singup</h2>
          <div class="field">
            <label for="emial">Email:</label>
            <input type="email" name="email" v-model="email">
          </div>
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password">
          </div>
          <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias">
          </div>
          <p v-if="feedback">{{feedback}}</p>
          <div class="field">
            <button>Singup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import slugify from 'slugify'
import database from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'singup',
  data(){
    return{
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    }
  },
  methods:{
    singup(){
      if(this.alias && this.email && this.password){
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
        let ref = database.collection('users').doc(this.slug)
        ref.get().then(doc =>{
          if(doc.exists){
            this.feedback = 'this alias already exists'
          }else{
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              let uid = firebase.auth().currentUser.uid
              ref.set({
                userId: uid,
                alias: this.alias
              })
            }).then(()=>{
              this.$router.push({
                name:'login'
              })
            })
            .catch(err => {
              this.feedback = err
            })
            this.feedback = 'this alias is free to use'
          }
        })
      }else{
        this.feedback = "you must enter all fields"
      }
    }
  }
}


</script>


<style scoped>
.page-singup{
  height: 80vh;
  display: flex;
  align-items: center;
}
h2{
  text-align: center;
  padding: 30px 0 30px 0;
  color: #333;
}
form{
  -webkit-box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  width: 500px;
  height: 400px;
  text-align: center;
  padding: 15px;
  background: white;
}
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
label{
  width: 100%;
}
input{
  width: 100%;
  border: none;
  border-bottom: 1px solid #3333336e;
}
form button{
  background: orange;
  width: 300px;
  margin: 30px 0 0 0;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 20px;
}
p{
  position: absolute;
  color: red;
}
</style>
