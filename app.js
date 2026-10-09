"use strict";

const $ = (id) => document.getElementById(id);

function playWelcomeSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const notes = [659.25, 783.99, 987.77, 1318.51];

    notes.forEach((frequency, i) => {
      const start = ctx.currentTime + i * 0.19;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.10, start + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.33);
    });

    window.setTimeout(() => ctx.close().catch(() => {}), 1500);
  } catch (error) {
    console.warn("پخش صدای خوشامدگویی امکان‌پذیر نشد.", error);
  }
}

const families = [
  {
    id: "resistors",
    icon: "Ω",
    title: "مقاومت‌ها",
    description: "محدود کردن جریان و تقسیم ولتاژ",
    status: "شروع یادگیری",
    enabled: true
  },
  {
    id: "capacitors",
    icon: "║",
    title: "خازن‌ها",
    description: "ذخیره بار و انرژی الکتریکی",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "diodes",
    icon: "▷",
    title: "دیودها",
    description: "یک‌سوسازی و کنترل مسیر جریان",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "transistors",
    icon: "T",
    title: "ترانزیستورها",
    description: "تقویت و سوئیچینگ الکترونیکی",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "ics",
    icon: "▦",
    title: "مدارهای مجتمع",
    description: "آشنایی با آی‌سی‌ها و کاربرد آن‌ها",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "inductors",
    icon: "∿",
    title: "سلف‌ها",
    description: "ذخیره انرژی در میدان مغناطیسی",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "leds",
    icon: "✦",
    title: "LED و قطعات نوری",
    description: "تبدیل انرژی الکتریکی به نور",
    status: "آموزش مقدماتی",
    enabled: true
  },
  {
    id: "measurement",
    icon: "V",
    title: "ابزار اندازه‌گیری",
    description: "آشنایی با مولتی‌متر و آزمون قطعات",
    status: "آموزش مقدماتی",
    enabled: true
  }
];

const resistorTypes = [
  {
    title: "مقاومت ثابت",
    subtitle: "مقدار مقاومت در شرایط عادی ثابت است",
    description:
      "مقاومت ثابت برای محدود کردن جریان، تقسیم ولتاژ و تنظیم شرایط کاری مدار استفاده می‌شود.",
    applications: [
      "محدود کردن جریان LED",
      "تقسیم ولتاژ",
      "تعیین بایاس ترانزیستور"
    ],
    test:
      "برای اندازه‌گیری مقاومت با مولتی‌متر، بهتر است برق مدار قطع باشد و در صورت امکان یک پایه قطعه از مدار جدا شود."
  },
  {
    title: "مقاومت متغیر",
    subtitle: "مقدار مقاومت قابل تنظیم است",
    description:
      "پتانسیومتر و تریمر از انواع مقاومت متغیر هستند. با حرکت محور یا پیچ تنظیم، مقدار مقاومت یا ولتاژ خروجی تغییر می‌کند.",
    applications: [
      "تنظیم شدت صدا",
      "تنظیم روشنایی",
      "تنظیم نقطه کاری مدار"
    ],
    test:
      "در بسیاری از پتانسیومترها، مقاومت بین دو پایه انتهایی ثابت است؛ مقاومت بین پایه وسط و یکی از پایه‌های انتهایی با چرخاندن محور تغییر می‌کند."
  },
  {
    title: "مقاومت SMD",
    subtitle: "قطعه کوچک مناسب نصب سطحی",
    description:
      "مقاومت‌های SMD مستقیماً روی سطح برد نصب می‌شوند. کد روی بدنه بعضی از آن‌ها مقدار مقاومت را نشان می‌دهد.",
    applications: [
      "بردهای الکترونیکی فشرده",
      "تجهیزات دیجیتال",
      "تلفن همراه و تجهیزات صنعتی"
    ],
    test:
      "کدگذاری مقاومت SMD همیشه یکسان نیست. برای تفسیر کدهای سه‌رقمی یا چهاررقمی باید نوع کد را تشخیص داد."
  }
];

