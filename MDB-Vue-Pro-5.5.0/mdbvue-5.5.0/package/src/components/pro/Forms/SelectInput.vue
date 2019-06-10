<template>
  <form :class="formClass" :novalidate="validation">
    <input type="text" readOnly :data-value="value" :value="text" :class="className" :disabled="disabled" />
    <div v-if="validFeedback" class="valid-feedback">
      {{validFeedback}}
    </div>
    <div v-if="invalidFeedback" class="invalid-feedback">
      {{invalidFeedback}}
    </div>
  </form>
</template>

<script>
import classNames from 'classnames';

const SelectInput = {
  name: 'SelectInput',
  props: {
    value: {
      type: [String, Number, Array]
    },
    text: {
      type: [String, Number, Array]
    },
    classes: {
      type: String
    },
    validation: {
      type: Boolean
    },
    valid: {
      type: Boolean
    },
    validFeedback: {
      type: [String, Boolean]
    },
    invalidFeedback: {
      type: [String, Boolean]
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    formClass() {
      return classNames(
        this.validation ? this.valid ? 'needs-validation is-valid': 'needs-validation is-invalid': false
      );
    },
    className() {
      return classNames(
        'select-dropdown',
        this.validation ? this.valid ? 'is-valid': 'is-invalid': false,
        this.classes
      );
    }
  }
};

export default SelectInput;
export { SelectInput as mdbSelectInput };
</script>

<style scoped>
.select-dropdown.is-valid {
  border-color: #28a745;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.select-dropdown.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='-2 -2 7 7'%3e%3cpath stroke='%23dc3545' d='M0 0l3 3m0-3L0 3'/%3e%3ccircle r='.5'/%3e%3ccircle cx='3' r='.5'/%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.needs-validation.is-valid .valid-feedback {
  display: block;
}
.needs-validation.is-invalid .invalid-feedback {
  display: block;
}
</style>
