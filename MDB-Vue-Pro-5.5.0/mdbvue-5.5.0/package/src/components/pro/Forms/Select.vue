<template>
  <component :is="outerTag" :class="outerClasses">
    <component :is="tag" :class="wrapperClasses" :style="wrapperStyles" v-on-clickaway="away">
      <span :class="caretClasses">▼</span>
      <mdb-select-input @click.native="toggleOptions" :text="inputText" :value="inputValue" :disabled="disabled" :validation="wasValidated" :valid="valid" :validFeedback="validFeedback" :invalidFeedback="invalidFeedback" />
      <transition @enter="enter" @afterEnter="afterEnter" @before-leave="beforeLeave">
        <keep-alive>
          <mdb-select-options v-if="toggle" :search="search" :searchPlaceholder="searchPlaceholder" @select="getSelectedOption" @allSelect="allSelect" class="collapse-item">
            <mdb-select-option v-if="multiple && selectAll" :multiple="multiple" selectAll :active="selectAllState">{{selectAllPlaceholder}}</mdb-select-option>
            <mdb-select-option v-for="(option, index) in data" :multiple="multiple" :value="option.value" :disabled="option.disabled" :active="option.selected" :icon="option.icon" :optgroup="option.optgroup" :key="index">{{option.text}}</mdb-select-option>
            <slot></slot>
            <mdb-btn v-if="multiple && btnSave" save color="primary" size="sm" @click.native="toggle = !toggle">{{btnSavePlaceholder}}</mdb-btn>
          </mdb-select-options>
        </keep-alive>
      </transition>
    </component>
    <label v-if="label" :class="labelClasses">{{label}}</label>
  </component>
</template>

<script>
import classNames from 'classnames';
import mdbSelectInput from './SelectInput';
import mdbSelectOptions from './SelectOptions';
import mdbSelectOption from './SelectOption';
import mdbBtn from '../../Components/Button';
import { mixin as clickaway } from 'vue-clickaway';

