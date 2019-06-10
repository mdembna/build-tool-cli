<template>
  <div class="md-form">
    <i v-if="icon"
       :class="iconClassFix"
       />
    <input
      class="form-control mdb-autocomplete"
      type="text"
      v-model="search"
      v-on:input="onChange"
      @keyup.down="onArrowDown"
      @keyup.up="onArrowUp"
      @keyup.enter="onEnter"
      @focus="focus"
      @blur="blur"
      ref="autocompleteRef"
      :placeholder="placeholder"
     />
    <ul class="mdb-autocomplete-wrap"
        v-show="isOpen"
        >
      <li
        class="loading"
        v-if="isLoading">
        Loading results...
      </li>
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        :class="{'is-active': i === arrowCounter}"
      > {{result}}
      </li>
    </ul>
    <button class="clear" :style="{visibility: isClearVisible}"
       @click="handleClear"
    >
      <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xml="https://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </button>
    <label v-if="label"
          :class="{'active': isLabelActive}"
          @click="handleLabelClick"
    >{{label}}</label>
  </div>
</template>
<script>
import classNames from 'classnames';

const Autocomplete = {
  name: 'Autocomplete',
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    iconClass: {
      type: [String, Array],
      required: false
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
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
      isTouched: false,
      arrowCounter: -1,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    // searching functionality:
    onChange() {
      this.$emit('input', this.search);
      if (this.isAsync) {
        this.isLoading = true;
      } else if (this.search == '') {
        this.isOpen = false;
      } else {
        this.isOpen = true;
        this.filterResults();
      }
    },
    filterResults() {
      this.results = this.data.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('input', this.search);
    },
    // arrow keys functionality:
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter+1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
      this.$emit('input', this.search);
    },
    // outside click functionality:
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    // clear button functionality:
    handleClear() {
      this.search = "";
      this.isOpen = false;
      this.arrowCounter = -1;
      this.$emit('input', this.search);
    },

    // handle click:
    handleLabelClick() {
      this.$refs.autocompleteRef.focus();
      this.isTouched = true;
    },
    focus() {
      this.isTouched = true;
    },
    blur() {
      this.isTouched = false;
    },
  },
  watch: {
    data: (value, oldValue) => {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isLoading = false;
      }
    }
  },
  computed: {
    // label dynamic behavior:
    isLabelActive() {
      if (this.isTouched == true || this.placeholder || this.search !== '') {
        return true;
      }
      return false;
    },
    isClearVisible() {
      if (this.search) {
        return 'visible';
      } return 'hidden';
    },
    iconClassFix() {
      return classNames(
        this.far || this.regular ? 'far' :
          this.fal || this.light ? 'fal' :
            this.fab || this.brands ? 'fab' : 'fas',
        'prefix fa-' + this.icon,
        this.isTouched && 'active',
        this.iconClass
      );
    }
  }
};

export default Autocomplete;
export { Autocomplete as mdbAutocomplete };
</script>

<style>
  .is-active {
   background-color: #eeeeee;
  }
  .clear {
    position: absolute;
    z-index: 2;
    top: .5rem;
    right: 0;
    border: none;
    background: 0 0;
    padding-bottom: 0.2rem
  }
  .clear svg {
    fill: #a6a6a6;
  }
</style>
