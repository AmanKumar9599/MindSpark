const ibtn = document.querySelector('.ic');
const inst = document.querySelector('.inst');
const start = document.getElementById('start');
const mid = document.querySelector('.mid');
const butons = document.querySelectorAll('.btn1');
const b1 = document.querySelector('.red');
const b2 = document.querySelector('.blue');
const b3 = document.querySelector('.yellow');
const b4 = document.querySelector('.green');
const end=document.getElementById('end');
const heading=document.getElementById('h2');
const counter=document.querySelector('.counter');
const bulbs = [b1, b2, b3, b4];

let gSeq = []; 
let uSeq = []; 
let score = 0; 
let clicks=0;

// Show instructions on hover
ibtn.addEventListener('click', () => {
    inst.style.display = 'block';
});

ibtn.addEventListener('mouseout', () => {
    inst.style.display = 'none';
});

// Start the game
start.addEventListener('click', () => {
    mid.style.display = 'none';
    butons.forEach(btn => btn.style.display = 'block');
    startGame();
});

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Blink a bulb
async function blinkBulb(index) {
    bulbs[index].style.opacity = '1'; 
    await wait(1000); 
    bulbs[index].style.opacity = '0.1'; 
    await wait(500); 
}

function startGame(){
    uSeq=[];
    gSeq=[];
    clicks=0;
    score=0;
    nextLevel();
}

function nextLevel(){
    uSeq=[];
    let rand=Math.floor(Math.random()*4);
    gSeq.push(rand);
        clicks=0;
    butons.forEach(btn => btn.style.display = 'none');
    setTimeout(() => {
        
        counter.style.display='none';
    }, 500);
    playSequence();
    
}

 async function playSequence(){
    for(let i=0;i<gSeq.length;i++){
        await blinkBulb(gSeq[i]);
    }
    
    butons.forEach(btn => btn.style.display = 'block');
    counter.style.display='block';
    counter.innerHTML=`<h1>${clicks}/${gSeq.length}</h1>`;
}

function checkInput() {
    
    for (let i = 0; i < uSeq.length; i++) {
        if (gSeq[i] !== uSeq[i]) {
            alert('Game over!');
            mid.style.display='block';
            // mid.style.textAlign='center';
            heading.innerHTML=`Let's restart the game`;
            start.style.display='none';
            counter.style.display='none';
            const h2=document.createElement('h2');
            h2.innerHTML=`Your Score is ${score}`;
            const h1=document.createElement('h1');
            if(score<=5){
                h1.innerHTML=`This game requires mind, I think you don't have 😄`;
                h1.style.color='red';
            }
            else if(score<=10){
                h1.innerHTML='Even a child can score that much 😂';
                h1.style.color='red';
            }
            else if(score<=20){
                h1.innerHTML='You can only score this much 😂';
                h1.style.color='red';
            }
            else{
                h1.innerHTML='Good try this time, try again for better results!! 😊';
                h1.style.color='green';
            }
            
            mid.append(h2);
            mid.append(h1);
            butons.forEach(btn => btn.style.display = 'none');
            end.style.display = 'block'; 
            end.style.margin='0 auto';
            return;
        }
    }
    if (uSeq.length === gSeq.length) {
        score++;
        nextLevel();
    }
}



butons.forEach((btn,ind)=>{
    btn.addEventListener('click',()=>{
       
        uSeq.push(ind);
        clicks++;
        counter.innerHTML=`<h1>${clicks}/${gSeq.length}</h1>`;
        checkInput();
    })
    
})

end.addEventListener('click',()=>{
    window.location.href='index.html';
})
 