import store from 'vuex-store'

let palette = store.getters.palette

let res = {
  "EC2":20,
  "EC3":12,
  "Elastic Cache": 3

}

export default {
  labels: Object.keys(res),
  //labels: ['North America', 'South America', 'Australia'],
  datasets: [{
    label: 'Population (millions)',
    backgroundColor: [palette.info, palette.warning, palette.primary],
    data: Object.values(res)
    //data: [3000, 6000, 1500]
  }]
}
