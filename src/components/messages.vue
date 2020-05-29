<template>
  <div class="messeage">
    <form v-on:submit.prevent="addMessage">
      <label for="new-message">New message (enter to add)</label>
      <input type="text" name="new-message" v-model="newMessage">
      <p v-if="feedback">{{feedback}}</p>
    </form>
  </div>
</template>
<script>
import database from '@/firebase/init'
export default { 
  name: 'message',
  props: ['email'],
  data(){
    return {
      newMessage: null,
      feedback: null,
      name: localStorage.getItem('username')
    }
  },
  methods: {
    addMessage(){
      if(this.newMessage){
        database.collection('Newmessage').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        })
        this.newMessage = null
        this.feedback = null
      }else{
        this.feedback = "You cant send empty message!"
      }
    }
  }
}
</script>
<style scoped>
.messeage{
  padding: 10px 0 0 0;
  margin: 30px 0 0 0;
  text-align: left;
  color:  #3333336e;
}
label{
  width: 100%;
}
input{
  width: 100%;
  border: none;
  border-bottom: 1px solid #3333336e;
}
p{
  color: red;
  font-size: 15px;
  padding: 10px;
  margin: 0px;
  padding: 10px 0 0 0;
}
</style>

