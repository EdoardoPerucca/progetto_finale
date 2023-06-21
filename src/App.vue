<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<template>
  <div class="fluid-container">
    <AppHeader></AppHeader>

    <routerView></routerView>

    <AppFooter></AppFooter>

  </div>
</template>

<style scoped>

</style>
