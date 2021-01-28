<template>
    <div style="height:100%;width:100%;">
        <div  class="cj_background">
            <div style="display:flex;height:15%;min-height:70px" class="background">
                <div style="width:30%;height:100%" >
                </div>
                <div style="width:40%;">
                    <div class="gxmc">
                        {{showcjmc}}（焙烧）工序
                    </div>
                </div>
                <div style="width:30%;">
                        <div class="timestyle">
                            {{showtime}}
                        </div>
                </div>
            </div>
            <div style="height:80%;" class="table_background">
                <div style="height:18%;width:100%;display:flex;">
                    <div style="width:22%;height:100%;padding-top:10px" >
                    <div class="divone">
                    </div>
                    </div>
                    <div style="width:75%;padding-top:3.2%;">
                        <!-- 车间温度 -->
                        <div class="bottomwite float">&nbsp;&nbsp;%</div>
                        <div class="bottomred float">{{humidityBefore}}</div>
                        <div class="bottomwite float">&nbsp;&nbsp;&nbsp;湿度H&nbsp;&nbsp;</div>
                        <div class="divthree float"> &nbsp;&nbsp;</div>
                        <div class="bottomwite float">&nbsp;&nbsp;℃&nbsp;&nbsp;</div>
                        <div class="bottomred float">{{temperatureBefore}}</div>
                        <div class="bottomwite float">&nbsp;&nbsp;温度T&nbsp;&nbsp;</div>
                        <div class="divtwo float ">&nbsp;&nbsp;</div>
                        <div class="bottomwite float " style="color:#FA6400">&nbsp;&nbsp;前段&nbsp;&nbsp;</div>

                        <!-- <div class="bottomwite float">&nbsp;&nbsp;%</div>
                        <div class="bottomred float">{{humidity}}</div>
                        <div class="bottomwite float">&nbsp;&nbsp;&nbsp;车间湿度H&nbsp;&nbsp;</div>
                        <div class="divthree float"> &nbsp;&nbsp;</div> -->
                        <!-- 车间湿度 -->
                        <div class="bottomwite float">&nbsp;&nbsp;%&nbsp;&nbsp;</div>
                        <div class="bottomred float">{{humidityAfter}}</div>
                        <div class="bottomwite float">&nbsp;&nbsp;&nbsp;湿度H&nbsp;&nbsp;</div>
                        <div class="divthree float"> &nbsp;&nbsp;</div>
                        <div class="bottomwite float">&nbsp;&nbsp;℃&nbsp;&nbsp;</div>
                        <div class="bottomred float">{{temperatureAfter}}</div>
                        <div class="bottomwite float">&nbsp;&nbsp;温度T&nbsp;&nbsp;</div>
                        <div class="divtwo float ">&nbsp;&nbsp;</div>
                        <div class="bottomwite float" style="color:#FA6400">&nbsp;&nbsp;&nbsp;后段&nbsp;&nbsp;&nbsp;</div>

                        <!-- <span class="bottomwite float">&nbsp;&nbsp;℃&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="bottomred float">{{temperature}}</span>
                        <span  class="bottomwite float">&nbsp;&nbsp;&nbsp;&nbsp;车间温度T&nbsp;&nbsp;</span>
                        <div class="divtwo float ">&nbsp;&nbsp;</div> -->
                    </div>
                    <div style="width:3%;height:100%" >
                    </div>                  
                </div>
                <div style="height:77%;display:flex;">
                <div style="width:3%">
                </div>
                <div style="width:83.3%;height:100%">

                    <table class="table" style="border-collapse:collapse;border-top: 1px solid #1888FA;border-left: 1px solid #1888FA;">
                        <tr class="tr-boder table_body">
                            <th class="th">生产线号</th>
                            <th class="th">高混机</th>
                            <th class="th">高混仓重量（KG)</th>
                            <th class="th">烧结状态</th>
                            <th class="th">破碎状态</th>
                        </tr>
                        <tr class="tr-boder"  v-for="(cm,index) in  tabledDate" :key="index+''" @click="get(cm,index)">
                            <td class="td">{{cm.productionLine}}</td>                                              
                            <td class="td"><template>
                                <div v-if="cm.machineState=='运行'" class="rectangleyx"></div>
                                <div v-if="cm.machineState=='故障'" class="rectanglegz"></div>
                                <div v-if="cm.machineState=='待机'" class="rectangledj"></div>
                                <div v-if="cm.machineState=='停止'" class="rectangletz"></div>
                                </template></td>
                                <td class="td">{{cm.weight}}</td> 
                                <td class="td"><template>
                                <div v-if="cm.sinteringState=='运行'" class="rectangleyx"></div>
                                <div v-if="cm.sinteringState=='故障'" class="rectanglegz"></div>
                                <div v-if="cm.sinteringState=='待机'" class="rectangledj"></div>
                                <div v-if="cm.sinteringState=='停止'" class="rectangletz"></div>
                                </template></td>
                                <td class="td"><template>
                                <div v-if="cm.brokenState=='运行'" class="rectangleyx"></div>
                                <div v-if="cm.brokenState=='故障'" class="rectanglegz"></div>
                                <div v-if="cm.brokenState=='待机'" class="rectangledj"></div>
                                <div v-if="cm.brokenState=='停止'" class="rectangletz"></div>
                                </template></td>
                            
                        </tr>
                        </table>
                </div>
                <div style="color:#FFFFFF;font-size:20px;width:16.7%;" class="bszt_header">
                    <div class="bszt_body">
                        <div style="display:table-cell;background:#1888FA; vertical-align:middle;">
                            状态标识
                        </div>
                    </div>
                    <div style="height:21%;">
                            <div class="yunxingtwo">
                                <div class="yunxingone">
                                    运行
                                </div>
                                <div class="yunxing">
                                </div>
                            </div>
                    </div>
                    <div style="height:21%;">
                            <div class="yunxingtwo">
                                <div class="yunxingone">
                                    故障
                                </div>
                                <div class="guzhang">
                                </div>
                            </div>
                    </div>
                    <div style="height:21%;">
                            <div class="yunxingtwo">
                                <div class="yunxingone">
                                    待机
                                </div>
                                <div class="daiji">
                                </div>
                            </div>
                    </div>
                    <div style="height:21%;">
                            <div class="yunxingtwo">
                                <div class="yunxingone">
                                    停止
                                </div>
                                <div class="tingzhi">
                                </div>
                            </div>
                    </div>
                </div>
                <div style="width:3%">
                </div>
            </div>
            </div>
            
            <!-- <div style="text-align: center;padding-top:10px">
                    <span class="bottomwite">焙烧前段&nbsp;</span>
                    <span class="bottomwite">车间温度T&nbsp;&nbsp;</span><span class="bottomred">{{temperatureBefore}}</span><span class="bottomwite">&nbsp;&nbsp;℃</span>
                    <span class="bottomwite">&nbsp;&nbsp;&nbsp;车间湿度H&nbsp;&nbsp;</span><span class="bottomred">{{humidityBefore}}</span><span class="bottomwite">&nbsp;&nbsp;%</span>
                    <span class="bottomwite">&nbsp;&nbsp;&nbsp;焙烧后段&nbsp;</span>
                    <span class="bottomwite">车间温度T&nbsp;&nbsp;</span><span class="bottomred">{{temperatureAfter}}</span><span class="bottomwite">&nbsp;&nbsp;℃</span>
                    <span class="bottomwite">&nbsp;&nbsp;&nbsp;车间湿度H&nbsp;&nbsp;</span><span class="bottomred">{{humidityAfter}}</span><span class="bottomwite">&nbsp;&nbsp;%</span>
                </div> -->
        
        </div>
    </div>
