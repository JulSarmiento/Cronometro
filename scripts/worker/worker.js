/**
 * worker is the new web worker object instanced, call the functions to be run in second plane
 */
let worker = new Worker('./scripts/worker/timer-worker.js');

/**
<<<<<<< HEAD
<<<<<<< HEAD
 * This is the web-worker object (they can run scripts in the background without interfering the user's interface)
=======
 * This is the web-worker object (they can run scripts in the background without interfering the user's interface), they send messages to the worker funcion.
>>>>>>> d901c6d (pequeños cambios)
=======
 * This is the web-worker object (they can run scripts in the background without interfering the user's interface), they send messages to the worker funcion in the worker related file.
>>>>>>> 6132d15 (pequeños cambios)
 * 
 * @author Max <https://maxschmitt.me/posts/setinterval-settimeout-slows-down-on-tab-change/>
 */
const workerTimer = {
  id: 0,
  callbacks: {},

<<<<<<< HEAD
  /**
   * 
   * @param {function} cb 
   * @param {*} interval 
   * @param {*} context 
   * @returns 
   */
=======
>>>>>>> d901c6d (pequeños cambios)
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

<<<<<<< HEAD
  /**
   * 
   * @param {*} e 
   */
=======
>>>>>>> d901c6d (pequeños cambios)
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

<<<<<<< HEAD
  /**
   * 
   * @param {*} id 
   */
=======
>>>>>>> d901c6d (pequeños cambios)
  clearInterval: function(id) {
    worker.postMessage({ command: 'interval:clear', id: id })
  }

}

worker.onmessage = workerTimer.onMessage.bind(workerTimer)