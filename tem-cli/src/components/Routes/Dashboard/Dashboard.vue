<template>
  <seller-panel v-if="isSeller" />
  <div v-else-if="isCli">
    <cli-panel/>
  </div>
  <div v-else>
    <h1>دسترسی غیر مجاز</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CliPanel from './Common/CliPanel.vue';
import SellerPanel from './Common/SellerPanel.vue';

export default {
  components: {
    "seller-panel": SellerPanel,
    "cli-panel": CliPanel
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