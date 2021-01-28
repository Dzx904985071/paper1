<template>
  <div>
    <div class="bg"></div>
    <div class="mes_dialog">
      <div class="title">{{title}}</div>
      <div class="dialog_content">
        <i class="typeStyle"
           :class="msgType==='warning'?'el-icon-warning':
          msgType==='error'?'el-icon-error':'el-icon-info'"
           :style="{color:msgType==='warning'?'#ff9e36':
          msgType==='error'?'#ff0000':''}"
        >
        </i>
        {{ content }}
      </div>
      <div class="dialog_button">
        <section v-show="isShowCancelBtn" class="close_button" @click="cancel">{{ cancelBtnText }}</section>
        <section v-show="isShowConfimrBtn" class="save_button" @click="confirm">{{ confirmBtnText }}</section>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '提示'
      },
      content: {
        type: String,
        default: '这是弹框内容'
      },
      msgType: {
        type: String,
        default: 'warning'
      },
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    provide() {
      return {
        node: this
      }
    },
    data() {
      return {
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '' // 保存promise对象
      }
    },
    methods: {
      // 确定,将promise断定为resolve状态
      confirm: function() {
        this.isShowMessageBox = false
        this.resolve('confirm')
        this.destroy()
      },
      // 取消,将promise断定为reject状态
      cancel: function() {
        this.isShowMessageBox = false
        this.reject('cancel')
        this.destroy()
      },
      // 弹出messageBox,并创建promise对象
      showMsgBox: function() {
        this.isShowMessageBox = true
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
        })
        // 返回promise对象
        return this.promise
      },
      destroy: function() {
        this.$destroy()
        document.body.removeChild(this.$el)
      }
    }
  }
</script>

<style scoped>
  .mes_dialog{
    background: #ffffff;
    color: #333;
    position: fixed;
    top:30%;
    left: calc(50% - 190px);
    z-index: 999999;
    width: 380px;
    height: 125px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  .title {
    font-size: 17px;
  }
  .bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    opacity: 0.5;
    z-index: 99999;
  }
  .dialog_content{
    padding: 22px 0;
    flex-grow: 1;
  }
  .dialog_button{
    display: flex;
    justify-content: flex-end;
    margin-bottom:10px ;
  }
</style>
