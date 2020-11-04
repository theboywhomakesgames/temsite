<template>
  <div>
    <h1>
      آیتم
    </h1>
    <h1 v-text="item"></h1>
  </div>
</template>

<script>
export default {
  computed:{
    item: function() {
      return this.$route.params.item
    }
  }
}
</script>