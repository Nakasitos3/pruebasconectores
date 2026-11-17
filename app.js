(function(){
"use strict";

/* ---------- almacenamiento seguro ---------- */
var S={get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
       set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- datos de producto (de los contratos) ---------- */
var CAMPUS_PRICE=340000;
var SHIFTS=[
  {id:"w27",ru:"Зимний кампус",en:"Winter camp",from:"2027-01-03",to:"2027-01-09",cap:40,base:31},
  {id:"s27",ru:"Весенний кампус",en:"Spring camp",from:"2027-03-21",to:"2027-03-27",cap:40,base:12},
  {id:"l127",ru:"Летний кампус · I смена",en:"Summer camp · Session I",from:"2027-06-06",to:"2027-06-12",cap:40,base:26},
  {id:"l227",ru:"Летний кампус · II смена",en:"Summer camp · Session II",from:"2027-06-13",to:"2027-06-19",cap:40,base:38}
];
var PLANS=[
  {id:"e1",ru:"1 тренировка в неделю",en:"1 session a week",month:30000,total:90000},
  {id:"e2",ru:"2 тренировки в неделю",en:"2 sessions a week",month:50000,total:150000,dest:true}
];
var ETP_STARTS=[
  {id:"2026-12-01",ru:"1 декабря 2026",en:"1 December 2026"},
  {id:"2027-01-05",ru:"5 января 2027",en:"5 January 2027"},
  {id:"2027-02-02",ru:"2 февраля 2027",en:"2 February 2027"}
];

/* ---------- textos ---------- */
var T={
ru:{
 "demo":"Демо-версия: оплата и данные симулируются, ничего никуда не отправляется.",
 "nav.campus":"Кампус","nav.como":"Как купить","nav.cart":"Корзина",
 "hero.h1":"Тренируйся как Атлетико.","hero.sub":"Кампус с проживанием в Талгаре и тренировки ETP в Алматы. Запись и оплата онлайн за 5 минут.","hero.b1":"Купить кампус","hero.b2":"Записаться в ETP",
 "progs.h2":"Выберите программу.","progs.p":"Всё оформляется онлайн: договор, документы и оплата. Без звонков и визитов в офис.",
 "c.kicker":"Талгар, с. Береке","c.h3":"Кампус<br>7 дней","c.per":"за путёвку, 7 дней и 6 ночей, налоги включены",
 "c.l1":"Проживание 24/7 в 2-местных номерах","c.l2":"5-разовое сбалансированное питание","c.l3":"Ежедневные тренировки по методологии Atlético de Madrid","c.l4":"Бассейн, досуговая программа и охрана","c.cta":"Выбрать смену",
 "e.kicker":"Алматы, ул. Абая 8в","e.desde":"от 30 000 ₸","e.per":"в месяц, абонемент на 3 месяца","e.l1":"Вторник и четверг, 18:00","e.l2":"1 или 2 тренировки в неделю","e.l3":"Групповые занятия по футболу и физподготовке","e.l4":"Заморозка абонемента до 7 дней","e.cta":"Выбрать абонемент",
 "como.h2":"Пять минут.<br>Без бумаг.","como.p":"Родитель делает всё сам с телефона. Академия получает готовую заявку, подписанный договор и оплату.",
 "s1.h":"Добавьте в корзину","s1.p":"Смену кампуса или абонемент ETP. Можно сразу для нескольких детей.","s2.h":"Заполните данные","s2.p":"Законный представитель и ребёнок: ФИО, ИИН, контакты.","s3.h":"Загрузите документы","s3.p":"Фото свидетельства и удостоверений. Медицинские справки можно позже.","s4.h":"Примите оферту","s4.p":"Подписание кодом из SMS.","s5.h":"Оплатите","s5.p":"Картой любого банка, Apple Pay или Google Pay. Договор приходит на почту.",
 "cb.h2":"Неделя<br>как в Атлетико.","cb.p":"Кампус с полным пансионом на тренировочной базе академии в Талгаре.",
 "i1.b":"Проживание","i1.s":"Круглосуточно, 2-местные номера, охрана","i2.b":"Питание","i2.s":"5 раз в день, сбалансированное меню","i3.b":"Футбол и отдых","i3.s":"Тренировки каждый день, бассейн и досуг",
 "d1.h":"Заезд","d1.p":"Знакомство и тестирование","d2.h":"Техника","d2.p":"Работа с мячом","d3.h":"Тактика","d3.p":"Поле и разбор видео","d4.h":"Бассейн","d4.p":"Восстановление и досуг","d5.h":"Матчи","d5.p":"Турнир внутри кампуса","d6.h":"Финал","d6.p":"Награждение","d7.h":"Выезд","d7.p":"Встреча с родителями",
 "t.h3":"Ближайшие смены","t.left":"Осталось мест: {n} из {c}","t.full":"Мест нет","t.add":"В корзину","t.added":"В корзине",
 "eb.p":"Групповые тренировки в Алматы для детей, которые только начинают.",
 "ei1.b":"Где","ei1.s":"Алматы, ул. Абая 8в, здание КазНАИУ","ei2.b":"Когда","ei2.s":"Вторник и четверг, 18:00","ei3.b":"Медицина","ei3.s":"Допуск врача и обследования в первую неделю",
 "pl.h3":"Абонемент на 3 месяца","pl.month":"{p} ₸ в месяц","pl.tot":"{p} ₸ за 3 месяца (90 дней)","pl.add":"В корзину","pl.pop":"Популярный",
 "ci.h2":"Место ждёт.","ci.p":"Оформление занимает пять минут. Договор и чек придут на почту сразу после оплаты.",
 "f.dir":"Алматинская обл., Талгарский р-н, с. Береке","f.offer":"Публичная оферта","f.priv":"Политика конфиденциальности","f.panel":"Панель академии (демо)",
 "pa.t":"Панель академии","doc.t":"Документ","doc.nota":"Демо: в рабочей версии PDF приходит на почту автоматически.","doc.print":"Скачать / печать",
 "toast.add":"Добавлено в корзину","toast.go":"Оформить",
 "k.title":"Оформление","k.steps":["Корзина","Представитель","Дети","Документы","Оферта","Подпись","Оплата"],"k.step":"Шаг {i} из {n}: {s}",
 "k.next":"Далее","k.back":"Назад","k.total":"Итого","k.empty":"Корзина пуста","k.empty2":"Добавьте смену кампуса или абонемент ETP.","k.close":"Закрыть",
 "k.cart.h":"Ваша корзина","k.cart.sub":"Одна позиция — один ребёнок. Чтобы записать нескольких детей, добавьте позицию ещё раз.","k.remove":"Удалить","k.more":"Добавить ещё",
 "k.campus":"Кампус, 7 дней","k.etp":"ETP, абонемент 3 месяца","k.start":"Начало",
 "k.par.h":"Законный представитель","k.par.sub":"Тот, кто заключает договор от имени ребёнка.","k.fio":"ФИО","k.iin":"ИИН","k.idn":"№ удостоверения личности","k.tel":"Телефон","k.mail":"Email","k.addr":"Адрес проживания","k.rep":"Подтверждаю, что я законный представитель ребёнка (родитель, усыновитель, опекун) или действую по надлежащей доверенности.",
 "k.kid.h":"Данные детей","k.kid.sub":"Для каждой позиции в корзине.","k.kfio":"ФИО ребёнка","k.kdob":"Дата рождения","k.kiin":"ИИН ребёнка","k.for":"Для",
 "k.doc.h":"Документы","k.doc.sub":"Фото или скан. Медицинские справки можно загрузить позже — пришлём напоминание.","k.attach":"Прикрепить","k.change":"Заменить","k.later":"можно позже","k.req":"обязательно",
 "k.d.birth":"Свидетельство о рождении","k.d.id1":"Удостоверение личности родителя 1","k.d.id2":"Удостоверение личности родителя 2","k.d.med":"Медицинская справка 027-У или 075-У","k.d.medetp":"Медицинский допуск и обследования (ЭхоКГ, ЭКГ, анализы)",
 "k.of.h":"Оферта и согласия","k.of.sub":"Прочитайте условия. Договор заключается акцептом публичной оферты (ст. 395–396 ГК РК).",
 "k.c1":"Я ознакомлен(а) и согласен(на) с <a href=\"offer.html\" target=\"_blank\" rel=\"noopener\">Публичной офертой</a>, правилами кампуса/секции и правилами возврата.","k.c2":"Подтверждаю отсутствие у ребёнка медицинских противопоказаний к физическим нагрузкам и достоверность данных о здоровье.","k.c3":"Даю согласие на сбор и обработку персональных данных моих и ребёнка согласно <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Политике конфиденциальности</a>.","k.c4":"Согласен(на) на фото- и видеосъёмку ребёнка и использование материалов в медиа и рекламе Академии.","k.c4s":"Необязательно. Можно отозвать в любой момент.",
 "k.sms.h":"Подпишите кодом","k.sms.sub":"Мы отправили код на {t}. Ввод кода равен вашей подписи под заявлением.","k.sms.demo":"Демо-код: 1234","k.sms.err":"Неверный код",
 "k.pay.h":"Оплата","k.pay.sub":"100% предоплата. Деньги поступают на расчётный счёт организации.","k.pay.box":"Безопасная оплата Halyk ePay","k.pay.note":"В рабочей версии здесь откроется защищённая страница банка: карта любого банка, Apple Pay, Google Pay или приложение Halyk. В демо оплата симулируется.","k.pay.btn":"Оплатить {p} ₸","k.pay.wait":"Обработка…",
 "k.ok.h":"Готово! Места ваши.","k.ok.sub":"Мы отправили договор и чек на {m}.","k.ok.doc":"Открыть договор","k.ok.next":["Договор и чек — на почте и в WhatsApp.","Загрузите медицинские справки до начала — пришлём напоминание.","За 3 дня до старта — памятка с тем, что взять с собой."],
 "k.fill":"Заполнить тестовыми данными","k.fillf":"Прикрепить тестовые файлы",
 "v.req":"Заполните поле","v.iin":"Похоже, ИИН неверный — в демо можно продолжить","v.tel":"Формат: +7 7XX XXX XX XX","v.mail":"Проверьте email","v.age":"Возраст для программы: {a}–{b} лет","v.chk":"Отметьте обязательные согласия","v.docs":"Прикрепите обязательные документы","v.rep":"Подтвердите, что вы законный представитель",
 "p.orders":"Заказы","p.rev":"Оплачено","p.campus":"Свободно в кампусах","p.etp":"Абонементы ETP","p.occ":"Заполняемость смен","p.list":"Заявки","p.none":"Пока нет заявок. Оформите покупку на сайте — она появится здесь сразу после оплаты.",
 "p.th":["№ документа","Программа","Ребёнок","Представитель","Телефон","Сумма","Оплата","Справка","Документ"],"p.paid":"Оплачено","p.wait":"Ожидается","p.open":"Открыть","p.csv":"Экспорт в Excel (CSV)","p.reset":"Очистить демо",
 "p.note":"Демо: заявки хранятся только в этом браузере. В рабочей версии — в CRM академии на сервере в Казахстане, с уведомлением менеджеру."
},
en:{
 "demo":"Demo version: payment and data are simulated, nothing is sent anywhere.",
 "nav.campus":"Camp","nav.como":"How to buy","nav.cart":"Cart",
 "hero.h1":"Train like Atleti.","hero.sub":"Residential camp in Talgar and ETP training in Almaty. Sign up and pay online in 5 minutes.","hero.b1":"Book the camp","hero.b2":"Join ETP",
 "progs.h2":"Choose a programme.","progs.p":"Everything is done online: contract, documents and payment. No calls, no office visits.",
 "c.kicker":"Talgar, Bereke village","c.h3":"Camp<br>7 days","c.per":"per place, 7 days and 6 nights, taxes included",
 "c.l1":"24/7 accommodation in twin rooms","c.l2":"5 balanced meals a day","c.l3":"Daily training with the Atlético de Madrid methodology","c.l4":"Pool, leisure programme and security","c.cta":"Choose a session",
 "e.kicker":"Almaty, 8v Abay Ave","e.desde":"from 30,000 ₸","e.per":"a month, 3-month pass","e.l1":"Tuesday and Thursday, 6 pm","e.l2":"1 or 2 sessions a week","e.l3":"Group football and fitness training","e.l4":"Pass can be paused for up to 7 days","e.cta":"Choose a pass",
 "como.h2":"Five minutes.<br>No paperwork.","como.p":"Parents do everything from their phone. The academy gets a complete application, a signed contract and the payment.",
 "s1.h":"Add to cart","s1.p":"A camp session or an ETP pass. Several children at once is fine.","s2.h":"Fill in details","s2.p":"Legal guardian and child: full name, IIN, contacts.","s3.h":"Upload documents","s3.p":"Photos of the birth certificate and IDs. Medical certificates can come later.","s4.h":"Accept the offer","s4.p":"Sign with an SMS code.","s5.h":"Pay","s5.p":"Any bank card, Apple Pay or Google Pay. The contract arrives by email.",
 "cb.h2":"A week<br>like Atleti.","cb.p":"Full-board camp at the academy's training base in Talgar.",
 "i1.b":"Accommodation","i1.s":"Round the clock, twin rooms, security","i2.b":"Meals","i2.s":"5 times a day, balanced menu","i3.b":"Football and fun","i3.s":"Training every day, pool and leisure",
 "d1.h":"Arrival","d1.p":"Welcome and testing","d2.h":"Technique","d2.p":"Ball work","d3.h":"Tactics","d3.p":"Pitch and video review","d4.h":"Pool","d4.p":"Recovery and leisure","d5.h":"Matches","d5.p":"Camp tournament","d6.h":"Final","d6.p":"Awards","d7.h":"Departure","d7.p":"Parents pick-up",
 "t.h3":"Upcoming sessions","t.left":"{n} of {c} places left","t.full":"Sold out","t.add":"Add to cart","t.added":"In cart",
 "eb.p":"Group training in Almaty for children who are just starting out.",
 "ei1.b":"Where","ei1.s":"Almaty, 8v Abay Ave, KazNAIU building","ei2.b":"When","ei2.s":"Tuesday and Thursday, 6 pm","ei3.b":"Medical","ei3.s":"Doctor's clearance and tests in the first week",
 "pl.h3":"3-month pass","pl.month":"{p} ₸ a month","pl.tot":"{p} ₸ for 3 months (90 days)","pl.add":"Add to cart","pl.pop":"Popular",
 "ci.h2":"Your place is waiting.","ci.p":"It takes five minutes. The contract and receipt arrive by email right after payment.",
 "f.dir":"Almaty region, Talgar district, Bereke village","f.offer":"Public offer","f.priv":"Privacy policy","f.panel":"Academy dashboard (demo)",
 "pa.t":"Academy dashboard","doc.t":"Document","doc.nota":"Demo: in the live version the PDF is emailed automatically. Legal documents are issued in Russian.","doc.print":"Download / print",
 "toast.add":"Added to cart","toast.go":"Checkout",
 "k.title":"Checkout","k.steps":["Cart","Guardian","Children","Documents","Offer","Signature","Payment"],"k.step":"Step {i} of {n}: {s}",
 "k.next":"Continue","k.back":"Back","k.total":"Total","k.empty":"Your cart is empty","k.empty2":"Add a camp session or an ETP pass.","k.close":"Close",
 "k.cart.h":"Your cart","k.cart.sub":"One item is one child. To sign up several children, add the item again.","k.remove":"Remove","k.more":"Add more",
 "k.campus":"Camp, 7 days","k.etp":"ETP, 3-month pass","k.start":"Starts",
 "k.par.h":"Legal guardian","k.par.sub":"The person entering the contract on the child's behalf.","k.fio":"Full name","k.iin":"IIN","k.idn":"ID card number","k.tel":"Phone","k.mail":"Email","k.addr":"Home address","k.rep":"I confirm I am the child's legal representative (parent, adoptive parent, guardian) or act under a valid power of attorney.",
 "k.kid.h":"Children's details","k.kid.sub":"For each item in the cart.","k.kfio":"Child's full name","k.kdob":"Date of birth","k.kiin":"Child's IIN","k.for":"For",
 "k.doc.h":"Documents","k.doc.sub":"Photo or scan. Medical certificates can be uploaded later — we'll send a reminder.","k.attach":"Attach","k.change":"Replace","k.later":"can be later","k.req":"required",
 "k.d.birth":"Birth certificate","k.d.id1":"Parent 1 ID card","k.d.id2":"Parent 2 ID card","k.d.med":"Medical certificate 027-U or 075-U","k.d.medetp":"Medical clearance and tests (echo, ECG, blood work)",
 "k.of.h":"Offer and consents","k.of.sub":"Please read the terms. The contract is concluded by accepting the public offer (Arts. 395–396, Civil Code of Kazakhstan).",
 "k.c1":"I have read and accept the <a href=\"offer.html\" target=\"_blank\" rel=\"noopener\">Public offer</a>, the camp/section rules and the refund policy.","k.c2":"I confirm the child has no medical contraindications to physical exercise and that the health information is accurate.","k.c3":"I consent to the collection and processing of my and my child's personal data under the <a href=\"privacy.html\" target=\"_blank\" rel=\"noopener\">Privacy policy</a>.","k.c4":"I agree to photos and video of my child being taken and used in the Academy's media and advertising.","k.c4s":"Optional. Can be withdrawn at any time.",
 "k.sms.h":"Sign with a code","k.sms.sub":"We sent a code to {t}. Entering it is your signature on the application.","k.sms.demo":"Demo code: 1234","k.sms.err":"Wrong code",
 "k.pay.h":"Payment","k.pay.sub":"100% prepayment to the organisation's bank account.","k.pay.box":"Secure payment by Halyk ePay","k.pay.note":"In the live version the bank's secure page opens here: any bank card, Apple Pay, Google Pay or the Halyk app. In the demo the payment is simulated.","k.pay.btn":"Pay {p} ₸","k.pay.wait":"Processing…",
 "k.ok.h":"Done! The places are yours.","k.ok.sub":"We've sent the contract and receipt to {m}.","k.ok.doc":"Open contract","k.ok.next":["Contract and receipt — by email and WhatsApp.","Upload the medical certificates before the start — we'll remind you.","3 days before the start — a checklist of what to bring."],
 "k.fill":"Fill with test data","k.fillf":"Attach test files",
 "v.req":"Required","v.iin":"This IIN looks wrong — you can continue in the demo","v.tel":"Format: +7 7XX XXX XX XX","v.mail":"Check the email","v.age":"Age for this programme: {a}–{b}","v.chk":"Tick the required consents","v.docs":"Attach the required documents","v.rep":"Confirm you are the legal representative",
 "p.orders":"Orders","p.rev":"Paid","p.campus":"Camp places left","p.etp":"ETP passes","p.occ":"Session occupancy","p.list":"Applications","p.none":"No applications yet. Make a purchase on the site — it shows up here right after payment.",
 "p.th":["Document no.","Programme","Child","Guardian","Phone","Amount","Payment","Medical","Document"],"p.paid":"Paid","p.wait":"Pending","p.open":"Open","p.csv":"Export to Excel (CSV)","p.reset":"Clear demo",
 "p.note":"Demo: applications are stored only in this browser. In the live version they go to the academy CRM on a server in Kazakhstan, with a notification to a manager."
}};

var lang=S.get("ka_lang","ru"); if(!T[lang])lang="ru";
function t(k,v){var s=T[lang][k];if(s===undefined)s=T.ru[k];if(s===undefined)return k;if(v&&typeof s==="string")for(var x in v)s=s.split("{"+x+"}").join(v[x]);return s}
function nf(n){return n.toLocaleString(lang==="ru"?"ru-RU":"en-US").replace(/,/g,lang==="ru"?" ":",")}
function fd(iso){var d=new Date(iso+"T00:00:00");return d.toLocaleDateString(lang==="ru"?"ru-RU":"en-GB",{day:"numeric",month:"long",year:"numeric"})}
function range(a,b){var A=new Date(a+"T00:00:00"),B=new Date(b+"T00:00:00");var o={day:"numeric",month:"long"};return A.toLocaleDateString(lang==="ru"?"ru-RU":"en-GB",o)+" – "+B.toLocaleDateString(lang==="ru"?"ru-RU":"en-GB",o)+" "+B.getFullYear()}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})}
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

