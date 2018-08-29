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
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per day' | translate">
          <vuestic-chart :data="verticalBarChartData" type="vertical-bar"></vuestic-chart>
        </vuestic-widget>
      </div>
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
/*
          console.log(this.cost)

          console.log(this.cost[0].Total.AmortizedCost.Amount)
          console.log(this.cost[0].Total.BlendedCost.Amount)
          console.log(this.cost[0].Total.UnblendedCost.Amount)

          console.log(this.verticalBarChartData.datasets[1].data)
          console.log(this.verticalBarChartData.labels)
          
          let long = this.verticalBarChartData.datasets[1].data.length;
          console.log(long + "             ññññññññññññññ")
          for(let i = 0; i < 3; i++) {
            for (let j = 0; j < long; j++) {
              
            this.verticalBarChartData.datasets[i].data[j]==2.15;
            console.log(this.verticalBarChartData.datasets[i].data[j])
            }
          }*/
          /////////////////////////////////////////////////////////////////////
          console.log("ESTO ES UNA MIERDADAADADADAD")
          console.log(this.cost)
          let diaInicial = parseInt(this.fechaInicial.substring(8,10))
          let diaFinal = parseInt(this.fechaFinal.substring(8,10))
          let long = this.verticalBarChartData.datasets[1].data.length;

          let diasMostrar = [];
          let c = 0;
          for (let i = (diaInicial-1); i < (diaFinal-1); i++) {
            diasMostrar[c] = parseFloat(this.cost[i].Total.AmortizedCost.Amount)
            console.log(diasMostrar[c] + "        ---------------")
            console.log(Number.isInteger(diasMostrar[c]))
            c++

            //this.horizontalBarChartData.datasets.data[]
            
          }
          // console.log(diasMostrar)
          // console.log(this.HorizontalBarChartData.datasets[0].data)
          // this.HorizontalBarChartData.datasets[0].data==222;

            for (let j = 0; j < diasMostrar.length; j++) {
            this.horizontalBarChartData.datasets[0].data[j]=2.15;
            console.log(this.horizontalBarChartData.datasets[0].data[j])
            }
          


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
