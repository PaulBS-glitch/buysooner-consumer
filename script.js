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

/* Problem story: all content stays readable; emphasis moves from the
   conventional options to the BuySooner solution. */
const problem=document.querySelector('.problem-section');
const keepCard=document.querySelector('.choice-one');
const borrowCard=document.querySelector('.choice-two');
const solutionHeading=document.querySelector('.solution-heading');
const solutionCard=document.querySelector('.solution-card');

if(problem&&keepCard&&borrowCard&&solutionHeading&&solutionCard){
  let ran=false;

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran) return;
      ran=true;

      const clear=()=>{
        keepCard.classList.remove('is-active');
        borrowCard.classList.remove('is-active');
        solutionHeading.classList.remove('is-active');
        solutionCard.classList.remove('is-active');
      };

      clear();
      keepCard.classList.add('is-active');

      setTimeout(()=>{
        clear();
        borrowCard.classList.add('is-active');
      },900);

      setTimeout(()=>{
        clear();
        solutionHeading.classList.add('is-active');
        solutionCard.classList.add('is-active');
      },1800);

      observer.unobserve(entry.target);
    });
  },{threshold:.28});

  observer.observe(problem);
}

/* Maths: sequential calculation, then growth, then a light benefit-card
   emphasis. Nothing is hidden while the animation runs. */
const maths=document.querySelector('.maths-section');
const equation=document.querySelector('.equation');
const growth=document.querySelector('.growth-strip');

if(maths&&equation&&growth){
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

      setTimeout(()=>{
        clearSteps();

        const growthValue=growth.querySelector('.growth-value');
        const start=1000000;
        const finish=start*Math.pow(1.055,5);

        growthValue.textContent='$1.00m';
        growth.classList.add('is-animated');

        animateNumber(
          growthValue,
          start,
          finish,
          1250,
          v=>'$'+(v/1000000).toFixed(2)+'m'
        );
      },2250);

      setTimeout(()=>{
        const benefits=[...document.querySelectorAll('.reassurance-box')];

        benefits.forEach((card,index)=>{
          setTimeout(()=>card.classList.add('pulse'),index*180);
        });

        setTimeout(()=>benefits.forEach(card=>card.classList.remove('pulse')),1100);
      },3500);

      observer.unobserve(entry.target);
    });
  },{threshold:.35});

  observer.observe(maths);
}