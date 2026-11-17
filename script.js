/*
  Pedro Vitor — Cartão Digital Volt Monochrome
  Atualize os dados no objeto PROFILE. Campos de URL vazios NÃO geram botões.
  A foto é uma versão pequena recortada da captura de tela compartilhada.
  Para substituí-la por um retrato maior, coloque a imagem em assets/ e mude o campo photo.
*/
const PROFILE = {
  name: 'Pedro Vitor',
  role: 'CTO',
  company: 'Lumos Connect',
  photo: './assets/image.png',
  phone: '5581997267897',
  email: '',
  description: 'Liderança tecnológica e desenvolvimento de soluções digitais na Lumos Connect.',
  about: 'Pedro Vitor é CTO da Lumos Connect, atuando na liderança tecnológica da startup e na construção de soluções digitais.',
  links: {
    whatsapp: 'https://wa.me/5581997267897',
    instagram: 'https://www.instagram.com/peuuodev_?utm_source=qr',
    linkedin: 'https://www.linkedin.com/in/pedro-vitor-oliveira-91aa283a8?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    github: '',
    portfolio: '',
    lumosWebsite: ''
  },
  // São temas de atuação gerais, NÃO uma declaração de experiência específica.
  focus: ['Tecnologia', 'Desenvolvimento digital', 'Inovação', 'Liderança técnica']
};

const NETWORKS = [
  { id: 'whatsapp', name: 'WhatsApp', description: 'Vamos conversar', icon: 'whatsapp', featured: true },
  { id: 'instagram', name: 'Instagram', description: 'Acompanhe meu perfil', icon: 'instagram' },
  { id: 'linkedin', name: 'LinkedIn', description: 'Conexões profissionais', icon: 'linkedin' },
  { id: 'github', name: 'GitHub', description: 'Códigos e projetos', icon: 'github' },
  { id: 'portfolio', name: 'Portfólio', description: 'Conheça meus projetos', icon: 'briefcase' },
  { id: 'email', name: 'E-mail', description: 'Contato profissional', icon: 'mail' },
  { id: 'lumosWebsite', name: 'Lumos Connect', description: 'Conheça nossa startup', icon: 'globe' }
];

const el = id => document.getElementById(id);
const icon = (name, cls='icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return '';
  try { const url = new URL(value.trim()); return url.protocol === 'https:' ? url.href : ''; }
  catch { return ''; }
}
function linkOf(id) {return id === 'email' ? (isValidEmail(PROFILE.email) ? `mailto:${PROFILE.email}` : '') : safeUrl(PROFILE.links[id]);}

function buildNetworkLinks(){
  const container=el('social-grid');
  container.replaceChildren();
  for(const item of NETWORKS){
    const href=linkOf(item.id);
    if(!href)continue;
    const a=document.createElement('a');
    a.className='social-card'+(item.featured?' featured':'');
    a.href=href;
    if(!href.startsWith('mailto:')){a.target='_blank';a.rel='noopener noreferrer';}
    a.innerHTML=icon(item.icon)+icon('arrow','arrow')+'<div><span class="social-name"></span><span class="social-subtitle"></span></div>';
    a.querySelector('.social-name').textContent=item.name;
    a.querySelector('.social-subtitle').textContent=item.description;
    a.setAttribute('aria-label',item.name+' — '+item.description);
    container.appendChild(a);
  }
}
function escapeVCard(value){return String(value||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');}
function saveContact(){
  const words=PROFILE.name.trim().split(/\s+/);
  const surname=words.pop() || '';
  const first=words.join(' ');
  const lines=['BEGIN:VCARD','VERSION:3.0',`FN:${escapeVCard(PROFILE.name)}`,`N:${escapeVCard(surname)};${escapeVCard(first)};;;`,`ORG:${escapeVCard(PROFILE.company)}`,`TITLE:${escapeVCard(PROFILE.role)}`];
  const digits=(PROFILE.phone||'').replace(/\D/g,'');
  if(digits) lines.push(`TEL;TYPE=CELL:+${digits}`);
  if(isValidEmail(PROFILE.email)) lines.push(`EMAIL;TYPE=INTERNET:${PROFILE.email}`);
  const website=safeUrl(PROFILE.links.portfolio)||safeUrl(PROFILE.links.linkedin);
  if(website) lines.push(`URL:${website}`);
  lines.push('END:VCARD');
  const blob=new Blob([lines.join('\r\n')+'\r\n'],{type:'text/vcard;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='Pedro-Vitor.vcf';document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  toast('Contato pronto para salvar');
}
let currentToast;
function toast(message){
  const target=el('toast');target.textContent=message;target.classList.add('show');
  clearTimeout(currentToast);currentToast=setTimeout(()=>target.classList.remove('show'),2600);
}
async function copyPhone(){
  const num='+'+(PROFILE.phone||'').replace(/\D/g,'');
  if(!num.trim()||num==='+')return;
  try{await navigator.clipboard.writeText(num);toast('Número copiado!');}
  catch{toast('Número: '+num);}
}
function init(){
  el('hero-name').textContent=PROFILE.name;
  el('hero-summary').textContent=PROFILE.description;
  el('about-description').textContent=PROFILE.about;
  el('year').textContent=String(new Date().getFullYear());
  el('profile-photo').src=PROFILE.photo;
  const whatsapp=safeUrl(PROFILE.links.whatsapp);
  if(whatsapp){el('whatsapp-action').href=whatsapp;}else{el('whatsapp-action').hidden=true;}
  const tags=el('focus-tags');
  for(const value of PROFILE.focus){const span=document.createElement('span');span.className='tag';span.textContent=value;tags.appendChild(span);}
  buildNetworkLinks();
  el('save-contact').addEventListener('click',saveContact);
  el('copy-phone').addEventListener('click',copyPhone);
}
document.addEventListener('DOMContentLoaded',init);
