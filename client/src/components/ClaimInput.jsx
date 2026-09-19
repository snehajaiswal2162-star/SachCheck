import { ImageUp, Send, Sparkles } from 'lucide-react';
import { useRef } from 'react';
const samples=[
 'सरकार ने कल से सभी UPI transactions पर 10% टैक्स लगाने का फैसला किया है।',
 'NASA has released a new photo of Diwali celebrations from space.',
 'Forward this message to 10 people to receive a free mobile recharge.'
];
export default function ClaimInput({text,setText,onCheck,onImage}){
 const ref=useRef();
 const choose=e=>{const f=e.target.files?.[0];if(!f)return;const reader=new FileReader();reader.onload=()=>onImage(reader.result);reader.readAsDataURL(f)};
 return <div className="glass mx-auto w-full max-w-3xl rounded-[2rem] p-6 shadow-glow sm:p-8">
  <div className="mb-5 flex items-start justify-between gap-4"><div><p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-teal-300"><Sparkles size={14}/> Evidence-first verification</p><h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Don't just forward.<br/><span className="text-teal-300">Verify.</span></h1></div><div className="hidden rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-right sm:block"><p className="text-[10px] uppercase tracking-widest text-slate-500">Built for</p><p className="text-xs font-semibold text-slate-200">Hack Devengers 2.0</p></div></div>
  <textarea value={text} onChange={e=>setText(e.target.value)} rows={7} placeholder="Paste a forwarded message here…" className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-[15px] leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-teal-400/60 focus:ring-4 focus:ring-teal-400/10"/>
  <div className="mt-3 flex flex-wrap gap-2">{samples.map((s,i)=><button key={i} onClick={()=>setText(s)} className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 transition hover:border-teal-400/40 hover:text-teal-200">Try sample {i+1}</button>)}</div>
  <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button onClick={()=>ref.current?.click()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-900 px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"><ImageUp size={18}/> Upload screenshot</button><input ref={ref} onChange={choose} type="file" accept="image/*" className="hidden"/><button disabled={!text.trim()} onClick={onCheck} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-300 px-5 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"><Send size={18}/> Check claim</button></div>
  <p className="mt-4 text-center text-xs leading-5 text-slate-500">Evidence is retrieved from the web. When evidence is insufficient, SachCheck says <b className="text-slate-300">Unverified</b> instead of guessing.</p>
 </div>
}
