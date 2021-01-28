<template>
    <div class="CJKBCXQP cjkbqbbj" >
        <el-dialog :visible.sync="test" :show-close="showClo"
                   style="height:100%;width:100%;margin-top:0px;text-align: center;margin-bottom:0px;" width="100%">
            <div style="height:100%;width:100%;background:#000086;" v-if="count=='Package'">
                <bz></bz>
            </div>
            <div style="height:100%;width:100%;background:#000086;" v-if="count=='Feed'">
                <tl></tl>
            </div>
            <div style="height:100%;width:100%;background:#000086;" v-if="count=='Broken'">
                <pss></pss>
            </div>
            <div style="height:100%;width:100%;background:#000086;" v-if="count=='Mixing'">
                <hl></hl>
            </div>
            <div style="height:100%;width:100%;background:#000086;" v-if="count=='Roast'">
                <bs></bs>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import bz from './CJKB/BZ'
    import tl from './CJKB/TL'
    import pss from './CJKB/PSS'
    import hl from './CJKB/HL'
    import bs from './CJKB/BS'

    export default {
        components: {bz, tl, pss, hl, bs},
        data() {
            return {
                test: true,
                showClo: false,
                count: '',//Package为包装，Feed为投料，Broken为破碎/筛，Mixing为混料，Roast为焙烧
                cj: '',
            }
        },
        created() {
            let path = window.location.href.split("?") //分割url
            if (path.length > 1) {
                let cjgx = path[1].split(/(?=[A-Z])/);
                if (cjgx.length > 1) {
                    this.cj = cjgx[0]
                    this.count = cjgx[1]
                    sessionStorage.setItem('cjname', this.cj)
                    bus.$emit('cjmc', this.cj)
                } else {
                    this.$message.error('传入车间工序格式不对')
                }
            } else {
                this.$message.error('请传入车间工序')
            }
        }
    }
</script>
<style scoped>
    .CJKBCXQP >>> .el-dialog {
        height: 100%;
        width: 100%;
        margin-top: 0px !important;
        margin-bottom: 0px !important;
    }

    .CJKBCXQP >>> .el-dialog__header {
        padding: 0px !important;
    }

    .CJKBCXQP >>> .el-dialog__body {
        padding: 0px !important;
        height: 100% !important;
        width: 100% !important;
    }
.cjkbqbbj{
    background-image: url('../../../assets/img/cjkb.png');
}

</style>