const colorBands = [
  { name: "مشکی", hex: "#202124", value: 0, multiplier: 1, tolerance: null },
  { name: "قهوه‌ای", hex: "#795548", value: 1, multiplier: 10, tolerance: 1 },
  { name: "قرمز", hex: "#e53935", value: 2, multiplier: 100, tolerance: 2 },
  { name: "نارنجی", hex: "#fb8c00", value: 3, multiplier: 1000, tolerance: null },
  { name: "زرد", hex: "#fdd835", value: 4, multiplier: 10000, tolerance: null },
  { name: "سبز", hex: "#43a047", value: 5, multiplier: 100000, tolerance: 0.5 },
  { name: "آبی", hex: "#1e88e5", value: 6, multiplier: 1000000, tolerance: 0.25 },
  { name: "بنفش", hex: "#8e24aa", value: 7, multiplier: 10000000, tolerance: 0.1 },
  { name: "خاکستری", hex: "#757575", value: 8, multiplier: 100000000, tolerance: 0.05 },
  { name: "سفید", hex: "#f5f5f5", value: 9, multiplier: 1000000000, tolerance: null },
  { name: "طلایی", hex: "#c9a227", value: null, multiplier: 0.1, tolerance: 5 },
  { name: "نقره‌ای", hex: "#b9c0c7", value: null, multiplier: 0.01, tolerance: 10 }
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderFamilies() {
  const grid = $("familyGrid");
  if (!grid) return;

  grid.innerHTML = families.map((family) => `
    <button type="button"
      class="family${family.enabled ? "" : " disabled"}"
      data-family="${family.id}"
      ${family.enabled ? "" : "disabled"}>
      <span class="icon">${escapeHTML(family.icon)}</span>
      <h3>${escapeHTML(family.title)}</h3>
      <p>${escapeHTML(family.description)}</p>
      <span class="status">${escapeHTML(family.status)}</span>
    </button>
  `).join("");

  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-family]");
    if (!card) return;
    openFamily(card.dataset.family);
  });
}

