<template>
  <div>
    <h1>
      فروشگاه 
    </h1>
    <h1 v-text="username"></h1>
    <v-container>
      <v-layout row wrap class="justify-center">
        <v-flex class="ml-1 mr-1" xs11 sm5 lg3>
          <tem-item></tem-item>
        </v-flex>
        <v-flex class="ml-1 mr-1" xs11 sm5 lg3>
          <tem-item></tem-item>
        </v-flex>
        <v-flex class="ml-1 mr-1" xs11 sm5 lg3>
          <tem-item></tem-item>
        </v-flex>
        <v-flex class="ml-1 mr-1" xs11 sm5 lg3>
          <tem-item></tem-item>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Item from './Items/Item';
import { mapActions } from 'vuex';

export default {
  data: function() {
    return {
      items: [
        {name: "1"},
        {name: "2"},
        {name: "3"},
        {name: "4"},
      ]
    }
  },
  components:{
    "tem-item": Item,
  },
  computed:{
    username: function() {
      return this.$route.params.user;
    }
  },
  methods: {
    ...mapActions(['getItemsOf']),
    getItemsOf_: function() {
      this.getItemsOf({username: this.username})
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getItemsOf_();
  }
}
</script>