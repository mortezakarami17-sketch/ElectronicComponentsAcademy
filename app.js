"use strict";

/* =========================================================
   آکادمی قطعات الکترونیک | گروه آموزشی فنی و مهندسی معلم خوب
   نسخه آموزشی + آزمون‌های ۸۰ سؤالی + ثبت کارنامه محلی
   سازگار با index.html و style.css فعلی
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const welcome = $("#welcome");
  const enterButton = $("#enter");
  const homeButton = $("#home");
  const menuButton = $("#menu");
  const nav = $("#nav");
  const familyGrid = $("#familyGrid");
  const lesson = $("#lesson");
  const lessonContent = $("#lessonContent");
  const backButton = $("#back");

  if (!familyGrid || !lesson || !lessonContent) {
    console.error("ساختار اصلی آکادمی در HTML پیدا نشد.");
    return;
  }

  // استایل‌های افزوده‌شده برای آزمون و کاپ‌ها؛ فایل style.css فعلی دست‌نخورده می‌ماند.
  const quizStyle = document.createElement("style");
  quizStyle.textContent = `
    .family-result{display:block;margin-top:8px;color:#647789;font-size:10px;line-height:1.7}
    .resistor-explorer{margin:18px 0 24px}
    .resistor-choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}
    .resistor-choice{display:flex;flex-direction:column;gap:7px;align-items:flex-start;text-align:right;padding:17px;border:1px solid #d7e5eb;border-radius:14px;background:#fff;color:#182c3c;font:inherit;cursor:pointer;min-height:105px;transition:border-color .15s,transform .15s,background .15s}
    .resistor-choice:hover{border-color:#18b6a4;background:#f2fcfa;transform:translateY(-1px)}
    .resistor-choice strong{font-size:14px}.resistor-choice small{font-size:11px;line-height:1.8;color:#647789}
    .resistor-explorer-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:18px 0 8px}
    .resistor-back{border:1px solid #cbd9e1;border-radius:9px;background:#f7fafc;color:#234;padding:8px 12px;font:inherit;font-size:11px;cursor:pointer}
    .resistor-detail{padding:15px;border:1px solid #d9e7eb;border-radius:13px;background:#fbfefe;margin:12px 0}
    .resistor-detail h3{margin:0 0 8px;font-size:17px;color:#10243a}.resistor-detail p{font-size:12px;line-height:2;color:#526777}
    #resistanceValue{direction:ltr;unicode-bidi:isolate;display:inline-block;text-align:left}
    #resistanceRange b{direction:ltr;unicode-bidi:isolate;display:inline-block;font-weight:600}
    @media(max-width:520px){.resistor-choice-grid{grid-template-columns:1fr}.resistor-choice{min-height:0;padding:14px}}
    .quiz{margin-top:26px;padding:clamp(16px,3vw,26px);background:#fbfefe;border:1px solid #cfe6e3;border-radius:17px}
    .quiz h3{font-size:20px;margin:5px 0 10px;color:#10243a}
    .quiz .saved-result{font-size:11px;color:#526777;background:#eef7f7;border-radius:9px;padding:9px 12px}
    .quiz-start{margin:16px 0}
    .quiz-progress{font-size:12px;font-weight:800;color:#0e8f83}
    .quiz-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:16px 0}
    /* برچسب در لبه راست و پاسخ پس از آن؛ متن پاسخ بدون spanهای دوجهته تو‌در‌تو */
    .quiz .quiz-options button{display:flex;flex-direction:row;align-items:baseline;justify-content:flex-start;gap:.35em;width:100%;min-height:48px;margin:0;padding:11px 13px;text-align:right;direction:rtl;unicode-bidi:isolate;background:#fff;border:1px solid #dce6ed;border-radius:10px;color:#182c3c;font:500 12px/1.8 Vazirmatn,Tahoma,sans-serif;transition:background .15s,border-color .15s}
    .quiz .quiz-options button .quiz-option-line{display:flex;flex-direction:row;align-items:baseline;gap:.35em;width:100%;direction:rtl;text-align:right;overflow-wrap:anywhere}
    .quiz .quiz-options button .quiz-option-label{display:inline-block;flex:0 0 auto;direction:rtl;unicode-bidi:isolate;font-weight:900;color:#0e8f83;white-space:nowrap}
    .quiz .quiz-options button .quiz-option-value{display:inline-block;flex:1 1 auto;min-width:0;direction:rtl;unicode-bidi:isolate;text-align:right;white-space:normal}
    .quiz .quiz-options button:hover:not(:disabled){border-color:#18b6a4;background:#f0fcfa}
    .quiz .quiz-options button:disabled{cursor:default;opacity:1}
    .quiz .quiz-options button.answer-correct{border-color:#16a34a;background:#ecfdf5;color:#166534}
    .quiz .quiz-options button.answer-wrong{border-color:#dc2626;background:#fef2f2;color:#991b1b}
    .quiz-feedback{font-size:12px;font-weight:700;line-height:2}
    .result-card{margin:15px 0;padding:22px;text-align:center;background:#f5f9fb;border:1px solid #dce6ed;border-radius:16px}
    .result-card.award-gold{background:linear-gradient(145deg,#fff9df,#fffdf5);border-color:#d5ad35;box-shadow:0 0 0 2px #f7e7a6 inset}
    .result-card.award-silver{background:linear-gradient(145deg,#f1f4f7,#fff);border-color:#9ba8b4;box-shadow:0 0 0 2px #e0e5e9 inset}
    .result-card.award-bronze{background:linear-gradient(145deg,#fff0e4,#fffaf5);border-color:#b87333;box-shadow:0 0 0 2px #f1d2b8 inset}
    .award-symbol{display:flex;justify-content:center;align-items:center;line-height:1.4;margin:0 auto 8px}
    .award-cup{display:inline-flex;width:62px;height:62px;align-items:center;justify-content:center;filter:drop-shadow(0 3px 2px #10243a20)}
    .award-cup svg{display:block;width:100%;height:100%;overflow:visible}
    .award-cup-gold{color:#e0aa16}.award-cup-silver{color:#9aa7b5}.award-cup-bronze{color:#b87333}.award-cup-none{color:#91a4b5}
    .award-label{font-size:17px;font-weight:900;margin:3px 0;color:#182c3c}
    .award-gold .award-label{color:#a87900}.award-silver .award-label{color:#65717d}.award-bronze .award-label{color:#9a5420}
    .score-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:18px 0}
    .score-stats div{display:flex;flex-direction:column;padding:12px 5px;background:#fff;border:1px solid #e1e9ee;border-radius:10px}
    .score-stats strong{font-size:21px;color:#10243a}.score-stats span{font-size:10px;color:#647789}
    .result-note{font-size:10px;color:#647789}
    .answer-review{direction:ltr;text-align:left;margin-top:22px}
    .answer-review h4{font-size:15px}
    .review-item{direction:ltr;text-align:left;margin:10px 0;padding:12px 14px;border-radius:10px;border-left:4px solid #9ca3af;border-right:0;background:#f7fafc;font-size:11px}
    .review-item p{margin:5px 0}.review-item small{color:#526777;line-height:1.9}
    .quiz-ltr{direction:ltr;unicode-bidi:isolate;display:inline-block;text-align:left;white-space:nowrap}
    .quiz-measurement{direction:ltr;unicode-bidi:isolate;display:inline-flex;align-items:baseline;flex-wrap:nowrap;gap:.4em;white-space:nowrap;}
    .quiz-amount{direction:ltr!important;unicode-bidi:isolate;display:inline-grid;grid-auto-flow:column;grid-template-columns:max-content max-content;align-items:baseline;gap:.25em;white-space:nowrap;justify-content:start}
    .quiz-amount>span:first-child{direction:ltr!important;unicode-bidi:isolate}
    .quiz-amount>.quiz-unit-fa{direction:rtl;unicode-bidi:isolate;white-space:nowrap}
    .quiz-unit-fa{direction:rtl;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
    .quiz-error{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
    .review-correct{border-left-color:#16a34a;background:#f0fdf4}.review-wrong{border-left-color:#dc2626;background:#fff7f7}
    .review-item b,.review-item p,.review-item small{unicode-bidi:plaintext}
    @media(max-width:600px){.quiz-options{grid-template-columns:1fr}.score-stats{gap:5px}.score-stats div{padding:9px 3px}.award-symbol{font-size:40px}}
  `;
  document.head.appendChild(quizStyle);

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  // نمایش مقدار مقاومت و تلرانس به‌صورت متن ساده فارسی؛ از spanهای تو‌در‌تو با جهت‌های متضاد پرهیز می‌کنیم تا ترتیب متن در مرورگر به‌هم نریزد.
  const formatQuizText = (value) => {
    let text = String(value);
    const digits = "0-9۰-۹٠-٩";
    const resistancePattern = new RegExp(`([${digits}]+(?:[.,٫][${digits}]+)?)\\s*(MΩ|kΩ|Ω)\\s*(?:±|\\+/-)\\s*([${digits}]+(?:[.,٫][${digits}]+)?)\\s*(?:٪|%)`, "g");
    text = text.replace(resistancePattern, (match, number, unit, errorPercent) => {
      const persianUnit = unit === "MΩ" ? "مگا اهم" : unit === "kΩ" ? "کیلو اهم" : "اهم";
      return `${number} ${persianUnit} با ${errorPercent} درصد خطا`;
    });
    const unitPattern = new RegExp(`([${digits}]+(?:[.,٫][${digits}]+)?)\\s*(MΩ|kΩ|Ω)`, "g");
    text = text.replace(unitPattern, (match, number, unit) => {
      const persianUnit = unit === "MΩ" ? "مگا اهم" : unit === "kΩ" ? "کیلو اهم" : "اهم";
      return `${number} ${persianUnit}`;
    });
    return escapeHTML(text);
  };

  function renderAwardCup(key) {
    const cupColor = ({ gold:"gold", silver:"silver", bronze:"bronze" })[key] || "none";
    return `<span class="award-cup award-cup-${cupColor}" aria-hidden="true"><svg viewBox="0 0 64 64" role="img" focusable="false"><path fill="currentColor" d="M18 7h28v8h9v8c0 9-6 15-15 16-1 3-3 5-6 6v6h10v7H20v-7h10v-6c-3-1-5-3-6-6-9-1-15-7-15-16v-8h9V7zm-2 15h-3v2c0 5 3 9 8 10-3-4-5-8-5-12zm32 0c0 4-2 8-5 12 5-1 8-5 8-10v-2h-3zM24 12v17c0 5 3 9 8 9s8-4 8-9V12H24z"/><path fill="#ffffff" opacity=".3" d="M27 14h4v18h-4z"/></svg></span>`;
  }

  const scrollToElement = (element) => {
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const closeMenu = () => {
    if (nav) nav.classList.remove("open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  };

  /* صداهای تعاملی */
  let audioContext = null;
  let soundEnabled = true;
  let lastClickSoundAt = 0;

  function getAudioContext() {
    if (!soundEnabled) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    try {
      if (!audioContext) audioContext = new AudioContextClass();
      if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
      return audioContext;
    } catch { return null; }
  }

  function playTone({ frequency = 650, endFrequency = null, duration = 0.055, volume = 0.035, wave = "sine" } = {}) {
    const context = getAudioContext();
    if (!context) return;
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime;
      const end = start + duration;
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, start);
      if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), end);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(start); oscillator.stop(end + 0.01);
    } catch { /* صدا اختیاری است؛ نبود آن نباید برنامه را متوقف کند. */ }
  }

  function playClickSound() {
    const now = performance.now();
    if (now - lastClickSoundAt < 45) return;
    lastClickSoundAt = now;
    playTone({ frequency: 720, endFrequency: 590, duration: 0.045, volume: 0.025 });
  }
  function playWelcomeSound() {
    playTone({ frequency: 523, endFrequency: 659, duration: 0.13 });
    window.setTimeout(() => playTone({ frequency: 659, endFrequency: 784, duration: 0.15 }), 110);
  }
  function playSuccessSound() {
    playTone({ frequency: 660, endFrequency: 880, duration: 0.12 });
    window.setTimeout(() => playTone({ frequency: 880, endFrequency: 1046, duration: 0.14 }), 105);
  }
  function playErrorSound() {
    playTone({ frequency: 270, endFrequency: 190, duration: 0.14, volume: 0.03, wave: "triangle" });
  }
  function playFamilySound(id) {
    const tones = { resistors:[440,660], capacitors:[500,750], diodes:[520,880], transistors:[390,590], ics:[600,900], inductors:[350,520], leds:[660,990], measurement:[480,720] };
    const pair = tones[id] || [500,700];
    playTone({ frequency: pair[0], endFrequency: pair[1], duration: 0.12, volume: 0.035 });
  }

  document.addEventListener("click", (event) => {
    const control = event.target.closest("button, select, input[type='button'], input[type='submit'], .family, .type");
    if (control && !control.disabled) playClickSound();
  });

  /* صفحه خوشامدگویی و منو */
  function dismissWelcome() {
    if (welcome) welcome.classList.add("dismissed");
    playWelcomeSound();
    window.setTimeout(() => welcome?.setAttribute("aria-hidden", "true"), 450);
  }
  enterButton?.addEventListener("click", () => {
    dismissWelcome();
    scrollToElement($("#families"));
  });
  homeButton?.addEventListener("click", (event) => {
    event.preventDefault(); closeMenu();
    if (welcome) {
      welcome.classList.remove("dismissed");
      welcome.removeAttribute("aria-hidden");
    } else window.scrollTo({ top: 0, behavior: "smooth" });
  });
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.addEventListener("click", () => {
    const opened = nav?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(Boolean(opened)));
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* فهرست خانواده‌ها */
  const families = [
    { id:"resistors", icon:"〽", title:"مقاومت‌ها", description:"کد رنگی، SMD، مقاومت متغیر و حسگرهای مقاومتی", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"capacitors", icon:"║", title:"خازن‌ها", description:"ظرفیت، قطبیت، انواع خازن و کاربردها", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"diodes", icon:"▷", title:"دیودها", description:"یکسوساز، زنر، شاتکی و دیود نوری", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"transistors", icon:"♧", title:"ترانزیستورها", description:"BJT، MOSFET، IGBT و سوئیچینگ", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"ics", icon:"▦", title:"مدارهای مجتمع", description:"شناخت IC، پایه‌ها، تغذیه و دیتاشیت", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"inductors", icon:"∿", title:"سلف‌ها", description:"اندوکتانس، هسته، اشباع و کاربردها", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"leds", icon:"✦", title:"LED و منابع نوری", description:"قطبیت، جریان، رنگ نور و راه‌اندازی", status:"آموزش و آزمون ۱۰ سؤالی" },
    { id:"measurement", icon:"⌁", title:"ابزارهای اندازه‌گیری", description:"مولتی‌متر، ولتاژ، جریان و مقاومت", status:"آموزش و آزمون ۱۰ سؤالی" }
  ];
  const familyClassById = {
    resistors:"family-effect-resistors", capacitors:"family-effect-capacitors", diodes:"family-effect-diodes",
    transistors:"family-effect-transistors", ics:"family-effect-ics", inductors:"family-effect-inductors",
    leds:"family-effect-leds", measurement:"family-effect-measurement"
  };

  function getSavedResults() {
    try {
      const value = JSON.parse(localStorage.getItem("mkh-electronics-quiz-results") || "{}");
      return value && typeof value === "object" ? value : {};
    } catch { return {}; }
  }
  function saveResult(familyId, result) {
    const results = getSavedResults();
    results[familyId] = { ...result, savedAt: new Date().toISOString() };
    try { localStorage.setItem("mkh-electronics-quiz-results", JSON.stringify(results)); }
    catch (error) { console.warn("ذخیره نتایج در این مرورگر ممکن نشد.", error); }
  }
  function renderFamilyCards() {
    const results = getSavedResults();
    familyGrid.innerHTML = families.map((family) => {
      const result = results[family.id];
      const scoreText = result ? `آخرین نتیجه: ${result.correct}/10 · ${escapeHTML(result.awardLabel || "بدون کاپ")}` : "هنوز آزمون نداده‌ای";
      return `<button type="button" class="family" data-family="${family.id}" aria-label="باز کردن درس ${escapeHTML(family.title)}">
        <span class="icon" aria-hidden="true">${family.icon}</span><h3>${escapeHTML(family.title)}</h3>
        <p>${escapeHTML(family.description)}</p><span class="status">${escapeHTML(family.status)} ←</span>
        <small class="family-result">${scoreText}</small></button>`;
    }).join("");
  }
  familyGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-family]");
    if (card) openFamily(card.dataset.family);
  });

  let currentFamilyId = null;
  let quizState = null;

  /* آموزش‌ها: توضیح‌ها و کارت‌های هر خانواده */
  const lessons = {
    resistors: {
      title:"مقاومت‌ها", intro:"مقاومت قطعه‌ای پسیو است که جریان را محدود می‌کند و در تقسیم ولتاژ، بایاس، فیدبک و اندازه‌گیری به کار می‌رود. واحد آن اهم (Ω) است.",
      cards:[
        ["مقاومت ثابت", "مقدار اسمی در شرایط مشخص ثابت است. نوع کربنی، فیلم فلزی و سیمی از نمونه‌های رایج‌اند؛ توان و تلرانس باید متناسب با مدار انتخاب شوند."],
        ["کد رنگی چهارنواره", "دو نوار نخست رقم‌های معنادار، نوار سوم ضریب و نوار چهارم تلرانس را مشخص می‌کند. برای مثال قهوه‌ای، مشکی، قرمز، طلایی برابر ۱ کیلو‌اهم با تلرانس ±۵٪ است."],
        ["مقاومت SMD و کد عددی", "کد 472 در بسیاری از مقاومت‌های SMD برابر ۴۷×۱۰۰ یعنی ۴٫۷ کیلو‌اهم است. کدگذاری قطعات خاص را با استاندارد و دیتاشیت تطبیق بده."],
        ["مقاومت متغیر و پتانسیومتر", "پتانسیومتر معمولاً دو سر مسیر مقاومتی و یک پایه لغزنده دارد و می‌تواند تقسیم‌کننده ولتاژ بسازد. نوع گردان، کشویی و مولتی‌ترن رایج‌اند."],
        ["حسگرهای مقاومتی", "LDR به نور، ترمیستور به دما، FSR به نیرو و کرنش‌سنج به تغییر شکل حساس است. NTC معمولاً با افزایش دما مقاومت کمتری دارد و PTC در محدوده تعریف‌شده مقاومت بیشتری نشان می‌دهد."],
        ["وریستور و حسگرهای ویژه", "وریستور (MOV) برای محدودکردن گذراهای ولتاژ طراحی می‌شود. حسگرهای رطوبت، گاز و مغناطیسی نیز می‌توانند پاسخ مقاومتی داشته باشند؛ هرکدام به مدار و کالیبراسیون مناسب نیاز دارند."],
        ["توان و اندازه‌گیری", "توان تلف‌شده را می‌توان با P=VI یا P=I²R برآورد کرد. برای اندازه‌گیری مقاومت، مدار باید خاموش باشد و خازن‌ها ایمن تخلیه شوند؛ قطعات موازی ممکن است قرائت را تغییر دهند."]
      ],
      safety:"توان نامی، تلرانس، دمای کاری و ولتاژ مجاز را بررسی کن. پیش از اندازه‌گیری مقاومت، برق مدار را قطع و خازن‌ها را به روش ایمن تخلیه کن."
    },
    capacitors: {
      title:"خازن‌ها", intro:"خازن انرژی را در میدان الکتریکی ذخیره می‌کند. ظرفیت با فاراد (F) بیان می‌شود و در فیلتر، کوپلینگ، زمان‌سنجی، حذف نویز و ذخیره انرژی کاربرد دارد.",
      cards:[
        ["خازن سرامیکی", "معمولاً قطبیت ندارد و برای بای‌پس، حذف نویز و کاربردهای فرکانس بالا استفاده می‌شود. ظرفیت و رفتار آن به کلاس دی‌الکتریک و ولتاژ وابسته است."],
        ["خازن الکترولیتی", "معمولاً قطب‌دار و دارای ظرفیت نسبتاً زیاد است. علامت قطب منفی یا مثبت را از روی بدنه و دیتاشیت شناسایی کن."],
        ["خازن فیلمی و تانتالیوم", "خازن فیلمی در کاربردهای گوناگون پایدار است. خازن تانتالیوم معمولاً قطب‌دار است و رعایت قطبیت و محدودیت جریان هجومی در آن اهمیت دارد."],
        ["ظرفیت و ولتاژ نامی", "ظرفیت، ولتاژ کاری، تلرانس، ESR، جریان ریپل و دمای کاری از مشخصات مهم هستند. ولتاژ نامی حد مجاز طراحی است، نه ولتاژی که همیشه باید به آن اعمال شود."],
        ["اتصال سری و موازی", "در اتصال موازی، ظرفیت‌ها جمع می‌شوند. در اتصال سری، معکوس ظرفیت معادل برابر مجموع معکوس ظرفیت‌هاست؛ تقسیم ولتاژ به شرایط قطعات وابسته است."],
        ["آزمون خازن", "اندازه‌گیری ظرفیت یا ESR با ابزار مناسب انجام می‌شود. اندازه‌گیری داخل مدار ممکن است به‌علت قطعات موازی نادرست باشد."],
        ["کاربردها", "خازن کوپلینگ سیگنال AC را عبور می‌دهد و DC را مسدود می‌کند؛ خازن بای‌پس نویز تغذیه را کاهش می‌دهد و در مدار RC می‌تواند ثابت زمانی ایجاد کند."]
      ],
      safety:"خازن‌های ولتاژ بالا حتی پس از قطع برق می‌توانند شارژ خطرناک نگه دارند. پیش از لمس یا اندازه‌گیری، از روش تخلیه مناسب و ابزار دارای رده ایمنی درست استفاده کن."
    },
    diodes: {
      title:"دیودها", intro:"دیود نیمه‌رسانایی است که رفتار جریان آن به جهت ولتاژ و شرایط کاری وابسته است. علامت روی نماد مدار و دیتاشیت به تشخیص آند و کاتد کمک می‌کند.",
      cards:[
        ["دیود یکسوساز", "برای تبدیل AC به DC در مدارهای یکسوساز استفاده می‌شود. جریان مستقیم مجاز، ولتاژ معکوس و افت ولتاژ باید بررسی شوند."],
        ["دیود زنر", "در ناحیه شکست معکوس و با محدودسازی جریان، می‌تواند برای مرجع یا تثبیت ولتاژ استفاده شود. مقاومت یا مدار محدودکننده جریان معمولاً ضروری است."],
        ["دیود شاتکی", "معمولاً افت ولتاژ مستقیم کمتری دارد و در بسیاری از کاربردها سرعت سوئیچینگ بالایی ارائه می‌دهد؛ جریان نشتی و ولتاژ معکوس را بررسی کن."],
        ["دیود سیگنال و سریع", "برای پردازش سیگنال یا سوئیچینگ سریع به کار می‌رود. زمان بازیابی معکوس در برخی مدارها اهمیت زیادی دارد."],
        ["پل دیودی", "چهار دیود در پل یکسوساز تمام‌موج به کار می‌روند. در هر نیم‌چرخه، دو دیود مسیر جریان را تشکیل می‌دهند."],
        ["دیود حفاظتی و TVS", "دیود TVS برای محدودسازی گذراهای سریع ولتاژ طراحی شده است. انتخاب آن به ولتاژ کاری، سطح کلمپ و انرژی گذرا وابسته است."],
        ["تشخیص و آزمون", "در حالت Diode Test مولتی‌متر معمولاً افت مستقیم را نمایش می‌دهد. نتیجه در مدار ممکن است تحت تأثیر قطعات دیگر باشد؛ قطبیت و دیتاشیت را بررسی کن."]
      ],
      safety:"جریان و ولتاژ نامی را رعایت کن. دیود زنر و TVS را بدون محدودیت جریان مناسب به منبع وصل نکن."
    },
    transistors: {
      title:"ترانزیستورها: BJT، MOSFET و IGBT", intro:"ترانزیستورها برای تقویت سیگنال یا سوئیچ‌کردن توان استفاده می‌شوند. نوع قطعه، پایه‌بندی، محدوده ولتاژ و جریان و شرایط حرارتی را از دیتاشیت مشخص کن.",
      cards:[
        ["BJT؛ ترانزیستور دوقطبی", "سه پایه بیس (B)، کلکتور (C) و امیتر (E) دارد. جریان بیس می‌تواند جریان کلکتور را کنترل کند. انواع NPN و PNP از نظر قطبیت و بایاس تفاوت دارند."],
        ["BJT در حالت سوئیچ", "برای روشن‌کردن کامل، جریان بیس کافی و برای خاموشی، شرایط بایاس مناسب لازم است. بهره جریان در طراحی سوئیچ به‌صورت تضمین‌شده و با حاشیه انتخاب می‌شود."],
        ["MOSFET؛ اثر میدان", "پایه‌های گیت (G)، درین (D) و سورس (S) دارد. ولتاژ گیت نسبت به سورس کانال را کنترل می‌کند و گیت در حالت پایدار جریان DC بسیار کمی می‌کشد؛ شارژ گیت هنگام سوئیچ مهم است."],
        ["MOSFET کانال N و P", "کانال N و کانال P به بایاس و نحوه اتصال متفاوت نیاز دارند. مقدار RDS(on) و ولتاژ گیت لازم برای روشن‌شدن را بررسی کن؛ آستانه گیت به معنی روشن‌شدن کامل نیست."],
        ["IGBT؛ ترانزیستور دوقطبی با گیت عایق", "IGBT از گیت عایق برای کنترل و ساختار دوقطبی برای هدایت جریان استفاده می‌کند. در کاربردهای توان مانند اینورترها و کنترل موتور رایج است و معمولاً نسبت به MOSFET در سوئیچینگ بسیار سریع محدودیت‌های متفاوتی دارد."],
        ["انتخاب نوع مناسب", "MOSFET در بسیاری از مبدل‌های فرکانس بالاتر مناسب است؛ IGBT در برخی کاربردهای ولتاژ و توان بالا به کار می‌رود. تصمیم نهایی به ولتاژ، جریان، فرکانس، تلفات و خنک‌کاری وابسته است."],
        ["حفاظت و راه‌اندازی", "برای بار القایی ممکن است دیود هرزگرد یا مدار کلمپ لازم باشد. حفاظت ESD برای گیت MOSFET و IGBT مهم است و هیت‌سینک باید بر اساس تلفات و مقاومت حرارتی انتخاب شود."]
      ],
      safety:"پیش از سیم‌کشی، پایه‌ها را از دیتاشیت تأیید کن. گیت MOSFET و IGBT به الکتریسیته ساکن حساس است. مدارهای قدرت و خازن‌های باس DC می‌توانند ولتاژ خطرناک داشته باشند."
    },
    ics: {
      title:"مدارهای مجتمع (IC)", intro:"IC تراشه‌ای شامل تعداد زیادی عنصر الکترونیکی است که برای عملکرد مشخصی در یک بسته‌بندی قرار گرفته‌اند. دیتاشیت مرجع اصلی نصب، تغذیه و استفاده از آن است.",
      cards:[
        ["انواع آی‌سی", "تقویت‌کننده عملیاتی، تایمر، رگولاتور، مبدل آنالوگ‌ـ‌دیجیتال، حافظه و میکروکنترلر از خانواده‌های رایج هستند."],
        ["شناخت پایه‌ها", "شیار، نقطه یا علامت بدنه می‌تواند پایه شماره یک را مشخص کند. شماره‌گذاری پایه‌ها را با نقشه بسته‌بندی دیتاشیت تطبیق بده."],
        ["تغذیه و زمین", "حداقل و حداکثر ولتاژ تغذیه، جریان مصرفی، ترتیب روشن‌شدن و پایه‌های زمین را بررسی کن. خازن‌های بای‌پس باید نزدیک پایه‌های تغذیه قرار گیرند."],
        ["ورودی و خروجی", "سطوح منطقی، محدوده ولتاژ ورودی، توان خروجی و جریان پایه‌ها محدودیت دارند. پایه خروجی را بدون بررسی مشخصات به خروجی دیگری متصل نکن."],
        ["دیتاشیت", "بخش‌های Absolute Maximum Ratings، Recommended Operating Conditions، Pin Configuration و Typical Application را بخوان؛ مقادیر حداکثر مطلق، شرایط کاری عادی نیستند."],
        ["قطعات جانبی", "بعضی ICها به مقاومت، خازن، سلف یا دیود خارجی نیاز دارند. شماتیک پیشنهادی سازنده نقطه شروع مناسبی است."],
        ["عیب‌یابی", "ابتدا تغذیه و زمین، سپس سیگنال ورودی، خروجی و اتصالات جانبی را بررسی کن. تعویض تصادفی قطعه بدون اندازه‌گیری معمولاً عیب‌یابی را دشوار می‌کند."]
      ],
      safety:"اتصال اشتباه تغذیه، تخلیه الکترواستاتیکی و اتصال کوتاه پایه‌ها می‌تواند IC را خراب کند. پیش از روشن‌کردن، پایه‌بندی و ولتاژ را دوباره بررسی کن."
    },
    inductors: {
      title:"سلف‌ها", intro:"سلف از سیم‌پیچ تشکیل می‌شود و انرژی را در میدان مغناطیسی ذخیره می‌کند. اندوکتانس با هانری (H) بیان می‌شود و تغییر جریان در آن با ولتاژ القایی همراه است.",
      cards:[
        ["اندوکتانس", "مقدار اندوکتانس، تلرانس، مقاومت DC و جریان نامی در انتخاب سلف اهمیت دارند. مقدار واقعی می‌تواند با فرکانس و جریان تغییر کند."],
        ["هسته سلف", "هسته هوا، فریت و پودر آهن خواص متفاوتی دارند. جنس هسته بر تلفات، فرکانس کاری و جریان اشباع اثر می‌گذارد."],
        ["جریان اشباع", "با نزدیک‌شدن به اشباع هسته، اندوکتانس مؤثر می‌تواند کاهش یابد و جریان سریع‌تر افزایش پیدا کند. جریان اشباع را با شرایط دیتاشیت مقایسه کن."],
        ["مبدل‌های سوئیچینگ", "سلف در مبدل‌های باک، بوست و دیگر مبدل‌ها انتقال و ذخیره انرژی را ممکن می‌کند. ریپل جریان، فرکانس سوئیچینگ و تلفات طراحی مهم‌اند."],
        ["فیلتر و تشدید", "سلف با خازن می‌تواند مدار تشدید بسازد و با عناصر دیگر فیلتر فرکانسی تشکیل دهد. فرکانس و مقاومت‌های مدار رفتار واقعی را تعیین می‌کنند."],
        ["ترانسفورماتور", "ترانسفورماتور از کوپل مغناطیسی چند سیم‌پیچ برای انتقال انرژی استفاده می‌کند؛ از نظر عملکرد با یک سلف ساده یکسان نیست."],
        ["اندازه‌گیری و عیب‌یابی", "مولتی‌متر می‌تواند پیوستگی یا مقاومت سیم‌پیچ را بررسی کند، اما اتصال کوتاه دورها همیشه با این روش آشکار نمی‌شود. برای اندوکتانس از LCR متر استفاده می‌شود."]
      ],
      safety:"سلف در قطع جریان می‌تواند ولتاژ گذرا ایجاد کند. در مدار قدرت، جریان اشباع، افزایش دما و مسیرهای حفاظتی را جدی بگیر."
    },
    leds: {
      title:"LED و منابع نوری", intro:"LED دیودی است که با عبور جریان در بایاس مستقیم نور تولید می‌کند. رنگ و ولتاژ مستقیم آن به ماده نیمه‌رسانا، ساختار و جریان کاری وابسته است.",
      cards:[
        ["قطبیت LED", "آند و کاتد را از علامت بدنه، طول پایه‌ها یا دیتاشیت شناسایی کن؛ نشانه‌ها در همه بسته‌بندی‌ها یکسان نیستند."],
        ["محدودکردن جریان", "LED معمولاً باید با مقاومت سری یا درایور جریان ثابت راه‌اندازی شود. اتصال مستقیم به منبع ولتاژ بدون محدودکننده مناسب می‌تواند آن را خراب کند."],
        ["مقاومت سری", "در مدار ساده، مقدار تقریبی مقاومت از R=(Vs−Vf)/I به دست می‌آید؛ ولتاژ منبع، افت LED و جریان هدف باید معلوم باشند."],
        ["رنگ و ولتاژ مستقیم", "LEDهای قرمز، سبز، آبی و سفید افت ولتاژ یکسانی ندارند. مقدار واقعی به مدل و جریان بستگی دارد و باید از دیتاشیت بررسی شود."],
        ["LED پرقدرت", "توان نوری بیشتر معمولاً مدیریت حرارتی جدی‌تری می‌خواهد. دمای اتصال و هیت‌سینک بر عمر و بازده اثر می‌گذارند."],
        ["RGB و نوار LED", "LEDهای RGB می‌توانند سه کانال رنگی داشته باشند. نوع آند مشترک یا کاتد مشترک و روش درایو را پیش از اتصال بررسی کن."],
        ["ایمنی چشم", "به LEDهای پرقدرت و منابع نوری متمرکز مستقیم نگاه نکن. برای نورهای قوی از دستورالعمل ایمنی سازنده پیروی کن."]
      ],
      safety:"جریان نامی و دفع حرارت را رعایت کن. LED پرقدرت می‌تواند به چشم آسیب بزند و در صورت راه‌اندازی نامناسب داغ شود."
    },
    measurement: {
      title:"ابزارهای اندازه‌گیری", intro:"مولتی‌متر دیجیتال می‌تواند ولتاژ، جریان، مقاومت و در برخی مدل‌ها ظرفیت، فرکانس و آزمون دیود را اندازه بگیرد. انتخاب حالت و ورودی درست حیاتی است.",
      cards:[
        ["اندازه‌گیری ولتاژ", "ولتاژ را معمولاً به‌صورت موازی با بخش مورد بررسی اندازه می‌گیرند. حالت AC یا DC و محدوده مناسب را انتخاب کن."],
        ["اندازه‌گیری جریان", "جریان‌سنج باید در مسیر جریان قرار گیرد. سیم قرمز را به ورودی جریان مناسب وصل کن و پس از اندازه‌گیری آن را به ورودی ولتاژ بازگردان."],
        ["اندازه‌گیری مقاومت", "مدار باید خاموش باشد و خازن‌ها ایمن تخلیه شده باشند. برای دقت بهتر ممکن است لازم باشد یک پایه قطعه از مدار جدا شود."],
        ["آزمون دیود", "حالت Diode Test معمولاً افت ولتاژ مستقیم را نمایش می‌دهد. قطعه‌های موازی و مدارهای متصل می‌توانند نتیجه را تغییر دهند."],
        ["پیوستگی", "بوق پیوستگی برای یافتن مسیرهای کم‌مقاومت مفید است؛ بوق‌زدن الزاماً سلامت کامل یک قطعه را ثابت نمی‌کند."],
        ["منبع تغذیه آزمایشگاهی", "محدودکننده جریان به محافظت مدار کمک می‌کند. پیش از اتصال، ولتاژ و حد جریان را تنظیم و قطبیت خروجی را بررسی کن."],
        ["اسیلوسکوپ", "اسیلوسکوپ شکل موج را در زمان نشان می‌دهد. تنظیم پروب، ضریب تضعیف، زمین، پهنای باند و نرخ نمونه‌برداری بر نتیجه اثر دارند."]
      ],
      safety:"اندازه‌گیری برق شهر یا ولتاژ بالا فقط با ابزار دارای رده ایمنی مناسب و توسط فرد آموزش‌دیده انجام شود. هنگام اندازه‌گیری جریان، پراب در ورودی اشتباه می‌تواند اتصال کوتاه خطرناک ایجاد کند."
    }
  };

  /* محاسبه‌گر کد رنگی مقاومت چهارنواره */
  const resistorColors = [
    {name:"مشکی",hex:"#171717",digit:0,multiplier:1,tolerance:null},
    {name:"قهوه‌ای",hex:"#7b3f20",digit:1,multiplier:10,tolerance:1},
    {name:"قرمز",hex:"#d62828",digit:2,multiplier:100,tolerance:2},
    {name:"نارنجی",hex:"#f47721",digit:3,multiplier:1000,tolerance:null},
    {name:"زرد",hex:"#f5d547",digit:4,multiplier:10000,tolerance:null},
    {name:"سبز",hex:"#228b45",digit:5,multiplier:100000,tolerance:0.5},
    {name:"آبی",hex:"#2367d1",digit:6,multiplier:1000000,tolerance:0.25},
    {name:"بنفش",hex:"#8246af",digit:7,multiplier:10000000,tolerance:0.1},
    {name:"خاکستری",hex:"#9299a1",digit:8,multiplier:100000000,tolerance:0.05},
    {name:"سفید",hex:"#f7f7f7",digit:9,multiplier:1000000000,tolerance:null},
    {name:"طلایی",hex:"#c6a34b",digit:null,multiplier:0.1,tolerance:5},
    {name:"نقره‌ای",hex:"#aab3bd",digit:null,multiplier:0.01,tolerance:10}
  ];
  function colorOptions(type, selectedName) {
    return resistorColors.filter((color) => type === "digit" ? color.digit !== null : type === "multiplier" ? color.multiplier !== null : color.tolerance !== null)
      .map((color) => `<option value="${color.name}" ${color.name === selectedName ? "selected" : ""} style="background:${color.hex};color:${["مشکی","قهوه‌ای","قرمز","آبی","بنفش"].includes(color.name) ? "#fff" : "#111"}">${color.name}</option>`).join("");
  }
  function renderColorCalculator() {
    return `<section class="color-tool" aria-labelledby="colorToolTitle"><span class="eyebrow">ابزار محاسباتی</span>
      <h3 id="colorToolTitle">محاسبه‌گر مقاومت چهارنواره</h3><p class="intro">رنگ نوارها را از سمت چپ به راست انتخاب کن: رقم اول، رقم دوم، ضریب و تلرانس.</p>
      <div class="resistor-visual" aria-label="نمای تصویری نوارهای مقاومت"><span class="lead"></span><span class="body" id="resistorBody"><i data-band="0"></i><i data-band="1"></i><i data-band="2"></i><i data-band="3"></i></span><span class="lead"></span></div>
      <div class="color-selects"><label><span>نوار اول · رقم اول</span><select id="band1" aria-label="نوار اول، رقم اول">${colorOptions("digit","قهوه‌ای")}</select></label>
      <label><span>نوار دوم · رقم دوم</span><select id="band2" aria-label="نوار دوم، رقم دوم">${colorOptions("digit","مشکی")}</select></label>
      <label><span>نوار سوم · ضریب</span><select id="band3" aria-label="نوار سوم، ضریب">${colorOptions("multiplier","قرمز")}</select></label>
      <label><span>نوار چهارم · تلرانس</span><select id="band4" aria-label="نوار چهارم، تلرانس">${colorOptions("tolerance","طلایی")}</select></label></div>
      <div class="result-panel" aria-live="polite"><div><small>مقدار اسمی</small><br><strong id="resistanceValue">1 kΩ</strong></div><div><small>تلرانس</small><br><span id="resistanceTolerance">±5٪</span></div><div><small>بازه تقریبی مجاز</small><br><span id="resistanceRange">950 Ω تا 1.05 kΩ</span></div></div>
      <p class="note">ابزار برای مقاومت چهارنواره است؛ کدها و تلرانس‌ها را در صورت نیاز با دیتاشیت تطبیق بده.</p></section>`;
  }
  function formatResistance(ohms) {
    if (!Number.isFinite(ohms)) return "نامعتبر";
    const abs = Math.abs(ohms);
    if (abs >= 1e6) return `${Number((ohms / 1e6).toPrecision(4))} MΩ`;
    if (abs >= 1e3) return `${Number((ohms / 1e3).toPrecision(4))} kΩ`;
    return `${Number(ohms.toPrecision(4))} Ω`;
  }
  function updateResistorCalculator() {
    const selected = ["band1","band2","band3","band4"].map((id) => {
      const el = $("#" + id, lessonContent);
      return el ? resistorColors.find((color) => color.name === el.value) : null;
    });
    if (selected.some((item) => !item)) return;
    const [first, second, multiplier, tolerance] = selected;
    const resistance = (first.digit * 10 + second.digit) * multiplier.multiplier;
    const low = resistance * (1 - tolerance.tolerance / 100);
    const high = resistance * (1 + tolerance.tolerance / 100);
    $("#resistanceValue", lessonContent).textContent = formatResistance(resistance);
    $("#resistanceTolerance", lessonContent).textContent = `±${tolerance.tolerance}٪`;
    $("#resistanceRange", lessonContent).innerHTML = `<b dir="ltr">${formatResistance(low)}</b> تا <b dir="ltr">${formatResistance(high)}</b>`;
    $$("[data-band]", $("#resistorBody", lessonContent)).forEach((band, index) => {
      band.style.background = selected[index].hex;
      band.style.boxShadow = selected[index].name === "سفید" ? "inset 0 0 0 1px #b7b7b7" : "none";
      band.title = selected[index].name;
      band.setAttribute("aria-label", selected[index].name);
    });
  }

  /* آزمون‌ها: هر خانواده دقیقاً ۱۰ سؤال */
  const questions = {
    resistors: [
      ["واحد مقاومت الکتریکی چیست؟",["ولت","آمپر","اهم","وات"],2,"واحد مقاومت اهم (Ω) است."],
      ["در مقاومت چهارنواره، نوار سوم معمولاً چه چیزی را نشان می‌دهد؟",["رقم اول","ضریب","توان","جریان نامی"],1,"نوار سوم ضریب و نوار چهارم تلرانس را نشان می‌دهد."],
      ["کد رنگی قهوه‌ای، مشکی، قرمز، طلایی چه مقداری دارد؟",["100 Ω ±10٪","1 kΩ ±5٪","10 kΩ ±1٪","2 kΩ ±5٪"],1,"قهوه‌ای و مشکی برابر 10 و ضریب قرمز 100 است؛ حاصل 1000 Ω با تلرانس طلایی 5٪ است."],
      ["در بسیاری از مقاومت‌های SMD، کد 472 به چه معناست؟",["470 Ω","4.7 kΩ","47 kΩ","472 kΩ"],1,"دو رقم اول 47 و رقم سوم دو صفر است؛ مقدار 4700 Ω می‌شود."],
      ["در یک NTC معمولی با افزایش دما چه رخ می‌دهد؟",["مقاومت کم می‌شود","مقاومت زیاد می‌شود","همیشه مدار باز می‌شود","ظرفیت زیاد می‌شود"],0,"NTC ضریب دمایی منفی دارد."],
      ["پتانسیومتر معمولی چند پایه دارد؟",["یک","دو","سه","شش"],2,"دو سر مسیر مقاومتی و یک پایه لغزنده دارد."],
      ["LDR عمدتاً به چه چیزی حساس است؟",["نور","فشار هوا","میدان صوتی","فرکانس رادیویی"],0,"مقاومت LDR در بسیاری از انواع رایج با افزایش نور کاهش می‌یابد."],
      ["برای اندازه‌گیری مقاومت با مولتی‌متر، مدار باید چگونه باشد؟",["روشن و زیر بار","خاموش و ایمن","حتماً به برق شهر متصل","در حالت جریان‌سنجی"],1,"اندازه‌گیری مقاومت در مدار روشن می‌تواند خطرناک و نتیجه نادرست باشد."],
      ["رابطه مناسب برای توان تلف‌شده در مقاومت کدام است؟",["P=VI","P=V+I","P=R/I","P=V−R"],0,"توان الکتریکی برابر حاصل‌ضرب ولتاژ و جریان است؛ روابط معادل P=I²R و P=V²/R نیز کاربرد دارند."],
      ["وریستور MOV معمولاً برای چه کاری به کار می‌رود؟",["ذخیره داده","محدودکردن گذراهای ولتاژ","تولید نور","تقویت صوت"],1,"MOV برای مهار گذراهای ولتاژ در مدارهای طراحی‌شده استفاده می‌شود."]
    ],
    capacitors: [
      ["واحد ظرفیت خازن چیست؟",["اهم","فاراد","وات","تسلا"],1,"واحد ظرفیت خازن فاراد (F) است."],
      ["کدام خازن معمولاً قطب‌دار است؟",["سرامیکی معمولی","فیلمی معمولی","الکترولیتی آلومینیومی","همه خازن‌ها"],2,"خازن الکترولیتی آلومینیومی رایج معمولاً قطب‌دار است."],
      ["در اتصال موازی خازن‌ها، ظرفیت معادل چگونه محاسبه می‌شود؟",["ظرفیت‌ها جمع می‌شوند","معکوس ظرفیت‌ها جمع می‌شوند","همیشه صفر است","ظرفیت‌ها از هم کم می‌شوند"],0,"در اتصال موازی، ظرفیت‌های ایده‌آل با هم جمع می‌شوند."],
      ["قبل از کار روی خازن ولتاژ بالا چه باید کرد؟",["آن را لمس کرد","با روش ایمن تخلیه کرد","پایه‌ها را اتصال کوتاه کرد با ابزار نامناسب","افزایش ولتاژ داد"],1,"خازن ممکن است پس از قطع برق نیز شارژ خطرناک نگه دارد."],
      ["کدام مشخصه حد مجاز ولتاژ کاری خازن را نشان می‌دهد؟",["ولتاژ نامی","رنگ بدنه","اندازه پایه‌ها فقط","شماره سریال"],0,"ولتاژ نامی یکی از محدودیت‌های اصلی قطعه است."],
      ["خازن بای‌پس نزدیک پایه تغذیه IC چه کمکی می‌کند؟",["افزایش نویز","کاهش نویز و افت گذرا در تغذیه","تبدیل DC به نور","افزایش مقاومت سیم"],1,"خازن بای‌پس مسیر محلی برای جریان‌های گذرا و نویز فراهم می‌کند."],
      ["در اتصال سری خازن‌های ایده‌آل، کدام رابطه درست است؟",["ظرفیت‌ها مستقیماً جمع می‌شوند","معکوس ظرفیت معادل برابر مجموع معکوس‌هاست","ظرفیت معادل همیشه بزرگ‌تر است","ظرفیت به صفر مطلق می‌رسد"],1,"برای اتصال سری، 1/Ceq برابر مجموع 1/C هر خازن است."],
      ["ESR در مشخصات خازن به چه معناست؟",["مقاومت سری معادل","انرژی خورشیدی","نرخ نمونه‌برداری","ولتاژ معکوس"],0,"ESR تلفات مقاومتی معادل خازن را توصیف می‌کند."],
      ["کدام ابزار برای اندازه‌گیری ظرفیت مناسب است؟",["فازمتر ساده","LCR متر یا مولتی‌متر دارای قابلیت ظرفیت","چراغ‌قوه","آمپرمتر در سری بدون قطع مدار"],1,"ابزار باید قابلیت اندازه‌گیری ظرفیت داشته باشد و شرایط قطعه مناسب باشد."],
      ["خازن کوپلینگ در بسیاری از مدارها چه می‌کند؟",["عبور مؤلفه AC و جلوگیری از عبور DC بین طبقات","تولید جریان بی‌نهایت","جایگزینی فیوز","اندازه‌گیری دما"],0,"خازن کوپلینگ برای انتقال سیگنال متناوب و جداسازی بایاس DC استفاده می‌شود."]
    ],
    diodes: [
      ["دیود معمولی در بایاس مستقیم چه رفتاری دارد؟",["در شرایط مناسب جریان عبور می‌دهد","همیشه مدار باز است","فقط نور تولید می‌کند","مقاومتش بی‌نهایت است"],0,"در بایاس مستقیم و با رعایت محدوده‌ها، دیود جریان عبور می‌دهد."],
      ["دیود زنر معمولاً برای چه کاربردی شناخته می‌شود؟",["تثبیت یا مرجع ولتاژ","ذخیره مکانیکی انرژی","تقویت جریان گیت","تولید مغناطیس دائم"],0,"زنر در ناحیه شکست معکوس و با محدودسازی جریان می‌تواند مرجع ولتاژ ایجاد کند."],
      ["دیود LED چه چیزی تولید می‌کند؟",["نور","مقاومت متغیر مکانیکی","ظرفیت زیاد","موج صوتی به‌تنهایی"],0,"LED با عبور جریان مناسب نور تولید می‌کند."],
      ["چرا LED معمولاً به مقاومت یا درایور نیاز دارد؟",["برای محدودکردن جریان","برای افزایش نامحدود ولتاژ","برای حذف قطبیت","برای تبدیل آن به خازن"],0,"جریان LED باید در محدوده مجاز نگه داشته شود."],
      ["دیود شاتکی معمولاً چه ویژگی‌ای دارد؟",["افت مستقیم نسبتاً کم","قطبیت ندارد و همیشه دوطرفه است","برای ذخیره داده است","فقط در ولتاژهای صفر کار می‌کند"],0,"شاتکی در بسیاری از کاربردها افت مستقیم کمتری دارد؛ نشتی و ولتاژ معکوس نیز مهم‌اند."],
      ["پل یکسوساز تمام‌موج رایج معمولاً چند دیود دارد؟",["یک","دو","چهار","هشتاد"],2,"پل یکسوساز تک‌فاز معمولاً از چهار دیود تشکیل می‌شود."],
      ["آزمون Diode Test مولتی‌متر معمولاً چه چیزی را نشان می‌دهد؟",["افت ولتاژ مستقیم","ظرفیت باتری به‌طور مستقیم","توان نوری","فرکانس شبکه در همه حالت‌ها"],0,"این حالت معمولاً افت ولتاژ مستقیم اتصال نیمه‌رسانا را نمایش می‌دهد."],
      ["TVS diode بیشتر برای چه طراحی می‌شود؟",["مهار گذراهای ولتاژ","تقویت صوت","تولید کلاک","ذخیره شارژ طولانی"],0,"دیود TVS برای حفاظت در برابر گذراهای ولتاژ انتخاب می‌شود."],
      ["در نماد دیود، پایه متناظر با خط عمودی نماد معمولاً چیست؟",["آند","کاتد","گیت","بیس"],1,"خط نماد دیود، کاتد را نشان می‌دهد."],
      ["ولتاژ معکوس مجاز دیود را از کجا باید بررسی کرد؟",["دیتاشیت","رنگ میز کار","اندازه سیم پراب فقط","نام فروشگاه"],0,"حدود ولتاژ معکوس و جریان مجاز در دیتاشیت مشخص می‌شوند."]
    ],
    transistors: [
      ["سه پایه اصلی BJT کدام‌اند؟",["گیت، درین، سورس","بیس، کلکتور، امیتر","آند، کاتد، گیت","ورودی، زمین، کلاک"],1,"BJT دارای بیس، کلکتور و امیتر است."],
      ["در BJT، جریان بیس چه نقشی دارد؟",["می‌تواند جریان کلکتور را کنترل کند","همیشه صفر است","نور تولید می‌کند","ظرفیت گیت را اندازه می‌گیرد"],0,"جریان بیس، هدایت BJT را کنترل می‌کند؛ طراحی باید بر اساس شرایط دیتاشیت باشد."],
      ["پایه‌های اصلی MOSFET کدام‌اند؟",["بیس، امیتر، کلکتور","گیت، درین، سورس","آند، کاتد، بدنه خازن","فاز، نول، ارت"],1,"MOSFET دارای گیت، درین و سورس است و در برخی قطعات پایه بدنه نیز مطرح است."],
      ["MOSFET عمدتاً با چه چیزی کنترل می‌شود؟",["ولتاژ گیت نسبت به سورس","نور محیط","فشار هوا","جریان بیس به‌تنهایی"],0,"ولتاژ گیت-سورس میدان الکتریکی و هدایت کانال را کنترل می‌کند."],
      ["IGBT کدام توصیف را دارد؟",["ترانزیستور دوقطبی با گیت عایق","مقاومت حساس به نور","خازن قطب‌دار","دیود نورافشان"],0,"IGBT ورودی گیت عایق دارد و از هدایت دوقطبی بهره می‌گیرد."],
      ["کدام مورد از کاربردهای رایج IGBT است؟",["اینورتر و کنترل موتور در توان‌های مناسب","فقط حسگر رطوبت","تنها تولید نور نشانگر","اندازه‌گیری مستقیم مقاومت"],0,"IGBT در بسیاری از مبدل‌های توان و درایوهای موتور به کار می‌رود."],
      ["آیا ولتاژ آستانه گیت MOSFET به معنی روشن‌شدن کامل است؟",["بله، همیشه","خیر؛ باید RDS(on) و ولتاژ راه‌اندازی بررسی شود","فقط در قطعات آبی","این مفهوم وجود ندارد"],1,"ولتاژ آستانه برای شروع هدایت تعریف می‌شود، نه تضمین مقاومت روشن پایین."],
      ["چرا حفاظت ESD برای MOSFET مهم است؟",["گیت می‌تواند به تخلیه الکترواستاتیکی حساس باشد","برای تغییر رنگ قطعه","برای افزایش طول پایه‌ها","برای اندازه‌گیری ظرفیت خازن"],0,"تخلیه الکترواستاتیکی ممکن است به ساختار گیت آسیب بزند."],
      ["برای بار القایی سوئیچ‌شونده چه چیزی ممکن است لازم باشد؟",["مسیر هرزگرد یا مدار کلمپ مناسب","اتصال کوتاه همیشگی منبع","حذف همه حفاظت‌ها","بازگذاشتن گیت بدون طراحی"],0,"بار القایی هنگام قطع جریان می‌تواند ولتاژ گذرا ایجاد کند؛ حفاظت متناسب لازم است."],
      ["برای تعیین پایه‌بندی و حدود مجاز ترانزیستور چه مرجعی بهتر است؟",["دیتاشیت همان مدل","حدس از ظاهر قطعه","رنگ برد","اندازه میز"],0,"پایه‌بندی و مشخصات بین مدل‌ها متفاوت است؛ دیتاشیت مدل دقیق را بررسی کن."]
    ],
    ics: [
      ["IC مخفف چیست؟",["مدار مجتمع","جریان متناوب","اندوکتانس کنترل‌شده","اتصال کوتاه"],0,"IC به معنی Integrated Circuit یا مدار مجتمع است."],
      ["برای شناخت پایه شماره یک IC چه باید کرد؟",["علامت بدنه و نقشه دیتاشیت را بررسی کرد","فقط به رنگ برد تکیه کرد","پایه‌ای را تصادفی انتخاب کرد","همه پایه‌ها را اتصال کوتاه کرد"],0,"شیار یا نقطه بدنه و نقشه دیتاشیت جهت پایه‌ها را مشخص می‌کند."],
      ["کدام بخش دیتاشیت محدوده‌های کاری پیشنهادی را نشان می‌دهد؟",["Recommended Operating Conditions","نام فایل عکس","فهرست فروشگاه‌ها","شماره صفحه آخر فقط"],0,"این بخش شرایط کاری توصیه‌شده قطعه را توضیح می‌دهد."],
      ["Absolute Maximum Ratings به چه معناست؟",["حدودی که نباید از آن‌ها عبور کرد","مقادیر ایده‌آل برای استفاده همیشگی","ولتاژ دقیق خروجی در همه شرایط","فقط رنگ بسته‌بندی"],0,"حداکثر مطلق، حد آسیب احتمالی است و جایگزین شرایط کاری توصیه‌شده نیست."],
      ["خازن بای‌پس تغذیه IC بهتر است کجا قرار گیرد؟",["نزدیک پایه‌های تغذیه","در فاصله نامحدود","فقط روی کانکتور خروجی","داخل کابل برق شهر"],0,"قرارگیری نزدیک، مسیر جریان گذرا را کوتاه می‌کند."],
      ["پیش از روشن‌کردن IC چه موردی را بررسی می‌کنی؟",["پایه‌بندی، تغذیه و اتصالات","فقط رنگ بدنه","فقط نام طراح برد","هیچ‌چیز"],0,"خطای تغذیه یا پایه‌بندی می‌تواند به IC آسیب بزند."],
      ["کدام نمونه یک خانواده IC است؟",["رگولاتور ولتاژ","مقاومت کربنی ساده","سیم مسی بدون مدار","پیچ مکانیکی"],0,"رگولاتور ولتاژ از انواع مدار مجتمع است."],
      ["سطوح منطقی ورودی و خروجی IC باید با چه چیزی سازگار باشند؟",["مشخصات قطعات متصل و دیتاشیت","رنگ کابل","اندازه میز","نام پوشه پروژه"],0,"سازگاری سطح ولتاژ و جریان برای عملکرد مطمئن لازم است."],
      ["ESD به چه خطری اشاره دارد؟",["تخلیه الکترواستاتیکی","افزایش ظرفیت نامحدود","نوسان مکانیکی","تبدیل AC به DC"],0,"تخلیه الکترواستاتیکی می‌تواند به نیمه‌رساناها آسیب برساند."],
      ["برای عیب‌یابی IC، کدام رویکرد بهتر است؟",["بررسی مرحله‌ای تغذیه، ورودی، خروجی و اتصالات","تعویض تصادفی قطعات","افزایش ولتاژ تا خرابی","نادیده‌گرفتن زمین"],0,"عیب‌یابی مرحله‌ای بر اساس اندازه‌گیری و دیتاشیت قابل اعتمادتر است."]
    ],
    inductors: [
      ["واحد اندوکتانس چیست؟",["هانری","اهم","فاراد","لومن"],0,"واحد اندوکتانس هانری (H) است."],
      ["سلف انرژی را عمدتاً در کجا ذخیره می‌کند؟",["میدان مغناطیسی","میدان گرانشی","نور مرئی","واکنش شیمیایی"],0,"سلف انرژی را در میدان مغناطیسی ذخیره می‌کند."],
      ["سلف با تغییر جریان چه رفتاری دارد؟",["در برابر تغییر سریع جریان ولتاژ القا می‌کند","جریان را همیشه صفر می‌کند","فقط نور می‌تاباند","ظرفیت را به فاراد تبدیل می‌کند"],0,"ولتاژ القایی سلف با نرخ تغییر جریان مرتبط است."],
      ["جریان اشباع سلف به چه چیزی مربوط است؟",["کاهش اندوکتانس مؤثر در اشباع هسته","رنگ سیم","شماره پایه IC","شدت نور LED"],0,"با اشباع هسته، اندوکتانس می‌تواند کاهش یابد و ریپل جریان افزایش پیدا کند."],
      ["کدام مورد از کاربردهای سلف است؟",["فیلتر و مبدل سوئیچینگ","ذخیره فایل رایانه","تولید نور بدون جریان","اندازه‌گیری مستقیم دما در همه مدل‌ها"],0,"سلف در فیلترها و مبدل‌های سوئیچینگ کاربرد گسترده دارد."],
      ["جنس هسته سلف بر چه چیزی اثر می‌گذارد؟",["تلفات، اندوکتانس و فرکانس کاری","فقط رنگ برد","نام خانوادگی طراح","جهت نمایش متن"],0,"مواد هسته خواص مغناطیسی و تلفات را تغییر می‌دهند."],
      ["کدام ابزار برای اندازه‌گیری اندوکتانس مناسب است؟",["LCR متر","فازمتر ساده","چراغ‌قوه","دماسنج معمولی"],0,"LCR متر می‌تواند اندوکتانس، ظرفیت و مقاومت را اندازه بگیرد."],
      ["چرا مقاومت DC سیم‌پیچ مهم است؟",["روی تلفات و گرمایش اثر دارد","همیشه صفر است","رنگ هسته را تعیین می‌کند","فرکانس شبکه را ثابت می‌کند"],0,"مقاومت سیم‌پیچ سبب تلفات مسی و افزایش دما می‌شود."],
      ["ترانسفورماتور معمولاً بر چه اصلی تکیه دارد؟",["کوپل مغناطیسی بین سیم‌پیچ‌ها","تغییر رنگ مقاومت","اثر فوتوالکتریک LED","ذخیره مکانیکی داده"],0,"ترانسفورماتور انرژی را از راه میدان مغناطیسی مشترک بین سیم‌پیچ‌ها منتقل می‌کند."],
      ["هنگام قطع جریان سلف چه خطری ممکن است ایجاد شود؟",["ولتاژ گذرا","ظرفیت منفی قطعی","حذف کامل انرژی","تبدیل به مقاومت صفر"],0,"سلف برای حفظ جریان می‌تواند ولتاژ گذرای بزرگی ایجاد کند؛ حفاظت مناسب لازم است."]
    ],
    leds: [
      ["LED هنگام عبور جریان مناسب چه می‌کند؟",["نور تولید می‌کند","اندوکتانس ذخیره می‌کند","همیشه مدار باز می‌شود","مقاومتش نامحدود می‌شود"],0,"LED دیودی نورافشان است."],
      ["برای راه‌اندازی LED ساده معمولاً چه چیزی لازم است؟",["محدودکننده جریان","اتصال مستقیم بدون محاسبه به هر منبع","فقط سلف بزرگ","ترانسفورماتور در همه موارد"],0,"مقاومت سری یا درایور مناسب جریان LED را محدود می‌کند."],
      ["کدام رابطه برای مقاومت سری LED در مدار ساده مناسب است؟",["R=(Vs−Vf)/I","R=Vs+I","R=I/Vf","R=Vs×Vf×I"],0,"مقاومت از اختلاف ولتاژ منبع و LED تقسیم بر جریان هدف محاسبه می‌شود."],
      ["افت ولتاژ مستقیم LED به چه چیزهایی وابسته است؟",["رنگ، ساختار و جریان","فقط طول کابل USB","نام سازنده نرم‌افزار","رنگ برد"],0,"جنس نیمه‌رسانا و جریان بر ولتاژ مستقیم اثر دارند."],
      ["چرا LED پرقدرت به دفع حرارت نیاز دارد؟",["گرما بر عملکرد و عمر آن اثر می‌گذارد","برای افزایش قطبیت","برای حذف جریان","برای ذخیره فایل"],0,"دمای اتصال بالا می‌تواند عمر و بازده LED را کاهش دهد."],
      ["پیش از اتصال LED چه چیزی را باید شناخت؟",["قطبیت و مشخصات جریان","فقط شکل ظاهری میز","نام مرورگر","شماره صفحه سایت"],0,"قطبیت و حدود جریان/ولتاژ باید از روی قطعه یا دیتاشیت مشخص شوند."],
      ["LED RGB معمولاً برای چه استفاده می‌شود؟",["ترکیب کانال‌های قرمز، سبز و آبی","اندازه‌گیری مقاومت","تبدیل مستقیم نور به صدا در همه مدل‌ها","حفاظت اضافه‌جریان به‌تنهایی"],0,"ترکیب شدت سه کانال می‌تواند رنگ‌های گوناگون بسازد."],
      ["آیا همه LEDها ولتاژ مستقیم یکسانی دارند؟",["بله، دقیقاً یکسان‌اند","خیر، به مدل و رنگ وابسته است","فقط LED سفید صفر ولت است","ولتاژ به پایه‌ها ارتباطی ندارد"],1,"ولتاژ مستقیم میان مدل‌ها متفاوت است."],
      ["درایور جریان ثابت چه کمکی می‌کند؟",["جریان LED را در محدوده طراحی نگه می‌دارد","قطبیت را حذف می‌کند","LED را به خازن تبدیل می‌کند","نور را بدون انرژی تولید می‌کند"],0,"کنترل جریان به روشنایی و عمر LED کمک می‌کند."],
      ["برای LEDهای بسیار پرنور چه احتیاطی لازم است؟",["از نگاه مستقیم به منبع نوری شدید خودداری کن","آن را به چشم نزدیک کن","همیشه بدون هیت‌سینک راه‌اندازی کن","جریان نامی را نادیده بگیر"],0,"منابع نوری شدید می‌توانند برای چشم خطرناک باشند."]
    ],
    measurement: [
      ["برای اندازه‌گیری ولتاژ، مولتی‌متر معمولاً چگونه وصل می‌شود؟",["موازی با بخش مورد اندازه‌گیری","سری و در مسیر جریان در همه موارد","بدون پراب","مستقیماً اتصال کوتاه به منبع"],0,"ولت‌متر موازی با بخش مورد اندازه‌گیری قرار می‌گیرد."],
      ["آمپرمتر معمولاً چگونه در مدار قرار می‌گیرد؟",["سری با مسیر جریان","موازی با منبع بدون بررسی","فقط روی زمین بدون مدار","بدون اتصال"],0,"جریان‌سنج در مسیر جریان قرار می‌گیرد و ورودی مناسب لازم دارد."],
      ["برای اندازه‌گیری مقاومت، مدار باید چه وضعیتی داشته باشد؟",["خاموش و خازن‌ها ایمن تخلیه شده باشند","حتماً روشن باشد","به برق شهر وصل باشد","در حالت اندازه‌گیری جریان باشد"],0,"اندازه‌گیری مقاومت در مدار روشن ایمن و معتبر نیست."],
      ["اگر پراب در ورودی جریان بماند و ولتاژ منبع اندازه‌گیری شود چه خطری هست؟",["اتصال کوتاه از مسیر ورودی جریان","اندازه‌گیری دقیق‌تر مقاومت","افزایش ظرفیت خازن","تبدیل مولتی‌متر به اسیلوسکوپ"],0,"ورودی جریان معمولاً مقاومت کمی دارد و اتصال موازی آن می‌تواند اتصال کوتاه ایجاد کند."],
      ["حالت پیوستگی (Continuity) برای چه مناسب است؟",["بررسی مسیرهای کم‌مقاومت","اندازه‌گیری نور دقیق","اندازه‌گیری توان نوری","برنامه‌نویسی IC"],0,"بوق پیوستگی برای بررسی اتصال الکتریکی مفید است اما سلامت کامل قطعه را ثابت نمی‌کند."],
      ["مولتی‌متر در حالت Diode Test معمولاً چه چیزی را می‌سنجد؟",["افت ولتاژ اتصال نیمه‌رسانا","شدت روشنایی","اندوکتانس هسته","فشار مکانیکی"],0,"این حالت برای بررسی افت مستقیم دیودها و برخی اتصالات نیمه‌رسانا به کار می‌رود."],
      ["پیش از اندازه‌گیری برق شهر چه چیزی ضروری است؟",["ابزار دارای رده ایمنی مناسب و مهارت کافی","فقط پراب ارزان","برداشتن همه فیوزها","لمس سیم برای تشخیص فاز"],0,"برق شهر خطرناک است و ابزار و روش مناسب لازم دارد."],
      ["منبع تغذیه آزمایشگاهی با محدودکننده جریان چه فایده‌ای دارد؟",["کاهش خطر آسیب ناشی از جریان بیش از حد","افزایش ولتاژ نامحدود","جایگزینی همه فیوزها","حذف نیاز به قطبیت"],0,"تنظیم محدودیت جریان می‌تواند از مدار آزمایشی محافظت کند."],
      ["اسیلوسکوپ چه چیزی را نمایش می‌دهد؟",["شکل موج بر حسب زمان","فقط مقدار مقاومت بدون سیگنال","فقط وزن قطعه","رنگ عایق سیم"],0,"اسیلوسکوپ تغییرات سیگنال را در طول زمان نمایش می‌دهد."],
      ["چرا باید رده ایمنی مولتی‌متر را بررسی کرد؟",["برای اطمینان از مناسب‌بودن ابزار برای محیط و ولتاژ اندازه‌گیری","برای تعیین رنگ نمایشگر","برای افزایش خودکار دقت همه اندازه‌ها","برای حذف نیاز به دیتاشیت"],0,"رده CAT و حدود ولتاژ مشخص می‌کنند ابزار برای چه محیط‌هایی طراحی شده است."]
    ]
  };

  const resistorCategoryGroups = {
    fixed: {
      title: "مقاومت‌های ثابت",
      description: "مقدار این مقاومت‌ها هنگام کار عادی تنظیم نمی‌شود.",
      items: [
        { id:"fixed-carbon", title:"مقاومت کربنی", description:"اقتصادی و مناسب بعضی مدارهای عمومی", detail:"مقاومت کربنی از مواد کربنی ساخته می‌شود و در مدارهای عمومی دیده می‌شود. هنگام انتخاب، توان، تلرانس و نویز آن را بررسی کن." },
        { id:"fixed-film", title:"مقاومت فیلم فلزی", description:"دقت و پایداری مناسب در بسیاری از مدارها", detail:"مقاومت فیلم فلزی معمولاً تلرانس و پایداری خوبی دارد و برای مدارهای دقیق و کم‌نویز گزینه رایجی است." },
        { id:"fixed-wirewound", title:"مقاومت سیمی", description:"مناسب توان‌های بالاتر در مدل‌های مربوط", detail:"مقاومت سیمی از سیم مقاومتی ساخته می‌شود. توان نامی و رفتار القایی آن را، به‌ویژه در مدارهای فرکانس بالا، در نظر بگیر." },
        { id:"fixed-smd", title:"مقاومت SMD", description:"قطعه کوچک نصب‌شونده روی سطح برد", detail:"مقاومت‌های SMD فضای کمی اشغال می‌کنند و ممکن است با کد عددی یا حروفی مشخص شوند. کد 472 در بسیاری از مدل‌ها معادل ۴٫۷ کیلو‌اهم است." },
        { id:"fixed-color", title:"تشخیص با کد رنگی", description:"خواندن مقدار و تلرانس از چهار نوار رنگی", detail:"دو نوار اول رقم‌های اصلی، نوار سوم ضریب و نوار چهارم تلرانس را نشان می‌دهد. جهت خواندن را از سمت نوارهای نزدیک‌تر به لبه آغاز کن.", calculator:true }
      ]
    },
    variable: {
      title: "مقاومت‌های متغیر و وابسته به شرایط",
      description: "مقدار مقاومت با تنظیم مکانیکی یا تغییر شرایط محیطی عوض می‌شود.",
      items: [
        { id:"variable-pot", title:"پتانسیومتر", description:"تنظیم دستی و تقسیم ولتاژ", detail:"پتانسیومتر سه پایه دارد و پایه لغزنده آن موقعیت متغیر روی مسیر مقاومتی را فراهم می‌کند. در تنظیم صدا و تقسیم ولتاژ کاربرد دارد." },
        { id:"variable-trimmer", title:"تریمر", description:"تنظیم کالیبراسیون روی برد", detail:"تریمر برای تنظیم محدود و معمولاً کم‌دفعات مدار استفاده می‌شود؛ پیش از چرخاندن آن، محدوده مجاز و روش تنظیم مدار را بررسی کن." },
        { id:"variable-rheostat", title:"رئوستا", description:"تنظیم جریان با مقاومت متغیر", detail:"رئوستا معمولاً با دو اتصال از مسیر مقاومتی برای تغییر مقاومت سری استفاده می‌شود. توان و جریان مجاز آن باید کافی باشد." },
        { id:"variable-sensors", title:"حسگرهای مقاومتی", description:"LDR، ترمیستور و حسگر نیرو", detail:"مقاومت LDR با نور تغییر می‌کند؛ NTC معمولاً با افزایش دما مقاومت کمتری دارد و PTC در محدوده کاری خود مقاومت بیشتری نشان می‌دهد. حسگرهای نیرو نیز می‌توانند با فشار تغییر مقاومت بدهند." }
      ]
    }
  };
  let resistorExplorerState = { mode: "root", group: null, item: null };

  function renderSensorGuide() {
    const sensors = [
      { mark:"LDR", title:"حسگر نور (LDR)", principle:"در بسیاری از LDRها با افزایش نور، مقاومت کاهش می‌یابد؛ میزان تغییر به مدل حسگر و طیف نور بستگی دارد.", uses:"چراغ شب‌روشن، تشخیص روشنایی محیط و تقسیم ولتاژ برای ورودی میکروکنترلر.", test:"در مدار خاموش، مقاومت را با مولتی‌متر اندازه بگیر؛ سپس حسگر را در نور و سایه مقایسه کن. برای مدار فعال از تقسیم ولتاژ کم‌ولتاژ استفاده کن.", source:"Vishay — Photocells", url:"https://www.vishay.com/en/photocells/" },
      { mark:"NTC", title:"ترمیستور NTC", principle:"در NTC معمولی، با افزایش دما مقاومت کاهش می‌یابد و رابطه دما و مقاومت غیرخطی است.", uses:"اندازه‌گیری دما، پایش حرارتی و محدودکردن جریان هجومی در مدل‌های مناسب.", test:"در مدار خاموش و پس از تخلیه ایمن خازن‌ها مقاومت را بسنج؛ تغییر آن را با گرم‌کردن ملایم مشاهده کن. از شعله مستقیم استفاده نکن.", source:"TDK — NTC thermistors", url:"https://product.tdk.com/en/products/sensor/ntc/" },
      { mark:"PTC", title:"ترمیستور PTC", principle:"مقاومت PTC با افزایش دما افزایش می‌یابد؛ شدت تغییر و دمای گذار به نوع قطعه بستگی دارد.", uses:"حفاظت اضافه‌جریان در مدل‌های قابل‌بازگشت، پایش دما و محدودسازی حرارتی در کاربردهای مشخص.", test:"دمای نامی و محدوده کاری را از دیتاشیت بررسی کن؛ تغییر مقاومت را فقط با گرم‌کردن ملایم و ابزار مناسب بسنج.", source:"TDK — Temperature sensors", url:"https://product.tdk.com/en/products/sensor/ntc/" },
      { mark:"FSR", title:"حسگر نیروی مقاومتی", principle:"در بسیاری از FSRها با افزایش نیروی واردشده، مقاومت کاهش می‌یابد؛ پاسخ معمولاً خطی نیست و برای اندازه‌گیری دقیق نیرو مناسب نیست.", uses:"تشخیص فشار یا تماس، رابط‌های تعاملی و پروژه‌های آموزشی.", test:"با تقسیم ولتاژ کم‌ولتاژ و مقاومت ثابت، تغییر خروجی را هنگام فشار ملایم مشاهده کن؛ از فشار بیش از محدوده سازنده خودداری کن.", source:"Interlink Electronics — FSR", url:"https://www.interlinkelectronics.com/fsr-400-series" },
      { mark:"STRAIN", title:"کرنش‌سنج مقاومتی", principle:"تغییر شکل بسیار کوچک باعث تغییر مقاومت کرنش‌سنج می‌شود؛ معمولاً مدار پل و تقویت‌کننده ابزار دقیق لازم است.", uses:"لودسل، اندازه‌گیری نیرو و وزن و پایش تغییر شکل سازه‌ها.", test:"برای اندازه‌گیری قابل‌اعتماد از مدار پل، تقویت‌کننده مناسب و کالیبراسیون استفاده کن؛ تغییر مقاومت به‌تنهایی ممکن است بسیار کوچک باشد.", source:"NI — Measuring Strain with Strain Gages", url:"https://www.ni.com/en/shop/data-acquisition/sensor-fundamentals/measuring-strain-with-strain-gages.html" },
      { mark:"POT", title:"پتانسیومتر به‌عنوان حسگر موقعیت", principle:"با حرکت محور یا لغزنده، نسبت تقسیم ولتاژ تغییر می‌کند و می‌تواند موقعیت چرخشی یا خطی را نشان دهد.", uses:"دسته کنترل، تشخیص موقعیت مکانیکی و ورودی قابل تنظیم در مدارهای آموزشی.", test:"در مدار کم‌ولتاژ، دو سر مسیر مقاومتی را به تغذیه و زمین و پایه لغزنده را به ورودی اندازه‌گیری وصل کن؛ حد مجاز ورودی را رعایت کن.", source:"Bourns — Potentiometers", url:"https://www.bourns.com/products/potentiometers-trimmers" }
    ];
    return `<section class="sensor-guide" aria-labelledby="sensorGuideTitle"><span class="eyebrow">راهنمای کاربردی حسگرها</span><h3 id="sensorGuideTitle">حسگرهای مقاومتی؛ از اصل کار تا آزمایش</h3><p class="intro">مقاومت این قطعات با نور، دما، نیرو یا موقعیت تغییر می‌کند. نوع دقیق قطعه و محدوده کاری آن را از دیتاشیت بررسی کن.</p><div class="sensor-card-grid">${sensors.map(sensor => `<article class="sensor-card"><div class="sensor-card-top"><span class="sensor-mark" dir="ltr">${sensor.mark}</span><h4>${sensor.title}</h4></div><p><strong>اصل کار:</strong> ${sensor.principle}</p><p><strong>کاربردها:</strong> ${sensor.uses}</p><p><strong>روش آزمایش:</strong> ${sensor.test}</p><a class="sensor-source" href="${sensor.url}" target="_blank" rel="noopener noreferrer">منبع فنی: ${sensor.source} ↗</a></article>`).join("")}</div><p class="sensor-note"><strong>ایمنی:</strong> آزمون مقاومت را روی مدار خاموش انجام بده. از ولتاژ پایین و محدودشده استفاده کن و حسگر را خارج از محدوده دما، نیرو، ولتاژ یا توان سازنده آزمایش نکن.</p></section>`;
  }
  function renderResistorExplorer() {
    if (resistorExplorerState.mode === "root") {
      return `<section class="resistor-explorer" id="resistorExplorer"><span class="eyebrow">انتخاب دسته</span><h3>از کدام نوع مقاومت شروع کنیم؟</h3><p class="intro">ابتدا یکی از دو دسته زیر را انتخاب کن تا فقط زیرمجموعه‌های همان دسته نمایش داده شوند.</p><div class="resistor-choice-grid">
        <button type="button" class="resistor-choice" data-resistor-mode="fixed"><strong>مقاومت‌های ثابت ←</strong><small>کربنی، فیلم فلزی، سیمی، SMD و کد رنگی</small></button>
        <button type="button" class="resistor-choice" data-resistor-mode="variable"><strong>مقاومت‌های متغیر ←</strong><small>پتانسیومتر، تریمر، رئوستا و حسگرهای مقاومتی</small></button>
      </div></section>`;
    }
    const group = resistorCategoryGroups[resistorExplorerState.group];
    if (!group) { resistorExplorerState = {mode:"root",group:null,item:null}; return renderResistorExplorer(); }
    if (resistorExplorerState.mode === "group") {
      return `<section class="resistor-explorer" id="resistorExplorer"><div class="resistor-explorer-head"><h3>${group.title}</h3><button type="button" class="resistor-back" data-resistor-back="root">← بازگشت به انتخاب دسته</button></div><p class="intro">${group.description}</p><div class="resistor-choice-grid">${group.items.map(item => `<button type="button" class="resistor-choice" data-resistor-category="${item.id}"><strong>${item.title} ←</strong><small>${item.description}</small></button>`).join("")}</div></section>`;
    }
    const item = group.items.find(entry => entry.id === resistorExplorerState.item);
    if (!item) { resistorExplorerState.mode = "group"; return renderResistorExplorer(); }
    return `<section class="resistor-explorer" id="resistorExplorer"><div class="resistor-explorer-head"><h3>${group.title}</h3><button type="button" class="resistor-back" data-resistor-back="group">← بازگشت به زیرمجموعه‌ها</button></div><article class="resistor-detail"><h3>${item.title}</h3><p>${item.detail}</p></article>${item.calculator ? renderColorCalculator() : ""}${item.id === "variable-sensors" ? renderSensorGuide() : ""}</section>`;
  }

  function renderResistorLesson() {
    const data = lessons.resistors;
    return `<span class="eyebrow">کتابخانه آموزشی قطعات</span><h2 class="lesson-title">${escapeHTML(data.title)}</h2>
      <p class="intro">${escapeHTML(data.intro)}</p>${renderResistorExplorer()}
      <div class="safety"><strong>نکته ایمنی:</strong> ${escapeHTML(data.safety)}</div>
      <div class="detail"><div class="box"><h4>مسیر پیشنهادی یادگیری</h4><p>ابتدا نوع مقاومت را انتخاب کن، مشخصات و دیتاشیت را بررسی کن و سپس با ابزار مناسب و رعایت ایمنی آن را اندازه بگیر.</p></div></div>
      ${renderQuizShell("resistors")}`;
  }

  function renderLessonContent(familyId) {
    if (familyId === "resistors") return renderResistorLesson();
    const data = lessons[familyId];
    if (!data) return `<p class="intro">محتوای این درس پیدا نشد.</p>`;
    const cards = data.cards.map(([title, description]) => `<article class="type" style="cursor:default"><b>${escapeHTML(title)}</b><small>${escapeHTML(description)}</small></article>`).join("");
    return `<span class="eyebrow">کتابخانه آموزشی قطعات</span><h2 class="lesson-title">${escapeHTML(data.title)}</h2>
      <p class="intro">${escapeHTML(data.intro)}</p><div class="types">${cards}</div>
      ${familyId === "resistors" ? renderColorCalculator() : ""}
      <div class="safety"><strong>نکته ایمنی:</strong> ${escapeHTML(data.safety)}</div>
      <div class="detail"><div class="box"><h4>مسیر پیشنهادی یادگیری</h4><p>ابتدا نماد و مشخصات قطعه را بشناس، سپس دیتاشیت مدل دقیق را بررسی کن و در نهایت با ابزار مناسب و رعایت ایمنی آزمون بگیر.</p></div></div>
      ${renderQuizShell(familyId)}`;
  }

  function renderQuizShell(familyId) {
    const saved = getSavedResults()[familyId];
    const savedSummary = saved ? `<p class="saved-result">آخرین کارنامه ذخیره‌شده: ${saved.correct}/10 پاسخ درست، ${saved.wrong}/10 پاسخ غلط، امتیاز ${saved.score}/100 · ${escapeHTML(saved.awardLabel || "بدون کاپ")}</p>` : `<p class="saved-result">هنوز برای این بخش نتیجه‌ای ذخیره نشده است.</p>`;
    return `<section class="quiz" id="familyQuiz" data-family-quiz="${familyId}"><span class="eyebrow">آزمون پایان درس</span><h3>آزمون ${escapeHTML(lessons[familyId].title)}</h3>
      <p class="intro">۱۰ سؤال چهارگزینه‌ای · هر پاسخ درست ۱۰ امتیاز دارد. پس از انتخاب پاسخ، توضیح آموزشی نمایش داده می‌شود.</p>${savedSummary}
      <div class="quiz-start"><button type="button" class="btn" data-quiz-start>شروع آزمون</button></div>
      <div class="quiz-run" hidden><p class="quiz-progress" data-quiz-progress></p><div data-quiz-question></div><div class="quiz-options" data-quiz-options></div>
      <p class="quiz-feedback" data-quiz-feedback aria-live="polite"></p><button type="button" class="btn" data-quiz-next hidden>سؤال بعدی ←</button></div>
      <div class="quiz-result" data-quiz-result hidden aria-live="polite"></div></section>`;
  }

  function openFamily(familyId) {
    if (!lessons[familyId]) return;
    currentFamilyId = familyId;
    if (familyId === "resistors") resistorExplorerState = { mode:"root", group:null, item:null };
    closeMenu();
    lesson.classList.remove("family-effect", ...Object.values(familyClassById));
    void lesson.offsetWidth;
    lesson.classList.add("family-effect", familyClassById[familyId]);
    lessonContent.innerHTML = renderLessonContent(familyId);
    lesson.classList.remove("hidden");
    scrollToElement(lesson);
    playFamilySound(familyId);
    if (familyId === "resistors") {
      ["band1","band2","band3","band4"].forEach((id) => $("#" + id, lessonContent)?.addEventListener("change", updateResistorCalculator));
      updateResistorCalculator();
    }
  }

  function getAward(wrong) {
    if (wrong === 0) return { key:"gold", label:"کاپ طلایی", message:"فوق‌العاده است! همه پاسخ‌ها درست بود؛ کاپ طلایی برای توست." };
    if (wrong === 2) return { key:"silver", label:"کاپ نقره‌ای", message:"آفرین! با فقط دو پاسخ غلط، کاپ نقره‌ای را به دست آوردی." };
    if (wrong === 4) return { key:"bronze", label:"کاپ برنزی", message:"خوب است؛ با چهار پاسخ غلط، کاپ برنزی را دریافت می‌کنی." };
    if (wrong > 4) return { key:"none", label:"بدون کاپ", message:"هنوز درست یاد نگرفتی. بیشتر تلاش کن" };
    return { key:"none", label:"بدون کاپ", message:"هنوز کاپی دریافت نکرده‌ای؛ پاسخ‌های توضیح‌داده‌شده را مرور کن و دوباره تلاش کن." };
  }

  function startQuiz(quiz) {
    const familyId = quiz.dataset.familyQuiz;
    const bank = questions[familyId];
    if (!bank || bank.length !== 10) {
      console.error("بانک آزمون باید دقیقاً ۱۰ سؤال داشته باشد:", familyId);
      return;
    }
    quizState = { familyId, index:0, correct:0, wrong:0, answered:false, responses:[] };
    $(".quiz-start", quiz).hidden = true;
    $(".quiz-run", quiz).hidden = false;
    $("[data-quiz-result]", quiz).hidden = true;
    showQuizQuestion(quiz);
  }

  function showQuizQuestion(quiz) {
    if (!quizState) return;
    const bank = questions[quizState.familyId];
    const q = bank[quizState.index];
    quizState.answered = false;
    $("[data-quiz-progress]", quiz).textContent = `سؤال ${quizState.index + 1} از ${bank.length} · درست: ${quizState.correct} · غلط: ${quizState.wrong}`;
    $("[data-quiz-question]", quiz).innerHTML = `<h4>${escapeHTML(q[0])}</h4>`;
    const optionLetters = ["A", "B", "C", "D"];
    $("[data-quiz-options]", quiz).innerHTML = q[1].map((option, index) => `
      <button type="button" dir="ltr" data-answer="${index}" aria-label="گزینه ${optionLetters[index]}">
        <span class="quiz-option-line" dir="ltr"><span class="quiz-option-label" dir="ltr">${optionLetters[index]}-</span> <span class="quiz-option-value" dir="ltr">${formatQuizText(option)}</span></span>
      </button>
    `).join("");
    const feedback = $("[data-quiz-feedback]", quiz);
    feedback.textContent = ""; feedback.style.color = "";
    const next = $("[data-quiz-next]", quiz);
    next.hidden = true; next.textContent = quizState.index === bank.length - 1 ? "مشاهده کارنامه" : "سؤال بعدی ←";
  }

  function finishQuiz(quiz) {
    const state = quizState;
    const score = state.correct * 10;
    const award = getAward(state.wrong);
    const result = { familyId:state.familyId, correct:state.correct, wrong:state.wrong, score, total:10, awardKey:award.key, awardLabel:award.label, responses:state.responses };
    saveResult(state.familyId, result);
    $(".quiz-run", quiz).hidden = true;
    const resultElement = $("[data-quiz-result]", quiz);
    const awardClass = award.key === "none" ? "award-none" : `award-${award.key}`;
    resultElement.innerHTML = `<div class="result-card ${awardClass}"><div class="award-symbol">${renderAwardCup(award.key)}</div>
      <h4>کارنامه آزمون ${escapeHTML(lessons[state.familyId].title)}</h4><p class="award-label">${escapeHTML(award.label)}</p><p>${escapeHTML(award.message)}</p>
      <div class="score-stats"><div><strong>${state.correct}</strong><span>پاسخ درست</span></div><div><strong>${state.wrong}</strong><span>پاسخ غلط</span></div><div><strong>${score}/100</strong><span>امتیاز</span></div></div>
      <p class="result-note">نتیجه این آزمون در همین مرورگر ذخیره شد. با پاک‌کردن داده‌های مرورگر ممکن است نتایج حذف شوند.</p>
      <button type="button" class="btn" data-quiz-restart>آزمون دوباره</button></div>
      <div class="answer-review"><h4>مرور پاسخ‌ها</h4>${state.responses.map((r, i) => `<div class="review-item ${r.correct ? "review-correct" : "review-wrong"}"><b>${i+1}. ${escapeHTML(r.question)}</b><p><span dir="rtl">پاسخ تو:</span> <span class="quiz-ltr">${r.selectedLetter} — ${formatQuizText(r.selectedText)}</span></p><p><span dir="rtl">پاسخ صحیح:</span> <span class="quiz-ltr">${r.correctLetter} — ${formatQuizText(r.correctText)}</span></p><small>${formatQuizText(r.explanation)}</small></div>`).join("")}</div>`;
    resultElement.hidden = false;
    renderFamilyCards();
    playSuccessSound();
  }

  lessonContent.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-resistor-mode]");
    if (modeButton && currentFamilyId === "resistors") {
      resistorExplorerState = { mode:"group", group:modeButton.dataset.resistorMode, item:null };
      lessonContent.innerHTML = renderResistorLesson();
      return;
    }
    const categoryButton = event.target.closest("[data-resistor-category]");
    if (categoryButton && currentFamilyId === "resistors") {
      resistorExplorerState = { mode:"detail", group:resistorExplorerState.group, item:categoryButton.dataset.resistorCategory };
      lessonContent.innerHTML = renderResistorLesson();
      ["band1","band2","band3","band4"].forEach((id) => $("#" + id, lessonContent)?.addEventListener("change", updateResistorCalculator));
      updateResistorCalculator();
      return;
    }
    const resistorBack = event.target.closest("[data-resistor-back]");
    if (resistorBack && currentFamilyId === "resistors") {
      resistorExplorerState = resistorBack.dataset.resistorBack === "root"
        ? { mode:"root", group:null, item:null }
        : { mode:"group", group:resistorExplorerState.group, item:null };
      lessonContent.innerHTML = renderResistorLesson();
      return;
    }
    const quiz = event.target.closest("[data-family-quiz]");
    if (!quiz) return;
    if (event.target.closest("[data-quiz-start]")) {
      startQuiz(quiz);
      return;
    }
    if (event.target.closest("[data-quiz-restart]")) {
      startQuiz(quiz);
      return;
    }
    const answerButton = event.target.closest("[data-answer]");
    if (answerButton) {
      if (!quizState || quizState.answered || quizState.familyId !== quiz.dataset.familyQuiz) return;
      quizState.answered = true;
      const bank = questions[quizState.familyId];
      const q = bank[quizState.index];
      const selected = Number(answerButton.dataset.answer);
      const correct = selected === q[2];
      if (correct) { quizState.correct += 1; playSuccessSound(); }
      else { quizState.wrong += 1; playErrorSound(); }
      $$("[data-answer]", quiz).forEach((button) => {
        button.disabled = true;
        if (Number(button.dataset.answer) === q[2]) button.classList.add("answer-correct");
        if (button === answerButton && !correct) button.classList.add("answer-wrong");
      });
      const optionLetters = ["A", "B", "C", "D"];
      const response = { question:q[0], selectedText:q[1][selected], correctText:q[1][q[2]], selectedLetter:optionLetters[selected], correctLetter:optionLetters[q[2]], correct, explanation:q[3] };
      quizState.responses.push(response);
      const feedback = $("[data-quiz-feedback]", quiz);
      feedback.innerHTML = `${correct ? "آفرین، پاسخ درست است. " : "این پاسخ درست نیست. "}${formatQuizText(q[3])}`;
      feedback.style.color = correct ? "#15803d" : "#b91c1c";
      $("[data-quiz-progress]", quiz).textContent = `سؤال ${quizState.index + 1} از 10 · درست: ${quizState.correct} · غلط: ${quizState.wrong}`;
      $("[data-quiz-next]", quiz).hidden = false;
      return;
    }
    if (event.target.closest("[data-quiz-next]")) {
      if (!quizState || !quizState.answered || quizState.familyId !== quiz.dataset.familyQuiz) return;
      if (quizState.index >= 9) finishQuiz(quiz);
      else { quizState.index += 1; showQuizQuestion(quiz); }
    }
  });

  backButton?.addEventListener("click", () => {
    lesson.classList.add("hidden");
    currentFamilyId = null;
    quizState = null;
    closeMenu();
    scrollToElement($("#families"));
  });
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#families") closeMenu();
  });

  renderFamilyCards();
  if (window.location.hash) closeMenu();
  window.ElectronicComponentsAcademy = {
    openFamily,
    playClickSound,
    setSoundEnabled(enabled) { soundEnabled = Boolean(enabled); },
    getResults() { return getSavedResults(); },
    clearResults() {
      try { localStorage.removeItem("mkh-electronics-quiz-results"); } catch {}
      renderFamilyCards();
    }
  };
});

