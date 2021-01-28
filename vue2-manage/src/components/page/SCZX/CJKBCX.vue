<template>
    <div style="height:100%;width:100%;text-align: center;font-size: 20px" class="table">
        <div class="searchForm padding" style="text-align: left;">
            <div class="searchInputone">
                <p>车间</p>
                <el-select v-model="searchForm.cj"  placeholder="请选择" :popper-append-to-body="false" @change="showcjmc">
                    <el-option
                            v-for="item in cjarr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputone">
                <p>工序</p>
                <el-select v-model="searchForm.gx" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in gxarr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- <div class="searchInputone" style="width:170px;margin-left:calc(33.3% - 200px)">
                <section class="query_button" @click="getMsg" size="small">查询</section>
                <section class="reset_button" @click="getMsg" size="small">重置</section>  
            </div> -->

        </div>
        <div class="cjkbtb all_top">

        </div>
        <div class="backgroundcjkb ">
            <div style="height:100%;width:100%" v-if="searchForm.gx=='Package'">
                <bz></bz>
            </div>
            <div style="height:100%;width:100%" v-if="searchForm.gx=='Feed'">
                <tl></tl>
            </div>
            <div style="height:100%;width:100%" v-if="searchForm.gx=='Broken'">
                <pss></pss>
            </div>
            <div style="height:100%;width:100%" v-if="searchForm.gx=='Mixing'">
                <hl></hl>
            </div>
            <div style="height:100%;width:100%" v-if="searchForm.gx=='Roast'">
                <bs></bs>
            </div>
        </div>
    </div>
</template>
<script>
    import bz from './CJKB/BZ'
    import tl from './CJKB/TL'
    import pss from './CJKB/PSS'
    import hl from './CJKB/HL'
    import bs from './CJKB/BS'
    import bus from '../../../bus'

    export default {
        components: {bz, tl, pss, hl, bs},
        data() {
            return {
                searchForm: {
                    cj: 'third',
                    gx: 'Feed',
                },
                cjOptions: [],
                count: 2,
                cjarr: [{value: 'third', label: '3车间'}, {value: 'fourth', label: '4车间'}, {
                    value: 'fiveth',
                    label: '5车间'
                }],
                gxarr: [{value: 'Feed', label: '投料'}, {value: 'Mixing', label: '车间混料'}, {
                    value: 'Package',
                    label: '车间包装'
                },
                    {value: 'Roast', label: '车间焙烧'}, {value: 'Broken', label: '车间破碎/筛'}]
            }
        },
        mounted() {
            bus.$emit('cjmc', this.searchForm.cj)
            sessionStorage.setItem('cjname', this.searchForm.cj)
        },
        methods: {
            showcjmc() {
                sessionStorage.setItem('cjname', this.searchForm.cj)
                bus.$emit('cjmc', this.searchForm.cj)
            },
            getMsg() {

            }
        }
    }
</script>
<style scoped>
    .backgroundcjkb {
        background-color: #000086;
        height: calc(100% - 95px);
        background-size: 100%;
    }

    .cjkbtb {
        background-image: url('../../../assets/img/cjkb.png');
        height: 16px;
        background-size: 100%;
    }
</style>