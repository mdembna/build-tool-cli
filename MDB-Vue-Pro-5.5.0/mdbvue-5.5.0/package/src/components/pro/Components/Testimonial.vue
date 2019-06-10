<template>
  <component :is="tag" :class="className"><slot></slot></component>
</template>

<script>
import classNames from 'classnames';

const Testimonial = {
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    className() {
      return classNames(
        'testimonial',
        this.classes
      );
    }
  }
};

export default Testimonial;
export { Testimonial as mdbTestimonial };
</script>

<style scoped>
</style>
