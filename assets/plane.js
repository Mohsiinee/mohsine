const tools = {
  drawPath(ctx, fn) {
    ctx.save();
    ctx.beginPath();
    fn();
    ctx.closePath();
    ctx.restore();
  },
  random(min, max, int) {
    let result = min + Math.random() * (max + (int ? 1 : 0) - min);
    return int ? parseInt(result) : result;
  },
  getVectorLength(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  },
  easing(t, b, c, d, s) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  cellEasing(t, b, c, d, s) {
    return c * (t /= d) * t * t * t + b;
  } };


const doc = {
  height: 0,
  width: 0 };


const plane = {
  xCell: 0,
  yCell: 0,
  cells: [] };


const context = {
  plane: null,
  main: null };


const mouse = {
  x: 0,
  y: 0,
  coords: {
    x: 0,
    y: 0 },

  down: {
    state: false,
    x: 0,
    y: 0 } };



const cfg = {
  cell: 35,
  sectionWidth: 8,
  sectionHeight: 1,
  numberOffset: 5,
  shadowBlur: true };


const ui = {
  plane: '#plane-canvas',
  main: '#main-canvas',
  textNodes: '[data-js=text]',
  social: '#social',
  mouse: '#mouse' };


class App {
  constructor() {
    this.state = {
      area: 0,
      time: Date.now(),
      lt: 0,
      planeProgress: 0,
      dotsProgress: 0,
      fadeInProgress: 0,
      textProgress: 0,
      stepOffset: 0,
      textOffset: 0,
      markupOffset: 0,
      glitches: [],
      animLines: [],
      animNumbers: [],
      tabIsActive: true,
      planeIsDrawn: false,
      mousePower: 0,
      textPixelData: [],
      text: {},
      delta: 0,
      dlt: performance.now(),
      needRedraw: true };

    this.bindNodes();
    this.getDimensions();
    mouse.x = doc.width / 2;
    mouse.y = doc.height / 2;
    this.start();
  }
  start() {
    this.initEvents();
    this.canvasInit();
    this.loop();
    this.initCheckingInterval();
  }

