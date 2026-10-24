export default function EstimateLoading() {
  return (
    <div className="min-h-screen py-32 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex mx-auto w-48 h-10 rounded-full bg-surface-muted mb-6" />
          <div className="h-20 w-3/4 mx-auto rounded-2xl bg-surface-muted mb-6" />
          <div className="h-6 w-1/2 mx-auto rounded-xl bg-surface-muted/70" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* PO header card */}
            <div className="rounded-2xl bg-surface-muted/70 border border-white/[0.06] p-8 h-40" />
            {/* Add service button */}
            <div className="rounded-xl bg-surface-muted h-14 w-full" />
            {/* Empty state card */}
            <div className="rounded-2xl bg-surface-muted/70 border border-white/[0.06] p-16 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-surface-muted" />
              <div className="h-6 w-48 rounded-lg bg-surface-muted" />
              <div className="h-4 w-64 rounded-lg bg-surface-muted/70" />
            </div>
          </div>

          {/* Right column - summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-surface-muted/70 border border-white/[0.06] p-8 space-y-4">
              <div className="h-6 w-32 rounded-lg bg-surface-muted" />
              <div className="h-px bg-surface-muted" />
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-surface-muted/80" />
                  <div className="h-4 w-16 rounded bg-surface-muted/80" />
                </div>
              ))}
              <div className="h-px bg-surface-muted" />
              <div className="flex justify-between">
                <div className="h-6 w-16 rounded bg-surface-muted" />
                <div className="h-6 w-24 rounded bg-surface-muted" />
              </div>
              <div className="h-12 w-full rounded-xl bg-secondary/10" />
              <div className="h-12 w-full rounded-xl bg-surface-muted/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
