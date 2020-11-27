<template>
  <seller-panel v-if="isSeller" />
  <div v-else-if="isCli">
    <h1>پنل مشتری</h1>
  </div>
  <div v-else>
    <h1>دسترسی غیر مجاز</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SellerPanel from './Common/SellerPanel.vue';

export default {
  components: {
    "seller-panel": SellerPanel
  },
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