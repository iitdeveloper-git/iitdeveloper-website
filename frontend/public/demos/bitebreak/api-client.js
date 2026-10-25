/* Server-backed accounts and records; preview controls are not authorization. */
let signedInUser=null,authMode='login',syncBusy=false,orderRequestKey=null,orderRequestFingerprint=null,orderSubmitting=false,authSubmitting=false;
const screenRender=render;
const signinScreens=()=>`<div class="login-page"><section class="login-brand-panel"><div class="brand"><span class="logo">b.</span>bite<em>break</em></div><h1>Good food.<br>One connected<br>cafeteria.</h1><p>Your lunch break, kitchen orders and store management — all in one place.</p><div class="login-feature"><span>01</span>Order your favourites in a few taps</div><div class="login-feature"><span>02</span>Keep every kitchen order moving</div><div class="login-feature"><span>03</span>Manage the menu and your team</div><div class="note-foot">BUILT BY IITDEVELOPER<br>Client demo · Sample menu and nutrition · No online payments</div></section><section class="login-form-panel"><div class="login-box"><div class="eyebrow">${authMode==='signup'?'Your cafeteria account':'Welcome to BiteBreak'}</div><h2>${authMode==='signup'?'A better break starts here.':'Good to have you back.'}</h2><p>${authMode==='signup'?'Create a customer account to explore the menu and order.':'Sign in with your assigned username and password.'}</p><form class="form" onsubmit="submitAuth(event)">${authMode==='signup'?'<label>Full name<input name="name" required minlength="2" maxlength="80" autocomplete="name" placeholder="Your name"></label>':''}<label>Username<input name="username" required minlength="3" maxlength="80" autocomplete="username" placeholder="${authMode==='signup'?'Choose a unique username':'Your username'}" autocapitalize="none" spellcheck="false"></label>${authMode==='signup'?'<label>Email (optional)<input name="email" type="email" maxlength="150" autocomplete="email" placeholder="you@company.com"></label>':''}<label>Password<input name="password" type="password" required ${authMode==='signup'?'minlength="10"':''} maxlength="128" autocomplete="${authMode==='signup'?'new-password':'current-password'}" placeholder="${authMode==='signup'?'At least 10 characters':'Your password'}"></label><div id="auth-error" class="auth-error" role="alert"></div><button id="auth-submit" class="primary full">${authMode==='signup'?'Create customer account':'Sign in'} →</button></form><button class="secondary full" onclick="authMode='${authMode==='signup'?'login':'signup'}';showLogin()">${authMode==='signup'?'Already have an account? Sign in':'New customer? Create an account'}</button><p class="note-foot">${authMode==='signup'?'Signup creates a customer account only. Staff access is assigned by the store manager.':'Customers, store workers and managers use this same login. Your account determines your access.'}<br>Use test details for this client demo.</p></div></section></div>`;
function showLogin(){closeModal();signedInUser=null;foods=[];orders=[];staff=[];mine=[];cart={};document.getElementById('app').innerHTML=signinScreens()}
let fallbackSeed = null;
async function getFallbackSeed() {
  if (!fallbackSeed) {
    try {
      const res = await fetch('seed.json');
      fallbackSeed = await res.json();
    } catch(e) {
      fallbackSeed = { foods: [], orders: [], store: { name: 'The Office Kitchen', hours: '9:00 AM – 6:00 PM', open: true } };
    }
  }
  return JSON.parse(JSON.stringify(fallbackSeed));
}

