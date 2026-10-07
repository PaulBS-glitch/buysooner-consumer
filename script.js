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
  const started=performance.now();

  const frame=now=>{
    const p=Math.min((now-started)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=formatter(from+(to-from)*eased);

    if(p<1) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

/* Problem choices: emphasis only. All content remains readable. */
const choicesBlock=document.querySelector('.conventional-block');
const keepCard=document.querySelector('.choice-one');
const borrowCard=document.querySelector('.choice-two');

if(choicesBlock&&keepCard&&borrowCard){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran) return;
      ran=true;

      keepCard.classList.add('is-active');
      borrowCard.classList.remove('is-active');

      setTimeout(()=>{
        keepCard.classList.remove('is-active');
        borrowCard.classList.add('is-active');
      },900);

      setTimeout(()=>{
        borrowCard.classList.remove('is-active');
      },1800);

      observer.unobserve(entry.target);
    });
  },{threshold:.35});

  observer.observe(choicesBlock);
}

/* Cost of waiting: animate the five-year move when the proof enters view. */
const costWaiting=document.querySelector('.cost-waiting');
const growth=document.querySelector('.growth-strip');

if(costWaiting&&growth){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran) return;
      ran=true;

      const growthValue=growth.querySelector('.growth-value');
      const start=1000000;
      const finish=start*Math.pow(1.06,5);

      growthValue.textContent='$1.00m';
      growth.classList.add('is-animated');

      animateNumber(
        growthValue,
        start,
        finish,
        1250,
        v=>'$'+(v/1000000).toFixed(2)+'m'
      );

      observer.unobserve(entry.target);
    });
  },{threshold:.4});

  observer.observe(costWaiting);
}

/* BuySooner solution: arrives after the cost-of-waiting proof. */
const solutionBlock=document.querySelector('.solution-block');
const solutionHeading=document.querySelector('.solution-heading');
const solutionCard=document.querySelector('.solution-card');

if(solutionBlock&&solutionHeading&&solutionCard){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran) return;
      ran=true;

      solutionHeading.classList.add('is-active');

      setTimeout(()=>{
        solutionCard.classList.add('is-active');
      },450);

      observer.unobserve(entry.target);
    });
  },{threshold:.4});

  observer.observe(solutionBlock);
}

/* Maths: sequentially build the purchase equation. */
const maths=document.querySelector('.maths-section');
const equation=document.querySelector('.equation');

if(maths&&equation){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran) return;
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

      const clearSteps=()=>{
        parts.forEach(part=>part.classList.remove('active-step'));
        symbols.forEach(symbol=>symbol.classList.remove('active-symbol'));
      };

      buyerValue.textContent='$0k';
      loanValue.textContent='$0k';
      boostValue.textContent='$0k';
      homeValue.textContent='$0m';

      clearSteps();
      buyer.classList.add('active-step');
      animateNumber(buyerValue,0,100,380,v=>'$'+Math.round(v)+'k');

      setTimeout(()=>{
        clearSteps();
        s1.classList.add('active-symbol');
        loan.classList.add('active-step');
        animateNumber(loanValue,0,800,480,v=>'$'+Math.round(v)+'k');
      },500);

      setTimeout(()=>{
        clearSteps();
        s2.classList.add('active-symbol');
        boost.classList.add('active-step');
        animateNumber(boostValue,0,100,380,v=>'$'+Math.round(v)+'k');
      },1100);

      setTimeout(()=>{
        clearSteps();
        eq.classList.add('active-symbol');
        home.classList.add('active-step');
        animateNumber(homeValue,0,1,450,v=>'$'+v.toFixed(2).replace(/\.00$/,'')+'m');
      },1650);

      setTimeout(clearSteps,2250);

      observer.unobserve(entry.target);
    });
  },{threshold:.35});

  observer.observe(maths);
}