/* ---------- estado ---------- */
var cart=S.get("ka_cart",[]);
var orders=S.get("ka_orders",[]);
function saveCart(){S.set("ka_cart",cart);renderCartBadge()}
function booked(id){var s=SHIFTS.filter(function(x){return x.id===id})[0];var n=orders.filter(function(o){return o.type==="campus"&&o.opt===id}).length;return Math.min(s.cap,s.base+n)}
function inCart(id){return cart.filter(function(c){return c.opt===id}).length}
function left(id){var s=SHIFTS.filter(function(x){return x.id===id})[0];return Math.max(0,s.cap-booked(id)-inCart(id))}
function itemPrice(it){if(it.type==="campus")return CAMPUS_PRICE;var p=PLANS.filter(function(x){return x.id===it.opt})[0];return p.total}
function itemName(it){if(it.type==="campus"){var s=SHIFTS.filter(function(x){return x.id===it.opt})[0];return s[lang]}var p=PLANS.filter(function(x){return x.id===it.opt})[0];return "ETP · "+p[lang]}
function itemSub(it){if(it.type==="campus"){var s=SHIFTS.filter(function(x){return x.id===it.opt})[0];return t("k.campus")+" · "+range(s.from,s.to)}var st=ETP_STARTS.filter(function(x){return x.id===it.start})[0]||ETP_STARTS[0];return t("k.etp")+" · "+t("k.start")+": "+st[lang]}
function cartTotal(){return cart.reduce(function(a,c){return a+itemPrice(c)},0)}

