<template>
  <div id="app">
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