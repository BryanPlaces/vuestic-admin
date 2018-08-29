<template>
  <div class="charts-page">
    <div class="row">
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per day' | translate">
          <vuestic-chart :data="verticalBarChartData" type="vertical-bar"></vuestic-chart>
        </vuestic-widget>
      </div>
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'Costs per month' | translate">
          <vuestic-chart :data="horizontalBarChartData" type="horizontal-bar"></vuestic-chart>
        </vuestic-widget>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-md-12">
        <vuestic-widget class="chart-widget" :headerText="'charts.lineChart' | translate">
          <vuestic-chart :data="lineChartData" type="line"></vuestic-chart>
        </vuestic-widget>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'charts.pieChart' | translate">
          <vuestic-chart :data="pieChartData" type="pie"></vuestic-chart>
        </vuestic-widget>
      </div>
      <div class="col-md-6">
        <vuestic-widget class="chart-widget" :headerText="'charts.donutChart' | translate">
          <vuestic-chart :data="donutChartData" type="donut"></vuestic-chart>
        </vuestic-widget>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <vuestic-widget class="chart-widget" :headerText="'charts.bubbleChart' | translate">
          <vuestic-chart :data="bubbleChartData" type="bubble"></vuestic-chart>
        </vuestic-widget>
      </div>
    </div> -->
  </div>
</template>

<script>
  import LineChartData from 'data/charts/LineChartData'
  import BubbleChartData from 'data/charts/BubbleChartData'
  import PieChartData from 'data/charts/PieChartData'
  import DonutChartData from 'data/charts/DonutChartData'
  import VerticalBarChartData from 'data/charts/VerticalBarChartData'
  import HorizontalBarChartData from 'data/charts/HorizontalBarChartData'
  import SidebarLink from '../../admin/app-sidebar/components/SidebarLink'

  import axios from 'axios'

  export default {
    name: 'charts',
    components: {
      SidebarLink
    },

    data: function () {
      return {
        bubbleChartData: BubbleChartData,
        lineChartData: LineChartData,
        pieChartData: PieChartData,
        donutChartData: DonutChartData,
        verticalBarChartData: VerticalBarChartData,
        horizontalBarChartData: HorizontalBarChartData,
        cost:'',
        messageAlert: '',
        publickey:'',
        privatekey:''
      }
    },
    created() {
      this.getUser();
    },
    methods: {
        
        getUser() {
            axios.get(`http://localhost:4000/secure/users/` + this.$route.params.id, {headers:{Authorization:this.$route.params.token}})
                .then( res => {
                    if (res.data.isActive == false) {
                        this.messageAlert = "Tu correo no está verificado, por favor, verificalo para poder continuar"
                    }else{
                        if(res.data.publicAWSKey != null || res.data.publicAWSKey != "" && res.data.privateAWSKey != null || res.data.privateAWSKey != "") {
                            this.publickey = res.data.publicAWSKey;
                            this.privatekey = res.data.privateAWSKey;
                            console.log("llamada a awsapiCall()")
                            this.awsapiCall();
                        }
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },

      awsapiCall(){
        axios.get('http://localhost:4000/awsapi/?publicAWSKey='+this.publickey+'&privateAWSKey='+ this.privatekey, {headers:{Authorization:this.$route.params.token}})
        .then( res =>  {
          this.cost=res.data.ResultsByTime
          console.log(cost)
          console.log('aaaaaaaaaaaaaaaaaaaa')
          console.log(res)
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style lang="scss">
  .widget.chart-widget {
    .widget-body {
      height: 550px;
    }
  }
</style>
