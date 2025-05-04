import { LightningElement, wire } from 'lwc';
import getAverageScores from '@salesforce/apex/AgentScoreData.getAverageScores';
import { loadScript } from 'lightning/platformResourceLoader';
import ChartJS from '@salesforce/resourceUrl/ChartJS';

export default class AverageScoreChart extends LightningElement {
  chart;
  chartJsInitialized = false;
  chartData = [];

  @wire(getAverageScores)
  wiredScores({ error, data }) {
    if (data) {
      this.chartData = data.map(item => ({
        label: item.agentName,
        score: item.averageScore
      }));
      if (this.chartJsInitialized) {
        this.renderChart();
      }
    } else if (error) {
      console.error('Apex data fetch error:', error);
    }
  }

  renderedCallback() {
    if (this.chartJsInitialized) {
      return;
    }

    this.chartJsInitialized = true;

    loadScript(this, ChartJS)
      .then(() => {
        if (this.chartData && this.chartData.length > 0) {
          this.renderChart();
        }
      })
      .catch(error => {
        console.error('ChartJS load error:', error);
      });
  }

  renderChart() {
    const ctx = this.template.querySelector('canvas').getContext('2d');

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartData.map(item => item.label),
        datasets: [{
          label: 'Average Score',
          data: this.chartData.map(item => item.score),
          backgroundColor: '#28a745',
          borderColor: '#1e7e31',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 5
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
  }
}
