const WA='996998008400',$=s=>document.querySelector(s);
const C=['Тон и основы','Макияж','Уход за лицом','Волосы'],CI={'Тон и основы':['🧴','#ffe3c9'],'Макияж':['💄','#ffd0e6'],'Уход за лицом':['🍊','#d6efff'],'Волосы':['💇','#e6f7b0']};
// [id, название, бренд, категория, цена, описание, эмодзи, цвет, метка]
const P=[
[1,'Матирующий тональный крем Only Matte, 30 мл','MIXIT','Тон и основы',940,'Матовое покрытие на весь день','🧴','#dfe6ec','Хит'],
[2,'Тональная основа Blazy Look, 30 мл','MIXIT','Тон и основы',998,'Лёгкая тональная основа','🧴','#e9dccd'],
[3,'BBFA','RoRoBell','Тон и основы',2650,'BB-основа для ровной кожи','🖤','#dcd9e6'],
[4,'Матирующие и увлажняющие тональные основы','Influence','Тон и основы',890,'Линейки Matte и Hydra, разные оттенки','🧴','#f3dfd2'],
[5,'Тональная основа NUDE Harmony','Belor Design','Тон и основы',580,'Бархатный финиш, UV-фильтр','✨','#f0e2cf','Хит'],
[6,'Тональная основа Forever Skin Glow, 30 мл','DIOR','Тон и основы',5424,'Сияющая основа 24 ч, SPF 20','👑','#d9dbe8'],
[7,'Тональная основа Fit Me Matte + Poreless','Maybelline','Тон и основы',530,'Матирует и скрывает поры','🧴','#f5e0cd'],
[8,'Тональная основа Affinitone','Maybelline','Тон и основы',560,'Для всех типов кожи','🧴','#fbeedd'],
[9,'Тональная основа Better Than Perfect','Eveline','Тон и основы',450,'Стойкая, увлажняющая','💜','#e6dcf7'],
[10,'Бронзер Powder Bronzer','Revolution','Макияж',620,'Запечённый бронзер для загара','🌞','#f8d9bd'],
[11,'Бронзер Sun Lover','Catrice','Макияж',620,'Запечённый бронзер с сиянием','🌞','#fbd5c4'],
[12,'Фиксатор макияжа Fix Quickly, 100 мл','TopFace','Макияж',370,'Спрей с алоэ вера для всех типов кожи','💨','#e3e3e8'],
[13,'Магнитные ресницы','Bilash','Макияж',null,'Заменят наращивание, крепятся магнитом','👁','#e8dcff','Новинка'],
[14,'Крем-сорбет Hyaluron Fresh & Plump, 85 мл','Garnier','Уход за лицом',null,'Увлажнение, гладкость и упругость кожи','💧','#cdeffa'],
[15,'Крем-сорбет Vitamin C Fresh & Bright, 85 мл','Garnier','Уход за лицом',null,'Сияние кожи и борьба с тусклостью','🍊','#fff1b8','Хит'],
[16,'Крем-сорбет Salicylic Fresh & Pure, 85 мл','Garnier','Уход за лицом',null,'Для жирной кожи, контроль блеска','🌿','#d2f5e6'],
[17,'Текстурирующая паста Bed Head Manipulator','TIGI','Волосы',1320,'Разделяет пряди, добавляет плотность','💇','#cdeffa'],
[18,'Желе Bed Head Gimme Grip, 400 мл','TIGI','Волосы',1485,'Прикорневой объём и текстура','💇','#bfe3fb'],
[19,'Солевой спрей Bed Head Salty Not Sorry','TIGI','Волосы',1750,'Текстурирующий спрей для волос','🌊','#d4f1ee'],
[20,'Сыворотка Bed Head Control Freak, 255 мл','TIGI','Волосы',1620,'Антифриз, борьба с пушистостью','✨','#e1f4c8']
].map(a=>({id:a[0],n:a[1],b:a[2],c:a[3],p:a[4],d:a[5],e:a[6],bg:a[7],t:a[8]}));
let cart={},fav=[],orders=[],prof={},cat='Все',view='home';
try{cart=JSON.parse(localStorage.getItem('ar_c')||'{}');fav=JSON.parse(localStorage.getItem('ar_f')||'[]');orders=JSON.parse(localStorage.getItem('ar_o')||'[]');prof=JSON.parse(localStorage.getItem('ar_p')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('ar_c',JSON.stringify(cart));localStorage.setItem('ar_f',JSON.stringify(fav));localStorage.setItem('ar_o',JSON.stringify(orders));localStorage.setItem('ar_p',JSON.stringify(prof))}catch(e){}};
const fmt=n=>n.toLocaleString('ru-RU')+' сом',price=x=>x.p==null?'<span class="pr q">Цена по запросу</span>':`<span class="pr">${fmt(x.p)}</span>`;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),1800)}
const card=x=>`<article class="c"><div class="pic" style="background:${x.bg}">${x.t?`<span class="tag">${x.t}</span>`:''}<button class="fv" data-f="${x.id}" aria-label="В избранное">${fav.includes(x.id)?'♥':'♡'}</button><span aria-hidden="true">${x.e}</span><em>${x.b}</em></div><div class="in"><h3>${x.n}</h3><p>${x.d}</p><div class="r">${price(x)}<button class="add" data-a="${x.id}">В корзину</button></div></div></article>`;
const list=(a,el,msg)=>$(el).innerHTML=a.length?a.map(card).join(''):`<div class="em">${msg}</div>`;
function home(){
$('#v-home').innerHTML=`<div class="hl">${[['🎀','Открытие','ig'],['💬','Вопрос-ответ','faq'],['💄','Косметика','Макияж'],['🌸','Уход за лицом','Уход за лицом'],['💆','Уход за волосами','Волосы']].map(h=>`<button data-hl="${h[2]}"><span>${h[0]}</span>${h[1]}</button>`).join('')}</div>
<div class="hero"><i class="a"></i><i class="b"></i><h1>Красота начинается с заботы о себе</h1><p>Магазин для всей семьи: уходовая косметика и бытовая химия в Бишкеке. Соберите заказ, мы подтвердим его в WhatsApp.</p><button class="btn" data-go="catalog">Смотреть каталог</button></div>
<div class="stats"><div><b>22,4 тыс.</b>подписчиков</div><div><b>2</b>магазина</div><div><b>9:30–23:30</b>ежедневно</div></div>
<div class="cats">${C.map(c=>`<button class="ct" style="background:${CI[c][1]}" data-cat="${c}"><span>${CI[c][0]}</span>${c}</button>`).join('')}</div>
<h2>Хиты и новинки</h2><div class="g">${P.filter(x=>x.t).map(card).join('')}</div>
<div class="box" style="margin-top:20px"><h3>Подберём уход для вашей кожи</h3><p>Расскажите о типе кожи, и консультант предложит подходящие средства.</p><a class="btn" style="color:#fff" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Здравствуйте! Подскажите, какой уход мне подойдёт. Мой тип кожи: ')}">Написать консультанту</a></div>
<h2 id="faq" style="margin-top:22px">Вопрос-ответ</h2><div class="box"><details><summary>Как сделать заказ?</summary><p>Добавьте товары в корзину и нажмите «Отправить заказ в WhatsApp». Консультант подтвердит наличие и детали.</p></details><details><summary>Как подобрать тон или уход?</summary><p>Напишите консультанту: расскажите о типе кожи, и мы предложим подходящие средства.</p></details><details><summary>Есть ли бытовая химия?</summary><p>Да, у нас есть бытовая химия и товары для дома. Наличие и цены уточняйте в WhatsApp или в магазине.</p></details><details><summary>Где вас найти и когда вы работаете?</summary><p>Джал-23, 67/1 и Ахматбека Суюмбаева 123/2. Ежедневно с 9:30 до 23:30.</p></details></div>
<div class="box"><h3>Магазины</h3><p><a target="_blank" rel="noopener" href="https://instagram.com/aruustore_kg">Instagram @aruustore_kg</a> · <a target="_blank" rel="noopener" href="https://wa.me/${WA}">WhatsApp</a></p><p>Джал-23, 67/1 · <a target="_blank" rel="noopener" href="https://2gis.kg/bishkek/search/%D0%94%D0%B6%D0%B0%D0%BB-23%2C%2067%2F1">2GIS</a></p><p>Ахматбека Суюмбаева 123/2 · <a target="_blank" rel="noopener" href="https://2gis.kg/bishkek/search/%D0%90%D1%85%D0%BC%D0%B0%D1%82%D0%B1%D0%B5%D0%BA%D0%B0%20%D0%A1%D1%83%D1%8E%D0%BC%D0%B1%D0%B0%D0%B5%D0%B2%D0%B0%20123%2F2">2GIS</a></p><p>Ежедневно 9:30–23:30</p></div>`}
function chips(){$('#chips').innerHTML=['Все',...C].map(c=>`<button class="chip" aria-pressed="${c===cat}" data-cat="${c}">${c}</button>`).join('')}
function catalog(){chips();const s=$('#sort').value;let l=P.filter(x=>cat==='Все'||x.c===cat);
if(s==='asc')l=[...l].sort((a,b)=>(a.p??1e9)-(b.p??1e9));if(s==='desc')l=[...l].sort((a,b)=>(b.p??-1)-(a.p??-1));list(l,'#cg','Здесь пока пусто')}
function search(){const q=$('#q').value.trim().toLowerCase();list(P.filter(x=>!q||(x.n+' '+x.b+' '+x.d+' '+x.c).toLowerCase().includes(q)),'#sg','Ничего не нашли. Попробуйте бренд или другое слово.')}
const favs=()=>list(P.filter(x=>fav.includes(x.id)),'#fg','Пока пусто. Нажмите ♡ у товара, который понравился.');
function cartV(){
const ids=Object.keys(cart).filter(k=>cart[k]>0);let tot=0,un=false;
if(!ids.length){$('#v-cart').innerHTML='<h2>Корзина</h2><div class="em">Корзина пуста. Добавьте товары из каталога.</div><p style="text-align:center"><button class="btn" data-go="catalog">В каталог</button></p>';return}
const rows=ids.map(k=>{const x=P.find(p=>p.id==k);if(x.p==null)un=true;else tot+=x.p*cart[k];return `<div class="it"><div class="e" style="background:${x.bg}">${x.e}</div><div><b>${x.b} · ${x.n}</b><div class="qt"><button data-m="${k}" aria-label="Меньше">−</button><span>${cart[k]}</span><button data-p="${k}" aria-label="Больше">+</button></div></div><div><b>${x.p==null?'по запросу':fmt(x.p*cart[k])}</b><button class="rm" data-r="${k}" aria-label="Удалить">🗑</button></div></div>`}).join('');
$('#v-cart').innerHTML=`<h2>Корзина</h2>${rows}<div class="tot"><span>Итого</span><span>${fmt(tot)}</span></div>${un?'<p style="color:var(--mute);font-size:13px">Цену товаров «по запросу» уточнит консультант в WhatsApp.</p>':''}
<div class="f"><input id="nm" placeholder="Ваше имя" autocomplete="name" value="${prof.name||''}"><input id="ph" type="tel" placeholder="Телефон" autocomplete="tel" value="${prof.phone||''}"><select id="wy"><option>Самовывоз: Джал-23, 67/1</option><option>Самовывоз: Суюмбаева 123/2</option><option>Доставка по адресу</option></select><input id="ad" placeholder="Адрес доставки" value="${prof.addr||''}" hidden><textarea id="nt" rows="2" placeholder="Комментарий к заказу"></textarea><div class="err" id="er" role="alert"></div><button class="btn" id="send">Отправить заказ в WhatsApp</button></div>`}
function order(){
const ids=Object.keys(cart).filter(k=>cart[k]>0);let tot=0,n=0;
const L=ids.map(k=>{const x=P.find(p=>p.id==k);n+=cart[k];if(x.p!=null)tot+=x.p*cart[k];return `• ${x.b} ${x.n} × ${cart[k]}${x.p==null?' (цену уточнить)':' = '+fmt(x.p*cart[k])}`});
const nm=$('#nm').value.trim(),ph=$('#ph').value.trim(),wy=$('#wy').value,ad=$('#ad').value.trim(),nt=$('#nt').value.trim();
let e=!nm?'Укажите имя':ph.replace(/\D/g,'').length<9?'Укажите телефон':($('#wy').selectedIndex===2&&!ad)?'Укажите адрес доставки':'';
$('#er').textContent=e;if(e)return null;
prof={...prof,name:nm,phone:ph,addr:ad||prof.addr};
return{m:`Здравствуйте! Хочу сделать заказ:\n${L.join('\n')}\n\nИтого: ${fmt(tot)}\nИмя: ${nm}\nТелефон: ${ph}\nПолучение: ${wy}${ad?'\nАдрес: '+ad:''}${nt?'\nКомментарий: '+nt:''}`,tot,n}}
function profV(){
$('#v-prof').innerHTML=`<div class="box" style="text-align:center"><div class="av"><b>ARUU</b><i>store</i></div><h3>Магазин для всей семьи</h3><p style="margin:0;color:var(--mute)">Бытовая химия &amp; уходовая косметика<br>Всё для вас и вашей семьи</p></div><h2>Профиль</h2><div class="box"><h3>Мои данные</h3><div class="f" style="margin-top:0"><input id="pn" placeholder="Имя" value="${prof.name||''}"><input id="pp" type="tel" placeholder="Телефон" value="${prof.phone||''}"><input id="pa" placeholder="Адрес доставки" value="${prof.addr||''}"><button class="btn" id="ps">Сохранить</button></div><p style="font-size:12px;color:var(--mute)">Данные хранятся только на этом устройстве и подставляются в заказ.</p></div>
<div class="box"><h3>Мои заказы</h3>${orders.length?orders.slice(-5).reverse().map(o=>`<p>${o.d} · ${o.n} шт. · ${fmt(o.t)}</p>`).join(''):'<p style="color:var(--mute)">Пока нет заказов.</p>'}</div>
<div class="box"><h3>Связь с нами</h3><p><a target="_blank" rel="noopener" href="https://wa.me/${WA}">WhatsApp +996 998 008 400</a></p><p><a target="_blank" rel="noopener" href="https://instagram.com/aruustore_kg">Instagram @aruustore_kg</a></p></div>
<button class="btn" id="th" style="background:var(--blush);color:var(--pink)">Сменить тему</button>`}
const R={home,catalog,search,fav:favs,cart:cartV,prof:profV};
function go(v){view=v;document.querySelectorAll('.v').forEach(e=>e.classList.toggle('act',e.id==='v-'+v));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('act',b.dataset.go===v));R[v]();window.scrollTo(0,0);if(v==='search')$('#q').focus()}
function badges(){const n=Object.values(cart).reduce((a,b)=>a+b,0);$('#bc').textContent=n||'';$('#bf').textContent=fav.length||'';save()}
function refresh(){R[view]();badges()}
document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
if(d.go)go(d.go);if(d.cat){cat=d.cat;go('catalog')}
if(d.hl){if(d.hl==='ig'){const a=document.createElement('a');a.href='https://instagram.com/aruustore_kg';a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}else if(d.hl==='faq')$('#faq').scrollIntoView({behavior:'smooth'});else{cat=d.hl;go('catalog')}}
if(d.a){cart[d.a]=(cart[d.a]||0)+1;badges();toast('Добавлено в корзину')}
if(d.p){cart[d.p]++;refresh()}if(d.m){if(--cart[d.m]<1)delete cart[d.m];refresh()}if(d.r){delete cart[d.r];refresh()}
if(d.f){const i=+d.f;fav=fav.includes(i)?fav.filter(x=>x!==i):[...fav,i];refresh()}
if(t.id==='send'){const o=order();if(!o)return;const a=document.createElement('a');a.href=`https://wa.me/${WA}?text=${encodeURIComponent(o.m)}`;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();orders.push({d:new Date().toLocaleDateString('ru-RU'),t:o.tot,n:o.n});cart={};badges();go('cart');toast('Подтвердите отправку в WhatsApp')}
if(t.id==='ps'){prof={name:$('#pn').value.trim(),phone:$('#pp').value.trim(),addr:$('#pa').value.trim()};save();toast('Данные сохранены')}
if(t.id==='th'){const r=document.documentElement,dk=getComputedStyle(r).getPropertyValue('--bg').trim()==='#1d0f19';r.dataset.theme=dk?'light':'dark'}});
document.addEventListener('change',e=>{if(e.target.id==='wy')$('#ad').hidden=e.target.selectedIndex!==2;if(e.target.id==='sort')catalog()});
$('#q').oninput=search;
function status(){const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Bishkek',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),m=+p[0].value%24*60+ +p[2].value,o=m>=570&&m<1410,s=$('#st');s.className='st'+(o?' on':'');s.querySelector('span').textContent=o?'Открыто до 23:30':'Откроемся в 9:30'}
status();setInterval(status,60000);badges();go('home');