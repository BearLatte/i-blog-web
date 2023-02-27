
const message = {
  error: (msg: string) => { 
    ElMessage({
      message: msg,
      type: 'error',
      duration: 2000
    })
  },
  success: (msg: string) => { 
    ElMessage({
      message: msg,
      type: 'success',
      duration: 2000
    })
  },
  waring: (msg: string) => { 
    ElMessage({
      message: msg,
      type: 'warning',
      duration: 2000
    })
  },
  info: (msg: string) => { 
    ElMessage({
      message: msg,
      type: 'info',
      duration: 2000
    })
  }
}

export default message

