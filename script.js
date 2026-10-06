const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')==='true';
    toggle.setAttribute('aria-expanded',String(!open));
    nav.style.display=open?'none':'flex';
    if(!open){
      nav.style.position='absolute';
      nav.style.top='76px';
      nav.style.left='14px';
      nav.style.right='14px';
      nav.style.padding='18px';
      nav.style.background='#fff';
      nav.style.border='1px solid #dbe6eb';
      nav.style.borderRadius='16px';
      nav.style.flexDirection='column';
      nav.style.boxShadow='0 16px 40px rgba(7,41,66,.12)';
    }
  });
}
