const dateInput = document.getElementById('targetDate');
const startBtn  = document.getElementById('startBtn');
const resetBtn  = document.getElementById('resetBtn');
const result    = document.getElementById('result');
const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const expiredEl = document.getElementById('expired');

let timer = null;

function pad(n) {
  return String(n).padStart(2, '0');
}

function animateTick(el, val) {
  if (el.textContent === val) return;
  el.textContent = val;
  el.classList.remove('tick');
  void el.offsetWidth;
  el.classList.add('tick');
}

function tick(target) {
  const remaining = target - new Date();

  if (remaining <= 0) {
    animateTick(daysEl, '00');
    animateTick(hoursEl, '00');
    animateTick(minutesEl, '00');
    animateTick(secondsEl, '00');
    expiredEl.classList.add('show');
    clearInterval(timer);
    return;
  }

  animateTick(daysEl,    pad(Math.floor(remaining / 86400000)));
  animateTick(hoursEl,   pad(Math.floor(remaining / 3600000) % 24));
  animateTick(minutesEl, pad(Math.floor(remaining / 60000) % 60));
  animateTick(secondsEl, pad(Math.floor(remaining / 1000) % 60));
}

function start() {
  if (!dateInput.value) {
    dateInput.classList.add('error');
    setTimeout(() => dateInput.classList.remove('error'), 1500);
    return;
  }

  const [y, m, d] = dateInput.value.split('-');
  const target = new Date(y, m - 1, d);

  if (target <= new Date()) {
    dateInput.classList.add('error');
    setTimeout(() => dateInput.classList.remove('error'), 1500);
    return;
  }

  expiredEl.classList.remove('show');
  result.classList.add('show');

  clearInterval(timer);
  tick(target);
  timer = setInterval(() => tick(target), 1000);
}

function reset() {
  clearInterval(timer);
  result.classList.remove('show');
  expiredEl.classList.remove('show');
  dateInput.value = '';
}

startBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
dateInput.addEventListener('keydown', e => { if (e.key === 'Enter') start(); });

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.value = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;