function openFamily(id) {
  const family = families.find((item) => item.id === id);
  if (!family) return;

  const lesson = $("lesson");
  const content = $("lessonContent");
  if (!lesson || !content) return;

  if (id === "resistors") {
    renderResistorLesson();
  } else {
    renderGeneralLesson(family);
  }

  lesson.classList.remove("hidden");
  lesson.classList.remove(
    "family-effect",
    "family-effect-resistors",
    "family-effect-capacitors",
    "family-effect-diodes",
    "family-effect-transistors",
    "family-effect-ics",
    "family-effect-inductors",
    "family-effect-leds",
    "family-effect-measurement"
  );
  void lesson.offsetWidth;
  lesson.classList.add("family-effect", "family-effect-" + id);
  lesson.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResistorLesson() {
  const content = $("lessonContent");

  content.innerHTML = `
    <span class="eyebrow">آموزش گام‌به‌گام</span>
    <h2 class="lesson-title">آشنایی با مقاومت‌ها</h2>
    <p class="intro">
      مقاومت یکی از قطعات پایه در الکترونیک است. این قطعه در برابر عبور
      جریان الکتریکی مقاومت ایجاد می‌کند و برای کنترل جریان و تقسیم ولتاژ
      به کار می‌رود.
    </p>

    <div class="types">
      ${resistorTypes.map((type, index) => `
        <button type="button" class="type" data-resistor-type="${index}">
          <b>${escapeHTML(type.title)}</b>
          <small>${escapeHTML(type.subtitle)}</small>
        </button>
      `).join("")}
    </div>

    <div id="resistorDetail" class="detail">
      <div class="detail-grid">
        <div class="box">
          <h4>واحد اندازه‌گیری</h4>
          <p>واحد مقاومت اهم (Ω) است. یک کیلو‌اهم برابر ۱۰۰۰ اهم و یک مگااهم برابر یک میلیون اهم است.</p>
        </div>
        <div class="box">
          <h4>قانون اهم</h4>
          <p>در شرایط مناسب، رابطه ولتاژ، جریان و مقاومت با فرمول V = I × R بیان می‌شود.</p>
        </div>
      </div>
    </div>

    <div class="color-tool" id="resistorCalculator">
      <span class="eyebrow">ابزار تعاملی</span>
      <h3>محاسبه‌گر رنگ مقاومت چهارنواره</h3>
      <p class="intro">
        رنگ هر نوار را از فهرست زیر انتخاب کن. ترتیب فیلدها و نوارهای
        مقاومت از چپ به راست است.
      </p>

      <div class="resistor-visual" aria-label="نمایش رنگ نوارهای مقاومت">
        <span class="lead"></span>
        <div class="body" id="resistorBody">
          <i></i><i></i><i></i><i></i>
        </div>
        <span class="lead"></span>
      </div>

      <div class="color-selects" dir="ltr">
        <label>
          <span>نوار اول — رقم اول</span>
          <select id="band1" aria-label="نوار اول"></select>
        </label>
        <label>
          <span>نوار دوم — رقم دوم</span>
          <select id="band2" aria-label="نوار دوم"></select>
        </label>
        <label>
          <span>نوار سوم — ضریب</span>
          <select id="band3" aria-label="نوار سوم"></select>
        </label>
        <label>
          <span>نوار چهارم — تلرانس</span>
          <select id="band4" aria-label="نوار چهارم"></select>
        </label>
      </div>

      <div class="result-panel" aria-live="polite">
        <div>
          <small>مقدار مقاومت</small><br>
          <strong id="resistanceValue">۱ کیلو‌اهم</strong>
        </div>
        <div>
          <small>تلرانس</small><br>
          <span id="toleranceValue">±۵٪</span>
        </div>
        <div>
          <small>بازه تقریبی</small><br>
          <span id="rangeValue">۹۵۰ تا ۱۰۵۰ اهم</span>
        </div>
      </div>

      <p class="note">
        این ابزار برای مقاومت‌های چهارنواره با دو رقم معنادار طراحی شده است.
        انتخاب رنگ‌ها باید با نوارهای واقعی قطعه تطبیق داده شود.
      </p>
    </div>

    <div class="quiz">
      <b>آزمون کوتاه</b>
      <p>واحد اصلی اندازه‌گیری مقاومت چیست؟</p>
      <button type="button" data-answer="wrong">ولت</button>
      <button type="button" data-answer="correct">اهم</button>
      <button type="button" data-answer="wrong">آمپر</button>
      <div class="quiz-feedback" id="quizFeedback" aria-live="polite"></div>
    </div>
  `;

  content.querySelectorAll("[data-resistor-type]").forEach((button) => {
    button.addEventListener("click", () => {
      showResistorType(Number(button.dataset.resistorType));
    });
  });

  content.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const feedback = $("quizFeedback");
      if (!feedback) return;
      feedback.textContent = button.dataset.answer === "correct"
        ? "آفرین! پاسخ درست است: اهم (Ω)."
        : "دوباره تلاش کن؛ واحد مقاومت اهم (Ω) است.";
      feedback.style.color = button.dataset.answer === "correct" ? "#0e8f83" : "#c45b38";
    });
  });

  initColorCalculator();
}

function showResistorType(index) {
  const type = resistorTypes[index];
  const detail = $("resistorDetail");
  if (!type || !detail) return;

  detail.innerHTML = `
    <h3>${escapeHTML(type.title)}</h3>
    <p class="intro">${escapeHTML(type.description)}</p>
    <div class="detail-grid">
      <div class="box">
        <h4>کاربردهای رایج</h4>
        <ul>${type.applications.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
      </div>
      <div class="box">
        <h4>نکته فنی</h4>
        <p>${escapeHTML(type.test)}</p>
      </div>
    </div>
    <div class="safety">
      پیش از اندازه‌گیری مقاومت در مدار، برق مدار را قطع کن و از شارژ نبودن خازن‌ها مطمئن شو.
    </div>
  `;
}

