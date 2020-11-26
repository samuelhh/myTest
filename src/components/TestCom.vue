<template>
  <div>
    <!-- {{ value }} -->
    testcom
    <!-- <el-button @click="handleClick">按钮</el-button> -->
    <slot name="foot"></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    han: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
      handleClick() {

          this.$emit("myclick","hanhui22222","jjjjjjjj")
      }
  },
};
</script>

<style lang="scss" scoped>
</style>