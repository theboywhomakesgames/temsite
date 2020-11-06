<template>
  <div v-if="isSeller">
    <h1>پنل فروشنده</h1>
    <br/>
    <h1 v-text="authObj.username"></h1>
  </div>
  <div v-else-if="isCli">
    <h1>پنل مشتری</h1>
  </div>
  <div v-else>
    <h1>دسترسی غیر مجاز</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'authObj',
    ]),
    isSeller: function() {
      return this.authObj !== null && this.authObj.isAuth && this.authObj.isSeller;
    },
    isCli: function() {
      return this.authObj && this.authObj.isAuth && !this.authObj.isSeller;
    }
  }
}
</script>