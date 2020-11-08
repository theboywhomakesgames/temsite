<template>
  <v-card class="ma-4" outlined elevation="0" >
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
    <v-card-title>
      {{item.name}}
    </v-card-title>
    <v-card-text>{{item.description}}</v-card-text>
    <v-container>
      <v-chip color="secondary" v-for="(tg, idx) in item.tags" :key="idx">{{tg}}</v-chip>
      <v-switch
        v-model="sw"
        @change="changeHandler"
        inset
      ></v-switch>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: [ 'item', 'sw_', 'fetcher' ],
  data: function() {
    return {
      sw: this.sw_,
    };
  },
  computed: {
    ...mapState(['authObj'])
  },
  methods: {
    ...mapActions(['addItemToUser', 'removeItemsFromUser']),
    changeHandler: function() {
      console.log("change: ");
      console.log(this.sw);
      
      if(this.sw)
        this.addItem();
      else
        this.removeItem();
    },
    removeItem: function(){
      console.log("removing:");
      console.log(this.item);
      this.removeItemsFromUser({ username: this.authObj.username, items: [ this.item._id ] })
      .then(result => {
        this.fetcher();
      })
      .catch(err => {
        console.log(err);
      });
    },
    addItem: function() {
      this.addItemToUser({ username: this.authObj.username, items: [ this.item._id ] })
      .then(result => {
        this.fetcher();
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style>
  .tem-switch {
    direction: ltr;
  }
</style>