/* ---------- idioma ---------- */
function applyLang(){
  document.documentElement.lang=lang;
  $$("[data-i18n]").forEach(function(el){var v=t(el.getAttribute("data-i18n"));if(typeof v==="string")el.innerHTML=v});
  $$("[data-lang]").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-lang")===lang?"true":"false")});
  var lo=$("#link-offer"),lp=$("#link-priv");if(lo)lo.href="offer.html#"+lang;if(lp)lp.href="privacy.html#"+lang;
  renderShifts();renderPlans();renderCartBadge();
  if($("#capa-compra").classList.contains("abierta"))renderStep();
  if($("#capa-panel").classList.contains("abierta"))renderPanel();
}
$$("[data-lang]").forEach(function(b){b.addEventListener("click",function(){lang=b.getAttribute("data-lang");S.set("ka_lang",lang);applyLang()})});

/* ---------- listados ---------- */
function renderShifts(){
  var box=$("#lista-turnos");if(!box)return;
  box.innerHTML=SHIFTS.map(function(s){
    var l=left(s.id),pct=Math.round(booked(s.id)/s.cap*100),full=l<=0;
    return '<div class="turno"><div><b>'+esc(s[lang])+'</b><span>'+range(s.from,s.to)+'</span></div>'+
      '<div><div class="plazas'+(l<=5?' pocas':'')+'">'+(full?t("t.full"):t("t.left",{n:l,c:s.cap}))+'</div><div class="barra"><i style="width:'+pct+'%"></i></div></div>'+
      '<div class="precio-t">'+nf(CAMPUS_PRICE)+' ₸</div>'+
      '<button class="btn btn-azul" type="button" data-add-campus="'+s.id+'"'+(full?' disabled':'')+'>'+t("t.add")+'</button></div>';
  }).join("");
}
function renderPlans(){
  var box=$("#planes");if(!box)return;
  box.innerHTML=PLANS.map(function(p){
    var opts=ETP_STARTS.map(function(s){return '<option value="'+s.id+'">'+esc(s[lang])+'</option>'}).join("");
    return '<div class="plan'+(p.dest?' dest':'')+'">'+(p.dest?'<span class="chip" style="background:var(--azul);color:#fff;margin:0;align-self:flex-start">'+t("pl.pop")+'</span>':'')+
      '<h4>'+esc(p[lang])+'</h4><div class="p3">'+nf(p.total)+' ₸<small>'+t("pl.month",{p:nf(p.month)})+' · '+t("pl.tot",{p:nf(p.total)})+'</small></div>'+
      '<label style="font-size:14px;font-weight:600;display:grid;gap:6px">'+t("k.start")+'<select data-start="'+p.id+'" style="height:46px;border-radius:12px;border:1.5px solid var(--linea);padding:0 12px;font:inherit;font-size:16px;color:var(--azul);background:#fff">'+opts+'</select></label>'+
      '<button class="btn btn-azul" type="button" data-add-etp="'+p.id+'">'+t("pl.add")+'</button></div>';
  }).join("");
}

