<template>
    <div>
        <h2 v-for="post in posts">
            {{ post.title }} (ID: {{ post.id }})
        </h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: [
                    { id: 1, title: 'Vue.js is Awesome' },
                    { id: 2, title: 'Vuex is Pretty Nice Too' },
                    { id: 3, title: 'New Version of Vue.js Released' }
                ]
            };
        }
    }
</script>