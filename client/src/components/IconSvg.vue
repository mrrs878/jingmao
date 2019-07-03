<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`
    },
  },
}
</script>
<style lang='less' scoped>
.svg-icon {
  height: 18px;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  vertical-align: middle;
}
</style>