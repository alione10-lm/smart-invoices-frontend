import { ArrowLeft, Download, FilePlus, Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../services/api"
import { getInitials } from "../utils/format"
import SupplierDetailSkeleton from "../components/ui/SupplierDetailSkeleton"

const statusConfig = {
  paid:          { dot: "bg-green-500",      text: "text-green-400",      bg: "bg-green-500/10",      label: "paid" },
  unpaid:        { dot: "bg-destructive",     text: "text-destructive",    bg: "bg-destructive/10",    label: "unpaid" },
  partially_paid:{ dot: "bg-yellow-500",     text: "text-yellow-400",     bg: "bg-yellow-500/10",     label: "partially paid" },
}

const InvoiceStatus = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.unpaid
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

const SupplierDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [supplier, setSupplier] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const data = await api.get(`/suppliers/${id}`)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSupplier(data.data)
        
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSupplier()
  }, [id])

  if (loading) return <SupplierDetailSkeleton />

  if (error) return (
    <div className="flex-center flex-col gap-3 mt-20 text-muted-foreground">
      <p className="text-destructive font-medium">Failed to load supplier.</p>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Go back
      </button>
    </div>
  )

  const stats = [
    { label: "Total spent",          value: `$${((supplier.total ?? 0) / 1000).toFixed(1)}K`,          highlight: false },
    { label: "Invoices",             value: supplier.invoiceCount ?? 0,                                  highlight: false },
    { label: "Outstanding",          value: `$${((supplier.outstanding ?? 0) / 1000).toFixed(1)}K`,     highlight: true  },
    { label: "Avg. days to payment", value: supplier.avgDaysToPayment ?? "—",                            highlight: false },
  ]

  return (
    <>
      
      <div className="Detail_header flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 hover:text-primary transition-colors" />
        </button>
        <h1 className="text-2xl font-semibold">Supplier Detail</h1>
      </div>

      
      <div className="supplier_detail w-full rounded-lg border border-border bg-secondary p-6 mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-center w-16 h-16 rounded-full bg-chart-5 text-white font-bold text-xl shrink-0">
            {getInitials(supplier.name)}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1.5">{supplier.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {supplier.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                {supplier.phone}
              </span>
              {supplier.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {supplier.address}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="button_primary">
            <FilePlus className="w-4 h-4" />
            New invoice
          </button>
        </div>
      </div>

      
      <div className="supplier_stats grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-secondary p-5">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.highlight ? "text-destructive" : "text-foreground"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      
      <div className="supplier_invoices w-full rounded-lg border border-border bg-secondary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Invoices from {supplier.name}</h3>
          <span className="text-sm text-muted-foreground">{supplier.invoiceCount ?? 0} total</span>
        </div>

        {supplier.invoices?.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left pb-3 font-medium">Invoice</th>
                <th className="text-left pb-3 font-medium">Amount</th>
                <th className="text-left pb-3 font-medium">Due Date</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {supplier.invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="py-4 font-semibold text-sm">{invoice.invoiceNumber}</td>
                  <td className="py-4 font-semibold text-sm">
                    ${(invoice.amount ?? 0).toFixed(2)}
                  </td>
                  <td className="py-4 text-sm text-muted-foreground">
                    {invoice.dueDate
                      ? new Date(invoice.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="py-4">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No invoices found for this supplier.</p>
        )}
      </div>
    </>
  )
}



export default SupplierDetail
