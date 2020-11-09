<template>
  <v-container>
    <h1>سفارش با موفقیت ثبت شد</h1>
    <h1>کد رهگیری {{ticketId}}</h1>
  </v-container>
</template>

<script>
export default {
  computed: {
    ticketId: function() {
      console.log(this.$route.params.id);
      return this.$route.params.id;
    }
  }
}
</script>