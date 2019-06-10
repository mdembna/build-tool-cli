<template>
  <component :is="tag" class="nav-item">
    <a :class="className" href="#" role="tab">
      <slot></slot>
    </a>
  </component>
</template>

<script>
import classNames from 'classnames';

const ScrollSpyListItem = {
  props: {
    tag: {
      type: String,
      default: "li"
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      return classNames(
        'nav-link',
        this.active && 'active'
      );
    }
  }
};

export default ScrollSpyListItem;
export { ScrollSpyListItem as mdbScrollspyListItem };
</script>

<style scoped>
</style>
