import { useEffect, useState } from "react";
import TopBar from "../components/Layouts/TopBar";
import SupplierCard from "../components/ui/SupplierCard";
import { api } from "../services/api.js";
import {
  ModalContext,
  SupplierCreateContext,
} from "../contexts/suppliersContext.js";
import Modal from "../components/ui/Modal.jsx";
import SuppliersModal from "../components/ui/SuppliersModal.jsx";
import Alert from "../components/ui/Alert.jsx";


const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [suppliers, setSuppliers] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/suppliers");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const createSupplier = async (supplierData) => {
    try {
      const res = await api.post("/suppliers", supplierData);
      setSuppliers((prev) => [...prev, res.data]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <TopBar title="Suppliers" btn_name="Add Supplier" />

        {loading ? (
          <SuppliersSkeleton />
        ) : error ? (
          <Alert success={false} message={"Internal server"} />
        ) : (
          <div className="suppliers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {suppliers.map((supplier) => (
              <SupplierCard 
                key={supplier._id} {...supplier}                
            />
            ))}
          </div>
        )}

        {isModalOpen && (
          <SupplierCreateContext.Provider
            value={{ createSupplier }}
          >
            <Modal>
              <SuppliersModal />
            </Modal>
          </SupplierCreateContext.Provider>
        )}
      </ModalContext.Provider>
    </>
  );
};

const SuppliersSkeleton = () => {
  return (
    <div className="suppliers-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="supplier-card border border-border bg-secondary rounded-lg p-4 text-card-foreground h-50 animate-pulse"
        >
          <div className="card_header flex items-center gap-3  mb-5 w-full">
            <div className="avatar flex-center w-15 h-12 rounded-full bg-muted-foreground font-bold text-lg"></div>

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
  );
};

export default Suppliers;
