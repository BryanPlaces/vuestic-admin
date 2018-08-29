import { HorizontalBar, mixins } from 'vue-chartjs'
import DefaultOptions from '../DefaultOptions'

export default HorizontalBar.extend({
  mixins: [mixins.reactiveProp],
  props: ['data', 'options', 'a'],

  data () {
    return {
      defaultOptions: {
      
      }
    }
  },
  
  mounted () {
    console.log(this.a)
    let options = Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
    this.renderChart(this.chartData, options)
  },
  /*
  watch: {
    a: () =>{ console.log('pacucooooss')
      let options=Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
      this.renderChart(this.a, options)
    }          
  },*/
})
