<template>
  <div>
    <v-expansion-panels>

      <v-expansion-panel>
        <v-expansion-panel-header>
          فروشگاه من
        </v-expansion-panel-header>
        <v-expansion-panel-content>

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

        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header>
          دسته {{i}}
        </v-expansion-panel-header>

        <v-expansion-panel-content>
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
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
    <h1 v-text="username"></h1>
  </div>
</template>

<script>
import Item from './Common/ItemCard';
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
    ...mapActions(['getAllItems']),
    getItems: function(){
      this.getAllItems()
      .then(results => {
        console.log(results.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getItems();
  }
}
</script>