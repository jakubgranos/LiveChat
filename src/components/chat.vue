<template>
 <div class="page-chat">
   <h2>Have fun! {{this.newName}}</h2>
    <div class="container">
      <div class="wrapper">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" v-bind:key="message.id">
            <span class="name">{{message.name}}</span>
            <span class="msg">{{message.content}}</span><br>
            <span class="time">{{message.timestamp}}</span>
          </li>
        </ul>
        <div class="allAction">
          <message v-bind:email="email"/>
        </div>
      </div>
    </div>
    <div class="setName">
      <form v-on:submit.prevent="saveName">
      <label for="name">Ustaw swój Nick</label>
      <input type="text" v-model="name"><br>
      <button> Zapisz</button>
      <p>{{feedback}}</p>
    </form>
    </div>
 </div> 
</template>

<script>
import message from '@/components/messages'
import firebase from 'firebase'
import database from '@/firebase/init'
import moment from 'moment'
export default {
  name: 'Chat',
  props:  ['email'],
  components:{
    message
  },
  data () {
    return {
      user: null,
      messages: [],
      name: null,
      newName: localStorage.getItem('username'),
      feedback: null
    }
  },
  created(){
    //send message
    let ref = database.collection('Newmessage').orderBy('timestamp')
  // onsnapshot wysłuchuje nam zmiany w naszej kolekcji
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,

          })
        }
      });
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
.setName{
  text-align: center;
  width: 100%;
  padding: 30px 0 0 0;
}
.setName form button {
    background: white;
  width: 300px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  margin:  50px 0 0 0;
  color: #333;
  font-size: 20px;
}
h2{
  text-align: center;
  padding: 30px 0 30px 0;
  color: white;
}
.container{
  -webkit-box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  box-shadow: 3px 2px 29px -5px rgba(0,0,0,0.75);
  width: 100%;
  text-align: center;
  padding: 15px;
  background: white;
}
.messages {
  list-style-type: none;
  text-align: left;
  padding: 0px;
  margin: 0px;
  overflow-y: scroll;
  max-height: 500px;
}
.messages li{
  margin: 5px 0 5px 0;
}
.name{
  color: orange;
  font-size: 25px;
}
.msg{
  font-size: 20px;
  color: #353434e0;
}
.time{
  color: #3333336e;
}
.messages::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.messages::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.messages::-webkit-scrollbar-thumb
{
	background-color: #F90;	
	background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
	transparent 50%,
	rgba(255, 255, 255, .2) 50%,
	rgba(255, 255, 255, .2) 75%,
	transparent 75%,
	transparent)
}

</style>