function renderGeneralLesson(family) {
  const content = $("lessonContent");

  const lessons = {
    capacitors: {
      intro: "خازن قطعه‌ای است که بار و انرژی الکتریکی را در میدان الکتریکی ذخیره می‌کند.",
      points: [
        "ظرفیت خازن با فاراد (F) سنجیده می‌شود.",
        "خازن‌ها در فیلترها، زمان‌سنج‌ها و مدارهای تغذیه کاربرد دارند.",
        "در خازن‌های قطبی مانند بسیاری از خازن‌های الکترولیتی، رعایت قطب‌ها ضروری است."
      ]
    },
    diodes: {
      intro: "دیود نیمه‌رسانایی است که در شرایط معمول جریان را عمدتاً در یک جهت عبور می‌دهد.",
      points: [
        "پایه آند و کاتد را تشخیص بده.",
        "دیودها در یک‌سوسازی و حفاظت مدار استفاده می‌شوند.",
        "LED نوعی دیود است که هنگام عبور جریان مناسب نور تولید می‌کند."
      ]
    },
    transistors: {
      intro: "ترانزیستور برای تقویت سیگنال یا کنترل جریان به‌عنوان یک کلید الکترونیکی استفاده می‌شود.",
      points: [
        "انواع رایج شامل BJT و MOSFET هستند.",
        "پایه‌ها و آرایش آن‌ها به مدل قطعه وابسته است.",
        "برای انتخاب قطعه باید جریان، ولتاژ و توان مجاز بررسی شود."
      ]
    },
    ics: {
      intro: "مدار مجتمع (IC) مجموعه‌ای از اجزای الکترونیکی است که روی یک تراشه ساخته شده‌اند.",
      points: [
        "شماره قطعه و دیتاشیت سازنده را بررسی کن.",
        "تغذیه و پایه زمین باید مطابق دیتاشیت متصل شوند.",
        "از اتصال اشتباه پایه‌ها و تجاوز از محدوده ولتاژ مجاز خودداری کن."
      ]
    },
    inductors: {
      intro: "سلف با عبور جریان، انرژی را در میدان مغناطیسی ذخیره می‌کند.",
      points: [
        "واحد اندوکتانس هانری (H) است.",
        "سلف‌ها در مبدل‌های تغذیه و فیلترها کاربرد دارند.",
        "جریان و مقاومت سیم‌پیچ از مشخصات مهم سلف هستند."
      ]
    },
    leds: {
      intro: "LED دیودی است که در بایاس مستقیم و جریان مناسب نور تولید می‌کند.",
      points: [
        "قطب مثبت و منفی LED را درست تشخیص بده.",
        "در اغلب مدارها برای LED به مقاومت محدودکننده جریان نیاز است.",
        "جریان و ولتاژ مجاز را از دیتاشیت بررسی کن."
      ]
    },
    measurement: {
      intro: "مولتی‌متر برای اندازه‌گیری کمیت‌هایی مانند ولتاژ، جریان و مقاومت به کار می‌رود.",
      points: [
        "برای ولتاژ، پراب‌ها به‌صورت موازی به مدار متصل می‌شوند.",
        "برای اندازه‌گیری جریان، مولتی‌متر باید در مسیر جریان قرار گیرد.",
        "مقاومت را در مدار خاموش اندازه‌گیری کن."
      ]
    }
  };

  const lesson = lessons[family.id] || {
    intro: family.description,
    points: ["مشخصات قطعه را از دیتاشیت معتبر بررسی کن."]
  };

  content.innerHTML = `
    <span class="eyebrow">آموزش مقدماتی</span>
    <h2 class="lesson-title">${escapeHTML(family.title)}</h2>
    <p class="intro">${escapeHTML(lesson.intro)}</p>
    <div class="detail-grid">
      <div class="box">
        <h4>نکات کلیدی</h4>
        <ul>${lesson.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>
      </div>
      <div class="box">
        <h4>روش یادگیری</h4>
        <p>ابتدا ظاهر قطعه و علامت‌های روی بدنه را بررسی کن؛ سپس شماره قطعه و مشخصات فنی را در دیتاشیت سازنده پیدا کن.</p>
      </div>
    </div>
    <div class="safety">
      پیش از آزمایش هر قطعه، منبع تغذیه را بررسی کن و از رعایت ولتاژ، جریان و قطبیت مجاز مطمئن شو.
    </div>
  `;
}

function initColorCalculator() {
  const selects = [
    $("band1"),
    $("band2"),
    $("band3"),
    $("band4")
  ];

  if (selects.some((select) => !select)) return;

  const digitColors = colorBands.filter((color) => color.value !== null);
  const multiplierColors = colorBands.filter((color) => color.multiplier !== null);
  const toleranceColors = colorBands.filter((color) => color.tolerance !== null);

  function fillSelect(select, colors, selectedName) {
    select.innerHTML = colors.map((color) => `
      <option value="${color.name}" ${color.name === selectedName ? "selected" : ""}>
        ${color.name}
      </option>
    `).join("");
  }

  fillSelect(selects[0], digitColors, "قهوه‌ای");
  fillSelect(selects[1], digitColors, "مشکی");
  fillSelect(selects[2], multiplierColors, "قرمز");
  fillSelect(selects[3], toleranceColors, "طلایی");

  selects.forEach((select) => {
    select.addEventListener("change", updateColorCalculator);
  });

  updateColorCalculator();
}

