const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md', 'bg-white/95');
        navbar.classList.remove('bg-white/70');
    } else {
        navbar.classList.remove('shadow-md', 'bg-white/95');
        navbar.classList.add('bg-white/70');
    }
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

(function(){
    const c=document.getElementById('sakura-canvas');
    if(!c) return;
    const x=c.getContext('2d'), p=[];
    let w,h;
    function r(){w=c.width=window.innerWidth;h=c.height=window.innerHeight;}
    window.addEventListener('resize',r);r();
    function cp(){
        return {
            x: Math.random()*w, y: -20, s: Math.random()*5+5, sp: Math.random()*1.5+0.5,
            v: Math.random()*2-1, a: Math.random()*6, as: Math.random()*0.05-0.025
        };
    }
    for(let i=0;i<40;i++) p.push(cp());
    function d(){
        x.clearRect(0,0,w,h);
        x.fillStyle='rgba(255,182,193,0.5)';
        p.forEach((o,i)=>{
            o.y+=o.sp; o.x+=Math.sin(o.a)+o.v*0.2; o.a+=o.as;
            x.beginPath(); x.ellipse(o.x,o.y,o.s,o.s/2,o.a,0,Math.PI*2); x.fill();
            if(o.y>h) p[i]=cp(); 
        });
        requestAnimationFrame(d);
    }
    d();
})();

const petContainer = document.getElementById('pet-container');
const catWrapper = document.getElementById('cat-wrapper');
const petBubble = document.getElementById('pet-bubble');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let petX = window.innerWidth / 2, petY = window.innerHeight / 2;
let isSleeping = false, idleTimer;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    if(isSleeping) { 
        isSleeping = false; catWrapper.classList.remove('sleeping'); showBubble("醒了!"); 
    }
    clearTimeout(idleTimer); 
    idleTimer = setTimeout(() => { 
        isSleeping = true; catWrapper.classList.add('sleeping'); catWrapper.classList.remove('running'); 
    }, 5000); 
});

function animatePet() {
    if (isSleeping) { requestAnimationFrame(animatePet); return; }
    const dx = mouseX - petX; const dy = mouseY - petY; const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 60) {
        catWrapper.classList.add('running');
        petX += (dx/dist)*3.5; petY += (dy/dist)*3.5;
        catWrapper.style.transform = dx<0 ? 'scaleX(-1)' : 'scaleX(1)';
    } else { catWrapper.classList.remove('running'); }
    petContainer.style.left = (petX-50)+'px'; petContainer.style.top = (petY-50)+'px';
    requestAnimationFrame(animatePet);
}
animatePet();

window.petInteraction = function() {
    playTone(800,'sine',0.1); 
    catWrapper.style.animation = 'petJump 0.4s ease-out';
    setTimeout(() => catWrapper.style.animation = '', 400);
    const texts =["喵~", "蹭蹭", "要吃鱼", "写代码!", "加油!"];
    showBubble(texts[Math.floor(Math.random()*texts.length)]);
}

function showBubble(text) {
    petBubble.innerText = text; petBubble.classList.add('show'); 
    setTimeout(() => petBubble.classList.remove('show'), 1500);
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type, duration){
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.value = 0.05;
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}