<template>
  <div class="svg-container">
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#${this.iconClass}`;
    }
  }
};
</script>

<style lang='less'>
.svg-container {
  text-align: center;
  .svg-icon {
    height: 18px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    line-height: 18px;
    vertical-align: middle;
  }
}
</style>
