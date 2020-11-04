<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">ثبت نام</span>
        </v-card-title>
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
                  label="آدرس ایمیل*"
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
              @click="dialog = false"
            >
              ثبت نام
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
  }),
  methods: {
    ...mapMutations([
      'setLoginDialog'
    ])
  },
  computed: {
    dialog: {
      get: function() {
        return this.$store.state.login_dialog_open;
      },
      set: function(value) {
        return this.setLoginDialog({val: value});
      }
    }
  }
}
</script>

<style>
  .full-widther{
    width: 100%;
  }
</style>