<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-row align="center">
        <v-col sm="11" class="d-inline-flex flex-row align-center">
          <img class="logo" src="../assets/logo.png" />
          <v-toolbar-title>فروشگاه تم</v-toolbar-title>
        </v-col>
        <v-col sm="1" class="d-inline-flex flex-row justify-end">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item>
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>فروشگاه</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon class="ml-10">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>داشبورد</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>

<style>
.logo {
  width: 40px;
  margin-left: 10px;
}
</style>