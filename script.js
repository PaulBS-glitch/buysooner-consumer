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
      left:'12px',
      right:'12px',
      padding:'13px',
      background:'#fff',
      border:'1px solid #dbe7eb',
      borderRadius:'11px',
      flexDirection:'column',
      boxShadow:'0 12px 30px rgba(6,45,70,.12)'
    });
  });
}

const animateNumber=(el,from,to,duration,formatter)=>{
  const start=performance.now();
  const frame=now=>{
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=formatter(from+(to-from)*eased);
    if(p<1)requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const choices=[
  document.querySelector('.choice-one'),
  document.querySelector('.choice-two'),
  document.querySelector('.choice-three')
];

const problem=document.querySelector('.problem-section');

if(problem&&choices.every(Boolean)){
  let ran=false;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran)return;
      ran=true;

      const setActive=index=>{
        choices.forEach((card,i)=>card.classList.toggle('is-active',i===index));
      };

      setActive(0);
      setTimeout(()=>setActive(1),850);
      setTimeout(()=>setActive(2),1700);

      observer.unobserve(entry.target);
    });
  },{threshold:.32});

  observer.observe(problem);
}

const maths=document.querySelector('.maths-section');
const equation=document.querySelector('.equation');
const growth=document.querySelector('.growth-strip');

if(maths&&equation&&growth){
  let ran=false;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting||ran)return;
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

      equation.classList.add('animating');
      [buyer,loan,boost,home,s1,s2,eq].forEach(el=>el.classList.remove('show'));

      buyerValue.textContent='$0k';
      loanValue.textContent='$0k';
      boostValue.textContent='$0k';
      homeValue.textContent='$0m';

      buyer.classList.add('show');
      setTimeout(()=>animateNumber(buyerValue,0,100,360,v=>'$'+Math.round(v)+'k'),60);

      setTimeout(()=>{
        s1.classList.add('show');
        loan.classList.add('show');
        animateNumber(loanValue,0,800,450,v=>'$'+Math.round(v)+'k');
      },420);

      setTimeout(()=>{
        s2.classList.add('show');
        boost.classList.add('show');
        animateNumber(boostValue,0,100,360,v=>'$'+Math.round(v)+'k');
      },950);

      setTimeout(()=>{
        eq.classList.add('show');
        home.classList.add('show');
        animateNumber(homeValue,0,1,430,v=>'$'+v.toFixed(2).replace(/\.00$/,'')+'m');
      },1420);

      setTimeout(()=>{
        growth.classList.add('animating');
        const growthValue=growth.querySelector('.growth-value');
        const start=1000000;
        const finish=start*Math.pow(1.055,5);
        growthValue.textContent='$1.00m';
        animateNumber(growthValue,start,finish,1250,v=>'$'+(v/1000000).toFixed(2)+'m');
      },1980);

      observer.unobserve(entry.target);
    });
  },{threshold:.35});

  observer.observe(maths);
}
