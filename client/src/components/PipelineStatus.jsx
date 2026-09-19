import { Check, Search, FileText, BrainCircuit } from 'lucide-react';
const steps=[['claim','Claim extracted',Check],['search','Searching the web',Search],['evidence','Evidence collected',FileText],['analyze','Analyzing evidence',BrainCircuit]];
export default function PipelineStatus({stage}){
 const idx=steps.findIndex(([id])=>id===stage);
 return <div className="glass mx-auto w-full max-w-2xl rounded-3xl p-6 shadow-glow animate-fade-up">
  <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-teal-300">Verification pipeline</p><h2 className="mt-1 text-lg font-semibold">Following the evidence</h2></div><span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs text-teal-200">Live</span></div>
  <div className="space-y-3">{steps.map(([id,label,Icon],i)=>{const done=idx>i;const active=idx===i;return <div key={id} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all ${done?'border-emerald-400/20 bg-emerald-400/5':active?'border-teal-400/30 bg-teal-400/5':'border-slate-700/50 bg-slate-900/30'}`}><span className={`grid h-8 w-8 place-items-center rounded-xl ${done?'bg-emerald-400/15 text-emerald-300':active?'bg-teal-400/15 text-teal-300':'bg-slate-800 text-slate-500'}`}>{done?<Check size={17}/>:<Icon size={17}/>}</span><span className={`flex-1 text-sm font-medium ${done||active?'text-slate-100':'text-slate-500'}`}>{label}</span>{active&&<span className="h-2 w-2 animate-pulse rounded-full bg-teal-300"/>}{done&&<span className="text-xs text-emerald-300">done</span>}</div>})}</div>
 </div>
}