/* ---------- carrito ---------- */
function renderCartBadge(){
  var b=$("#cart-btn");if(!b)return;
  b.querySelector("b").textContent=cart.length;
  b.querySelector("span").textContent=t("nav.cart");
  b.style.display="inline-flex";
}
var toastT;
function toast(){
  var el=$("#toast");el.innerHTML='<span>'+t("toast.add")+'</span><button type="button" class="btn btn-blanco" style="padding:8px 18px;font-size:15px">'+t("toast.go")+'</button>';
  el.classList.add("on");el.querySelector("button").onclick=function(){el.classList.remove("on");openCheckout()};
  clearTimeout(toastT);toastT=setTimeout(function(){el.classList.remove("on")},4200);
}
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-add-campus]");
  if(a){if(left(a.getAttribute("data-add-campus"))<=0)return;cart.push({uid:Date.now()+""+Math.random(),type:"campus",opt:a.getAttribute("data-add-campus"),kid:{}});saveCart();renderShifts();toast();return}
  var b=e.target.closest("[data-add-etp]");
  if(b){var id=b.getAttribute("data-add-etp");var sel=$('[data-start="'+id+'"]');cart.push({uid:Date.now()+""+Math.random(),type:"etp",opt:id,start:sel?sel.value:ETP_STARTS[0].id,kid:{}});saveCart();toast();return}
  var c=e.target.closest("[data-comprar]");
  if(c){var w=c.getAttribute("data-comprar");var tgt=w==="campus"?$(".turnos"):$(".planes");tgt.scrollIntoView({behavior:"smooth",block:"start"});return}
  if(e.target.closest("[data-cerrar]")){closeLayer(e.target.closest(".capa"));return}
  if(e.target.classList&&e.target.classList.contains("capa")){closeLayer(e.target)}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var o=$$(".capa.abierta");if(o.length)closeLayer(o[o.length-1])}});
function openLayer(el){el.classList.add("abierta");document.body.classList.add("bloq");var f=el.querySelector(".cerrar");if(f)f.focus()}
function closeLayer(el){el.classList.remove("abierta");if(!$$(".capa.abierta").length)document.body.classList.remove("bloq")}

/* ---------- checkout ---------- */
var step=0,form=S.get("ka_form",{par:{},cons:{},files:{}});
function saveForm(){S.set("ka_form",form)}
function openCheckout(){step=0;$("#compra-titulo").textContent=t("k.title");openLayer($("#capa-compra"));renderStep()}
$("#cart-btn").addEventListener("click",openCheckout);

var AGE={campus:[7,16],etp:[5,12]};
function iinValid(v){
  if(!/^\d{12}$/.test(v))return false;
  var d=v.split("").map(Number),w1=[1,2,3,4,5,6,7,8,9,10,11],w2=[3,4,5,6,7,8,9,10,11,1,2];
  var s=0;for(var i=0;i<11;i++)s+=d[i]*w1[i];var c=s%11;
  if(c===10){s=0;for(i=0;i<11;i++)s+=d[i]*w2[i];c=s%11;if(c===10)return false}
  return c===d[11];
}
function makeIIN(dob,male){
  var p=dob.replace(/-/g,"").slice(2);var cent=dob.slice(0,2)==="20"?(male?5:6):(male?3:4);
  for(var r=0;r<10000;r++){var base=p+cent+String(1000+Math.floor(Math.random()*8999));
    var d=base.split("").map(Number),w1=[1,2,3,4,5,6,7,8,9,10,11],s=0;for(var i=0;i<11;i++)s+=d[i]*w1[i];var c=s%11;if(c<10)return base+c}
  return "";
}
function ageAt(dob,ref){var b=new Date(dob+"T00:00:00"),r=new Date(ref+"T00:00:00");var a=r.getFullYear()-b.getFullYear();if(r<new Date(r.getFullYear(),b.getMonth(),b.getDate()))a--;return a}
function refDate(it){if(it.type==="campus")return SHIFTS.filter(function(x){return x.id===it.opt})[0].from;return it.start||ETP_STARTS[0].id}

function campo(id,label,val,type,extra){
  return '<div class="campo'+(extra&&extra.ancho?' ancho':'')+'" data-campo="'+id+'"><label for="'+id+'">'+label+'</label><input id="'+id+'" name="'+id+'" type="'+(type||"text")+'" value="'+esc(val||"")+'"'+(extra&&extra.attrs?' '+extra.attrs:'')+'><span class="msg" aria-live="polite"></span></div>';
}
function setErr(id,msg,warn){var c=$('[data-campo="'+id+'"]');if(!c)return;c.classList.toggle("err",!!msg&&!warn);c.classList.toggle("warn",!!msg&&!!warn);c.querySelector(".msg").textContent=msg||""}

