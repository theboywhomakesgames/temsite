<template>
  <v-card class="ma-4" outlined elevation="0" >
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
    <v-card-title>
      آیتم
    </v-card-title>
    <v-card-text>تیشرت با طرح مادرت</v-card-text>
    <v-switch
      v-model="sw"
      inset
    ></v-switch>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      sw: false,
    };
  }
}
</script>

<style>
  .tem-switch {
    direction: ltr;
  }
</style>