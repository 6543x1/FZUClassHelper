<template>
  <div class="statics">
      <MyNav/>
      <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
               <span class="title" style="font-size: 30px;">统计结果</span>
            <div id="chartPie" class="pie-wrap"></div>
            </div>
           
        </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import * as echarts from 'echarts';
require('echarts/theme/macarons');
export default {
    
    name:'Statics',
    components: {
        MyNav,
    },
    data(){
        return{
            chartPie:null,
            bottomLabel:['已读','未读'],
            pieData:[ {value: 335, name: '已读'},
                {value: 200, name: '未读'},
                ],
        };
    },
    mounted(){
        let myData=JSON.parse(this.$route.params.statics);
        console.log(myData);
          this.$nextTick(() => {
        this.drawPieChart();
      })
    },
    methods:{
        drawPieChart() {
        let mytextStyle = {
          color: "#333",                          
          fontSize: 18,                            
        };
        let mylabel = {
          show: true,                 
          position: "right",          
          offset: [30, 40],             
          formatter: '{b} : {c} ({d}%)',      
          textStyle: mytextStyle
        };
        this.chartPie = echarts.init(document.getElementById('chartPie'),'macarons');
        this.chartPie.setOption({
          title: {
            text: '',
            subtext: '',
            x: 'center'
          },
          tooltip: {
            // trigger: 'item',
            // formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            data: this.bottomLabel,
            left:"center",                              
            top:"bottom",                              
            orient:"horizontal", 
            // marginTop:'20px',                       
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '50%'],
              data: this.pieData,
              animationEasing: 'cubicInOut',
              animationDuration: 2600,
              label: {           
                emphasis: mylabel
              }
            }
          ]
        });
      }
    
  
    }
}
</script>
<style src="../assets/css/style.css" scoped>
</style>

<style scoped>
    .pie-wrap{
        margin-top:50px;
        position:relative;
        width:100%;
        height:200px;
    }
    .loading {
    width: 8em;
    height: 8em;
    position: relative;
    margin-left: 250px;
    margin-top: 30px;
    margin-right: 150px;
    float: left;
}

.loading .progress {
    position: absolute;
    width: 6em;
    height: 6em;
    background-color: white;
    border-radius: 50%;
    left: 1em;
    top: 1em;
    line-height: 6em;
    text-align: center;
}

.left,
.right {
    width: 4em;
    height: 8em;
    overflow: hidden;
    position: relative;
    float: left;
    background-color: rgb(66, 221, 146);
}
.left {
    border-radius: 8em 0 0 8em;
}

.right {
    border-radius: 0 8em 8em 0;
}




</style>