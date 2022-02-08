import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
	GraphChart,
	BarChart,
	PieChart,
	ScatterChart,
	LineChart
} from 'echarts/charts';
import {
	GridComponent,
	TitleComponent,
	CalendarComponent,
	TooltipComponent,
	LegendComponent
} from 'echarts/components';

import Vue from 'vue';
import VChart from 'vue-echarts';

use([
	GridComponent,
	ScatterChart,
	CanvasRenderer,
	CalendarComponent,
	BarChart,
	GraphChart,
	PieChart,
	LineChart,
	TitleComponent,
	TooltipComponent,
	LegendComponent
]);

Vue.use(VChart);
