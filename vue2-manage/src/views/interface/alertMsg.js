import Dialog from './msg.vue'

const alertMsg = {}
alertMsg.install = function(Vue, options) {
  const DialogInstance = Vue.extend(Dialog)
  let currentDialog
  const initInstance = () => {
    currentDialog = new DialogInstance()
    const dialogEl = currentDialog.$mount().$el
    document.body.appendChild(dialogEl)
  }
  Vue.prototype.$mydialog = {
    showMsgBox(options) {
      if (!currentDialog) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentDialog.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentDialog, options)
      }
      return currentDialog.showMsgBox()
        .then(val => {
          currentDialog = null
          return Promise.resolve(val)
        })
        .catch(err => {
          currentDialog = null
          return Promise.reject(err)
        })
    }
  }
}

export default alertMsg