  animateText() {

    ui.textNodes.forEach((el, elIndex) => {
      el.classList.add('active');
      const letters = el.querySelectorAll('.letter');
      const length = Math.round(letters.length / 2) + 1;

    });
  }
  getDimensions() {
    doc.height = document.documentElement.clientHeight;
    doc.width = document.documentElement.clientWidth;
  }
  updatePlane() {

    const { width: w, height: h } = doc;

    const cell = Math.round(w / cfg.cell);

    const xPreSize = w / cell;
    plane.xCell = w / xPreSize % 2 !== 0 ? w / (w / xPreSize + 1) : xPreSize;

    const yPreSize = h / Math.round(cell * (h / w));
    plane.yCell = h / yPreSize % 2 !== 0 ? h / (h / yPreSize + 1) : yPreSize;

    plane.cells = [Math.round(w / plane.xCell), Math.round(h / plane.yCell)];
    plane.xCenter = Math.round(plane.cells[1] / 2);
    plane.yCenter = Math.round(plane.cells[0] / 2);
    plane.centerCoords = [plane.yCenter * plane.xCell, plane.xCenter * plane.yCell];

  }
  bindNodes() {
    for (const selector in ui) {
      ui[selector] = document.querySelectorAll(ui[selector]);
      if (ui[selector].length === 1) ui[selector] = ui[selector][0];
    }
  }
  canvasInit() {
    const font = '10px Montserrat';
    const lineCapAndJoin = 'round';
    const color = `rgba(255,255,255,0.1)`;

    context.plane = ui.plane.getContext('2d');
    context.plane.lineCap = lineCapAndJoin;
    context.plane.lineJoin = lineCapAndJoin;
    context.plane.font = font;
    context.plane.fillStyle = color;
    context.plane.strokeStyle = color;

    context.main = ui.main.getContext('2d');
    context.main.lineCap = lineCapAndJoin;
    context.main.lineJoin = lineCapAndJoin;
    context.main.font = font;
    context.main.fillStyle = color;
    context.main.strokeStyle = color;

    this.getTextPixels();
  }
  initEvents() {

    window.addEventListener('resize', e => {
      this.getDimensions();
      this.resizeHandler(e);
    });
    document.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.coords = {
        x: (mouse.x / doc.width - 0.5) / 0.5,
        y: (mouse.y / doc.height - 0.5) / 0.5 * -1 };

    });
    document.addEventListener('mousedown', e => {
      mouse.down = {
        state: true,
        x: e.clientX,
        y: e.clientY };

    });
    document.addEventListener('mouseup', e => {
      mouse.down.state = false;
    });
    document.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
    this.resizeHandler();

  }
  resizeHandler(e) {
    const state = this.state;
    state.area = doc.width * doc.height / 1000000;
    ui.main.height = doc.height;
    ui.main.width = doc.width;
    ui.plane.height = doc.height;
    ui.plane.width = doc.width;
    this.updatePlane();
    this.updateTextConfig();
    if (state.planeIsDrawn) this.getTextPixels();
    state.needRedraw = true;
  }
  updateTextConfig() {
    const state = this.state;


  }
  initCheckingInterval() {
    const state = this.state;
    setInterval(() => {
      state.tabIsActive = state.time <= state.lt ? false : true;
      state.lt = state.time;
      state.needRedraw = !state.tabIsActive;
    }, 100);
  }
  loop() {
    const loop = () => {
      const ctx = context.main;
      const state = this.state;
      state.time = Date.now();
      ctx.clearRect(0, 0, doc.width, doc.height);
      this.updateState();
      this.draw();
      if (state.needRedraw) state.needRedraw = false;
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }
  updateState() {
    const state = this.state;

    const now = performance.now();
    state.delta = now - state.dlt;
    state.dlt = now;

    const dt = state.delta;

    if (mouse.down.state) {
      state.mousePower += +0.001 * dt;
      if (state.mousePower >= 1) {
        state.mousePower = 1;
        ui.mouse.classList.remove('active');
      }
    } else {
      state.mousePower -= 0.001 * dt;
      if (state.mousePower <= 0) state.mousePower = 0;
    }

    const mp = tools.cellEasing(state.mousePower, 0, 1, 1);

    if (state.planeProgress >= 0.2) {
      state.dotsProgress += 0.00035 * dt;
      if (state.dotsProgress >= 1) state.dotsProgress = 1;
    }

    state.planeProgress += 0.00035 * dt;
    if (state.planeProgress >= 1) state.planeProgress = 1;

    if (state.planeIsDrawn) {

      state.fadeInProgress += 0.00015 * dt;
      if (state.fadeInProgress >= 1) state.fadeInProgress = 1;

      state.stepOffset += 0.002 * dt + mp * (0.0035 * dt);
      state.textOffset += 0.00005 * dt + mp * (0.002 * dt);
      state.markupOffset += 0.00015 * dt + mp * (0.00035 * dt);

      state.textProgress += 0.0005 * dt;
      if (state.textProgress >= 1) state.textProgress = 1;
    }
  }
  getTextPixels() {
    const ctx = context.main;
    const state = this.state;
    const { xCell, yCell } = plane;
    tools.drawPath(ctx, () => {
      ctx.fillStyle = 'white';
      ctx.textBaseline = state.text.baseLine;
      ctx.font = state.text.font;
      const text = state.text.value;
      const h = parseInt(ctx.font);
      const w = ctx.measureText(text).width;
      const x = doc.width / 2 - w / 2;
      const y = yCell * 1.75;
      ctx.fillText(text, x, y);
    });
    const imageData = ctx.getImageData(0, 0, doc.width, doc.height).data;
    state.textPixelData = [];
    const offset = 10;
    for (let h = 0; h < doc.height; h += offset) {
      for (let w = 0; w < doc.width; w += offset) {
        const pixel = imageData[(w + h * doc.width) * 4 - 1];
        if (pixel == 255) state.textPixelData.push({
          x: w,
          y: h,
          value: tools.random(0, 1, true) });

      }
    }
    ctx.clearRect(0, 0, doc.width, doc.height);
  }
  drawText() {

    const { yCell } = plane;
    const ctx = context.main;
    const state = this.state;
    const p = state.textOffset;
    const mp = tools.cellEasing(state.mousePower, 0, 1, 1);
    const length = state.textPixelData.length;

    tools.drawPath(ctx, () => {
      if (cfg.shadowBlur) {
        ctx.shadowColor = 'rgba(255,255,255,0.025)';
        ctx.shadowBlur = 30 * state.mousePower;
      }
      ctx.globalAlpha = state.fadeInProgress * 0.95;
      ctx.textBaseline = state.text.baseLine;
      ctx.fillStyle = cfg.bgColor;
      ctx.font = state.text.font;
      const text = state.text.value;
      const x = doc.width / 2 - ctx.measureText(text).width / 2;
      const y = yCell * 1.75;
      ctx.fillText(text, x, y);
    });

    for (let i = 0; i < state.textPixelData.length; i++) {
      const pixel = state.textPixelData[i];
      const { x, y, value } = pixel;
      const x2 = (3 + mp * 50) * Math.sin(p * i);
      const y2 = (10 + mp * 50) * Math.cos(p * i);
      const per = (1 - mp) * (i / length);
      tools.drawPath(ctx, () => {
        if (!per) return;
        ctx.globalAlpha = state.fadeInProgress;
        ctx.font = '8px Montserrat';

        ctx.fillStyle = `rgba(255,255,255,${per * 0.3})`;
        if (i % 2 === 0) ctx.fillText(value + '', x, y + y2 * -1);

        ctx.fillStyle = `rgba(255,255,255,${per})`;
        ctx.fillRect(x + x2, y, 5 * per * (1 - mp), 1);
        ctx.fillRect(x, y + y2, 1, 5 * per * (1 - mp));
      });
    }

  }
  draw() {

    const ctx = context.main;
    const state = this.state;

    const {
      xCell,
      yCell,
      xCenter,
      yCenter,
      cells } =
    plane;

    const cp = state.planeProgress;

    if (this.state.planeProgress >= 1 && !state.planeIsDrawn) {
      state.planeIsDrawn = true;
      this.startGeneratingGlitches();

    }

    if (!state.planeIsDrawn || state.dotsProgress < 1 || state.planeIsDrawn && state.needRedraw) {
      this.drawPlane();
    }


    if (state.planeIsDrawn) {
      this.drawGlitches();

    }

  }




  startGeneratingGlitches() {
    const state = this.state;
    function generateItem() {
      const { cells, xCell, yCell } = plane;
      const mp = state.mousePower;
      const timeToNewItem = tools.random(
      (5 + 100 * (1 - mp)) / state.area,
      (25 + 1200 * (1 - mp)) / state.area);

      const item = {
        p: 0,
        color: `rgba(255,255,255,${tools.random(0.01, 1)})`,
        blinks: Array(tools.random(0, 3, true)).fill(null).map(blink => {
          return {
            at: tools.random(0, 1),
            dur: tools.random(0, 0.3) };

        }),
        pf: tools.random(0.0015, 0.0035),
        x: tools.random(0, cells[0], true) * xCell,
        y: tools.random(0, cells[1], true) * yCell,
        width: xCell,
        height: yCell };

      if (state.tabIsActive) state.glitches.push(item);
      setTimeout(generateItem, timeToNewItem);
    }
    generateItem();
  }
  drawGlitches() {
    const ctx = context.main;
    const state = this.state;
    state.glitches.forEach((glitch, i) => {
      glitch.p += glitch.pf * state.delta;
      let show = true;
      glitch.blinks.forEach(blink => {
        if (glitch.p >= blink.at && glitch.p <= blink.at + blink.dur) show = false;
      });
      if (!show) return;
      tools.drawPath(ctx, () => {
        if (cfg.shadowBlur) {
          ctx.shadowColor = 'white';
          ctx.shadowBlur = 30;
        }
        ctx.globalAlpha = state.fadeInProgress;
        ctx.fillStyle = glitch.color;
        ctx.fillRect(glitch.x, glitch.y, glitch.width, glitch.height);
      });
      if (glitch.p >= 1) state.glitches.splice(i, 1);
    });
  }


  drawPlaneCenterLines(props) {
    const { p } = props;
    const ctx = context.plane;
    const {
      centerCoords } =
    plane;
    tools.drawPath(ctx, () => {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + (1 - p) * 0.35})`;
      ctx.fillRect(centerCoords[0], 0 + doc.height / 2 * (1 - p), 1, doc.height * p);
      ctx.fillRect(0 + doc.width / 2 * (1 - p), centerCoords[1], doc.width * p, 1);
    });
  }
  drawYLines(props) {
    const { i, cp, p, x } = props;
    const ctx = context.plane;
    const {
      yCenter } =
    plane;
    const percent = 1 / yCenter;
    const pos = Math.abs(i - yCenter);
    const point = percent * pos;
    let f = cp * (cp / point);
    if (f >= 1) f = 1;
    const ef = tools.cellEasing(f, 0, 1, 1);
    if (i) {
      tools.drawPath(ctx, () => {
        ctx.fillStyle = `rgba(255,255,255,${0.05 + (1 - p) * 0.35})`;
        ctx.fillRect(x, 0 + doc.height / 2 * (1 - ef), 1, doc.height * ef);
      });
    }
  }

  drawXLines(props) {
    const ctx = context.plane;
    const { i2, cp, p, y } = props;
    const {
      xCenter } =
    plane;
    const percent = 1 / xCenter;
    const pos = Math.abs(i2 - xCenter);
    const point = percent * pos;
    let f = cp * (cp / point);
    if (f >= 1) f = 1;
    const ef = tools.cellEasing(f, 0, 1, 1);
    if (i2) {
      tools.drawPath(ctx, () => {
        ctx.fillStyle = `rgba(255,255,255,${0.05 + (1 - p) * 0.35})`;
        ctx.fillRect(0 + doc.width / 2 * (1 - ef), y, doc.width * ef, 1);
      });
    }
  }

  drawPlane() {

    const state = this.state;
    const ctx = context.plane;

    ctx.clearRect(0, 0, doc.width, doc.height);

    const {
      xCell,
      yCell,
      xCenter,
      yCenter,
      cells } =
    plane;

    const p = tools.easing(state.planeProgress, 0, 1, 1);
    const cp = state.planeProgress;
    const dp = state.dotsProgress;

    this.drawPlaneCenterLines({ p });

    for (let i = 0; i < cells[0]; i++) {
      for (let i2 = 0; i2 < cells[1]; i2++) {

        const x = i * xCell;
        const y = i2 * yCell;


        if (i2 === xCenter && i !== yCenter) {
          this.drawYLines({ i, i2, p, cp, x, y });

        }
        if (i2 !== xCenter && i === yCenter) {
          this.drawXLines({ i, i2, p, cp, x, y });
        }
      }
    }

  }

}


window.addEventListener('load', () => {
  window.app = new App();
});