</template>
<script>
import{CJKB_selectProcess} from '../../../../api/yjl'
import bus from '../../../../bus'
import './cjkb.css'
export default {
    data(){
        return{
           showtime:'',
           box:[{test:"CL001",value:1},{test:"CL002",value:2},{test:"CL003",value:3},{test:"",value:''},{test:"",value:''}],
            intervalId:null,
            timecount:0,
            timesum:5,//用来设定多久查询下一页数据
            page:1,
            pageSize:5,
            // tabledDate:[],
            tabledDate:[{},{},{},{},{}],
            temperatureAfter:0,//温度-焙烧后
            temperatureBefore:0,//温度-焙烧前
            humidityAfter:0,//湿度-焙烧后
            humidityBefore:0,//湿度-焙烧前
            showcjmc:'',
        }
    },
    created(){
    },
    mounted(){
        this.dataRefreh();
        var cjmc=sessionStorage.getItem('cjname')
        if(cjmc=='third')
            {
                this.showcjmc='C03'
            }
            if(cjmc=='fourth')
            {
                this.showcjmc='C04'
            }
            if(cjmc=='fiveth')
            {
                this.showcjmc='C05'
            }

        bus.$on('cjmc',data=>{
            if(data=='third')
            {
                this.showcjmc='C03'
            }
            if(data=='fourth')
            {
                this.showcjmc='C04'
            }
            if(data=='fiveth')
            {
                this.showcjmc='C05'
            }
        })
        this.getMsg()
    },
    methods:{
        //焙烧
        getMsg(){
            let para={
                data:{
                    cjmc: this.showcjmc,
                    gxmc: "Roast",
                },
                pageNum: this.page,
                pageSize: this.pageSize
            }
            CJKB_selectProcess(para).then(res=>{
                if(res.code==200)
                {
                    //如果res.data.records为空，表示当前页没查询到数据
                    console.log(res.data.records)
                    if(res.data.records.length>0)
                    {
                        this.tabledDate=res.data.records
                        this.temperatureAfter=this.tabledDate[0].temperatureAfter
                        this.temperatureBefore=this.tabledDate[0].temperatureBefore
                        this.humidityAfter=this.tabledDate[0].humidityAfter
                        this.humidityBefore=this.tabledDate[0].humidityBefore
                        if(res.data.records.length<this.pageSize)
                        {
                            this.page=1
                            const para={
                                productionLine:'',
                                state:'',
                                weight:'',
                            }
                            var totalsum=res.data.records.length
                            for(var i=0;i<this.pageSize-totalsum;i++)
                            {
                                this.tabledDate.push(para)
                            }              
                        }
                        else{
                            this.page+=1
                        }
                    }
                    else{
                        const para={
                                productionLine:'',
                                state:'',
                                weight:'',
                            }
                            var totalsum=res.data.records.length
                            for(var i=0;i<this.pageSize-totalsum;i++)
                            {
                                this.tabledDate.push(para)
                            } 
                        //如果当前页没得数据，应返回第一页进行数据查询，如果是第一页，则不用再进行查询，因为是真的一条数据也没有，否则查询第一页
                        if(this.page==1)
                            return
                            this.page=1
                            this.getMsg()
                    }        
                }
            })
        },

        getTime(){
            var d=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
            //d[new Date().getDay()];// 获取当前星期
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth()+1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            this.showtime =d[new Date().getDay()]+'' + yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            console.log(this.showtime)
        },
        // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.getTime();
        this.timecount+=1
        if(this.timecount==this.timesum)
        {
            this.getMsg()
            this.timecount=0
        }
      }, 1000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
           
    },
    
     destroyed(){
                console.log(1111111)
            // 在页面销毁后，清除计时器
            this.clear();
        },
    
}
</script>
<style scoped>
.th {
    width:16.7%;
}


</style>