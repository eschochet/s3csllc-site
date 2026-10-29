(function(){
  var d=document.documentElement; d.classList.add('js');
  var t=document.querySelector('.navtoggle'), n=document.getElementById('nav');
  if(t&&n){
    t.addEventListener('click',function(){var o=n.classList.toggle('is-open');t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu');});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('is-open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');}});
  }
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el,i){el.style.transitionDelay=((i%3)*70)+'ms';io.observe(el);});
    var cb=document.querySelector('.callbar'), hero=document.querySelector('.hero');
    if(cb&&hero){new IntersectionObserver(function(es){cb.classList.toggle('is-on',!es[0].isIntersecting);}).observe(hero);}
  } else { els.forEach(function(el){el.classList.add('is-in');}); }
  var f=document.getElementById('contact-form');
  if(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var name=f.elements.name, email=f.elements.email, ok=true;
      [name,email].forEach(function(el){var bad=!el.value.trim()||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));el.setAttribute('aria-invalid',bad);if(bad&&ok){el.focus();ok=false;}});
      if(!ok)return;
      if(f.elements._honey&&f.elements._honey.value)return;
      var btn=f.querySelector('button[type=submit]'), st=document.getElementById('f-status'), label=btn.innerHTML;
      function show(html,color){st.innerHTML=html;st.style.color=color||'';st.style.fontSize='14px';}
      btn.disabled=true; btn.style.opacity='.7'; btn.textContent='Sending\u2026';
      show('Sending your message\u2026');
      var data={name:name.value.trim(),email:email.value.trim(),subject:f.elements.subject.value,message:f.elements.message.value,page:location.href,_honey:''};
      function fail(){
        btn.disabled=false; btn.style.opacity=''; btn.innerHTML=label;
        var mt='mailto:Info@s3csllc.com?subject='+encodeURIComponent('Website inquiry: '+data.subject)+'&body='+encodeURIComponent('Name: '+data.name+'\nEmail: '+data.email+'\n\n'+data.message);
        show('Sorry, your message couldn\u2019t be sent. Please email <a href="'+mt+'" style="color:inherit;text-decoration:underline">Info@s3csllc.com</a> or call <a href="tel:+18004750815" style="color:inherit;text-decoration:underline">(800) 475-0815</a>.','#ff9a9a');
      }
      // Our own sender (Vendor Desk). Form-encoded = no CORS preflight. Its server may take up to ~60 s to wake up.
      var ac=window.AbortController?new AbortController():null; if(ac)setTimeout(function(){ac.abort();},75000);
      fetch('https://vendor.s3csllc.com/api/contact',{method:'POST',headers:{'Accept':'application/json'},body:new URLSearchParams(data),signal:ac?ac.signal:undefined})
        .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};});})
        .then(function(res){
          if(res.ok&&(res.j.ok===true||res.j.success===true||res.j.success==='true')){
            f.reset(); btn.style.opacity=''; btn.innerHTML='Message sent \u2713';
            show('<strong>Thanks, we\u2019ll get back to you within 1 business day.</strong>','#7ee2a8');
          } else { fail(); }
        }).catch(fail);
    });
  }
})();
