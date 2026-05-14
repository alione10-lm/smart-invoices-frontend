

const SupplierDetailSkeleton = () => (
  <>
    {/* Header skeleton */}
    <div className="flex items-center gap-4 mb-6 animate-pulse">
      <div className="w-8 h-8 rounded-md bg-muted-foreground/20" />
      <div className="h-7 w-44 rounded bg-muted-foreground/20" />
    </div>

    {/* Info card skeleton */}
    <div className="w-full rounded-lg border border-border bg-secondary p-6 mb-5 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted-foreground/20 shrink-0" />
        <div>
          <div className="h-6 w-48 rounded bg-muted-foreground/20 mb-2.5" />
          <div className="flex gap-4">
            <div className="h-4 w-36 rounded bg-muted-foreground/20" />
            <div className="h-4 w-28 rounded bg-muted-foreground/20" />
            <div className="h-4 w-24 rounded bg-muted-foreground/20" />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-24 rounded-lg bg-muted-foreground/20" />
        <div className="h-10 w-32 rounded-lg bg-muted-foreground/20" />
      </div>
    </div>

    {/* Stats skeleton */}
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 mb-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border border-border bg-secondary p-5 animate-pulse">
          <div className="h-3 w-28 rounded bg-muted-foreground/20 mb-3" />
          <div className="h-8 w-20 rounded bg-muted-foreground/20" />
        </div>
      ))}
    </div>

    {/* Table skeleton */}
    <div className="w-full rounded-lg border border-border bg-secondary p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-56 rounded bg-muted-foreground/20" />
        <div className="h-4 w-16 rounded bg-muted-foreground/20" />
      </div>
      <div className="border-b border-border pb-3 mb-3 flex gap-10">
        {["w-16", "w-14", "w-18", "w-14"].map((w, i) => (
          <div key={i} className={`h-3 ${w} rounded bg-muted-foreground/20`} />
        ))}
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-10 py-4 border-b border-border last:border-0">
          <div className="h-4 w-20 rounded bg-muted-foreground/20" />
          <div className="h-4 w-20 rounded bg-muted-foreground/20" />
          <div className="h-4 w-28 rounded bg-muted-foreground/20" />
          <div className="h-6 w-20 rounded bg-muted-foreground/20" />
        </div>
      ))}
    </div>
  </>
)


export default SupplierDetailSkeleton