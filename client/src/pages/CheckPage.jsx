import { useState } from 'react';
import ClaimInput from '../components/ClaimInput';
import PipelineStatus from '../components/PipelineStatus';
import VerdictCard from '../components/VerdictCard';
import Loader from '../components/Loader';
import { checkText, checkImage } from '../api/sachcheck';

const stages = ['claim', 'search', 'evidence', 'analyze'];

export default function CheckPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('claim');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const run = async (fn) => {
    setLoading(true);
    setError('');
    setResult(null);

    // Show the pipeline immediately.
    setStage('claim');

    try {
      // Move through the visual stages while the real request is running.
      // No artificial long delays and no waiting after the result is ready.
      const searchTimer = setTimeout(() => setStage('search'), 400);
      const evidenceTimer = setTimeout(() => setStage('evidence'), 1000);
      const analyzeTimer = setTimeout(() => setStage('analyze'), 1800);

      const data = await fn();

      clearTimeout(searchTimer);
      clearTimeout(evidenceTimer);
      clearTimeout(analyzeTimer);

      // The moment the backend returns the final result,
      // show the report immediately.
      setStage('analyze');
      setResult(data);
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError('');
    setText('');
    setStage('claim');
  };

  if (result) {
    return <VerdictCard result={result} onReset={reset} />;
  }

  return (
    <div className="space-y-5">
      {!loading && !error && (
        <ClaimInput
          text={text}
          setText={setText}
          onCheck={() => run(() => checkText(text))}
          onImage={(img) => run(() => checkImage(img))}
        />
      )}

      {loading && (
        <>
          <PipelineStatus stage={stage} />

          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3 text-sm text-slate-500">
            <Loader />
            Gathering evidence…
          </div>
        </>
      )}

      {error && (
        <div className="mx-auto max-w-xl rounded-3xl border border-rose-400/20 bg-rose-400/5 p-6 text-center">
          <p className="font-semibold text-rose-200">
            We couldn't complete that check.
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            onClick={() => setError('')}
            className="mt-5 rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-950"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}