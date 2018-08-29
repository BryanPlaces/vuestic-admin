import store from 'vuex-store'

let palette = store.getters.palette

export default {
  labels: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
  datasets: [
    {
      label: 'AmortizedCost',
      backgroundColor: palette.primary,
      borderColor: palette.transparent,
      data: [0.7108341275, 0.3705501841, 0.1677762912, 0.0339885635, 0.0339885635, 0.0344555637, 0.0441099547]
    },
    {
      label: 'BlendedCost',
      backgroundColor: palette.info,
      borderColor: palette.transparent,
      data: [0.7108341275, 0.3705501841, 0.1677762912, 0.0339885635, 0.0339885635, 0.0344555637, 0.0441099547]
    },
    {
      label: 'UnblendedCost',
      backgroundColor: palette.danger,
      borderColor: palette.transparent,
      data: [0.7108341275, 0.3705501841, 0.1677762912, 0.0339885635, 0.0339885635, 0.0344555637, 0.0441099547]
    }       
  ]
}
