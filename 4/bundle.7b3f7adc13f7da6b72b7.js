(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",d="quarter",u="year",c="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:c,h:r,m:s,s:i,ms:n,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",$={};$[y]=h;var b=function(e){return e instanceof w},g=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},D=_;D.l=g,D.i=b,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function h(e){this.$L=g(e.locale,null,!0),this.parse(e)}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return M(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<M(e)},m.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,d=!!D.u(t)||t,f=D.p(e),p=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return d?i:i.endOf(a)},v=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return d?p(1,0):p(31,11);case l:return d?p(1,m):p(0,m+1);case o:var $=this.$locale().weekStart||0,b=(h<$?h+7:h)-$;return p(d?_-b:_+(6-b),m);case a:case c:return v(y+"Hours",0);case r:return v(y+"Minutes",1);case s:return v(y+"Seconds",2);case i:return v(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,d=D.p(e),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[c]=f+"Date",o[l]=f+"Month",o[u]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[d],v=d===a?this.$D+(t-this.$W):t;if(d===l||d===u){var h=this.clone().set(c,1);h.$d[p](v),h.init(),this.$d=h.set(c,Math.min(this.$D,h.daysInMonth())).$d}else p&&this.$d[p](v);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[D.p(e)]()},m.add=function(n,d){var c,f=this;n=Number(n);var p=D.p(d),v=function(e){var t=M(f);return D.w(t.date(t.date()+Math.round(e*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===a)return v(1);if(p===o)return v(7);var h=(c={},c[s]=e,c[r]=t,c[i]=1e3,c)[p]||1,m=this.$d.getTime()+n*h;return D.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,d=n.months,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},c=function(e){return D.s(r%12||12,e,"0")},p=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:u(n.monthsShort,o,d,3),MMMM:u(d,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:c(1),hh:c(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(v,(function(e,t){return t||h[e]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,c,f){var p,v=D.p(c),h=M(n),m=(h.utcOffset()-this.utcOffset())*e,_=this-h,y=D.m(this,h);return y=(p={},p[u]=y/12,p[l]=y,p[d]=y/3,p[o]=(_-m)/6048e5,p[a]=(_-m)/864e5,p[r]=_/t,p[s]=_/e,p[i]=_/1e3,p)[v]||_,f?y:D.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return $[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),T=w.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",u],["$D",c]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,w,M),e.$i=!0),M},M.locale=g,M.isDayjs=b,M.unix=function(e){return M(1e3*e)},M.en=$[y],M.Ls=$,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<ul class="trip-events__list"></ul>\n    '}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=n(484),o=n.n(a);function l(e){return e[Math.floor(Math.random()*e.length)]}function d(e=10,t=100){return Math.floor(e+Math.random()*(t+1-e))}class u{constructor({point:e}){this.point=e}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,isFavorite:r,offers:a,type:l}=e;return`<li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${o()(n).format("YYYY-MM-DD")}">${o()(n).format("MMM DD")}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${l}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${l} ${s.name}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${o()(n).format("YYYY-MM-DD")}">${o()(n).format("hh:mm A")}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${o()(i).format("YYYY-MM-DD")}">${o()(i).format("hh:mm A")}</time>\n        </p>\n        <p class="event__duration">${d=n,u=i,o()(u).diff(d,"d")}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${t}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        <li class="event__offer">\n          <span class="event__offer-title">${a.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${a.price}</span>\n        </li>\n      </ul>\n      <button class="event__favorite-btn ${r?"event__favorite-btn--active":""}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n    </li>`;var d,u}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const c=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class f{constructor({point:e}){this.point=e}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,offers:r,type:a}=e,l=r.find((t=>t.type===e.type));return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="${id}7" height="${id}7" src="img/icons/${a}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n          ${c.map((e=>`<div class="event__type-item">\n              <input id="event-type-${e}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n              <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${id}">${e[0].toUpperCase()}</label>\n              </div>`)).join("")}\n\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-${id}">\n            ${a[0].toUpperCase()}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${s.name}" list="destination-list-${id}">\n          <datalist id="destination-list-${id}">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-${id}">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${o()(n).format("DD/MM/YY h:mm A")}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-${id}">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${o()(i).format("DD/MM/YY h:mm A")}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-${id}">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${t}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${l.offers.map((t=>{const n=e.offers.includes(t.id)?"checked":"";return`<div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${r.title}-${r.id}" type="checkbox" name="event-offer-${r.title}" ${n}>\n                <label class="event__offer-label" for="event-offer-${r.title}-${r.id}">\n                  <span class="event__offer-title">${r.title[0].toUpperCase()}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${r.price}</span>\n                </label>\n              </div>`})).join("")}\n\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${s.description}</p>\n\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n            ${s.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}">`)).join("")}\n            </div>\n          </div>\n\n        </section>\n      </section>\n    </form>\n    </li>`}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const p=[{id:1,basePrice:1100,dateFrom:new Date("2019-07-10T22:55:56.845Z"),dateTo:new Date("2019-07-11T11:22:13.375Z"),destination:1,isFavorite:!1,offers:[1,2,3],type:"taxi"},{id:2,basePrice:1700,dateFrom:new Date("2019-08-11T22:55:56.845Z"),dateTo:new Date("2019-08-19T11:22:13.375Z"),destination:2,isFavorite:!1,offers:[4,5,6],type:"bus"},{id:3,basePrice:700,dateFrom:new Date("2019-09-09T22:55:56.845Z"),dateTo:new Date("2019-09-15T11:22:13.375Z"),destination:3,isFavorite:!1,offers:[7,8,9],type:"train"},{id:4,basePrice:2100,dateFrom:new Date("2019-09-09T22:55:56.845Z"),dateTo:new Date("2019-09-15T11:22:13.375Z"),destination:4,isFavorite:!1,offers:[10,11],type:"ship"},{id:5,basePrice:900,dateFrom:new Date("2019-09-09T22:55:56.845Z"),dateTo:new Date("2019-09-15T11:22:13.375Z"),destination:5,isFavorite:!1,offers:[],type:"drive"}];function v(){return l(p)}const h=[{type:"taxi",offers:[{id:1,title:"taxi offer 1",price:d()},{id:2,title:"taxi offer 2",price:d()},{id:3,title:"taxi offer 3",price:d()}]},{type:"bus",offers:[{id:4,title:"bus offer 1",price:d()},{id:5,title:"bus offer 2",price:d()},{id:6,title:"bus offer 3",price:d()}]},{type:"train",offers:[{id:7,title:"train offer 1",price:d()},{id:8,title:"train offer 2",price:d()},{id:9,title:"train offer 3",price:d()}]},{type:"ship",offers:[{id:10,title:"ship offer 1",price:d()},{id:11,title:"ship offer 2",price:d()}]},{type:"drive",offers:[{id:12,title:"drive offer 1",price:d()},{id:13,title:"drive offer 2",price:d()}]},{type:"flight",offers:[{id:14,title:"flight offer 1",price:d()},{id:15,title:"flight offer 2",price:d()}]},{type:"chek-in",offers:[{id:16,title:"check-in offer 1",price:d()},{id:17,title:"check-in offer 2",price:d()}]},{type:"sightseeing",offers:[{id:18,title:"sightseeing offer 1",price:d()},{id:19,title:"sightseeing offer 2",price:d()}]},{type:"restaurant",offers:[{id:20,title:"restaurant offer 1",price:d()},{id:21,title:"restaurant offer 2",price:d()}]}],m=[{id:1,description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:`https://loremflickr.com/248/152?random=${l()}`,description:"Chamonix"}]},{id:2,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.",name:"Amsterdam",pictures:[{src:`https://loremflickr.com/248/152?random=${l()}`,description:"Amsterdam"}]},{id:3,description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.",name:"Geneva",pictures:[{src:`https://loremflickr.com/248/152?random=${l()}`,description:"Geneva"}]},{id:4,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",name:"Paris",pictures:[{src:`https://loremflickr.com/248/152?random=${l()}`,description:"Paris"}]},{id:5,description:"Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",name:"London",pictures:[{src:`https://loremflickr.com/248/152?random=${l()}`,description:"London"}]}],_=document.querySelector(".trip-events"),y=document.querySelector(".trip-controls__filters"),$=new class{points=Array.from({length:3},v);offers=function(){return l(h)}();destinations=function(){return l(m)}();getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}},b=new class{listComponent=new r;constructor({listContainer:e,filterContainer:t,pointsModel:n}){this.listContainer=e,this.filterContainer=t,this.pointsModel=n}init(){this.boardPoints=[...this.pointsModel.getPoints()],this.offersList=[...this.pointsModel.getOffers()],t(new s,this.listContainer),t(new i,this.filterContainer),t(this.listComponent,this.listContainer),t(new f({point:this.boardPoints[0],offers:this.offersList}),this.listComponent.getElement());for(let e=1;e<this.boardPoints.length;e++){const n=this.offersList.find((t=>t.type===this.boardPoints[e].type));t(new u({point:this.boardPoints[e],offers:n}),this.listComponent.getElement())}}}(_,y,$);b.init()})()})();
//# sourceMappingURL=bundle.7b3f7adc13f7da6b72b7.js.map