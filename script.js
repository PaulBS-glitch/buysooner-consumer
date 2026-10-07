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
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=formatter(from+(to-from)*eased);
    if(p<1)requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const story=document.querySelector('.story');
const choices=[
  document.querySelector('.choice-one'),
  document.querySelector('.choice-two'),
  document.querySelector('.choice-three')
];
const mathsPanel=document.querySelector('.maths-panel');
const equation=document.querySelector('.equation');
const growthStrip=document.querySelector('.growth-strip');

if(story && mathsPanel && equation && growthStrip && choices.every(Boolean)){
  let hasRun=false;

  const runStory=()=>{
    if(hasRun) return;
    hasRun=true;

    const activateChoice=(index)=>{
      choices.forEach((card,i)=>card.classList.toggle('is-active',i===index));
    };

    activateChoice(0);
    setTimeout(()=>activateChoice(1),900);
    setTimeout(()=>activateChoice(2),1800);

    setTimeout(()=>{
      mathsPanel.classList.add('is-live');
      equation.classList.add('is-active');

      const buyer=equation.querySelector('.equation-buyer strong');
      const loan=equation.querySelector('.equation-loan strong');
      const boost=equation.querySelector('.equation-boost strong');
      const home=equation.querySelector('.equation-home strong');

      buyer.textContent='$0k';
      loan.textContent='$0k';
      boost.textContent='$0k';
      home.textContent='$0m';

      setTimeout(()=>animateNumber(buyer,0,100,360,v=>'$'+Math.round(v)+'k'),80);
      setTimeout(()=>animateNumber(loan,0,800,460,v=>'$'+Math.round(v)+'k'),360);
      setTimeout(()=>animateNumber(boost,0,100,360,v=>'$'+Math.round(v)+'k'),760);
      setTimeout(()=>animateNumber(home,0,1,430,v=>'$'+v.toFixed(2).replace(/\.00$/,'')+'m'),1160);

      setTimeout(()=>{
        growthStrip.classList.add('is-active');
        const growthValue=growthStrip.querySelector('.growth-value');
        const startValue=1000000;
        const finish=startValue*Math.pow(1.055,5);
        growthValue.textContent='$1.00m';
        animateNumber(growthValue,startValue,finish,1150,v=>'$'+(v/1000000).toFixed(2)+'m');
      },1600);

      setTimeout(()=>mathsPanel.classList.add('is-complete'),2450);
    },2600);
  };

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        runStory();
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.32});

  observer.observe(story);
}
