let inEvidenza=[];
function onDetails(event){
    const p = event.currentTarget;
    const box = p.parentNode;
    const idx = box.dataset.index;    
      if(box.dataset.open === 'false'){
          box.dataset.open='true';
          p.textContent='Mostra meno dettagli';  
          const desc=document.createElement('p');        
          desc.textContent=cont[idx].descrizione;
          box.appendChild(desc);
        }
        else{
            box.dataset.open='false';
            p.textContent='Mostra più dettagli';
            box.lastChild.remove();
        }
  }

for(const c of cont){
    const grid = document.querySelector('.box-grid');
    const sez= document.createElement('div');
    const head=document.createElement('div');
    const titolo=document.createElement('h1')
    const hl=document.createElement('img');
    const immagine = document.createElement('img');
    const descrizione=document.createElement('p');
    sez.classList.add('box');
    sez.setAttribute('data-index', c.id);
    sez.setAttribute('data-open', 'false');
    grid.appendChild(sez);    
    head.classList.add('head');
    sez.appendChild(head);    
    titolo.textContent= c.titolo;
    head.appendChild(titolo);    
    hl.classList.add('highlight');
    hl.src='img_mhw2/img3.png';
    hl.classList.add('cursor');
    hl.setAttribute('data-checked', 'false');
    head.appendChild(hl);
    immagine.src=c.image;
    sez.appendChild(immagine);
    descrizione.textContent='Mostra più dettagli';
    descrizione.classList.add('cursor');
    sez.appendChild(descrizione);
    descrizione.addEventListener('click', onDetails);
}

function createBoxEvidence(titolo, immagine, indice){
  const evidenza = document.querySelector('div .evidenza');
  const card = document.createElement('div'); 
  const boxtitle = document.createElement('div');
  const title = document.createElement('h4');
  const img = document.createElement('img');
  const remove = document.createElement('img');
  title.textContent=titolo;
  img.src=immagine;
  remove.src= 'img_mhw2/img8.png';
  remove.classList.add('cursor');
  boxtitle.appendChild(title);
  boxtitle.appendChild(remove);
  boxtitle.classList.add('title')
  card.classList.add('box-evidence')
  card.appendChild(boxtitle);
  card.appendChild(img);
  card.setAttribute('data-id', indice);
  evidenza.appendChild(card);
  remove.addEventListener('click', removeEvidence);
  return evidenza;
}

function putEvidence(event){
  const hl = event.currentTarget; 
  const box= hl.parentNode.parentNode;
  const id = box.dataset.index;  
if(hl.dataset.checked==='false'){
    hl.src='img_mhw2/img4a.webp';  
    const evidenza = createBoxEvidence(cont[id].titolo, cont[id].image, id);
    const contenitore = evidenza.parentNode;
    contenitore.classList.remove('hidden');
    contenitore.classList.add('show');
    hl.removeEventListener('click', putEvidence);
    hl.classList.remove('cursor');  
    inEvidenza.push(evidenza);  
 }
}

const highlights = document.querySelectorAll('.head img');
for(const h of highlights){
  h.addEventListener('click', putEvidence);
}

function removeEvidence(event){  
  const head= event.currentTarget.parentNode;
  const box =head.parentNode;
  box.remove();
  const grid_box =document.querySelectorAll('.box-grid .box');  
for (const b of grid_box){
  if(b.dataset.index===box.dataset.id){    
    const immg = b.querySelector('.head img');
    immg.src='img_mhw2/img3.png';
    immg.classList.add('cursor');
    immg.addEventListener('click', putEvidence);
    inEvidenza.pop(box);      
if(inEvidenza.length===0){
  const cont = document.querySelector('#intro .show');
  cont.classList.remove('show');
  cont.classList.add('hidden');
       }       
     }
   }
}

const not_evidence = document.querySelectorAll('.title img');
for(const ne of not_evidence){
  ne.addEventListener('click', removeEvidence);
}

const see=[];
function search(event){ 
 see.splice(0);
const grd = document.querySelector('.box-grid');
const searchbar = document.querySelector('article.ricerca');
searchbar.innerHTML=' ';  
const crc=event.currentTarget.value;  
if(crc!=''){    
  for(let c of cont){       
     if(c.titolo.toLowerCase().indexOf(crc.toLowerCase())!==-1){       
        grd.classList.remove('box-grid');
        grd.classList.add('hidden');   
        const card = document.createElement('div'); 
        const boxtitle = document.createElement('div');
        const title = document.createElement('h4');
        const img = document.createElement('img');   
        const desc = document.createElement('p');
        desc.textContent=c.descrizione;
        title.textContent=c.titolo;
        img.src=c.image;   
        boxtitle.appendChild(title);   
        boxtitle.classList.add('title')
        card.classList.add('box-ricerca')
        card.appendChild(boxtitle);
        card.appendChild(img);
        card.appendChild(desc);
        searchbar.classList.remove('hidden');
        searchbar.classList.add('ricerca');
        searchbar.appendChild(card);  
        see.push(card);
      }    
  } 
  if(see.length===0)
     grd.classList.remove('hidden');
     grd.classList.add('box-grid');  
  }
  else {
     grd.classList.remove('hidden');
     grd.classList.add('box-grid');
      }    
    }
const cerca = document.querySelector('input');
cerca.addEventListener('keyup', search);