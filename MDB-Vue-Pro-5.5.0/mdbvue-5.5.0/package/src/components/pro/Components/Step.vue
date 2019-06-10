<template>
  <div class="row">
    <div v-show="isShown" class="col-md-12">
      <keep-alive>
        <div>
          <slot></slot>
        </div>
      </keep-alive>
    </div>
  </div>
</template>

<script>
const Step = {
  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    activeStep: {
      type: Number,
      default: 1
    },
    number: {
      type: Number,
    },
    completed: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    far: {
      type: Boolean,
      default: false
    },
    regular: {
      type: Boolean,
      default: false
    },
    fal: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    brands: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stepNumber(){
      return this.number || this.$parent.$children.indexOf(this) + 1;
    },
    isShown() {
      return this.stepNumber == this.$parent.activeStep;
    }
  },
};

export default Step;
export { Step as mdbStep };
</script>

<style>
button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: none;
}
</style>
