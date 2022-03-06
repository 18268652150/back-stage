<template>
<div id="home">
    <el-row :gutter="20">
  <el-col :span="8">
      <el-card  >
      <div class="grid-content bg-purple-dark">
          <div class="flex">
          
              <img class="author" :src="author" >
          
          <div>
              <p class="id">Admin</p>
              <p class="name">超级管理员</p>
          </div>
          </div>
          <div class="font">
              <p class="p">
                  上次登录时间：
                  <span>2021-7-19</span>
              </p>
              <p class="p">
                  上次登录地点：
                  <span>武汉</span>
              </p>
          </div>
      </div>
      </el-card>
      <el-card style="height:500px">
                <el-table
            :data="tableData"       
            >
            <el-table-column v-for="(val,key) in tableCol" :key="key"
            :prop="key"
            :label="val"
            >
            
            </el-table-column>
        </el-table>
      </el-card>
      </el-col>
      <el-col :span="16">
          <div class="head">
              
              <el-card v-for="(item,index) in plyData" :key="index"
              body-style="display: flex;height: 100px;line-height: 100px;padding:0;
              justify-content: space-around;
              align-items: center;"          
               class="card-box"
               >
                 <el-button :class="item.icon" :type="item.type"></el-button>
                  <div>{{item.name}}</div>
                  <div>
                        <div style="height:40px;line-height:40px">{{item.money}}</div>
                      <div style="height:40px;line-height:40px">{{item.title}}</div>
                  </div>
                      
                
                  

             </el-card>
            

          </div>
          <div class="middle">
              <el-card style="height:270px">
                  <div ref="eCharts" style="height:280px">

                  </div>
              </el-card>
          </div>
          <div class="foot" style="display:flex; justify-content: space-around">
             <el-card style="height:270px;width:48%">
                        <div ref="userCharts" style="height:280px">

                  </div>
             </el-card> 
             <el-card style="height:270px;width:48%">
                        <div ref="videCharts" style="height:280px">
                        </div>
             </el-card> 

          </div>
          

      </el-col>
</el-row>
</div>
</template>
<script>
import {getHome} from "../api/data"
import * as echarts from "echarts"
export default {
    name:"home",
    data(){
        return{
            author:require('../assets/img/user.png'),
             tableData: [
        //   {
        //     name: 'oppo',
        //     todayBuy: 500,
        //     monthBuy: 3500,
        //     totalBuy: 22000
        //   },
        //   {
        //     name: 'vivo',
        //     todayBuy: 300,
        //     monthBuy: 2200,
        //     totalBuy: 24000
        //   },
        //   {
        //     name: '苹果',
        //     todayBuy: 800,
        //     monthBuy: 4500,
        //     totalBuy: 65000
        //   },
        //   {
        //     name: '小米',
        //     todayBuy: 1200,
        //     monthBuy: 6500,
        //     totalBuy: 45000
        //   },
        //   {
        //     name: '三星',
        //     todayBuy: 300,
        //     monthBuy: 2000,
        //     totalBuy: 34000
        //   },
        //   {
        //     name: '魅族',
        //     todayBuy: 350,
        //     monthBuy: 3000,
        //     totalBuy: 22000
        //   }
        ],
            tableCol:{
                 name:'课程',
                 todayBuy: '今日购买',
                 monthBuy: '本月购买',
                 totalBuy: '总购买'

            },
            plyData: [
          {
            name: 'oppo',
            title: "本年支付订单",
            money: "￥1111",
            type: "warning " ,
            icon:"el-icon-warning " 
          },
          {
            name: 'vivo',
            title: "本月支付订单",
            money: "￥2222",
            type: "warning" ,
            icon:"el-icon-warning" 
          },
          {
              name: '苹果',
            title: "本年支付订单",
            money: "￥3333",
            type: "primary " ,
            icon:"el-icon-error " 
          },
          {
            name: '小米',
            title: "本年支付订单",
            money: "￥4444",
            type: "primary  " ,
            icon:"el-icon-error  " 
          },
          {
            name: '三星',
            title: "本月支付订单",
            money: "￥5555",
            type: "success" ,
            icon:"el-icon-success" 
          },
          {
            name: '魅族',
            title: "本年支付订单",
            money: "￥6666",
            type: "success " ,
            icon:"el-icon-success " 
          }
        ],

        }
    },
    mounted(){
      getHome().then(res => {
            const code = res.code
            const data  = res.data
            if(code === 20000) {
                this.tableData = data.tableData
            }
            
            const order = data.orderData
            const xData = order.date
            const keyArray = Object.keys(order.data[0])
             const series = []
             keyArray.forEach( key => {
                 series.push({
                     name: key,
                     data: order.data.map(item => item[key]),
                     type: 'line'
                 })
             })
              const option = {
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    legend:{
                        data: keyArray
                    },
                    series
              }
              const E = echarts.init(this.$refs.eCharts)
                E.setOption(option)

                const userData = data.userData       
              const userOption = {
                    xAxis: {
                        type: "category",
                        data: userData.map(item => item.date),
                        axisLine:{
                            lineStyle: {
                                color: "#17b3a3"
                            },

                        },
                        axisLabel:{
                            interval: 0,
                                color: "#333"
                           

                        },

                    },
                    yAxis: [{
                        type:"value",
                        axisLine:{
                            lineStyle:{
                                color: "#17b3a3"
                            }
                        }
                    }],
                    color:["#2ec7c9","#b6a2de"],
                    legend:{
                        textStyle: {
                            color: "#333"
                        }
                    },
                    grid:{
                        left: "20%"
                    },
                    tooltip:{
                        trigger:"axis"
                    },
                    series:[
                        {
                            name:"新增用户",
                            data: userData.map(item => item.new),
                            type:"bar"
                        },
                         {
                            name:"活跃用户",
                            data: userData.map(item => item.active),
                            type:"bar"
                        },
                    ]
              }
              const U = echarts.init(this.$refs.userCharts)
                U.setOption(userOption)
                const videoOption = {                  
//   toolbox: {
//     show: true,
//     // feature: {
//     //   mark: { show: true },
//     // //   dataView: { show: true, readOnly: false },
//     // //   restore: { show: true },
//     // //   saveAsImage: { show: true }
//     // }
//   },
tooltip:{
    trigger:"item"
},
  series: [
    {
      
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 1
      },
      data: data.videoData
    }
  ]
                }

                const V = echarts.init(this.$refs.videCharts)
                V.setOption(videoOption)



      })
    }
    
}
</script>
<style lang="scss" scoped>
.el-row {
    background-color: #fff;
    height: 100px;
    .el-card{
        margin-top: 20px;
        background-color: rgb(250, 247, 243);
        .flex{
            height: 150px;
            
            display: flex;
            align-items: center;
            justify-content: space-around;
            .author{
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
            .id,.name{
                height: 50px;
                line-height: 50px;
                
            }
            .id{
                font-size: 30px;
            }
        }
        .font{
            height: 100px;
            line-height: 100px;
            .p{
                height: 50px;
                line-height: 50px;
                text-align: left;
                margin-left: 30px;
                span{
                    margin-left: 30px;
                }
            }
        }
    }
    
    .card-box{
        background-color: rgb(252, 246, 246);
        width: 355px;
        height: 100px;
        color: #000;
    }
    .head{
        display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;
            .el-button{
                        width: 100px;
            }
    }
    .font{
        display: flex;
        align-items: center;
            justify-content: space-around;

    }
    .el-table__footer-wrapper{
        height: 50px !important;
    }
}
</style>