<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :default-openeds="openeds"
            :collapse="collapse"
            background-color="#041A36"
            text-color="#e9f4ff"
            active-text-color="#F1BC1B"
            unique-opened
            router
        >
        <div  style="height:30px;background-color:#041A36;color:#32C5FF;padding-top:5px">
           <i style="margin-left:10px;" v-if="!collapse" :class="zdzk"></i> <span v-if="!collapse" style="margin-left:5px;cursor: pointer;" @click="open">展开</span>
           <i style="margin-left:10px;" v-if="!collapse" :class="zdsq"></i> <span v-if="!collapse" style="margin-left:5px;cursor: pointer;" @click="stop">收起</span>
        <span class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </span>
        </div>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span class="levelmenuone" slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                style="white-space: normal;padding-right: 10px;"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                    style="white-space: normal;padding-right: 10px;"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item  
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                                style="white-space: normal;padding-right: 10px;"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i id="fontsize" style="color:#1888fa;" :class="item.icon"></i>
                        <span style="margin-left:10px;color:#1888fa;" slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            zdzk:'iconfont iconzhankai',
            zdsq:'iconfont iconshouqi',
            openeds:[],
            collapse: false,
            items: [
                {
                    icon: 'iconfont iconzonghekanbansvg',
                    index: 'ZHKB',
                    title: '综合看板',
                },
                {
                    icon: 'iconfont iconpicichaxun',
                    index: '1',
                    title: '批次查询',
                    subs: [
                        {
                            index: 'PCZS', 
                            title: '批次追溯'
                        },
                        {
                            index: 'PCZSLCB',
                            title: '批次追溯流程表'
                        },
                    ]
                },
                {
                    icon: 'iconfont iconjihuadacheng',
                    index: '2',
                    title: '计划达成',
                    subs: [
                        {
                            index: 'SCYXPCCX',
                            title: '生产运行指标查询(重量)'
                        },
                        {
                            index: 'SCYXZBCX',
                            title: '生产运行指标查询(批次)'
                        },
                        {
                            index: 'SCYXZBQSCX',
                            title: '生产运行指标趋势查询'
                        },
                        {
                            index: 'SCJHDCQST',
                            title: '生产计划达成趋势图'
                        },
                        {
                            index: 'YDSCHZ',
                            title: '月度生产计划达成(汇总)'
                        },
                        {
                            index: 'YDSCXQ',
                            title: '月度生产计划达成(详细)'
                        },
                        {
                            index: 'RKJHDC',
                            title: '入库计划达成情况'
                        },
                    ]
                },
                {
                    icon: 'iconfont iconshengchanzhihang',
                    index: '3',
                    title: '生产执行',
                    subs: [
                        {
                            index: 'CJZZP',
                            title: '车间在制品查询'
                        },
                        {
                            index: 'CJZZPQS',
                            title: '车间在制品趋势查询'
                        },
                        {
                            index: 'CPFSDCC',
                            title: '车间分时段产出查询'
                        },
                        {
                            index: 'FCPCX',
                            title: '副产品查询'
                        },
                        {
                            index: 'CJKBCX',
                            title: '车间看板查询'
                        },
                    ]
                },
                {
                    icon: 'iconfont iconshebei',
                    index: '4',
                    title: '设备管理',
                    subs: [
                        {
                            index: 'SBBYJCXYJ',
                            title: '设备保养查询及预警'
                        },
                        {
                            index: 'SBGZCX',
                            title: '设备故障查询'
                        },
                        {
                            index: 'PJGZWX',
                            title: '平均故障维修时间'
                        },
                        {
                            index: 'PJGZJG',
                            title: '平均故障间隔时间'
                        },
                    ]
                },            
                {
                    icon: 'iconfont iconpicichaxun',
                    index: '5',
                    title: '质量信息',
                    subs: [
                        {
                            index: 'SYSTJSJB',
                            title: '实验室数据统计表'
                        },
                        {
                            index: 'SYSTJSJBIPQC',
                            title: '实验室数据统计表(IPQC)'
                        },
                        {
                            index: 'CPGXHGLTJ',
                            title: '产品/工序合格率统计报表'
                        },
                    ]
                },
                {
                    icon: 'iconfont iconcangchuguanli',
                    index: '6',
                    title: '仓储管理',
                    subs: [
                        {
                            index: 'KLCX',
                            title: '库龄查询'
                        },
                        {
                            index: 'BPBJKLCX',
                            title: '备品备件库龄查询'
                        },
                        {
                            index: 'BPBJCX',
                            title: '备品备件查询'
                        },
                        {
                            index: 'YLTJCX',
                            title: '窑炉产出统计查询'
                        },
                    ]
                },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
    },
    methods:
    {
        collapseChage(){ 
            this.collapse=!this.collapse
            bus.$emit('collapse-content', this.collapse);
        },
        open(){
            this.openeds=['1','2']
        },
        stop(){
            this.openeds=[]         
        },
        handleOpen(){

        },
        handleClose(){

        },
    }
    
};
</script>

<style scoped>
.sidebar {
    /* background: #040c25; */
    display: block;
    height: 100%;
    left: 0;
    top: 70px;
    bottom: 0;
    width: 200px;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}
.sidebar > ul {
    height: 100%;
    color: #000;
}
.levelmenuone{
    color:  #1888fa;
    margin-left: 10px;
}
.header >>> .el-submenu .el-menu-item{
    color:aqua !important;
    padding-right: 10px !important;
}
.collapse-btn {
    cursor: pointer;
    line-height: 20px;
    color:#FFFFFF;
    font-size: 20px;
    margin-left: 20px;
}
</style>
