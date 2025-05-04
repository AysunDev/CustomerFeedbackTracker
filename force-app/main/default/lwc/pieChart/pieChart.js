import { LightningElement, wire } from 'lwc';
import getScoreDistribution from '@salesforce/apex/FeedbackScoreDistribution.getScoreDistribution';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS_v2';

export default class PieChart extends LightningElement {
  chart;
  chartJsInitialized = false;
  chartData = {};

  @wire(getScoreDistribution)
  wiredScores({ error, data }) {
    if (data) {
      this.chartData = data;
      if (this.chartJsInitialized) {
        this.renderChart();
      }
    } else if (error) {
      console.error('Pie chart data fetch error:', error);
    }
  }

  renderedCallback() {
    if (this.chartJsInitialized) {
      return;
    }

    this.chartJsInitialized = true;

    loadScript(this, ChartJS)
      .then(() => {
        if (this.chartData) {
          this.renderChart();
        }
      })
      .catch(error => {
        console.error('ChartJS load error (Pie):', error);
      });
  }

  renderChart() {
    const ctx = this.template.querySelector('canvas').getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new window.Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.chartData),
        datasets: [{
          data: Object.values(this.chartData),
          backgroundColor: [
            '#b2dfdb', '#a5d6a7', '#66bb6a', '#388e3c', '#1b5e20'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        animation: {
          duration: 0
        }
      }
    });
  }
}
