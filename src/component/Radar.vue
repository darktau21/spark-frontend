<template>
  <Radar :data="data" :options="options" :style="myStyles" />
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import * as chartConfig from './chartConfig.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default {
  name: 'App',
  components: {
    Radar,
  },
  data() {
    return chartConfig;
  },
  computed: {
    myStyles() {
      return {
        height: `${400}px`,
        position: 'relative',

        width: '100%',
      };
    },
  },
};
</script>
