<template>
  <div class="diagram-wrapper">
    <Radar class="radar" :data="getData(results, prevResults)" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import { getData, options } from './chartConfig';

defineProps<
  Partial<{
    results: number[];
    prevResults: number[];
  }>
>();

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
</script>
<style scoped>
.radar {
  max-width: 75%;
}

.diagram-wrapper {
  display: grid;
  place-items: center;
}
</style>