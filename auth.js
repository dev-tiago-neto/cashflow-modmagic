/* Barreira visual de uso pessoal. Não protege dados contra inspeção do código do navegador. */
'use strict';
(()=>{
 const ALLOWED_DIGEST='45821480f030aad0037fca54809b485ba8dfc163304e5bce9e5c051a9ca6cb9b';
 const PREFIX='caixa-mistico-pwa-access-v2';
 const KEY='caixa-mistico-session';
 const enc=new TextEncoder();
 async function hash(v){const dig=await crypto.subtle.digest('SHA-256',enc.encode(v));return [...new Uint8Array(dig)].map(x=>x.toString(16).padStart(2,'0')).join('');}
 function unlocked(){document.body.classList.remove('auth-locked');document.getElementById('loginPassword').value='';}
 try{if(sessionStorage.getItem(KEY)==='active')unlocked();}catch(e){/* Sessão em memória indisponível */}
 document.getElementById('loginForm').addEventListener('submit',async(e)=>{
   e.preventDefault();
   const email=document.getElementById('loginEmail').value.trim().toLowerCase();
   const pass=document.getElementById('loginPassword').value;
   const err=document.getElementById('loginError');err.textContent='';
   try{
    const result=await hash(PREFIX+'|'+email+'|'+pass);
    if(result===ALLOWED_DIGEST){try{sessionStorage.setItem(KEY,'active')}catch(e){}unlocked();}
    else{err.textContent='E-mail ou senha incorretos.';}
   }catch(e){err.textContent='Não foi possível verificar o acesso neste navegador.';}
 });
 document.getElementById('togglePassword').addEventListener('click',()=>{
  const input=document.getElementById('loginPassword');
  input.type=input.type==='password'?'text':'password';
  document.getElementById('togglePassword').textContent=input.type==='password'?'Mostrar':'Ocultar';
 });
 document.getElementById('logoutButton').addEventListener('click',()=>{
  try{sessionStorage.removeItem(KEY)}catch(e){}
  document.getElementById('loginEmail').value='';
  document.getElementById('loginPassword').value='';
  document.body.classList.add('auth-locked');
 });
})();
