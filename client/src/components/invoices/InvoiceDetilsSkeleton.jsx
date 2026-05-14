const DetailsSkeleton = () => (
    <>
        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-6 animate-pulse">
            <div className="w-8 h-8 rounded-md bg-muted-foreground/20" />
            <div className="h-7 w-40 rounded bg-muted-foreground/20" />
        </div>

        {/* Main card skeleton */}
        <div className="w-full rounded-lg border border-border bg-secondary p-6 mb-5 animate-pulse">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-muted-foreground/20 shrink-0" />
                    <div>
                        <div className="h-3 w-32 rounded bg-muted-foreground/20 mb-2" />
                        <div className="h-6 w-48 rounded bg-muted-foreground/20 mb-2" />
                        <div className="h-3 w-56 rounded bg-muted-foreground/20" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="h-7 w-20 rounded bg-muted-foreground/20" />
                    <div className="h-10 w-28 rounded-lg bg-muted-foreground/20" />
                    <div className="h-10 w-24 rounded-lg bg-muted-foreground/20" />
                </div>
            </div>

            <div className="border-t border-border mb-6" />

            <div className="grid grid-cols-3 gap-6 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <div className="h-3 w-24 rounded bg-muted-foreground/20 mb-2" />
                        <div className="h-8 w-32 rounded bg-muted-foreground/20" />
                    </div>
                ))}
            </div>

            <div className="h-3 w-36 rounded bg-muted-foreground/20 mb-2" />
            <div className="h-2 w-full rounded-full bg-muted-foreground/20" />
        </div>

        {/* Bottom columns skeleton */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            {[1, 2].map((i) => (
                <div
                    key={i}
                    className="rounded-lg border border-border bg-secondary p-6 animate-pulse"
                >
                    <div className="h-5 w-28 rounded bg-muted-foreground/20 mb-5" />
                    <div className="border-b border-border pb-3 mb-3 flex gap-8">
                        {["w-1/2", "w-8", "w-12", "w-12"].map((w, j) => (
                            <div
                                key={j}
                                className={`h-3 ${w} rounded bg-muted-foreground/20`}
                            />
                        ))}
                    </div>
                    {[1, 2].map((r) => (
                        <div
                            key={r}
                            className="flex gap-8 py-3.5 border-b border-border last:border-0"
                        >
                            <div className="h-4 flex-1 rounded bg-muted-foreground/20" />
                            <div className="h-4 w-8 rounded bg-muted-foreground/20" />
                            <div className="h-4 w-16 rounded bg-muted-foreground/20" />
                            <div className="h-4 w-16 rounded bg-muted-foreground/20" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </>
);

export default DetailsSkeleton;
