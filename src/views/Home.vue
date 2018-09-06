<template>
    <div id="app">
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-3">
                    <Nav/>
                </div>
                <div class="col-md-6 offset-md-1">
                    <Chat/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Chat from '../components/Chat.vue';
    import Nav from '../components/Nav.vue';

    export default {
        name: 'home',
        components: {
            Chat,
            Nav
        },
        data() {},
        methods: {
            connect() {

            }
        },
        mounted() {}
    };
</script>
