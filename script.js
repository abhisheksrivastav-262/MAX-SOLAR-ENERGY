// Header scroll, mobile menu, reveal animations, forms
(function(){
  const header=document.querySelector('header.site');
  const onScroll=()=>{ if(header) header.classList.toggle('scrolled', window.scrollY>10); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  const menu=document.getElementById('mobileMenu');
  const openBtn=document.getElementById('menuOpen');
  const closeBtn=document.getElementById('menuClose');
  if(openBtn&&menu){ openBtn.addEventListener('click',()=>menu.classList.add('open')); }
  if(closeBtn&&menu){ closeBtn.addEventListener('click',()=>menu.classList.remove('open')); }
  if(menu){ menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open'))); }

  // Solutions dropdown: click-to-toggle for touch devices (hover still works on desktop)
  document.querySelectorAll('.dropdown > button').forEach(b=>{
    b.addEventListener('click',(e)=>{
      e.stopPropagation();
      const m=b.nextElementSibling;
      const isOpen=m.classList.contains('touch-open');
      document.querySelectorAll('.dropdown-menu.touch-open').forEach(x=>x.classList.remove('touch-open'));
      if(!isOpen) m.classList.add('touch-open');
    });
  });
  document.addEventListener('click',()=>{ document.querySelectorAll('.dropdown-menu.touch-open').forEach(x=>x.classList.remove('touch-open')); });

  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Enquiry forms -> WhatsApp
  document.querySelectorAll('form[data-enquiry]').forEach(f=>{
    f.addEventListener('submit',(ev)=>{
      ev.preventDefault();
      const d=new FormData(f);
      const msg=`New Enquiry - Max Solar Energy%0AName: ${encodeURIComponent(d.get('name')||'')}%0AMobile: ${encodeURIComponent(d.get('mobile')||'')}%0AService: ${encodeURIComponent(d.get('service')||'')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;
      const ok=document.getElementById('formNote');
      if(ok){ ok.style.display='block'; ok.textContent='Thank you! Your enquiry is ready. Opening WhatsApp…'; }
      window.open(`https://wa.me/917976446027?text=${msg}`,'_blank');
      f.reset();
    });
  });

  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
