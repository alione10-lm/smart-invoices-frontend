import { useEffect, useState } from "react"
import TopBar from "../components/Layouts/TopBar"
import SupplierCard from "../components/ui/SupplierCard"
import { api } from "../services/api.js"
import { ModalContext } from "../contexts/suppliersContext.js"
import Modal from "../components/ui/Modal.jsx"



const Suppliers = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [creatSupplier, setCreatSupplier] = useState({})

    const [suppliers, setSuppliers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await api.get("/suppliers")
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error)
                setError(error)
            }finally {
                setLoading(false)
            }
        }
        fetchSuppliers()
    }, [])

    const handler = (e) => {
        e.preventDefault()

        const from = e.target;

        const data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            contact: form.contact.value,
        }

        setCreatSupplier(data)
        
    }

    useEffect(() => {
        const creatSupplierApi = async () => {
            try{
                const res = await api.post('/suppliers', creatSupplier);

            }catch(err) {
                setError(error)
            }
        }

        creatSupplier()
    },[creatSupplier])


  return (
    <>
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <TopBar title="Suppliers" btn_name="Add Supplier" />
        
          {loading ? (
            <SuppliersSkeleton />
          ) : error ? (
              <div className="text-red-500">Error: {error.message}</div>
          ) : (
              <div className="suppliers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               { 
                    suppliers.map((supplier) => (
                        <SupplierCard key={supplier._id} {...supplier} />
                    ))
                }
              </div>
            )
          }

          {
            isModalOpen && (
                <Modal isOpen={isModalOpen}>
                    <form action=""> 

                    <div className="flex flex-col items-center justify-center gap-5 h-full">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name" className="text-[12px] font-bold">Supplier Name</label>
                            <input 
                               required
                               type="text"
                               name="name"
                               id="name" 
                               placeholder="Enter supplier name" 
                               className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="text-[12px] font-bold">Supplier Email</label>
                            <input 
                               required
                               type="text" 
                               name="email"
                               id="email" 
                               placeholder="Enter supplier name" 
                               className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="phone" className="text-[12px] font-bold">Supplier phone</label>
                            <input 
                               required
                               type="text" 
                               id="phone" 
                               name="phone"
                               placeholder="Enter supplier name" 
                               className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="saddress" className="text-[12px] font-bold">Supplier address</label>
                            <input 
                               required
                               type="text" 
                               id="address" 
                               name="address"
                               placeholder="Enter supplier name" 
                               className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="contact" className="text-[12px] font-bold">Supplier contact</label>
                            <input 
                               required
                               type="text" 
                               id="contact" 
                               name="contact"
                               placeholder="Enter supplier name" 
                               className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-5 mt-5">
                        <button className="border border-border py-4 px-5 cursor-pointer hover:border-primary rounded-lg font-bold text-foreground">Cansl</button>
                        <button type="submet" className="border border-border py-4 px-5 cursor-pointer hover:bg-chart-5 rounded-lg font-bold text-foreground bg-chart-4">Confirm</button>
                    </div>
                    </form>
                </Modal>
            )
          }

        </ModalContext.Provider>
    </>
  )
}

const SuppliersSkeleton = () => {
    return (
        <div className="suppliers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="supplier-card border border-border bg-secondary rounded-lg p-4 text-card-foreground h-50 animate-pulse">
                    <div className="card_header flex items-center gap-3  mb-5 w-full">
                        <div className="avatar flex-center w-15 h-12 rounded-full bg-muted-foreground font-bold text-lg">
                            
                        </div>

                        <div className="supplier_info w-full">
                            <div className="h-4 bg-muted-foreground/30 rounded w-1/2 mb-2"></div>
                            <div className="h-3 bg-muted-foreground/30 rounded w-1/3"></div>
                        </div>

                    </div>

                        <div className="card_body text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
                            <div className="h-3 bg-muted-foreground/30 rounded w-full mb-2"></div>
                            <div className="h-3 bg-muted-foreground/30 rounded w-3/4"></div>
                        </div>

                    
                        <div className="card_footer flex items-center w-full justify-between gap-3">
                            <span className="h-3 bg-muted-foreground/30 rounded w-1/4"></span>
                            <span className="h-3 bg-muted-foreground/30 rounded w-1/4"></span>
                        </div>  
                </div>
            ))}
        </div>
    )
}

export default Suppliers
