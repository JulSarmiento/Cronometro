/**
 * worker is the new web worker object instanced, call the functions to be run in second plane
 */
let worker = new Worker('./scripts/worker/timer-worker.js');

/**
 * This is the web-worker object (they can run scripts in the background without interfering the user's interface)
 * 
 * @author Max <https://maxschmitt.me/posts/setinterval-settimeout-slows-down-on-tab-change/>
 */
const workerTimer = {
  id: 0,
  callbacks: {},

  /**
   * 
   * @param {function} cb 
   * @param {*} interval 
   * @param {*} context 
   * @returns 
   */
  setInterval: function(cb, interval, context) {
    this.id++
    let id = this.id
    this.callbacks[id] = { fn: cb, context : context}
    worker.postMessage({
      command: 'interval:start',
      interval: interval,
      id:id
    })
    return id
  },

  /**
   * 
   * @param {*} e 
   */
  onMessage: function(e) {
    switch (e.data.message) {
      case 'interval:tick':
        let callback = this.callbacks[e.data.id]
        if (callback && callback.fn) callback.fn.apply(callback.context)
        break
      case 'interval:cleared':
        delete this.callbacks[e.data.id]
        break
    }
  },

  /**
   * 
   * @param {*} id 
   */
  clearInterval: function(id) {
    worker.postMessage({ command: 'interval:clear', id: id })
  }

}

worker.onmessage = workerTimer.onMessage.bind(workerTimer)