function renderStep(){
  var steps=t("k.steps"),n=steps.length;
  $("#progreso").innerHTML=steps.map(function(_,i){return '<i class="'+(i<=step?'ok':'')+'"></i>'}).join("");
  $("#progreso-txt").textContent=step<n?t("k.step",{i:step+1,n:n,s:steps[step]}):"";
  var body=$("#paso"),pie=$("#pie"),h="";
  var tot='<div class="total">'+t("k.total")+'<b>'+nf(cartTotal())+' ₸</b></div>';
  var nav=function(nextLabel,dis){return tot+'<div class="der">'+(step>0?'<button class="btn btn-linea" type="button" id="k-back">'+t("k.back")+'</button>':'')+'<button class="btn btn-azul" type="button" id="k-next"'+(dis?' disabled':'')+'>'+(nextLabel||t("k.next"))+'</button></div>'};

  if(step===0){
    if(!cart.length){
      h='<div class="exito" style="padding:40px 0"><h3 class="cond paso-h">'+t("k.empty")+'</h3><p class="paso-sub">'+t("k.empty2")+'</p><div class="btns"><button class="btn btn-azul" type="button" data-cerrar data-ir="campus">'+t("c.cta")+'</button><button class="btn btn-linea" type="button" data-cerrar data-ir="etp">'+t("e.cta")+'</button></div></div>';
      body.innerHTML=h;pie.innerHTML='';
      $$("[data-ir]",body).forEach(function(b){b.addEventListener("click",function(){var w=b.getAttribute("data-ir");setTimeout(function(){(w==="campus"?$(".turnos"):$(".planes")).scrollIntoView({behavior:"smooth"})},50)})});
      return;
    }
    h='<h3 class="cond paso-h">'+t("k.cart.h")+'</h3><p class="paso-sub">'+t("k.cart.sub")+'</p><div class="opciones">';
    cart.forEach(function(it,i){
      h+='<div class="opcion" style="cursor:default"><div class="t"><b>'+esc(itemName(it))+'</b><span>'+esc(itemSub(it))+'</span></div><div class="pr">'+nf(itemPrice(it))+' ₸</div><button type="button" class="cerrar" data-rm="'+i+'" aria-label="'+t("k.remove")+'" title="'+t("k.remove")+'">×</button></div>';
    });
    h+='</div><div class="btns" style="justify-content:flex-start;margin-top:16px"><button class="btn btn-linea" type="button" id="k-more" style="padding:10px 20px;font-size:15px">+ '+t("k.more")+'</button></div>';
    body.innerHTML=h;pie.innerHTML=nav();
    $$("[data-rm]",body).forEach(function(b){b.addEventListener("click",function(){cart.splice(+b.getAttribute("data-rm"),1);saveCart();renderShifts();renderStep()})});
    $("#k-more").addEventListener("click",function(){closeLayer($("#capa-compra"));$("#campus").scrollIntoView({behavior:"smooth"})});
  }
  else if(step===1){
    var p=form.par;
    h='<h3 class="cond paso-h">'+t("k.par.h")+'</h3><p class="paso-sub">'+t("k.par.sub")+'</p>'+
      '<button type="button" class="pista" id="k-fill" style="margin-bottom:18px;cursor:pointer">⚡ '+t("k.fill")+'</button>'+
      '<div class="campos">'+campo("p-fio",t("k.fio"),p.fio,"text",{ancho:1,attrs:'autocomplete="name"'})+campo("p-iin",t("k.iin"),p.iin,"text",{attrs:'inputmode="numeric" maxlength="12"'})+campo("p-idn",t("k.idn"),p.idn,"text",{attrs:'inputmode="numeric"'})+
      campo("p-tel",t("k.tel"),p.tel,"tel",{attrs:'autocomplete="tel" placeholder="+7 701 234 56 78"'})+campo("p-mail",t("k.mail"),p.mail,"email",{attrs:'autocomplete="email"'})+campo("p-addr",t("k.addr"),p.addr,"text",{ancho:1,attrs:'autocomplete="street-address"'})+'</div>'+
      '<label class="check" id="chk-rep" style="margin-top:16px"><input type="checkbox" id="p-rep"'+(p.rep?' checked':'')+'><span>'+t("k.rep")+'</span></label><div class="msg-err" id="err-rep"></div>';
    body.innerHTML=h;pie.innerHTML=nav();
    $("#k-fill").addEventListener("click",function(){
      form.par={fio:lang==="ru"?"Ахметова Айгерим Серикбаевна":"Aigerim Akhmetova",iin:makeIIN("1988-04-12",false),idn:"0"+String(40000000+Math.floor(Math.random()*9999999)),tel:"+7 701 234 56 78",mail:"aigerim.demo@example.kz",addr:lang==="ru"?"г. Алматы, пр. Достык 100, кв. 15":"100 Dostyk Ave, apt 15, Almaty",rep:true};
      cart.forEach(function(it,i){var y=it.type==="campus"?2015:2017;var dob=y+"-0"+(3+i)+"-1"+(i+2);it.kid={fio:(lang==="ru"?["Ахметов Арман","Ахметова Дана","Ахметов Тимур"]:["Arman Akhmetov","Dana Akhmetova","Timur Akhmetov"])[i%3],dob:dob,iin:makeIIN(dob,i%2===0)}});
      saveCart();saveForm();renderStep();
    });
  }
  else if(step===2){
    h='<h3 class="cond paso-h">'+t("k.kid.h")+'</h3><p class="paso-sub">'+t("k.kid.sub")+'</p>';
    cart.forEach(function(it,i){var k=it.kid||{};
      h+='<fieldset><legend>'+t("k.for")+': '+esc(itemName(it))+' <span class="chip" style="background:var(--gris)">'+nf(itemPrice(it))+' ₸</span></legend><div class="campos">'+
        campo("k"+i+"-fio",t("k.kfio"),k.fio,"text",{ancho:1})+campo("k"+i+"-dob",t("k.kdob"),k.dob,"date")+campo("k"+i+"-iin",t("k.kiin"),k.iin,"text",{attrs:'inputmode="numeric" maxlength="12"'})+'</div></fieldset>';
    });
    body.innerHTML=h;pie.innerHTML=nav();
  }
  else if(step===3){
    h='<h3 class="cond paso-h">'+t("k.doc.h")+'</h3><p class="paso-sub">'+t("k.doc.sub")+'</p><button type="button" class="pista" id="k-fillf" style="margin-bottom:18px;cursor:pointer">⚡ '+t("k.fillf")+'</button>';
    cart.forEach(function(it,i){
      var list=[["birth",t("k.d.birth"),1],["id1",t("k.d.id1"),1],["id2",t("k.d.id2"),it.type==="campus"?1:0],["med",it.type==="campus"?t("k.d.med"):t("k.d.medetp"),0]];
      h+='<fieldset><legend>'+esc((it.kid&&it.kid.fio)||itemName(it))+'</legend><div class="subir">';
      list.forEach(function(d){var key=i+"-"+d[0],f=form.files[it.uid+"-"+d[0]];
        h+='<div class="archivo'+(f?' ok':'')+'" data-doc="'+key+'" data-req="'+d[2]+'"><div class="t"><b>'+d[1]+' <span class="chip">'+(d[2]?t("k.req"):t("k.later"))+'</span></b><span>'+(f?"✓ "+esc(f):"JPG, PNG, PDF")+'</span></div>'+
          '<label for="f-'+key+'">'+(f?t("k.change"):t("k.attach"))+'</label><input id="f-'+key+'" type="file" accept="image/*,.pdf" data-up="'+it.uid+"-"+d[0]+'"></div>';
      });
      h+='</div></fieldset>';
    });
    h+='<div class="msg-err" id="err-docs"></div>';
    body.innerHTML=h;pie.innerHTML=nav();
    $$("[data-up]",body).forEach(function(inp){inp.addEventListener("change",function(){if(inp.files&&inp.files[0]){form.files[inp.getAttribute("data-up")]=inp.files[0].name;saveForm();renderStep()}})});
    $("#k-fillf").addEventListener("click",function(){cart.forEach(function(it){["birth","id1","id2"].forEach(function(k){form.files[it.uid+"-"+k]=k==="birth"?"svidetelstvo.jpg":(k==="id1"?"udostoverenie_1.jpg":"udostoverenie_2.jpg")})});saveForm();renderStep()});
  }
  else if(step===4){
    var hasC=cart.some(function(c){return c.type==="campus"}),hasE=cart.some(function(c){return c.type==="etp"});
    h='<h3 class="cond paso-h">'+t("k.of.h")+'</h3><p class="paso-sub">'+t("k.of.sub")+'</p><div class="oferta" tabindex="0">'+offerSummary(hasC,hasE)+'</div>';
    [["c1",1],["c2",1],["c3",1],["c4",0]].forEach(function(c){
      h+='<label class="check" data-chk="'+c[0]+'"><input type="checkbox" id="'+c[0]+'"'+(form.cons[c[0]]?' checked':'')+'><span>'+t("k."+c[0])+(c[1]?'':'<small>'+t("k.c4s")+'</small>')+'</span></label>';
    });
    h+='<div class="msg-err" id="err-chk"></div>';
    body.innerHTML=h;pie.innerHTML=nav();
    $$('.check input',body).forEach(function(i){i.addEventListener("change",function(){form.cons[i.id]=i.checked;saveForm()})});
  }
  else if(step===5){
    h='<h3 class="cond paso-h">'+t("k.sms.h")+'</h3><p class="paso-sub">'+t("k.sms.sub",{t:esc(form.par.tel||"")})+'</p><div class="sms">'+[0,1,2,3].map(function(i){return '<input inputmode="numeric" maxlength="1" aria-label="'+(i+1)+'" data-sms="'+i+'">'}).join("")+'</div><span class="pista">'+t("k.sms.demo")+'</span><div class="msg-err" id="err-sms"></div>';
    body.innerHTML=h;pie.innerHTML=nav();
    var ins=$$("[data-sms]",body);ins[0].focus();
    ins.forEach(function(inp,i){inp.addEventListener("input",function(){inp.value=inp.value.replace(/\D/g,"").slice(0,1);if(inp.value&&ins[i+1])ins[i+1].focus();if(ins.every(function(x){return x.value}))next()});
      inp.addEventListener("keydown",function(e){if(e.key==="Backspace"&&!inp.value&&ins[i-1])ins[i-1].focus()})});
  }
  else if(step===6){
    h='<h3 class="cond paso-h">'+t("k.pay.h")+'</h3><p class="paso-sub">'+t("k.pay.sub")+'</p><div class="resumen">';
    cart.forEach(function(it){h+='<div><span>'+esc(itemName(it))+' · '+esc((it.kid&&it.kid.fio)||"")+'</span><span>'+nf(itemPrice(it))+' ₸</span></div>'});
    h+='<div class="tot"><span>'+t("k.total")+'</span><span>'+nf(cartTotal())+' ₸</span></div></div>'+
      '<div class="pago-demo"><b>🔒 '+t("k.pay.box")+'</b><p>'+t("k.pay.note")+'</p><button class="btn btn-azul" type="button" id="k-pay" style="width:100%">'+t("k.pay.btn",{p:nf(cartTotal())})+'</button></div>';
    body.innerHTML=h;pie.innerHTML='<div class="total">'+t("k.total")+'<b>'+nf(cartTotal())+' ₸</b></div><div class="der"><button class="btn btn-linea" type="button" id="k-back">'+t("k.back")+'</button></div>';
    $("#k-pay").addEventListener("click",function(){var b=this;b.disabled=true;b.innerHTML='<span class="spinner"></span> '+t("k.pay.wait");setTimeout(pay,1700)});
  }
  else if(step===7){
    var last=S.get("ka_last",[]);
    h='<div class="exito"><div class="ok-ico" aria-hidden="true">✓</div><h3 class="cond paso-h">'+t("k.ok.h")+'</h3><p class="paso-sub">'+t("k.ok.sub",{m:esc(form.par.mail||"")})+'</p>';
    last.forEach(function(o){h+='<div style="margin:14px 0"><div class="num">№ '+esc(o.num)+'</div><div style="color:var(--texto2);font-size:15px">'+esc(o.name)+' · '+esc(o.kid.fio)+'</div><button class="btn btn-linea" type="button" data-doc-open="'+esc(o.num)+'" style="margin-top:10px;padding:9px 18px;font-size:15px">'+t("k.ok.doc")+'</button></div>'});
    h+='<div class="siguiente">'+t("k.ok.next").map(function(s,i){return '<div><b>'+(i+1)+'</b><span>'+s+'</span></div>'}).join("")+'</div></div>';
    body.innerHTML=h;pie.innerHTML='<span></span><div class="der"><button class="btn btn-linea" type="button" id="k-panel">'+t("f.panel")+'</button><button class="btn btn-azul" type="button" data-cerrar>'+t("k.close")+'</button></div>';
    $("#k-panel").addEventListener("click",function(){closeLayer($("#capa-compra"));openPanel()});
    $("#progreso-txt").textContent="";
  }
  var nb=$("#k-next"),bb=$("#k-back");
  if(nb)nb.addEventListener("click",next);
  if(bb)bb.addEventListener("click",function(){collect();step--;renderStep();$("#paso").scrollTop=0});
}