function updateColorCalculator() {
  const names = ["band1", "band2", "band3", "band4"];
  const selected = names.map((id) => {
    const select = $(id);
    return colorBands.find((color) => color.name === select?.value);
  });

  if (selected.some((color) => !color)) return;

  const [first, second, multiplier, tolerance] = selected;

  const digits = first.value * 10 + second.value;
  const resistance = digits * multiplier.multiplier;
  const tolerancePercent = tolerance.tolerance;
  const lower = resistance * (1 - tolerancePercent / 100);
  const upper = resistance * (1 + tolerancePercent / 100);

  const bandElements = $("resistorBody")?.querySelectorAll("i") || [];
  selected.forEach((color, index) => {
    if (!bandElements[index]) return;
    bandElements[index].style.backgroundColor = color.hex;
    bandElements[index].title = color.name;
  });

  $("resistanceValue").textContent = formatResistance(resistance);
  $("toleranceValue").textContent = `±${formatFa(tolerancePercent)}٪`;
  $("rangeValue").textContent =
    `${formatResistance(lower)} تا ${formatResistance(upper)}`;
}

function formatFa(number) {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 3
  }).format(number);
}

function formatResistance(value) {
  if (!Number.isFinite(value)) return "نامشخص";

  if (value >= 1_000_000) {
    return `${formatFa(value / 1_000_000)} مگااهم`;
  }

  if (value >= 1_000) {
    return `${formatFa(value / 1_000)} کیلو‌اهم`;
  }

  return `${formatFa(value)} اهم`;
}

document.addEventListener("DOMContentLoaded", () => {
  const enter = $("enter");
  const welcome = $("welcome");
  const back = $("back");
  const menu = $("menu");
  const nav = $("nav");
  const home = $("home");

  if (enter && welcome) {
    enter.addEventListener("click", () => {
      playWelcomeSound();
      welcome.classList.add("dismissed");
    });
  }

  if (back) {
    back.addEventListener("click", () => {
      $("lesson")?.classList.add("hidden");
      $("families")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  if (home) {
    home.addEventListener("click", (event) => {
      event.preventDefault();
      $("lesson")?.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  renderFamilies();
});

// ACADEMY_FAMILY_SOUND_EFFECTS
(function () {
  "use strict";

  var audioContext = null;
  var sounds = {
    resistors:    { notes: [520, 780], type: "triangle", duration: 0.085 },
    capacitors:   { notes: [330, 660, 880], type: "sine", duration: 0.12 },
    diodes:       { notes: [1250, 900], type: "square", duration: 0.055 },
    transistors:  { notes: [440, 880, 440], type: "sawtooth", duration: 0.065 },
    ics:          { notes: [950, 1250, 1050], type: "square", duration: 0.055 },
    inductors:    { notes: [260, 390], type: "sine", duration: 0.15 },
    leds:         { notes: [700, 1050, 1400], type: "sine", duration: 0.075 },
    measurement:  { notes: [880, 660], type: "triangle", duration: 0.11 }
  };

  function playTone(frequency, start, duration, type) {
    var oscillator = audioContext.createOscillator();
    var gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.075, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(start);
    oscillator.stop(start + duration + 0.015);
  }

  document.addEventListener("click", function (event) {
    var card = event.target.closest("[data-family]");
    if (!card) return;

    var family = card.getAttribute("data-family");
    var sound = sounds[family];
    if (!sound) return;

    try {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContext) audioContext = new AudioContextClass();

      var play = function () {
        var start = audioContext.currentTime + 0.015;
        sound.notes.forEach(function (frequency, index) {
          playTone(
            frequency,
            start + index * sound.duration * 0.85,
            sound.duration,
            sound.type
          );
        });
      };

      if (audioContext.state === "suspended") {
        audioContext.resume().then(play).catch(function () {});
      } else {
        play();
      }
    } catch (error) {
      // Audio is optional; the lesson must work even if sound is unavailable.
    }
  }, true);
})();
