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
              <v-col cols="12">
                <v-text-field
                  label="نام*"
                  v-model="fname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="نام خانوادگی*"
                  v-model="lname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="نام کاربری*"
                  v-model="username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="نام شهر*"
                  hint="نا معتبر بودن آدرس ممکن است موجب عدم ارسال درست شود. تم در این زمینه مسولیتی نمی پذیرد."
                  v-model="city"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="آدرس*"
                  hint="نا معتبر بودن آدرس ممکن است موجب عدم ارسال درست شود. تم در این زمینه مسولیتی نمی پذیرد."
                  v-model="address"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="کدپستی*"
                  hint="نا معتبر بودن کد پستی ممکن است موجب عدم ارسال درست شود. تم در این زمینه مسولیتی نمی پذیرد."
                  v-model="zipcode"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="تلفن تماس*"
                  hint="تلفن تماس برای پیگیری مشکلات احتمالی در ارسال. در صورت اشتباه بودن تلفن تم مسولیتی نمی پذیرد."
                  v-model="phone"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="گذرواژه*"
                  type="password"
                  v-model="password"
                  @keypress="tryReg"
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
                  @keypress="tryLogin"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>تکمیل فیلد های دارای * الزامی می باشد</small>
        </v-card-text>

        <v-alert
          class="ma-2"
          type="error"
          v-show="wrong_login > 0"
          v-text="err"
        >
          Hi
        </v-alert>

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
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  props: ['reg'],
  data: function() {
    return{
      tabidx: 0,
      setTab: false,
      fname: "",
      lname: "",
      username: "",
      password: "",
      address: "",
      zipcode: "",
      phone: "",
      city: "",
    }
  },
  methods: {
    ...mapMutations([
      'setLoginDialog'
    ]),
    ...mapActions([
      'attemptLogin', 'registerNewUser'
    ]),
    tryLogin: function(e) {
      if(e.keyCode === 13){
        this.login();
      }
    },
    tryReg: function(e) {
      if(e.keyCode === 13){
        this.register();
      }
    },
    login: async function() {
      this.attemptLogin({username: this.username, password: this.password});
    },
    register: function() {
      if(this.username.length > 3 && this.password.length > 5 && this.address.length > 5 && this.zipcode.length >= 9 && this.phone.length > 5)
        this.registerNewUser({
          fname: this.fname,
          lname: this.lname,
          username: this.username,
          password: this.password,
          address: this.address,
          zipcode: this.zipcode,
          phone: this.phone,
          city: this.city
        });
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
    },
    ...mapState(['err', 'wrong_login'])
  },
  watch: {
    dialog: function() {
      this.setTab = false;
    }
  }
}
</script>