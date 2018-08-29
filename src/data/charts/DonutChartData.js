import store from 'vuex-store'
import axios from 'axios'

let palette = store.getters.palette

let res = {
  "EC2":20,
  "EC3":12,
  "Elastic Cache": 3
}

export default {

  //labels: Object.keys(res),
  labels: ['MIERDADADAS', 'South America', 'Australia'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [palette.danger, palette.info, palette.success],
    data: [2478, 5267, 734]
  }]
}
