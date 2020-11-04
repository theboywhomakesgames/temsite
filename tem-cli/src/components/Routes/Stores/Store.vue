<template>
  <div>
    <h1>
      فروشگاه 
    </h1>
    <h1 v-text="username"></h1>
  </div>
</template>

<script>
export default {
  computed:{
    username: function() {
      return this.$route.params.user;
    }
  }
}
</script>