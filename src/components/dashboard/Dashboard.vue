<template>
  <div class="dashboard">

    <vuestic-widget class="no-padding no-v-padding">
      
      <vuestic-tabs
        :names="[$t('dashboard.dataVisualization'), $t('Insert Keys')]"
        ref="tabs">
        <div :slot="$t('dashboard.dataVisualization')">
          <button v-on:click="getCSV2">AWSexcel</button>
        </div>
        <!-- <div :slot="$t('dashboard.dataVisualization')">
          <data-visualisation-tab></data-visualisation-tab>
        </div> -->
        <div :slot="$t('Insert Keys')">
          <setup-profile-tab></setup-profile-tab>
        </div>
      </vuestic-tabs>
  

    </vuestic-widget>

    <div class="row">
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per month' | translate">
          <input id="date" type="date" v-model="fechaInicial" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          <input id="date" type="date" v-model="fechaFinal" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          <button v-on:click="awsapiCall">Peticion</button>
          
          <vuestic-chart :data="horizontalBarChartData" type="horizontal-bar"></vuestic-chart>

        <div v-if="message != ''">
            <label><b>{{message}}</b></label>
        </div> 
        </vuestic-widget>
      </div>
    </div>

    <!-- <dashboard-bottom-widgets></dashboard-bottom-widgets> -->

  </div>
</template>

<script>
import DashboardInfoWidgets from "./DashboardInfoWidgets";
import UsersMembersTab from "./users-and-members-tab/UsersMembersTab.vue";
import SetupProfileTab from "./setup-profile-tab/SetupProfileTab.vue";
import FeaturesTab from "./features-tab/FeaturesTab.vue";
import DataVisualisationTab from "./data-visualisation-tab/DataVisualisation.vue";
import DashboardBottomWidgets from "./DashboardBottomWidgets.vue";
import VerticalBarChartData from "data/charts/VerticalBarChartData";
import HorizontalBarChartData from "data/charts/HorizontalBarChartData";
import axios from "axios";
export default {
  name: "dashboard",
  data() {
    return {
      verticalBarChartData: VerticalBarChartData,
      horizontalBarChartData: HorizontalBarChartData,
      messageAlert: "",
      publickey: "",
      privatekey: "",
      cost: "",
      fechaInicial: "",
      fechaFinal: "",
      message:''
    };
  },
  components: {
    DataVisualisationTab,
    DashboardInfoWidgets,
    UsersMembersTab,
    SetupProfileTab,
    FeaturesTab,
    DashboardBottomWidgets
  },
  created() {
    this.getUser();
  },
  //watch: this.horizontalBarChartData,
  methods: {
    launchEpicmaxToast() {
      this.showToast(`Let's work together!`, {
        icon: "fa-star-o",
        position: "top-right",
        duration: Infinity,
        action: {
          text: "Hire us",
          href: "http://epicmax.co/#/contact",
          class: "vuestic-toasted-link"
        }
      });
    },
    getUser() {
      axios.get(process.env.ROOT_API + `/secure/users/` + this.$route.params.id, {headers: { Authorization: this.$route.params.token }})
        .then(res => {
          if (res.data.isActive == false) {
            this.messageAlert ="Tu correo no está verificado, por favor, verificalo para poder continuar";
          }
          if (res.data.isActive == true) {
            this.messageAlert = "Usuario registrado."
          }else {
            if (res.data.publicAWSKey != null ||(res.data.publicAWSKey != "" && res.data.privateAWSKey != null) ||res.data.privateAWSKey != "") {
              this.publickey = res.data.publicAWSKey;
              this.privatekey = res.data.privateAWSKey;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          //this.$router.replace({name: 'login'})
        });
    },
    getCSV2() {
      axios({
        url: process.env.ROOT_API + `/awsapi/allmonth`,
        method: "GET",
        responseType: "blob",
        headers: { Authorization: this.$route.params.token }
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.csv"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    awsapiCall() {
      axios.get(process.env.ROOT_API +"/awsapi/?publicAWSKey=" +this.publickey +"&privateAWSKey=" +this.privatekey,{ headers: { Authorization: this.$route.params.token } })
        .then(res => {
          this.cost = res.data.ResultsByTime;
          let diaInicial = parseInt(this.fechaInicial.substring(8, 10));
          let diaFinal = parseInt(this.fechaFinal.substring(8, 10));
          let diasMostrar = [];
          let c = 0;
          
          for (let i = diaInicial - 1; i <= diaFinal-1; i++) {
            diasMostrar[c] = parseFloat(this.cost[i].Total.AmortizedCost.Amount);
            c++;
          }
          let horizontal = {
            labels: [],
            datasets: [
              {
                label: "AmortizedCost",
                backgroundColor: "#e34a4a",
                borderColor: "transparent",
                data: []
              }
            ]
          };
          this.horizontalBarChartData = horizontal;
          horizontal.datasets[0].data == [];
          horizontal.labels == [];
          
          let mierda = diaInicial;
          //for actualiza labels
          for (let i = 0; i < (diaFinal - diaInicial + 1); i++) {
            horizontal.labels[i] = mierda + "";
            mierda++;
          }
          horizontal.labels.length = (diaFinal - diaInicial + 1);
          let i = 0;
          for (let j = 0; j <= diaFinal; j++) {
            
            horizontal.datasets[0].data[j] = diasMostrar[i];
            i++;
          }
          this.horizontalBarChartData = horizontal;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    awsapiCall2() {
      axios
        .get(
          process.env.ROOT_API +
            "/awsapi/day?dayStart=" +
            this.fechaInicial +
            "&dayEnd=" +
            this.fechaFinal +
            "publicAWSKey=" +
            this.publickey +
            "&privateAWSKey=" +
            this.privatekey,
          { headers: { Authorization: this.$route.params.token } }
        )
        .then(res => {
          console.log("mierda");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    awsapiCall3() {
      axios
        .get(
          process.env.ROOT_API +
            "/awsapi/month?monthStart=" +
            this.fechaInicial +
            "&monthEnd=" +
            this.fechaFinal +
            "publicAWSKey=" +
            this.publickey +
            "&privateAWSKey=" +
            this.privatekey,
          { headers: { Authorization: this.$route.params.token } }
        )
        .then(res => {
          console.log("mierda");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};

</script>
<style lang="scss" scoped>
</style>
