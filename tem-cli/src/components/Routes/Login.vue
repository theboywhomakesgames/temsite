<template>
  <div>
    <!-- <v-btn @click="toggleLoginDialog">ثبت نام</v-btn>
    <login-dialog></login-dialog> -->
  </div>
</template>

<script>
//import LoginDialog from '../Common/Auth/LoginDialog';
import { mapMutations } from 'vuex';

export default {
  data: function() {
    return {
      isReg: false
    }
  },
  methods: {
    ...mapMutations([
      'toggleLoginDialog'
    ])
  },
  components: {
    //'login-dialog': LoginDialog
  }
}
</script>