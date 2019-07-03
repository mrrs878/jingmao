<template>
  <div>
    <side-menu></side-menu>
    <AddSecKill></AddSecKill>
  </div>
</template>

<script>
import AddSecKill from '../../components/AddEditSecKill'
export default {
  components: {
    AddSecKill,
  },
}
</script>
<style lang='less' scoped>
@import '../../assets/less/app.less';
</style>