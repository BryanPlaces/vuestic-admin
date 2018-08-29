<template>
  <div class="dashboard">

    <!-- <dashboard-info-widgets></dashboard-info-widgets> -->

    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs
        :names="[$t('dashboard.dataVisualization'), $t('Insert Keys')]"
        ref="tabs">
        <div :slot="$t('dashboard.dataVisualization')">
          <data-visualisation-tab></data-visualisation-tab>
        </div>
        <!-- <div :slot="$t('dashboard.usersAndMembers')">
          <users-members-tab></users-members-tab>
        </div> -->
        <div :slot="$t('Insert Keys')">
          <setup-profile-tab></setup-profile-tab>
        </div>
        <!-- <div :slot="$t('dashboard.features')">
          <features-tab></features-tab>
        </div> -->
      </vuestic-tabs>
        <div v-if="messageAlert != ''">
            <label><b>{{messageAlert}}</b></label>
        </div>      
    </vuestic-widget>


    <div class="row">
      <!-- <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per day' | translate">
          <vuestic-chart :data="verticalBarChartData" type="vertical-bar"></vuestic-chart>
          <button v-on:click="awsapiCallDay">Peticion</button>
        </vuestic-widget>
      </div> -->
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per month' | translate">
          <input id="date" type="date" v-model="fechaInicial" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          <input id="date" type="date" v-model="fechaFinal" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          <button v-on:click="awsapiCall">Peticion</button>

          <vuestic-chart :data="horizontalBarChartData" type="horizontal-bar"></vuestic-chart>
        </vuestic-widget>
      </div>
    </div>

    <!-- <dashboard-bottom-widgets></dashboard-bottom-widgets> -->

  </div>
</template>

<script>
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import UsersMembersTab from './users-and-members-tab/UsersMembersTab.vue'
  import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
  import FeaturesTab from './features-tab/FeaturesTab.vue'
  import DataVisualisationTab from './data-visualisation-tab/DataVisualisation.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  import VerticalBarChartData from 'data/charts/VerticalBarChartData'
  import HorizontalBarChartData from 'data/charts/HorizontalBarChartData'

  import axios from 'axios'


  import store from 'vuex-store'
  let palette = store.getters.palette
  console.log("yaco el puto x100")
  console.log(palette)

  export default {
    name: 'dashboard',

    data() {
      return {
        verticalBarChartData: VerticalBarChartData,
        horizontalBarChartData: HorizontalBarChartData,
        messageAlert:'',
        publickey:'',
        privatekey:'',
        cost:'',
        fechaInicial:'',
        fechaFinal:''

      }
    },
    components: {
      DataVisualisationTab,
      DashboardInfoWidgets,
      UsersMembersTab,
      SetupProfileTab,
      FeaturesTab,
      DashboardBottomWidgets,
    },
    created() {
      this.getUser();
    },
    //watch: this.horizontalBarChartData,

    methods: {
      launchEpicmaxToast () {
        this.showToast(`Let's work together!`, {
          icon: 'fa-star-o',
          position: 'top-right',
          duration: Infinity,
          action: {
            text: 'Hire us',
            href: 'http://epicmax.co/#/contact',
            class: 'vuestic-toasted-link'
          }
        })
      },
      
      getUser() {
        axios.get(process.env.ROOT_API + `/secure/users/` + this.$route.params.id, {headers:{Authorization:this.$route.params.token}})
          .then( res => {
            if (res.data.isActive == false) {
              this.messageAlert = "Tu correo no está verificado, por favor, verificalo para poder continuar"
            }else{
              if(res.data.publicAWSKey != null || res.data.publicAWSKey != "" && res.data.privateAWSKey != null || res.data.privateAWSKey != "") {
                this.publickey = res.data.publicAWSKey;
                this.privatekey = res.data.privateAWSKey;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      awsapiCall(){
        axios.get(process.env.ROOT_API +'/awsapi/?publicAWSKey='+this.publickey+'&privateAWSKey='+ this.privatekey, {headers:{Authorization:this.$route.params.token}})
        .then( res =>  {
          this.cost=res.data.ResultsByTime

          console.log("Llamada a awsapiCall()")
          let diaInicial = parseInt(this.fechaInicial.substring(8,10))
          let diaFinal = parseInt(this.fechaFinal.substring(8,10))

          let diasMostrar = [];
          let c = 0;
          for (let i = (diaInicial-1); i < (diaFinal-1); i++) {
            diasMostrar[c] = parseFloat(this.cost[i].Total.AmortizedCost.Amount)
            console.log(diasMostrar[c] + "        ---------------")
            c++
            
          }
          console.log("dia inicial " + diaInicial)

          let horizontal= {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24','25','26','27'],
            datasets: [
              {
                label: 'AmortizedCost',
                backgroundColor: "#e34a4a",
                borderColor: "transparent",
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]             
              }
            ]
          }
          console.log("horizontal¿?¿?¿?¿?¿")
          console.log(horizontal)
          console.log("horizontal¿?¿?¿?¿?¿")
           




          this.horizontalBarChartData=horizontal
          horizontal.datasets[0].data==[]
          horizontal.labels==[]

          // this.horizontalBarChartData.datasets[0].data==[]
          // this.horizontalBarChartData.labels==[]

          let mierda = diaInicial;

          //for actualiza labels
          for (let i = 0; i < (diaFinal-diaInicial); i++) {
            horizontal.labels[i]=mierda+'';
            mierda++;
          }
          horizontal.labels.length=(diaFinal-diaInicial);
            let i = 0;
            console.log("este es el dia inicial   " + diaInicial )
            console.log("este es el dia final   " + diaFinal )

            for (let j = (diaInicial-1); j <(diaFinal-1); j++) {
            horizontal.datasets[0].data[j]=diasMostrar[i];
            console.log(horizontal.datasets[0].data[j])
            i++;
            }


            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.log(horizontal);
            console.log("*************************")

            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@")
            console.log(this.horizontalBarChartData);
            console.log("*************************")            
            this.horizontalBarChartData=horizontal
            
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      awsapiCall2() {
        axios.get(process.env.ROOT_API +'/awsapi/day?dayStart=' + this.fechaInicial + '&dayEnd='+ this.fechaFinal +'publicAWSKey='+this.publickey+'&privateAWSKey='+ this.privatekey, {headers:{Authorization:this.$route.params.token}})
        .then( res =>  {console.log("mierda")})
        .catch(function (error) {
          console.log(error);
        });        
      },

      awsapiCall3() {
        axios.get(process.env.ROOT_API +'/awsapi/month?monthStart=' + this.fechaInicial + '&monthEnd='+ this.fechaFinal +'publicAWSKey='+this.publickey+'&privateAWSKey='+ this.privatekey, {headers:{Authorization:this.$route.params.token}})
        .then( res =>  {console.log("mierda")})
        .catch(function (error) {
          console.log(error);
        });        
      }


    }
  }

</script>
<style lang="scss" scoped>
</style>