function collect(){
  if(step===1){["fio","iin","idn","tel","mail","addr"].forEach(function(k){var el=$("#p-"+k);if(el)form.par[k]=el.value.trim()});var r=$("#p-rep");if(r)form.par.rep=r.checked;saveForm()}
  if(step===2){cart.forEach(function(it,i){it.kid=it.kid||{};["fio","dob","iin"].forEach(function(k){var el=$("#k"+i+"-"+k);if(el)it.kid[k]=el.value.trim()})});saveCart()}
}
function validate(){
  var ok=true;
  if(step===1){
    var p=form.par;
    [["fio",p.fio],["idn",p.idn],["addr",p.addr]].forEach(function(f){var e=f[1]?"":t("v.req");setErr("p-"+f[0],e);if(e)ok=false});
    if(!p.iin){setErr("p-iin",t("v.req"));ok=false}else setErr("p-iin",iinValid(p.iin)?"":t("v.iin"),1);
    var tel=(p.tel||"").replace(/\D/g,"");if(!p.tel){setErr("p-tel",t("v.req"));ok=false}else setErr("p-tel",/^[78]7\d{9}$/.test(tel)?"":t("v.tel"),1);
    if(!p.mail){setErr("p-mail",t("v.req"));ok=false}else setErr("p-mail",/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.mail)?"":t("v.mail"),1);
    $("#err-rep").textContent=p.rep?"":t("v.rep");if(!p.rep)ok=false;
  }
  if(step===2){
    cart.forEach(function(it,i){var k=it.kid||{};
      var e1=k.fio?"":t("v.req");setErr("k"+i+"-fio",e1);if(e1)ok=false;
      if(!k.dob){setErr("k"+i+"-dob",t("v.req"));ok=false}else{var a=ageAt(k.dob,refDate(it)),r=AGE[it.type];setErr("k"+i+"-dob",(a<r[0]||a>r[1])?t("v.age",{a:r[0],b:r[1]}):"",1)}
      if(!k.iin){setErr("k"+i+"-iin",t("v.req"));ok=false}else setErr("k"+i+"-iin",iinValid(k.iin)?"":t("v.iin"),1);
    });
  }
  if(step===3){
    $$(".archivo").forEach(function(a){var req=a.getAttribute("data-req")==="1";var inp=a.querySelector("input");var has=!!form.files[inp.getAttribute("data-up")];a.classList.toggle("falta",req&&!has);if(req&&!has)ok=false});
    $("#err-docs").textContent=ok?"":t("v.docs");
  }
  if(step===4){
    ["c1","c2","c3"].forEach(function(c){var on=!!form.cons[c];$('[data-chk="'+c+'"]').classList.toggle("err",!on);if(!on)ok=false});
    $("#err-chk").textContent=ok?"":t("v.chk");
  }
  if(step===5){
    var code=$$("[data-sms]").map(function(x){return x.value}).join("");
    if(code!=="1234"){ok=false;$("#err-sms").textContent=t("k.sms.err");$$("[data-sms]").forEach(function(x){x.value=""});$("[data-sms]").focus()}
  }
  if(!ok){var f=$(".err input, .campo.err input, .archivo.falta, .check.err");if(f&&f.scrollIntoView)f.scrollIntoView({block:"center",behavior:"smooth"})}
  return ok;
}
function next(){collect();if(!validate())return;if(step===0&&!cart.length)return;step++;renderStep();$("#paso").scrollTop=0}

