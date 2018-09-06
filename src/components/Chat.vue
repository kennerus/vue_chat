<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <h3>Chat Group</h3>
                <hr/>
            </div>
            <div class="card-body">
                <div class="messages" v-for="(msg, index) in messages" :key="index">
                    <p><span class="font-weight-bold">{{ msg.user || 'server' }}: </span>{{ msg.message }}</p>
                </div>
            </div>
        </div>
        <p class="pl-3" v-show="typingUser">{{ typingUser }}</p>
        <div class="card-footer">
            <form @submit.prevent="sendMessage">
                <div class="gorm-group pb-3">
                    <label for="message">Message:</label>
                    <textarea id="message"
                           @keyup="checkUserTyping"
                           v-model="message"
                           class="form-control"
                    ></textarea>
                </div>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        data() {
            return {
                user: '',
                message: '',
                messages: [],
                typingUser: '',
                timeout: '',
                socket: io('192.168.0.122:3000')
            }
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();

                this.socket.emit('SEND_MESSAGE', {
                    user: this.user,
                    message: this.message
                });
                this.message = ''
            },
            takeUserName() {
                this.user = prompt('Введите логин:', '');
                this.socket.emit('TAKE_NAME', {
                    user: this.user
                })
            },
            checkUserTyping() {
                clearTimeout(this.timeout);
                this.socket.emit('TYPING', true);
                this.timeout = setTimeout(() => {
                    this.socket.emit('TYPING', false);
                }, 3000)
            },
        },
        mounted() {
            this.takeUserName();
            this.socket.on('TYPING', user => {
                this.typingUser = user.message;
            });
            this.socket.on('MESSAGE', (data) => {
                console.log(data);
                this.typingUser = '';
                this.messages = [...this.messages, data];
                // you can also do this.messages.push(data)
            });
        }
    };
</script>

<style>
    #message {
        height: 150px;
        resize: none;
    }
</style>
