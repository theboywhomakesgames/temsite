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
            <v-flex class="ml-1 mr-1" xs11 sm5 lg3 v-for="(itm, idx) in myItems" :key="idx">
              <tem-item :item="itm" :sw_="true" :fetcher="fetchWithServer"></tem-item>
            </v-flex>
          </v-layout>
        </v-container>

        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          محصولات دیگر
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-container>
            <v-text-field
              single-line
              label="جستجوی تگ"
              v-model="searchTerm"
            ></v-text-field>
            <v-layout row wrap class="justify-center">
              <v-flex class="ml-1 mr-1" xs11 sm5 lg3 v-for="(itm, idx) in otherItems" :key="idx">
                <tem-item :item="itm" :sw_="false" :fetcher="fetchWithServer"></tem-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import Item from './Common/ItemCard';
import { mapActions, mapState } from 'vuex';

export default {
  data: function() {
    return {
      allItems: [

      ],
      otherItems_: [

      ],
      myItems: [

      ],
      searchTerm: "",
    }
  },
  components:{
    "tem-item": Item,
  },
  computed:{
    ...mapState(['authObj']),
    otherItems: function() {
      if(this.searchTerm.length < 1)
        return this.otherItems_;
      else{
        let results = [];
        this.otherItems_.forEach(itm => {
          for(let i = 0; i < itm.tags.length; i++){
            let theTag = itm.tags[i];
            if(theTag.includes(this.searchTerm)){
              results.push(itm);
              break;
            }
          }
        });
        return results;
      }
    }
  },
  methods: {
    ...mapActions(['getAllItems', 'getItemsOf', 'checkAuth']),
    fetchWithServer: function() {
      this.myItems = [];
      this.otherItems_ = [];
          
      if(!this.authObj.isAuth){
        this.checkAuth({
          cb: () => {fetchMainPart.call(this);},
        })
      }else{
        fetchMainPart.call(this);
      }
    }
  },
  mounted() {
    this.fetchWithServer();
  }
}

const fetchMainPart = function() {
  if(this.authObj.isAuth && this.authObj.isSeller)
    this.getAllItems()
    .then(results => {
      this.allItems = results.data;

      this.getItemsOf({ username: this.authObj.username })
      .then(results => {
        let myItemIds = results.data.items;
        this.myItems = myItemIds;

        // TODO: turn to for
        this.allItems.forEach(el => {
          let flag = false;
          myItemIds.forEach(ell => {
            if(ell._id === el._id){
              flag = true;
            }
          });
          if(!flag)
            this.otherItems_.push(el);            
        });
      })
      .catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  else
    this.$router.push("/notfound");
}
</script>