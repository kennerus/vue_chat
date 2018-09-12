<template>
  <div class="list-group">
    <router-link to="/" exact-active-class="active" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      Общий
      <span class="badge badge-light">{{ users.length }}</span>
    </router-link>
    <router-link  :to="user.id" v-for="(user, index) in users" :key="index" exact-active-class="active" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      <span @click="setUser(user)">{{ user.name }}</span>
    </router-link>
  </div>
</template>

<script>
  import {store} from '../store';

  export default {
    data() {
      return {}
    },
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    methods: {
      setUser(user) {
        store.dispatch('SET_USER', user);
      }
    },
    mounted() {
      // console.log(this.users)
    }
  }
</script>