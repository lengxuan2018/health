import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



const state = {
  orderStatus : 1001
}


const getters = {
  getStatus(){
    return state.orderStatus
  }
};
const mutations = {
  changeStatus(state,newStatus){
    state.orderStatus = newStatus;
  }
};
const actions = {
  getNumStatus(context,status){
    context.commit('changeStatus',status)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});


export default store;
