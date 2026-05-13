import { ArrowLeft, Download, Plus, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"
import { getInitials } from "../utils/format"

const statusConfig = {
  paid:          { dot: "bg-green-500",  text: "text-green-400",  bg: "bg-green-500/10",  label: "paid" },
  unpaid:        { dot: "bg-destructive",text: "text-destructive",bg: "bg-destructive/10", label: "unpaid" },
  partially_paid:{ dot: "bg-yellow-500",text: "text-yellow-400", bg: "bg-yellow-500/10",  label: "partially paid" },
}

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.unpaid
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

const fmt = (n) => `$${(n ?? 0).toFixed(2)}`

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    : "—"

const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getInvoiceDetails = async () => {
      try {
        const data = await api.get(`/invoices/${id}`)
        await new Promise((r) => setTimeout(r, 1000))
        setInvoice(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getInvoiceDetails()
  }, [id])

  if (loading) return <DetailsSkeleton />

  if (error) return (
    <div className="flex-center flex-col gap-3 mt-20 text-muted-foreground">
      <p className="text-destructive font-medium">Failed to load invoice.</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Go back
      </button>
    </div>
  )

  const supplierName = invoice.supplierName ?? invoice.supplierId?.name ?? "Unknown"
  const invoiceNumber = invoice.invoiceNumber ?? invoice._id ?? id
  const total = invoice.amount ?? 0
  const paid = invoice.totalpaid ?? 0
  const outstanding = invoice.remainingAmount ?? total - paid
  const progress = total > 0 ? Math.min((paid / total) * 100, 100) : 0
  const lineItems = invoice.lineItems ?? []
  const payments = invoice.payments ?? []

  return (
    <>
      {/* Page header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 hover:text-primary transition-colors" />
        </button>
        <h1 className="text-2xl font-semibold">Invoice Detail</h1>
      </div>

      {/* Main invoice card */}
      <div className="w-full rounded-lg border border-border bg-secondary p-6 mb-5">

        {/* Top row: identity + actions */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-center w-14 h-14 rounded-full bg-chart-5 text-white font-bold text-lg shrink-0">
              {getInitials(supplierName)}
            </div>
            <div>
              <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-1">
                Invoice · {invoiceNumber}
              </p>
              <h2 className="text-xl font-bold mb-1">{supplierName}</h2>
              <p className="text-sm text-muted-foreground">
                {invoice.issuedDate ? `Issued ${fmtDate(invoice.issuedDate)} · ` : ""}
                Due {fmtDate(invoice.dueDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={invoice.status} />
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-colors cursor-pointer">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="button_primary">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-6" />

        {/* Amount summary */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total amount</p>
            <p className="text-2xl font-bold">{fmt(total)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Paid</p>
            <p className="text-2xl font-bold text-primary">{fmt(paid)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
            <p className="text-2xl font-bold text-destructive">{fmt(outstanding)}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Payment progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom two columns */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">

        {/* Line items */}
        <div className="rounded-lg border border-border bg-secondary p-6">
          <h3 className="text-base font-bold mb-5">Line items</h3>

          {lineItems.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left pb-3 font-medium">Description</th>
                  <th className="text-right pb-3 font-medium">Qty</th>
                  <th className="text-right pb-3 font-medium">Rate</th>
                  <th className="text-right pb-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3.5 text-sm">{item.description}</td>
                    <td className="py-3.5 text-sm text-right text-muted-foreground">{item.qty ?? 1}</td>
                    <td className="py-3.5 text-sm text-right text-muted-foreground">{fmt(item.rate)}</td>
                    <td className="py-3.5 text-sm text-right font-semibold">{fmt((item.qty ?? 1) * (item.rate ?? 0))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border">
                  <td colSpan={3} className="pt-4 text-sm text-right text-muted-foreground">Subtotal</td>
                  <td className="pt-4 text-sm text-right font-bold">{fmt(total)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            /* Fallback: show the invoice itself as a single line item */
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left pb-3 font-medium">Description</th>
                  <th className="text-right pb-3 font-medium">Qty</th>
                  <th className="text-right pb-3 font-medium">Rate</th>
                  <th className="text-right pb-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3.5 text-sm">Services from {supplierName}</td>
                  <td className="py-3.5 text-sm text-right text-muted-foreground">1</td>
                  <td className="py-3.5 text-sm text-right text-muted-foreground">{fmt(total)}</td>
                  <td className="py-3.5 text-sm text-right font-semibold">{fmt(total)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="pt-4 text-sm text-right text-muted-foreground">Subtotal</td>
                  <td className="pt-4 text-sm text-right font-bold">{fmt(total)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Payments */}
        <div className="rounded-lg border border-border bg-secondary p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold">Payments</h3>
            <button className="button_primary">
              <Plus className="w-4 h-4" />
              Add payment
            </button>
          </div>

          {payments.length > 0 ? (
            <div className="space-y-3">
              {payments.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{p.method ?? "Payment"}</p>
                    <p className="text-xs text-muted-foreground">{fmtDate(p.date)}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">{fmt(p.amount)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-center py-14 text-sm text-muted-foreground">
              No payments recorded yet.
            </div>
          )}
        </div>

      </div>
    </>
  )
}

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
        <div key={i} className="rounded-lg border border-border bg-secondary p-6 animate-pulse">
          <div className="h-5 w-28 rounded bg-muted-foreground/20 mb-5" />
          <div className="border-b border-border pb-3 mb-3 flex gap-8">
            {["w-1/2", "w-8", "w-12", "w-12"].map((w, j) => (
              <div key={j} className={`h-3 ${w} rounded bg-muted-foreground/20`} />
            ))}
          </div>
          {[1, 2].map((r) => (
            <div key={r} className="flex gap-8 py-3.5 border-b border-border last:border-0">
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
)

export default Details