function pay(){
  var cnt=S.get("ka_cnt",{c:10,e:71});var now=new Date().toISOString();var made=[];
  cart.forEach(function(it){
    var num=it.type==="campus"?("АФОЛ27-"+(++cnt.c)):("АФ27/ETP-"+(++cnt.e));
    var o={num:num,type:it.type,opt:it.opt,start:it.start||null,name:itemName(it),sub:itemSub(it),price:itemPrice(it),kid:it.kid,par:form.par,photo:!!form.cons.c4,date:now,paid:true,med:!!form.files[it.uid+"-med"],
      files:["birth","id1","id2","med"].filter(function(k){return form.files[it.uid+"-"+k]})};
    orders.push(o);made.push(o);
  });
  S.set("ka_cnt",cnt);S.set("ka_orders",orders);S.set("ka_last",made);
  cart=[];saveCart();form.cons={};form.files={};saveForm();renderShifts();
  step=7;renderStep();
}

/* ---------- textos legales resumidos ---------- */
function offerSummary(hasC,hasE){
  var R=lang==="ru",h="";
  h+='<h4>'+(R?"Исполнитель":"Provider")+'</h4><p>ОО «SPORT ASSET MANAGEMENT», БИН 121240005887. '+(R?"Полный текст — в":"Full text in the")+' <a href="offer.html#'+lang+'" target="_blank" rel="noopener">'+(R?"Публичной оферте":"Public offer")+'</a>.</p>';
  if(hasC){h+='<h4>'+(R?"Кампус":"Camp")+'</h4><p>'+(R?"7 дней / 6 ночей на тренировочной базе (Талгарский р-н, с. Береке). Проживание 24/7 (2-местные номера), 5-разовое питание, ежедневные тренировки, бассейн, досуг, охрана. 340 000 ₸ с налогами, 100% предоплата.":"7 days / 6 nights at the training base (Talgar district, Bereke). 24/7 accommodation (twin rooms), 5 meals, daily training, pool, leisure, security. 340,000 ₸ incl. taxes, 100% prepayment.")+'</p>'+
    '<p>'+(R?"<b>Возврат</b> — по заявлению, только при документально подтверждённой болезни ребёнка или форс-мажоре; удерживается стоимость использованных дней, фактические расходы и один дополнительный день. При отчислении за грубое нарушение дисциплины возврат не производится.":"<b>Refunds</b> — on written request, only for documented illness of the child or force majeure; used days, actual costs and one extra day are withheld. No refund after expulsion for serious breaches of discipline.")+'</p>'+
    '<p>'+(R?"<b>До заезда</b>: справка 027-У или 075-У (без неё ребёнок не допускается), копия свидетельства о рождении, копии удостоверений обоих родителей.":"<b>Before arrival</b>: medical certificate 027-U or 075-U (no entry without it), copy of the birth certificate, copies of both parents' IDs.")+'</p>'}
  if(hasE){h+='<h4>ETP</h4><p>'+(R?"Групповые занятия по футболу, г. Алматы, ул. Абая 8в (КазНАИУ), вт и чт 18:00. Абонемент на 3 месяца (90 дней): 1 тренировка в неделю — 90 000 ₸, 2 — 150 000 ₸.":"Group football sessions, Almaty, 8v Abay Ave (KazNAIU), Tue and Thu 6 pm. 3-month pass (90 days): 1 session a week — 90,000 ₸, 2 — 150,000 ₸.")+'</p>'+
    '<p>'+(R?"<b>Возврат</b>: стоимость абонемента не возвращается; пропуски не компенсируются. Заморозка — до 7 календарных дней по заявлению. Расторжение — с уведомлением за 10 рабочих дней.":"<b>Refunds</b>: the pass is non-refundable and missed sessions are not compensated. It can be paused for up to 7 calendar days on request. Termination requires 10 working days' notice.")+'</p>'+
    '<p>'+(R?"<b>Медицина</b>: в течение первой недели — оригиналы ЭхоКГ, ЭКГ (в т.ч. с нагрузкой), УЗИ ОБП, ОАК, ОАМ, биохимии, анализа на гепатит B и допуск врача.":"<b>Medical</b>: within the first week — originals of echo, ECG (incl. stress ECG), abdominal ultrasound, blood and urine tests, biochemistry, hepatitis B test and a doctor's clearance.")+'</p>'}
  h+='<h4>'+(R?"Подписание":"Signing")+'</h4><p>'+(R?"Акцептом оферты является проставление отметок ниже, подтверждение кодом из SMS (простая электронная подпись) и оплата. Договор считается заключённым с момента поступления оплаты.":"Acceptance is made by ticking the boxes below, confirming with an SMS code (simple electronic signature) and paying. The contract is concluded upon receipt of payment.")+'</p>';
  return h;
}

