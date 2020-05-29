<template>
 <div class="page-login">
   <div class="container wrapper">
     <form v-on:submit.prevent="login">
     <h1>Login</h1>
      <div class="field">
        <label for="emial">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p v-if="feedback">{{feedback}}</p>
      <div class="field">
        <button>Login</button>
      </div>
     </form>
   </div>
 </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'login',
  data () {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login(){
      if(this.email && this.password){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          this.$router.push({
            name: 'chat',
            params:{
              email:this.email
            }
          })
        }).catch(err => {
          this.feedback = err.message
        })
        this.feedback = null
      }else {
        this.feedback =" fill all fields"
      }
    }
  },
}
</script>
<style scoped>
.page-login{
  height: 80vh;
}
.wrapper{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}
h1{
  text-align: center;
  padding: 30px 0 0 0;
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
  position: relative;
  z-index: 10;
}

form input {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #333;
}
form button{
  background: orange;
  width: 300px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin:  50px 0 0 0;
  color: white;
  font-size: 20px;
}
p{
  color: red;
  font-size: 15px;
  padding: 10px;
  position: absolute;
}
</style>
