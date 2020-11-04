<template>
  <div v-if="authObj !== null">
    <h1>خوش آمدید</h1>
    <br/>
    <h1 v-text="authObj.username"></h1>
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
  }
}
</script>