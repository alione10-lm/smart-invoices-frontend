import { Mail, Phone } from "lucide-react"
import { getInitials } from "../../utils/format"
import { Link } from "react-router-dom"

const SupplierCard = (supplier) => {
  return (
    <Link to={`/suppliers/${supplier._id}`} className="supplier-card border border-border bg-secondary rounded-lg p-4 text-card-foreground cursor-pointer hover:bg-secondary/80 transition-all duration-75 hover:border-ring hover:scale-1.5">
        <div className="card_header flex items-center mb-5">
            <div className="avatar flex-center w-12 h-12 rounded-full bg-chart-5 text-white font-bold text-lg">
                { getInitials(supplier.name) }
            </div>

            <div className="supplier_info ml-4">
                <h2 className="supplier_name text-lg font-medium">{supplier.name}</h2>
                <p className="supplier_address text-[12px] text-muted-foreground">
                    {supplier.address}
                </p>
            </div>
        </div>

        <div className="card_body text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
            <p className="supplier_email mb-2">
                <Mail className="inline-block w-4 h-4 mr-1" />
                <span className="ml-1">{supplier.email}</span>
            </p>
            <p className="supplier_phone">
                <Phone className="inline-block w-4 h-4 mr-1" />
                <span className="ml-1">{supplier.phone}</span>
            </p>
        </div> 

        <div className="card_footer flex items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">Total: <span className="text-card-foreground">${supplier.total?.toFixed(2)}</span></span>
            <span className="text-xs text-muted-foreground"><span className="text-card-foreground">{supplier.invoiceCount}</span> Invoices</span>
        </div>  

    </Link>
  )
}

export default SupplierCard
