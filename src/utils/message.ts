import { ElNotification } from 'element-plus'
import 'element-plus/es/components/notification/style/css'
type types = 'success' | 'warning' | 'info' | 'error'
function showMessage(title: string, message: string, type: types) {
  ElNotification({
    title,
    message,
    type
  })
}

export const successTip = (message: string, title = 'success') => {
  showMessage(title, message, 'success')
}
