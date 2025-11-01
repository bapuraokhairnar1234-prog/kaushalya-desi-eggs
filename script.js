/* script.js — beast mode: particles, reveal, WhatsApp wiring */
(() => {
  // --- canvas particles (lightweight gold particles) ---
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth, H = canvas.height = innerHeight;
  let DPR = window.devicePixelRatio || 1;
  canvas.width = W * DPR; canvas.height = H * DPR; canvas.style.width = W + 'px'; canvas.style.height = H + 'px'; ctx.setTransform(DPR,0,0,DPR,0,0);
  const particles = [];
  const MAX = 70, colors = ['rgba(255,215,80,0.12)','rgba(255,200,60,0.10)','rgba(255,240,170,0.06)'];
  function rand(a,b){return Math.random()*(b-a)+a}
  for(let i=0;i<MAX;i++){particles.push({x:rand(0,W),y:rand(0,H),r:rand(1.5,6),vx:rand(-0.25,0.25),vy:rand(0.12,0.8),col:colors[Math.floor(rand(0,colors.length))],alpha:rand(0.04,0.22)})}
  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0)}
  addEventListener('resize',()=>{resize()},{passive:true});
  function draw(){
    ctx.clearRect(0,0,W,H);
    // vignette
    const g = ctx.createRadialGradient(W/2,H/3,0,W/2,H/2,Math.max(W,H));
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,0.32)');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -30) p.x = W+30; if(p.x > W+30) p.x = -30;
      if(p.y > H+40){p.x = rand(0,W); p.y = rand(-120,-10); p.vy = rand(0.12,0.8); p.vx = rand(-0.25,0.25)}
      // glow
      const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      grad.addColorStop(0,p.col); grad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.globalAlpha = p.alpha * 0.9; ctx.fillStyle = grad; ctx.fillRect(p.x-p.r*6,p.y-p.r*6,p.r*12,p.r*12);
      ctx.beginPath(); ctx.globalAlpha = Math.min(1,p.alpha*1.6); ctx.fillStyle='rgba(255,240,190,0.95)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.closePath(); ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }
  draw();

  // --- reveal on scroll ---
  function reveal(){document.querySelectorAll('.reveal').forEach(el=>{const r=el.getBoundingClientRect(); if(r.top < window.innerHeight - 120) el.classList.add('active');})}
  addEventListener('scroll',reveal,{passive:true}); addEventListener('load',reveal);
  // also run once after DOM ready
  document.addEventListener('DOMContentLoaded',()=>{reveal();});

  // --- floating egg decorations in hero ---
  function placeEggs(){
    const hero = document.querySelector('.hero'); if(!hero) return;
    if(hero.querySelectorAll('.egg-float').length) return;
    const e1 = document.createElement('div'); e1.className='egg-float'; e1.style.left='8%'; e1.style.top='22%';
    const e2 = document.createElement('div'); e2.className='egg-float'; e2.style.right='6%'; e2.style.top='32%'; e2.style.width='46px'; e2.style.height='62px';
    hero.appendChild(e1); hero.appendChild(e2);
  }
  document.addEventListener('DOMContentLoaded',placeEggs);

  // --- simple hero parallax (mouse) ---
  const hero = document.querySelector('.hero');
  if(hero){addEventListener('mousemove',e=>{const mx=(e.clientX-innerWidth/2)/(innerWidth/2);const my=(e.clientY-innerHeight/2)/(innerHeight/2);hero.style.transform=`translate3d(${mx*8}px,${my*6}px,0)`;}); hero.addEventListener('mouseleave',()=>hero.style.transform='');}

  // --- WhatsApp order helper ---
  function openWhatsAppOrder(product='Product', qty='', note=''){
    const phone='918767405835'; // +91 8767405835
    let msg=`Hello Kaushalya Desi Farm!%0AI would like to order:%0A- Product: ${encodeURIComponent(product)}%0A- Quantity: ${encodeURIComponent(qty)}%0A`;
    if(note) msg += `%0A- Note: ${encodeURIComponent(note)}%0A`;
    msg += `%0APlease confirm.`;
    window.open(`https://wa.me/${phone}?text=${msg}`,'_blank');
  }
  window.openWhatsAppOrder = openWhatsAppOrder;

  // --- wire forms/buttons with common selectors ---
  function wireOrders(){
    const forms = document.querySelectorAll('.form-container, form, .order-section, .card');
    forms.forEach(f=>{
      const btn = f.querySelector('button') || f.querySelector('.btn');
      if(!btn) return;
      btn.addEventListener('click', e=>{
        e.preventDefault();
        // find qty & product
        const qty = (f.querySelector('#quantity') && f.querySelector('#quantity').value) || (f.querySelector('input[type="number"]') && f.querySelector('input[type="number"]').value) || '';
        const product = (f.querySelector('#product') && f.querySelector('#product').value) || (f.querySelector('select') && f.querySelector('select').value) || (f.querySelector('h3') && f.querySelector('h3').innerText) || 'Product';
        const note = (f.querySelector('#message') && f.querySelector('#message').value) || '';
        if(!qty){ alert('Please enter quantity before ordering.'); return; }
        openWhatsAppOrder(product, qty, note);
      });
    });
  }
  document.addEventListener('DOMContentLoaded',wireOrders);
  // expose for debug
  window.__beast_ready = true;
})();
