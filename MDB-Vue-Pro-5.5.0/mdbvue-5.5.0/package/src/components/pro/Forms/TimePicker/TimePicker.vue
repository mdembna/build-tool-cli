<template>
  <div class="md-form">
    <input
      type="text"
      :placeholder="placeholder"
      :id="id"
      :class="`form-control timepicker ${pickerDialogOpen ? 'picker__input picker__input--active' : ''}`"
      :value="value"
      @click="handlePickerDialogOpen"
      @keydown.stop.enter="handlePickerDialogOpen"
    />
    <label :for="id" class="active">{{ label }}</label>
    <div v-if="pickerDialogOpen" :class="`clockpicker picker ${pickerDialogOpen ? 'picker--opened' : ''}`" :style="pickerDialogOpen ? {} : {display: 'none'}">
      <div class="picker__holder">
        <div class="picker__frame">
          <div class="picker__wrap">
            <div class="picker__box" v-on-clickaway="away">
              <time-display :hours="computedHours" :color="color" :minutes="computedMinutes" :dayTime="dayTime" :unitsMode="unitsMode" @unitsMode="handleModeChange" :hoursFormat="hoursFormat" />
              <clockpicker-plate
                @minutes="handleMinutesChange"
                @hours="handleHoursChange"
                @change="handleModeChange"
                :hours="hours"
                :minutes="minutes"
                :unitsMode="computedMode"
                :color="color"
                :hoursFormat="hoursFormat"
              />
              <clockpicker-am-pm-block v-if="hoursFormat === 12" @dayTime="handleDayTimeChange" />
              <clockpicker-footer @doneClicked="handleDoneClicked" @clearClicked="handleClearClicked" :done="doneLabel" :clear="clearLabel" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeDisplay from './TimeDisplay';
import ClockpickerPlate from './ClockpickerPlate';
import ClockpickerAmPmBlock from './ClockpickerAmPmBlock';
import ClockpickerFooter from './ClockpickerFooter';
import { mixin as clickaway } from 'vue-clickaway';

const TimePicker = {
  props: {
    color: {
      type: String,
      default: 'primary-color'
    },
    placeholder: {
      type: String,
      default: 'Select time'
    },
    id: {
      type: String,
      default: 'timePickerInput'
    },
    label: {
      type: String
    },
    hoursFormat: {
      type: Number,
      default: 12
    },
    getValue: {
      type: Function
    },
    doneLabel: {
      type: String,
      default: 'Done'
    },
    clearLabel: {
      type: String,
      default: 'Clear'
    }
  },
  components: {
    TimeDisplay,
    ClockpickerPlate,
    ClockpickerAmPmBlock,
    ClockpickerFooter
  },
  data() {
    return {
      value: null,
      pickerDialogOpen: false ,
      unitsMode: 'h',
      dayTime: 'am',
      minutes: 0,
      hours: 12,
      ready: false
    };
  },
  mixins: [clickaway],
  computed: {
    computedMinutes () {
      return this.minutes < 10 ? `0${this.minutes.toString()}` : `${this.minutes.toString()}`;
    },
    computedHours () {
      return this.hours < 10 ? `0${this.hours.toString()}` : this.hours === 24 ? `00` : `${this.hours.toString()}`;
    },
    computedMode () {
      return this.unitsMode;
    }
  },
  methods: {
    handlePickerDialogOpen () {
      this.pickerDialogOpen = !this.pickerDialogOpen;
    },
    handleModeChange (mode) {
      this.unitsMode = mode;
    },
    handleDayTimeChange (dayTime) {
      this.dayTime = dayTime;
    },
    handleMinutesChange (minutes) {
      this.minutes = minutes;
      this.ready = true;
    },
    handleHoursChange (hours) {
      this.hours = hours;
    },
    handleDoneClicked() {
      this.value = this.hoursFormat === 12 ? `${this.computedHours}:${this.computedMinutes}${this.dayTime}` : `${this.computedHours}:${this.computedMinutes}`;
      this.unitsMode = 'h';
      this.emitValue(this.value);
      this.handlePickerDialogOpen();
    },
    handleClearClicked() {
      this.value = this.placeholder;
      this.unitsMode = 'h';
      this.emitValue(this.value);
      this.handlePickerDialogOpen();
    },
    emitValue(value) {
      this.$emit('getValue', value);
    },
    away() {
      this.pickerDialogOpen = false;
    },
    handleKeyup(e){
      switch (e.keyCode) {
        case 8:
          this.unitsMode = 'h';
          break;
        case 13:
          if (this.ready){
            this.handleDoneClicked();
            this.ready = false;
          };
          break;
        case 27:
          this.pickerDialogOpen = false;
          break;
      }
    }
  },
  updated(){
    if (this.pickerDialogOpen){
      setTimeout(() => window.addEventListener('keyup', this.handleKeyup), 800);
    }
    else {
      window.removeEventListener('keyup', this.handleKeyup);
    }
  }
};

export default TimePicker;
export { TimePicker as mdbTimePicker };
</script>