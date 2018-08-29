import store from 'vuex-store'
let palette = store.getters.palette

export default {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25','26','27'],
  datasets: [
    {
      label: 'AmortizedCost',
      backgroundColor: palette.danger,
      borderColor: palette.transparent,
      data: [0.21, 0.31, 0.19, 0.4, 0.326, 0.48, 0.512, 0.251, 0.621, 0.21, 0.341, 0.541, 0.81, 0.31, 0.19, 0.4, 0.326, 0.48, 0.512, 0.251, 0.621, 0.21, 0.341, 0.541, 0.81, 0.21, 0.31]
    }
  ]
}