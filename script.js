const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');

if(menuToggle&&nav){
  menuToggle.addEventListener('click',()=>{
    const open=menuToggle.getAttribute('aria-expanded')==='true';
    menuToggle.setAttribute('aria-expanded',String(!open));
    if(open){ nav.removeAttribute('style'); return; }
    Object.assign(nav.style,{
      display:'flex',position:'absolute',top:'50px',left:'11px',right:'11px',
      padding:'12px',background:'#fff',border:'1px solid #dbe7eb',
      borderRadius:'10px',flexDirection:'column',
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

const equation=document.querySelector('.equation');
const mathsPanel=document.querySelector('.maths-panel');
const growthStrip=document.querySelector('.growth-strip');

if(equation&&mathsPanel&&growthStrip){
  const buyer=equation.querySelector('.equation-buyer strong');
  const loan=equation.querySelector('.equation-loan strong');
  const boost=equation.querySelector('.equation-boost strong');
  const home=equation.querySelector('.equation-home strong');
  const growthValue=growthStrip.querySelector('.growth-value');

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;

      equation.classList.add('is-active');

      buyer.textContent='$0k';
      loan.textContent='$0k';
      boost.textContent='$0k';
      home.textContent='$0m';

      setTimeout(()=>animateNumber(buyer,0,100,380,v=>'$'+Math.round(v)+'k'),60);
      setTimeout(()=>animateNumber(loan,0,800,480,v=>'$'+Math.round(v)+'k'),330);
      setTimeout(()=>animateNumber(boost,0,100,380,v=>'$'+Math.round(v)+'k'),700);
      setTimeout(()=>animateNumber(home,0,1,460,v=>'$'+v.toFixed(2).replace(/\.00$/,'')+'m'),1080);

      setTimeout(()=>{
        growthStrip.classList.add('is-active');
        const startValue=1000000;
        const finish=startValue*Math.pow(1.055,5);
        growthValue.textContent='$1.00m';
        animateNumber(growthValue,startValue,finish,1250,v=>'$'+(v/1000000).toFixed(2)+'m');
      },1550);

      setTimeout(()=>mathsPanel.classList.add('is-complete'),2550);
      observer.unobserve(entry.target);
    });
  },{threshold:.5});

  observer.observe(equation);
}
