<template>
  <component :is="tag" :class="className">
    <slot></slot>
  </component>
</template>

<script>
import classNames from 'classnames';

const ScrollSpyBox = {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    classes: {
      type: String
    }
  },
  computed: {
    className() {
      return classNames(
        'scroll-box',
        this.classes
      );
    }
  }
};

export default ScrollSpyBox;
export { ScrollSpyBox as mdbScrollspyBox };
</script>

<style scoped>
</style>