/* ---------- documento generado ---------- */
function openDoc(num){
  var o=orders.filter(function(x){return x.num===num})[0];if(!o)return;
  var d=new Date(o.date),ds=d.toLocaleDateString("ru-RU",{day:"2-digit",month:"long",year:"numeric"});
  var isC=o.type==="campus",h='<div class="doc">';
  if(isC){var s=SHIFTS.filter(function(x){return x.id===o.opt})[0];
    h+='<h1>ДОГОВОР ПРИСОЕДИНЕНИЯ (ЗАЯВЛЕНИЕ-АКЦЕПТ) №'+esc(o.num)+'</h1><div class="c">к Публичной оферте на оказание услуг детского спортивного лагеря на базе Академии<br>г. Талгар · '+ds+'</div>'+
      '<h2>1. Стороны и данные участника</h2><p>Заказчик (законный представитель): '+esc(o.par.fio)+', ИИН '+esc(o.par.iin)+'</p><p>Воспитанник: '+esc(o.kid.fio)+', дата рождения '+esc(o.kid.dob)+', ИИН '+esc(o.kid.iin)+'</p>'+
      '<h2>2. Параметры программы и стоимость</h2><p>Программа: '+esc(s.ru)+' «Atlético de Madrid Kazakhstan» (полный пансион).</p><p>Локация: спортивная тренировочная база Академии (РК, Алматинская обл., Талгарский р-н, с. Береке).</p><p>Сроки: с '+fdRu(s.from)+' по '+fdRu(s.to)+' (7 дней / 6 ночей).</p><p>В стоимость входит: круглосуточное проживание (2-местные номера), 5-разовое питание, ежедневный учебно-тренировочный процесс, бассейн, культурно-досуговая программа и охрана.</p><p>Стоимость путёвки: '+nfRu(o.price)+' тенге, включая все применимые налоги. Оплачено 100%.</p>'+
      '<h2>3. Отмена и документы</h2><p>Возврат — по заявлению Заказчика исключительно при документально подтверждённой болезни ребёнка либо форс-мажоре, с удержанием стоимости использованных дней, фактически понесённых расходов и одного дополнительного дня. Документы к заезду: справка 027-У или 075-У, копия свидетельства о рождении, копии удостоверений обоих родителей.</p>';
  } else {var p=PLANS.filter(function(x){return x.id===o.opt})[0],st=ETP_STARTS.filter(function(x){return x.id===o.start})[0]||ETP_STARTS[0];
    h+='<h1>ДОГОВОР ПРИСОЕДИНЕНИЯ (ЗАЯВЛЕНИЕ-АКЦЕПТ) №'+esc(o.num)+'</h1><div class="c">к Публичной оферте на оказание услуг по проведению тренировок по футболу в рамках программы Early Talent Program (ETP)<br>г. Алматы · '+ds+'</div>'+
      '<h2>1. Стороны</h2><p>Заказчик (законный представитель): '+esc(o.par.fio)+', ИИН '+esc(o.par.iin)+', уд. личности № '+esc(o.par.idn)+', действующий в интересах несовершеннолетнего: '+esc(o.kid.fio)+' (ИИН '+esc(o.kid.iin)+').</p>'+
      '<h2>2. Абонемент</h2><p>'+esc(p.ru)+'. Срок действия: 90 дней с '+esc(st.ru)+'. Место: г. Алматы, ул. Абая 8в (КазНАИУ), вт и чт 18:00. Стоимость: '+nfRu(p.total)+' тенге. Оплачено 100%.</p>'+
      '<h2>3. Условия</h2><p>Стоимость абонемента возврату не подлежит, пропуски не компенсируются; заморозка до 7 календарных дней по заявлению. Оригиналы медицинских обследований и допуск врача предоставляются в течение первой тренировочной недели.</p>';
  }
  h+='<h2>4. Акцепт и согласия</h2><p>Заказчик подтверждает ознакомление и согласие с Публичной офертой, правилами и порядком возврата; отсутствие медицинских противопоказаний у ребёнка; согласие на обработку персональных данных. Согласие на фото-/видеосъёмку: '+(o.photo?"дано":"не дано")+'.</p>'+
    '<table><tr><td><b>ОРГАНИЗАЦИЯ</b><br>ОО «SPORT ASSET MANAGEMENT»<br>БИН 121240005887<br>АО «Народный Банк Казахстана», БИК HSBKKZKA<br>Фактический адрес: Алматинская обл., Талгарский р-н, с. Береке<br>office@samgt.kz · +7 700 171 2222</td>'+
    '<td><b>ЗАКАЗЧИК</b><br>'+esc(o.par.fio)+'<br>ИИН '+esc(o.par.iin)+'<br>'+esc(o.par.addr)+'<br>'+esc(o.par.tel)+' · '+esc(o.par.mail)+'</td></tr></table>'+
    '<div class="sello">Подписано простой электронной подписью (код SMS на '+esc(o.par.tel)+') · '+d.toLocaleString("ru-RU")+'<br>Оплата получена: '+nfRu(o.price)+' ₸ · Halyk ePay (демо) · документ сформирован автоматически</div></div>';
  $("#doc").innerHTML=h;openLayer($("#capa-doc"));
}
function fdRu(iso){return new Date(iso+"T00:00:00").toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}
function nfRu(n){return n.toLocaleString("ru-RU")}
document.addEventListener("click",function(e){var b=e.target.closest("[data-doc-open]");if(b)openDoc(b.getAttribute("data-doc-open"))});

/* ---------- panel ---------- */
function openPanel(){openLayer($("#capa-panel"));renderPanel()}
$("#abrir-panel").addEventListener("click",openPanel);
function renderPanel(){
  orders=S.get("ka_orders",[]);
  var rev=orders.reduce(function(a,o){return a+o.price},0),free=SHIFTS.reduce(function(a,s){return a+(s.cap-booked(s.id))},0),etp=orders.filter(function(o){return o.type==="etp"}).length;
  var h='<div class="kpis"><div class="kpi"><span>'+t("p.orders")+'</span><b>'+orders.length+'</b></div><div class="kpi"><span>'+t("p.rev")+'</span><b>'+nf(rev)+' ₸</b></div><div class="kpi"><span>'+t("p.campus")+'</span><b>'+free+'</b></div><div class="kpi"><span>'+t("p.etp")+'</span><b>'+etp+'</b></div></div>';
  h+='<div class="panel-h">'+t("p.occ")+'</div><div class="ocup">'+SHIFTS.map(function(s){var b=booked(s.id);return '<div><span>'+esc(s[lang])+'</span><div class="barra" style="margin:0"><i style="width:'+Math.round(b/s.cap*100)+'%"></i></div><b>'+b+'/'+s.cap+'</b></div>'}).join("")+'</div>';
  h+='<div class="panel-h">'+t("p.list")+'</div>';
  if(!orders.length){h+='<div class="pista" style="display:block;padding:22px">'+t("p.none")+'</div>'}
  else{var th=t("p.th");h+='<div class="tabla-wrap"><table><thead><tr>'+th.map(function(x){return '<th>'+x+'</th>'}).join("")+'</tr></thead><tbody>'+
    orders.slice().reverse().map(function(o){return '<tr><td><b>'+esc(o.num)+'</b></td><td>'+esc(o.name)+'</td><td>'+esc(o.kid.fio)+'</td><td>'+esc(o.par.fio)+'</td><td>'+esc(o.par.tel)+'</td><td>'+nf(o.price)+' ₸</td><td><span class="est pag">'+t("p.paid")+'</span></td><td><span class="est '+(o.med?'pag':'pen')+'">'+(o.med?"✓":t("p.wait"))+'</span></td><td><button type="button" data-doc-open="'+esc(o.num)+'">'+t("p.open")+'</button></td></tr>'}).join("")+'</tbody></table></div>'}
  h+='<div class="panel-acc"><button class="btn btn-azul" type="button" id="p-csv"'+(orders.length?'':' disabled')+'>'+t("p.csv")+'</button><button class="btn btn-linea" type="button" id="p-reset">'+t("p.reset")+'</button></div><p class="pista" style="margin-top:16px;display:block">'+t("p.note")+'</p>';
  $("#panel").innerHTML=h;
  $("#p-csv").addEventListener("click",csv);
  $("#p-reset").addEventListener("click",function(){orders=[];S.set("ka_orders",[]);S.set("ka_cnt",{c:10,e:71});renderPanel();renderShifts()});
}
function csv(){
  var rows=[["Номер","Программа","Ребёнок","Дата рождения","ИИН ребёнка","Представитель","ИИН представителя","Телефон","Email","Сумма","Оплата","Фото-согласие","Дата"]];
  orders.forEach(function(o){rows.push([o.num,o.name,o.kid.fio,o.kid.dob,o.kid.iin,o.par.fio,o.par.iin,o.par.tel,o.par.mail,o.price,"Оплачено",o.photo?"Да":"Нет",o.date])});
  var txt="﻿"+rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"'}).join(";")}).join("\r\n");
  var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/csv;charset=utf-8"}));a.download="zayavki_demo.csv";document.body.appendChild(a);a.click();a.remove();
}

/* ---------- vídeo ---------- */
(function(){var p=$(".player"),v=p&&p.querySelector(".clip");if(!v)return;
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){v.remove();return}
  v.addEventListener("playing",function(){p.classList.add("listo")},{once:true});
  v.addEventListener("error",function(){v.remove()});})();

applyLang();
})();
