<template>
  <div>
    <side-menu></side-menu>
    <AddBook></AddBook>
  </div>
</template>

<script>
import AddBook from '../../components/AddEditBook'
export default {
  components: {
    AddBook,
  },
}
</script>
<style lang='less' scoped>
@import '../../assets/less/app.less';
</style>