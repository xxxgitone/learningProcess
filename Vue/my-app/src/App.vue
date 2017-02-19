<template>
  <div id="app">

    <message>Hello There</message>

    <message>Hello There Again</message>

    <ul>
      
      <li v-for="info in infos" v-text="info"></li>

    </ul>


  </div>
</template>

<script>
import Message from './components/Message.vue';
import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$http =  axios;

export default {
  name: 'app',

  components: { Message },

  data() {
    
    return {
      infos: []
    }

  },

  mounted() {

    // axios.get('https://api.github.com/users/xxxgitone')
      // .then(response => this.infos = response.data)
    
    this.$http.get('https://api.github.com/users/xxxgitone')
      .then(response => this.infos = response.data)

  }


}

</script>

<style>

</style>