const Select = {
  name: 'Select',
  components: {
    mdbSelectInput,
    mdbSelectOptions,
    mdbSelectOption,
    mdbBtn
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },
    options: {
      type: Array
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    selectAllPlaceholder: {
      type: String,
      default: 'Select all'
    },
    color: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: 'Search here...'
    },
    wrapperClass: {
      type: String
    },
    wrapperStyle: {
      type: String
    },
    caretClass: {
      type: String
    },
    caretStyle: {
      type: String
    },
    getValue: {
      type: Function
    },
    limitPlaceholder: {
      type: String,
      default: 'options selected'
    },
    btnSavePlaceholder: {
      type: String,
      default: 'Save'
    },
    value: {
      type: Array
    },
    validation: {
      type: Boolean
    },
    customValidation: {
      type: Boolean
    },
    isValid: {
      type: Boolean
    },
    validFeedback: {
      type: [String, Boolean],
      default: false
    },
    invalidFeedback: {
      type: [String, Boolean],
      default: false
    },
    outline: {
      type: Boolean
    },
    label: {
      type: [Boolean, String]
    },
    labelClass: {
      type: String
    },
    outerClass: {
      type: String
    },
    outerTag: {
      type: String,
      default: 'div'
    },
    btnSave: {
      type: Boolean,
      default: true
    }
  },
  mixins: [clickaway],
  data() {
    return {
      toggle: false,
      inputValue: null,
      inputText: null,
      selectAllState: false,
      preselectedIndex: 0,
      defaultIndex: 0,
      defaultMultiIndexes: [],
      multiValues: [],
      multiTexts: [],
      valid: false,
      wasValidated: false
    };
  },
  computed: {
    data() {
      return this.options || this.value;
    },
    wrapperClasses() {
      return classNames(
        'select-wrapper md-form',
        this.color ? 'colorful-select dropdown-' + this.color : '',
        this.outline && 'md-outline',
        this.wrapperClass
      );
    },
    wrapperStyles() {
      return this.wrapperStyle;
    },
    caretClasses() {
      return classNames(
        'caret',
        this.disabled ? 'disabled' : '',
        this.caretClass
      );
    },
    caretStyles() {
      return this.caretStyle;
    },
    active() {
      let checkPreselected = false;
      this.data.forEach(option => {
        if (option.selected === true) {
          checkPreselected = true;
        }
      });
      if (checkPreselected) return true;
      if (this.toggle) return true;
      return false;
    },
    checked() {
      if (this.toggle) {
        return true;
      }
      return false;
    },
    labelClasses() {
      return classNames(
        'mdb-main-label',
        this.active && 'active',
        this.checked && 'active-check',
        this.labelClass
      );
    },
    outerClasses() {
      return classNames(
        'select-outer',
        this.outline && 'select-outline',
        this.outerClass
      );
    }
  },
  created() {
    this.checkDefaultMultiData();
    this.renderInput();
  },
  methods: {
    toggleOptions() {
      if (this.disabled) return;
      this.toggle = !this.toggle;
    },
    checkDefaultMultiData() {
      if (!this.multiple) return;
      if (this.data.length === 0) return;
      this.data.forEach((option, index) => {
        if (option.selected === true) {
          this.defaultMultiIndexes.push(index);
        }
      });
    },
    multiOptionsUpdate() {
      this.multiValues = [];
      this.multiTexts = [];
      this.data.forEach(option => {
        if (option.selected === true) {
          if (option.disabled) return;
          this.multiValues.push(option.value);
          this.multiTexts.push(option.text);
        }
      });
    },
    renderInput() {
      if (this.label && !this.active) {
        this.inputValue = null;
        this.inputText = '';
        return;
      }
      if (this.data.length === 0) return;
      if (this.multiple) {
        this.multiOptionsUpdate();
        if (this.multiValues.length === 0) {
          this.selectFirstAvailableOption();
        }
        this.checkAllSelected();
        this.checkNumberOfSelected();
        this.inputValue = this.multiValues;
      } else {
        this.selectFirstAvailableOption();
        this.inputValue = this.data.find(x => x.selected === true).value;
        this.inputText = this.data.find(x => x.selected === true).text;
      }
    },
    selectFirstAvailableOption() {
      if (this.multiple) {
        this.multiValues = [];
        this.mulitTexts = [];
        if (typeof this.data.find(x => x.selected === true) == 'undefined') {
          this.data[this.preselectedIndex].selected = true;
          this.multiValues.push(this.data[this.preselectedIndex].value);
          this.multiTexts.push(this.data[this.preselectedIndex].text);
        } else {
          this.multiValues.push(this.data.find(x => x.selected === true).value);
          this.multiTexts.push(this.data.find(x => x.selected === true).text);
        }
      } else {
        let checkPreselected = false;
        this.data.forEach((option, index) => {
          if (option.selected === true) {
            checkPreselected = true;
            this.preselectedIndex = index;
          }
        });
        if (checkPreselected === false) {
          if (this.label) return;
          this.preselectedIndex = 0;
          this.data[this.preselectedIndex].selected = true;
          this.$set(this.data, this.preselectedIndex, this.data[this.preselectedIndex]);
        }
      }
    },
    checkAllSelected() {
      let checkAllSelected = true;
      this.data.forEach(option => {
        if (option.disabled) return;
        if (option.selected !== true) {
          checkAllSelected = false;
        }
      });
      if (checkAllSelected === true) {
        this.selectAllState = true;
      } else {
        this.selectAllState = false;
      }
    },
    checkNumberOfSelected() {
      if (this.multiValues.length > 4) {
        this.inputText = this.multiValues.length + ' ' + this.limitPlaceholder;
      } else {
        this.inputText = this.multiTexts;
      }
    },
    getSelectedOption(value, text) {
      if (this.multiple) {
        this.data.forEach(option => {
          if (option.selected === true && option.disabled === true) {
            option.selected = false;
          }
        });
        let currentOption = this.data.find(x => x.value === value);
        let currentOptionIndex = this.data.findIndex(x => x.value === value);
        let currentOptionObject = this.data[currentOptionIndex];

        if (currentOption.selected === true) {
          currentOptionObject.selected = false;
        } else {
          currentOptionObject.selected = true;
        }

        this.renderInput();
        this.update();

      } else {
        
        this.data.forEach(option => {
          option.selected = false;
        });
        this.$set(this.data.find(x => x.value === value), 'selected', true);
        this.inputValue = value;
        this.inputText = text;

        this.update();
        this.$emit('change', this.inputValue, this.inputText);
        this.away();
      }
    },
    allSelect() {
      this.multiValues = [];
      this.multiTexts = [];

      if (this.selectAllState) {
        this.data.forEach(option => {
          option.selected = false;
        });
        this.data[this.preselectedIndex].selected = true;
        this.multiValues.push(this.data[this.preselectedIndex].value);
        this.multiTexts.push(this.data[this.preselectedIndex].text);
        this.selectAllState = false;
      } else {
        this.data.forEach(option => {
          if (option.disabled === true) {
            option.selected = false;
            return;
          } 
          option.selected = true;
          this.multiValues.push(option.value);
          this.multiTexts.push(option.text);
        });
        this.selectAllState = true;
      }

      this.checkNumberOfSelected();
      this.inputValue = this.multiValues;
      this.update();
      this.$emit('getValue', this.multiValues, this.multiTexts);
    },
    away() {
      this.toggle = false;
    },
    enter(el) {
      el.style.opacity = '0';
    },
    afterEnter(el) {
      el.style.opacity = '1';
    },
    beforeLeave(el) {
      el.style.opacity = '0';
    },
    update() {
      this.data.push({x: false});
      this.data.pop();
      this.validate();
    },
    emitData() {
      if (this.multiple) {
        this.$emit('getValue', this.multiValues, this.multiTexts);
        this.$emit('change', this.multiValues, this.multiTexts);
      } else {
        this.$emit('getValue', this.inputValue, this.inputText);
        this.$emit('change', this.inputValue, this.inputText);
      }  
    },
    reset() {
      if (this.multiple) {
        this.multiValues = [];
        this.multiTexts = [];
        this.data.forEach((option, index) => {
          if (this.defaultMultiIndexes.includes(index)) {
            option.selected = true;
            this.multiValues.push(this.data[index].value);
            this.multiTexts.push(this.data[index].text);
          } else {
            option.selected = false;
          }
        });
        this.selectAllState = false;
        this.checkNumberOfSelected();
        this.inputValue = this.multiValues;
        this.update();
        this.$emit('getValue', this.multiValues, this.multiTexts);
      } else {
        this.data[this.defaultIndex].selected = true;
        this.$set(this.data, this.defaultIndex, this.data[this.defaultIndex]);
        this.renderInput();
        this.emitData();
        this.validate();
      }
    },
    validate() {
      if (this.validation) {
        if (this.multiple) {
          for (let x of this.data) {
            if (x.selected === true && x.disabled === true) {
              this.valid = false;
              break;
            }
            this.valid = true;
          }
        } else if (this.data.find(x => x.selected === true).disabled === true) {
          this.valid = false;
        } else {
          this.valid = true;
        }
        this.wasValidated = true;
      }
      if (this.customValidation) {
        if (this.isValid) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        this.wasValidated = true;
      }
    },
    getValues() {
      if (this.multiple) {
        return [this.multiValues, this.multiTexts];
      }
      return [this.inputValue, this.inputText]; 
    }
  },
  watch: {
    options() {
      this.renderInput();
    },
    value(val) {
      this.renderInput();
    },
    data() {
      this.emitData();
    },
    isValid() {
      this.validate();
    }
  }
};

export default Select;
export { Select as mdbSelect };
</script>

<style scoped>
.collapse-item {
  position: absolute;
  top: 0;
  z-index: 9999;
  width: 100%;
  transition: .2s;
}
.select-wrapper+label.active {
  font-size: 0.8rem;
}
.md-outline.select-wrapper+label {
  top: 1.35em !important;
  font-size: 14px;
}
.md-outline.select-wrapper+label.active {
  top: .5em !important;
  font-size: 11px;
  z-index: 2 !important;
}
</style>

<style>
.select-outer+label:not(.mdb-main-label) {
  position: absolute;
  top: 7px;
  font-size: 0.8rem; 
}
</style>