<template>
  <div id="app">
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-3">
          <Nav v-bind:users="users"/>
        </div>
        <div class="col-md-6 offset-md-1">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Chat from '../components/Chat.vue';
  import Nav from '../components/Nav.vue';
  import io from 'socket.io-client';

  export default {
    name: 'home',
    components: {
      Chat,
      Nav
    },
    data() {
      return {
        user: {},
        users: [],
        socket: io('192.168.2.127:3000')
      }
    },
    methods: {
      connect() {
        this.user.name = prompt('Введите логин:', '');
        this.socket.emit('CONNECT', {
          user: this.user.name
        });
        this.socket.on('CONNECT', data => {
          this.user = data;
         });
        this.socket.on('NEW_CONNECT', data => {
          console.log(data);
          this.users = data.users.filter(user => user.id !== this.user.id)
        });
      }
    },
    beforeMount() {
      this.connect();
    },
    mounted() {

    }
  };
</script>
