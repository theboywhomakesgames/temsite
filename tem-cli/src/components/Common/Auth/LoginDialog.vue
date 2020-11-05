<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>

        <v-tabs
          class="full-widther d-inline-flex justify-center"
          v-model="tab"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab>ثبت نام</v-tab>
          <v-tab>ورود</v-tab>
        </v-tabs>

        <div v-if="tab === 0">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="نام*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  label="نام خانوادگی*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="نام کاربری*"
                  hint="این نام فروشگاه شما خواهد بود"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="کدپستی*"
                  hint="نا معتبر بودن کد پستی ممکن است موجب عدم ارسال درست شود. تم در این زمینه مسولیتی نمی پذیرد."
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="آدرس*"
                  hint="نا معتبر بودن آدرس ممکن است موجب عدم ارسال درست شود. تم در این زمینه مسولیتی نمی پذیرد."
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="تلفن تماس*"
                  hint="تلفن تماس برای پیگیری مشکلات احتمالی در ارسال. در صورت اشتباه بودن تلفن تم مسولیتی نمی پذیرد."
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="گذرواژه*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>تکمیل فیلد های دارای * الزامی می باشد</small>
        </v-card-text>
        <v-card-actions class="full-widther">
          <v-spacer></v-spacer>
          <div class="full-widther d-inline-flex justify-center flex-row-reverse">
            <v-btn
              text
              @click="dialog = false"
            >
              انصراف
            </v-btn>
            <v-btn
              text
              @click="register"
            >
              ثبت نام
            </v-btn>
          </div>
        </v-card-actions>
        </div>

      <div v-if="tab === 1">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="نام کاربری*"
                  required
                  v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="گذرواژه*"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>تکمیل فیلد های دارای * الزامی می باشد</small>
        </v-card-text>
        <v-card-actions class="full-widther">
          <v-spacer></v-spacer>
          <div class="full-widther d-inline-flex justify-center flex-row-reverse">
            <v-btn
              text
              @click="dialog = false"
            >
              انصراف
            </v-btn>
            <v-btn
              text
              @click="login"
            >
              ورود
            </v-btn>
          </div>
        </v-card-actions>
      </div>
      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  props: ['reg'],
  data: function() {
    return{
      tabidx: 0,
      setTab: false,
      username: "",
      password: "",

    }
  },
  methods: {
    ...mapMutations([
      'setLoginDialog'
    ]),
    ...mapActions([
      'attemptLogin', 'registerNewUser'
    ]),
    login: function() {
      this.attemptLogin({username: this.username, password: this.password});
    },
    register: function() {
      
    },
  },
  computed: {
    dialog: {
      get: function() {
        return this.$store.state.login_dialog_open;
      },
      set: function(value) {
        return this.setLoginDialog({val: value});
      }
    },
    tab: {
      get:
        function() {
          return this.setTab? this.tabidx : this.reg ? 0 : 1;
        },
      set:
        function(value) {
          this.setTab = true;
          this.tabidx = value;
        }
    }
  },
  watch: {
    dialog: function() {
      this.setTab = false;
    }
  }
}
</script>

<style>

</style>