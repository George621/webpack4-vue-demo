import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

 export const store = new Vuex.Store({
  state:{
    products:[
      {name:'章三',price:'200'},
      {name:'莉丝',price:'100'},
      {name:'王五',price:'90'},
      {name:'马六',price:'600'},
      {name:'三丰',price:'50'},
    ]
  }
})