const func = {
  // 时间格式化器
  dateformatter: (time: string) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  },
  triggerResize: () => {
    let e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
  }
}

export default func
