const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');

if(menuToggle&&nav){
  menuToggle.addEventListener('click',()=>{
    const open=menuToggle.getAttribute('aria-expanded')==='true';
    menuToggle.setAttribute('aria-expanded',String(!open));

    if(open){
      nav.removeAttribute('style');
      return;
    }

    Object.assign(nav.style,{
      display:'flex',
      position:'absolute',
      top:'50px',
      left:'11px',
      right:'11px',
      padding:'12px',
      background:'#fff',
      border:'1px solid #dbe7eb',
      borderRadius:'10px',
      flexDirection:'column',
      boxShadow:'0 10px 26px rgba(6,45,70,.12)'
    });
  });
}

const animateNumber=(el,from,to,duration,formatter)=>{
  const start=performance.now();

  const frame=now=>{
    const progress=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-progress,3);
    el.textContent=formatter(from+(to-from)*eased);

    if(progress<1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

/* Cost of waiting: one SVG, one clear animation. */
const costChart=document.querySelector('.cost-chart');

if(costChart){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting||ran) continue;
      ran=true;

      const endValue=costChart.querySelector('.cost-chart__end-value');
      costChart.classList.add('is-animated');

      animateNumber(
        endValue,
        1.00,
        1.338,
        1800,
        v=>'$'+v.toFixed(2)+'m'
      );

      observer.unobserve(entry.target);
    }
  },{threshold:.55,rootMargin:'0px 0px -6% 0px'});

  observer.observe(costChart);
}

/* Three conventional choices: subtle emphasis, never hidden. */
const options=document.querySelector('.options');
const optionCards=[...document.querySelectorAll('.option-card')];

if(options&&optionCards.length===3){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting||ran) continue;
      ran=true;

      const activate=index=>{
        optionCards.forEach((card,i)=>card.classList.toggle('is-active',i===index));
      };

      activate(0);
      setTimeout(()=>activate(1),900);
      setTimeout(()=>activate(2),1800);
      setTimeout(()=>optionCards.forEach(card=>card.classList.remove('is-active')),2700);

      observer.unobserve(entry.target);
    }
  },{threshold:.45});

  observer.observe(options);
}

/* Maths: build the purchase equation deliberately and leave every completed value visible. */
const maths=document.querySelector('.maths-block');
const equation=document.querySelector('.equation');

if(maths&&equation){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting||ran) continue;
      ran=true;

      const buyer=equation.querySelector('.buyer');
      const loan=equation.querySelector('.loan');
      const boost=equation.querySelector('.boost');
      const home=equation.querySelector('.home');

      const s1=equation.querySelector('.s1');
      const s2=equation.querySelector('.s2');
      const eq=equation.querySelector('.eq');

      const buyerValue=buyer.querySelector('strong');
      const loanValue=loan.querySelector('strong');
      const boostValue=boost.querySelector('strong');
      const homeValue=home.querySelector('strong');

      const parts=[buyer,loan,boost,home];
      const symbols=[s1,s2,eq];

      const clear=()=>{
        parts.forEach(part=>part.classList.remove('active-step'));
        symbols.forEach(symbol=>symbol.classList.remove('active-symbol'));
      };

      buyerValue.textContent='$0k';
      loanValue.textContent='$0k';
      boostValue.textContent='$0k';
      homeValue.textContent='$0m';

      clear();
      buyer.classList.add('active-step');
      animateNumber(buyerValue,0,100,650,v=>'$'+Math.round(v)+'k');

      setTimeout(()=>{
        clear();
        s1.classList.add('active-symbol');
        loan.classList.add('active-step');
        animateNumber(loanValue,0,800,850,v=>'$'+Math.round(v)+'k');
      },800);

      setTimeout(()=>{
        clear();
        s2.classList.add('active-symbol');
        boost.classList.add('active-step');
        animateNumber(boostValue,0,100,650,v=>'$'+Math.round(v)+'k');
      },1800);

      setTimeout(()=>{
        clear();
        eq.classList.add('active-symbol');
        home.classList.add('active-step');
        animateNumber(homeValue,0,1,750,v=>'$'+v.toFixed(2).replace(/\.00$/,'')+'m');
      },2700);

      setTimeout(clear,3600);
      observer.unobserve(entry.target);
    }
  },{threshold:.55});

  observer.observe(maths);
}