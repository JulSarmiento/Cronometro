const time = document.getElementById('time');
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnReset = document.getElementById("btn-reset");

/**
 * This function validates if the navigator allows push notifications, if it does, resives the message and
 * sendit if the user acept the notifications. 
 * 
 * @param {string} message 
 */
 function notifyMe(message) {

  if (!("Notification" in window)) {
    alert("Este navegador no es compatible con las notificaciones de escritorio");
  }

  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {

      if (permission === "granted") {
        let notification = new Notification(message);
      }
    });
  }
}

let h = 0, m = 0, s = 0, mls = 0, timeStarted = 0;

/**
 * This class cotains the static functions for the chronometer.
 */
class Chronometer {

  /**
   * This function prints the time in the html while counting the time.
   */
  static write() {

    let ht, mt, st, mlst;

    mls++;
 
    if (mls > 99) {
      s++;
      mls = 0;
    }
    if (s > 59) {
      m++;
      s = 0;
    }
    if (m > 59) {
      h++;
      m = 0;
    }
    if (h > 24) h = 0;
 
    mlst = ('0' + mls).slice(-2);
    st = ('0' + s).slice(-2);
    mt = ('0' + m).slice(-2);
    ht = ('0' + h).slice(-2);
 
    time.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
  }

  /**
   * This function start counting the time.
   * 
   * @function write
   * @function notifyMe
   */
  static start() {
    Chronometer.write();
    timeStarted = workerTimer.setInterval(Chronometer.write, 10);
    btnStart.removeEventListener("click", Chronometer.start);
    notifyMe('Cronómetro iniciado')
  }

  /**
   * This function stop counting the time.
   * 
   * @function notifyMe
  */
  static stop() {
    workerTimer.clearInterval(timeStarted);
    btnStart.addEventListener("click", Chronometer.start);
    notifyMe('Cronómetro pausado')
  }

  /**
   * This function restart counting the time.
   * 
   * @function notifyMe
  */
  static reset() {
    workerTimer.clearInterval(timeStarted);
    time.innerHTML = "00:00:00.00"
    h = 0;
    m = 0;
    s = 0;
    mls = 0;
    btnStart.addEventListener("click", Chronometer.start);
    notifyMe('Cronómetro reanudado')
  }
}

btnStart.addEventListener("click", Chronometer.start);
btnStop.addEventListener("click", Chronometer.stop);
btnReset.addEventListener("click", Chronometer.reset);
