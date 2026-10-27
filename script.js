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
      var body='Name: '+name.value+'\nEmail: '+email.value+'\n\n'+f.elements.message.value;
      window.location.href='mailto:Info@s3csllc.com?subject='+encodeURIComponent('Website inquiry: '+f.elements.subject.value)+'&body='+encodeURIComponent(body);
    });
  }
})();