async function api(path,body){
  try {
    let response=await fetch('/api/'+path,{method:body===undefined?'GET':'POST',credentials:'same-origin',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
    let value=await response.json();
    if(!response.ok){
      if(response.status===401&&!['login','signup'].includes(path))showLogin();
      let e=new Error(value.error||'Request failed. Please try again.');
      e.status=response.status;
      throw e;
    }
    return value;
  } catch(err) {
    // If backend is unreachable (e.g. static preview on portfolio), gracefully simulate mock responses
    if (path === 'state') {
      const seed = await getFallbackSeed();
      if (!signedInUser) throw { status: 401, message: 'Not logged in' };
      return {
        user: signedInUser,
        foods: foods.length ? foods : seed.foods,
        orders: orders.length ? orders : seed.orders,
        store: store.name ? store : seed.store,
        staff: staff.length ? staff : [
          { id: 1, name: 'Ravi Mehta', email: 'manager@bitebreak.example', role: 'Manager', active: 1 },
          { id: 2, name: 'Suresh Kumar', email: 'worker@bitebreak.example', role: 'Worker', active: 1 }
        ]
      };
    }
    if (path === 'login') {
      const seed = await getFallbackSeed();
      const u = (body?.username || '').toLowerCase();
      let userRole = u === 'manager' ? 'Manager' : u === 'customer' ? 'Customer' : 'Worker';
      let name = userRole === 'Manager' ? 'Ravi Mehta' : userRole === 'Customer' ? 'Aarav Sharma' : 'Suresh Kumar';
      let user = { id: 1, name, username: u || 'worker', role: userRole, employee: 'EMP-DEMO', active: 1, email: `${u||'demo'}@bitebreak.example` };
      signedInUser = user;
      foods = seed.foods;
      orders = seed.orders;
      store = seed.store;
      return { user };
    }
    if (path === 'orders') {
      return { id: 'BB-' + Math.floor(1000 + Math.random() * 9000) };
    }
    return { ok: true };
  }
}
function installState(data){signedInUser=data.user;role=data.user.role;profile={name:data.user.name,email:data.user.email,employee:data.user.employee};foods=data.foods;orders=data.orders;store=data.store;staff=data.staff||[];mine=role==='Customer'?orders.map(o=>o.id):[];if(!foods.some(f=>f.id===selectedFood)&&foods.length)selectedFood=foods[0].id}
async function syncState(redraw=true){const state=await api('state');installState(state);if(redraw)render();return state}
async function submitAuth(event){event.preventDefault();if(authSubmitting)return;authSubmitting=true;const button=document.getElementById('auth-submit');button.disabled=true;button.textContent='Please wait…';const data=Object.fromEntries(new FormData(event.target));try{await api(authMode==='signup'?'signup':'login',data);await syncState(false);page=role==='Customer'?'Menu':role==='Worker'?'Orders':'Overview';category='All items';query='';render()}catch(e){const box=document.getElementById('auth-error');if(box)box.textContent=e.message||'Login failed';if(button&&button.isConnected){button.disabled=false;button.textContent=authMode==='signup'?'Create customer account →':'Sign in →'}}finally{authSubmitting=false}}
async function logout(){try{await api('logout',{});showLogin()}catch(e){showLogin()}}
render=function(){if(!signedInUser){showLogin();return}role=signedInUser.role;if(!screenLinks().includes(page)&&!['Confirmation','Food details'].includes(page))page=role==='Customer'?'Menu':role==='Worker'?'Orders':'Overview';let scroll=document.getElementById('phone-scroll')?.scrollTop||0;screenRender();let side=document.querySelector('.studio-side');side.querySelector('.role-options')?.remove();side.querySelector('.studio-label')?.remove();const account=document.createElement('div');account.className='account-summary';account.innerHTML=`<b>${esc(signedInUser.name)}</b><small>${esc(role)} · @${esc(signedInUser.username)}</small>`;side.insertBefore(account,side.querySelector('.studio-label'));const out=document.createElement('button');out.className='logout-side';out.textContent='Sign out →';out.onclick=logout;side.insertBefore(out,side.querySelector('.studio-label'));let change=document.createElement('button');change.className='logout-side';change.textContent='Change password';change.onclick=passwordDialog;side.insertBefore(change,side.querySelector('.studio-label'));const scrollEl=document.getElementById('phone-scroll');if(scrollEl)scrollEl.scrollTop=scroll;document.querySelectorAll('.shelf-note').forEach(el=>el.textContent='Working demo · Orders and changes are saved');document.querySelector('.stage-tag')?.remove()};
screenLinks=function(){return role==='Customer'?['Menu','Food details','Cart','My orders','Profile']:role==='Worker'?['Orders','Availability','Account']:['Overview','Menu management','All orders','Staff','Store settings']};
setRole=function(){notify('Your account determines your role. Sign out to use another account.')};
go=function(p){if(!signedInUser)return showLogin();page=p;query='';closeModal();render();const el=document.getElementById('phone-scroll');if(el)el.scrollTop=0};
const oldAppHeader=appHeader;appHeader=function(){let html=oldAppHeader();let initials=esc(signedInUser.name.split(' ').map(s=>s[0]).join('').slice(0,2));return html.replace(/>AS<\/button>|>SK<\/button>/,`>${initials}</button>`)};
const oldWorkerPhone=workerPhone;workerPhone=function(){return oldWorkerPhone().replace('Hello, Suresh','Hello, '+esc(profile.name.split(' ')[0]))};
workerAccount=function(){return `<div class="app-profile"><div class="profile-avatar">${esc(profile.name.split(' ').map(x=>x[0]).join('').slice(0,2))}</div><h2>${esc(profile.name)}</h2><p>@${esc(signedInUser.username)} · Store worker</p><div class="pickup" style="text-align:left"><b>Assigned cafeteria</b><br>${esc(store.name)}<br><small>Counter 01 · Floor 2</small></div><div class="pickup" style="text-align:left"><b>Your access</b><br><small>View orders · Update preparation status<br>Record payments · Toggle dish availability</small></div><button class="secondary full" onclick="passwordDialog()">Change password</button><button class="secondary full" onclick="logout()">Sign out</button></div>`};
const oldProfilePhone=profilePhone;profilePhone=function(){return oldProfilePhone().replace('<button class="secondary full" onclick="go(\'Sign in\')">Preview sign-in screen</button>','<button class="secondary full" onclick="passwordDialog()">Change password</button><button class="secondary full" onclick="logout()">Sign out</button>').replace('· The Office Kitchen','· '+esc(store.name))};
async function mutate(path,data,message){try{await api(path,data);await syncState();if(message)notify(message);return true}catch(e){notify(e.message);return false}}
placeOrder=async function(){if(orderSubmitting||!count())return;orderSubmitting=true;let items=Object.entries(cart).map(([id,qty])=>({id:Number(id),qty}));let fingerprint=JSON.stringify(items);if(fingerprint!==orderRequestFingerprint){orderRequestKey=crypto.randomUUID();orderRequestFingerprint=fingerprint}const button=document.querySelector('.app-cart .primary');if(button){button.disabled=true;button.textContent='Placing order…'}try{let result=await api('orders',{items,request_key:orderRequestKey});lastOrder=result.id;cart={};orderRequestKey=null;orderRequestFingerprint=null;await syncState(false);go('Confirmation')}catch(e){notify(e.message);render()}finally{orderSubmitting=false}};
advance=async function(id){let o=orders.find(o=>o.id===id);if(!o)return;let next={Placed:'Preparing',Preparing:'Ready',Ready:'Served'}[o.status];if(next)await mutate('orders/status',{id,expected:o.status,status:next},id+' · '+next)};
paid=async function(id){await mutate('orders/payment',{id},'Payment marked as received')};
toggleFood=async function(id){let f=foods.find(f=>f.id===id);if(f)await mutate('menu/availability',{id,available:!f.available},f.name+' availability updated')};
saveProfile=async function(e){e.preventDefault();await mutate('profile',Object.fromEntries(new FormData(e.target)),'Profile saved')};
saveStore=async function(e){e.preventDefault();let d=Object.fromEntries(new FormData(e.target));d.open=d.open==='true';await mutate('store',d,'Store settings saved')};
const prototypeEditFood=editFood;editFood=function(id){prototypeEditFood(id);let f=foods.find(x=>x.id===id)||{};const form=document.querySelector('.modal form');form.querySelector('.screen-note')?.remove();const button=form.querySelector('button');let div=document.createElement('div');div.innerHTML=`<label>Protein (g)<input name="protein" type="number" min="0" max="1000" step="any" value="${f.protein||0}" required></label><label>Carbohydrates (g)<input name="carbs" type="number" min="0" max="1000" step="any" value="${f.carbs||0}" required></label><label>Fat (g)<input name="fat" type="number" min="0" max="1000" step="any" value="${f.fat||0}" required></label><label>Photo URL (images.unsplash.com)<input name="img" type="url" value="${esc(f.img||'')}" placeholder="Optional HTTPS image URL"></label>`;form.insertBefore(div,button);form.querySelector('[name="price"]').step='0.01'};
saveFood=async function(e,id){e.preventDefault();let data=Object.fromEntries(new FormData(e.target));for(const k of ['price','kcal','protein','carbs','fat'])data[k]=Number(data[k]);data.id=id;const ok=await mutate('menu/save',data,'Dish saved');if(ok)closeModal()};
setStaffActive=async function(id,active){await mutate('staff/status',{id,active},active?'Worker enabled':'Worker disabled and sessions revoked')};
addStaff=function(){modal(`<div class="modal-content"><h2>Add a store worker</h2><p>This creates a worker login. Share the username and password privately.</p><form class="form" onsubmit="saveStaff(event)"><label>Full name<input name="name" required minlength="2" maxlength="80"></label><label>Username<input name="username" required minlength="3" maxlength="80" autocapitalize="none"></label><label>Email (optional)<input name="email" type="email" maxlength="150"></label><label>Initial password<input name="password" type="password" required minlength="10" maxlength="128" autocomplete="new-password"></label><button class="primary full">Create worker account</button></form></div>`)};
async function saveStaff(e){e.preventDefault();const ok=await mutate('staff',Object.fromEntries(new FormData(e.target)),'Worker account created');if(ok)closeModal()}
function passwordDialog(){modal(`<div class="modal-content"><h2>Change your password</h2><p>Other sessions will be signed out after this change.</p><form class="form" onsubmit="savePassword(event)"><label>Current password<input name="current_password" type="password" required maxlength="128" autocomplete="current-password"></label><label>New password<input name="new_password" type="password" required minlength="10" maxlength="128" autocomplete="new-password"></label><button class="primary full">Update password</button></form></div>`)}
async function savePassword(e){e.preventDefault();const ok=await mutate('password',Object.fromEntries(new FormData(e.target)),'Password changed');if(ok)closeModal()}
orderTable=function(){return `<div class="table-wrap"><table><thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead><tbody>${orders.map(o=>`<tr><td><b>${o.id}</b></td><td>${esc(o.name)}</td><td>${o.items.map(i=>i.qty+' × '+esc(i.name)).join('<br>')}</td><td>${money(orderTotal(o))}</td><td>${o.paid?'Paid':`<button class="secondary order-action" onclick="paid('${o.id}')">Mark paid</button>`}</td><td><span class="pill">${o.status}</span></td><td>${o.status==='Served'?'Collected':`<button class="secondary order-action" onclick="advance('${o.id}')">${{Placed:'Start preparing',Preparing:'Mark ready',Ready:'Mark served'}[o.status]}</button>`}</td></tr>`).join('')}</tbody></table></div>`};
exportCSV=function(){let rows=[['Order ID','Customer','Total','Payment','Status'],...orders.map(o=>[o.id,o.name,orderTotal(o),o.paid?'Paid':'Unpaid',o.status])];let csv=rows.map(row=>row.map(v=>{let s=String(v);if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}).join(',')).join('\r\n');let link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));link.download='bitebreak-orders.csv';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000)};
const originalOverviewPlus=overviewPlus;overviewPlus=function(){return originalOverviewPlus().replace('Today · Demo data','All saved orders').replace('Sample orders and your orders from this session.','Saved cafeteria orders.').replace('Payments marked received','All recorded payments')};
const savedAllOrders=originalAllOrders;
// Poll only while idle; do not interrupt forms, dialogs, or an order submission.
setInterval(async()=>{if(!signedInUser||syncBusy||orderSubmitting||document.hidden||document.querySelector('.modal')||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;syncBusy=true;try{let state=await api('state');let before=JSON.stringify([foods,orders,store,staff]);installState(state);if(before!==JSON.stringify([foods,orders,store,staff]))render()}catch(e){if(e.status!==401)console.warn('Sync unavailable; will retry.')}finally{syncBusy=false}},5000);
(async()=>{document.getElementById('app').innerHTML='<div class="loading-page">Opening BiteBreak…</div>';try{await syncState(false);page=role==='Customer'?'Menu':role==='Worker'?'Orders':'Overview';render()}catch(e){showLogin();if(e.status!==401){document.getElementById('auth-error').textContent='Cannot reach the server. Start server.py and refresh.'}}})();
