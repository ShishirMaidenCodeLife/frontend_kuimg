

<template>
  <div>
    <div id="tsne-plot"></div>
  </div>
</template>

<script>
//npm install vue-plotly
import axios from 'axios';
import Plotly from 'plotly.js-dist';

export default {
  name: 'TagIntActDisplay',
  data() {
    return {
      words: [],
      embeddings: [],
      vectorSummaries: [],
    };
  },
  mounted() {
    // Fetch DataFrame from FastAPI endpoint
    axios.get('/dataFrame')
      .then(response => {
        // Check if the response contains data
        if (response.data) {
          const dataFrame = response.data;

          // Extract data from the dataFrame
          this.words = dataFrame.map(entry => entry.Tag);
          this.embeddings = dataFrame.map(entry => [entry["t-SNE_Dimension_1"], entry["t-SNE_Dimension_2"]]);
          this.vectorSummaries = dataFrame.map(entry => entry.Vector_Value);

          // Plot the t-SNE
          this.plotTSNE();
        } else {
          // Handle the case where the response doesn't contain data
          console.error('Failed to fetch DataFrame from the FastAPI endpoint.');
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching DataFrame:', error);
      });
  },
  methods: {
    plotTSNE() {
      const data = [];
      for (let i = 0; i < this.words.length; i++) {
        const word = this.words[i];
        const [x, y] = this.embeddings[i];
        const vecValue = this.vectorSummaries[i];
        const trace = {
          x: [x],
          y: [y],
          mode: 'markers',
          type: 'scatter',
          name: word,
          marker: { size: 10 },
          text: `${word}<br>Vector Value: ${vecValue.toFixed(2)}`,
        };
        data.push(trace);
      }

      const layout = {
        title: 'Word Embedding Axes Diagram using t-SNE (2D)',
        xaxis: { title: 't-SNE Dimension 1' },
        yaxis: { title: 't-SNE Dimension 2' },
        hovermode: 'closest',
      };

      Plotly.newPlot('tsne-plot', data, layout);
    },
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>
