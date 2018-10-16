<template>
    <div id="app">
        <notifications class="mt-2" position="top right" group="normal" />
        <notifications class="mt-5" position="top right" group="keep" />
        <router-view class="view"></router-view>
    </div>
</template>

<script>
import { USER_REQUEST } from './store/actions/user'

export default {
    created() {
        if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch(USER_REQUEST)
        }
    }
}
</script>