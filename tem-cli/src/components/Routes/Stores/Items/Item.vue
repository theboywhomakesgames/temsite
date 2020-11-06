<template>
  <v-card class="ma-4" outlined elevation="0" v-if="item !== null">
    <v-img height="200" :src="item.image_urls[0]"></v-img>
    <v-card-title>
      {{item.name}}
    </v-card-title>
    <v-card-text>{{item.description}}</v-card-text>
    <v-card-actions>
      <v-btn outlined>اطلاعات بیشتر و سفارش</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['item']
}
</script>