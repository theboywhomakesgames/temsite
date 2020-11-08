<template>
  <div>
    <h1 class="text-center mt-8">
      فروشگاه {{username}}
    </h1>
    <v-container>
      <v-layout row wrap class="justify-center">
        <v-flex class="ml-1 mr-1" xs11 sm5 lg3 v-for="(item, idx) in items" :key="idx">
          <tem-item :item="item" :username="username"></tem-item>
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
        this.items = result.data.items;
        if(this.items.length < 1){
          this.$router.push("/notfound");
        }
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