export const Header = () => {
  return (
    <div className="fixed right-0 left-0 w-full top-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center p-4 max-w-4xl mx-auto">
        <div className="flex flex-row items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
            <span className="text-white dark:text-zinc-900 font-bold text-sm">K</span>
          </div>
          <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight">
            KhushAI
          </span>
        </div>
      </div>
    </div>
  );
};