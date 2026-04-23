export const ProjectOverview = () => {
  return (
    <div className="flex flex-col items-center justify-end">
      <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center mb-5">
        <span className="text-white dark:text-zinc-900 font-bold text-xl">K</span>
      </div>
      <h1 className="text-3xl font-bold mb-2 tracking-tight text-zinc-900 dark:text-zinc-50">
        KhushAI
      </h1>
      <p className="text-center text-zinc-500 dark:text-zinc-400 max-w-md">
        Your AI-powered legal assistant for research, drafting, case analysis, and procedural guidance.
      </p>
    </div>
  );
};