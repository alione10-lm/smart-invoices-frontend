export default function InvoiceTableSkeleton() {
    const rows = [0, 1, 2, 3, 4];

    return (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-[2fr_1.4fr_1.2fr_1.4fr_1.2fr_1.6fr_0.3fr] gap-4 px-5 py-4 border-b border-border">
                {["w-3/5", "w-4/5", "w-3/5", "w-1/2", "w-4/5", "w-4/5"].map(
                    (w, i) => (
                        <div
                            key={i}
                            className={`h-2.5 ${w} rounded bg-muted animate-pulse`}
                        />
                    ),
                )}
                <div />
            </div>

            {rows.map((i) => (
                <div
                    key={i}
                    className="grid grid-cols-[2fr_1.4fr_1.2fr_1.4fr_1.2fr_1.6fr_0.3fr] gap-4 items-center px-5 py-[18px] border-b border-border last:border-b-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    <div className="h-3.5 w-3/4 rounded bg-muted/60 animate-pulse" />
                    <div className="h-3.5 w-3/5 rounded bg-muted/60 animate-pulse" />
                    <div className="h-3.5 w-4/5 rounded bg-muted/60 animate-pulse" />
                    <div className="h-6 w-24 rounded-full bg-muted/60 animate-pulse" />
                    <div className="h-3.5 w-1/2 rounded bg-muted/60 animate-pulse" />
                    <div className="h-6 w-full rounded-md bg-muted/60 animate-pulse" />
                    <div className="h-5 w-5 rounded justify-self-end bg-muted/60 animate-pulse" />
                </div>
            ))}
        </div>
    );
}
