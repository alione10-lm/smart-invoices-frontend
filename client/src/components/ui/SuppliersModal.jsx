import { useContext } from "react";
import { ModalContext, SupplierCreateContext } from "../../contexts/suppliersContext.js";




const SuppliersModal = () => {
  const { createSupplier } = useContext(SupplierCreateContext)

  const { setIsModalOpen } = useContext(ModalContext)

  const handler = (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      contact: form.contact.value,
    };

    createSupplier(data);
  };

  // useEffect(() => {
  //   const creatSupplierApi = async () => {
  //     try {
  //       const res = await api.post("/suppliers", creatSupplier);
  //       setIsModalOpen(false)
  //     } catch (err) {
  //       setError(err);
  //     }
  //   };

  //   creatSupplierApi();
  // }, [creatSupplier]);

  return (
    <form action="" onSubmit={handler}>
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <div className="flex flex-col gap-1 text-sm w-full">
          <label htmlFor="name" className="text-[12px] font-bold">
            Supplier Name
          </label>
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
          <label htmlFor="email" className="text-[12px] font-bold">
            Supplier Email
          </label>
          <input
            required
            type="text"
            name="email"
            id="email"
            placeholder="Enter supplier email"
            className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phone" className="text-[12px] font-bold">
            Supplier phone
          </label>
          <input
            required
            type="number"
            id="phone"
            name="phone"
            placeholder="+212 4032 02 02"
            className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="saddress" className="text-[12px] font-bold">
            Supplier address
          </label>
          <input
            required
            type="text"
            id="address"
            name="address"
            placeholder="Enter supplier address"
            className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="contact" className="text-[12px] font-bold">
            Supplier contact
          </label>
          <input
            required
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter supplier contact"
            className="input-bordered focus:border p-2 rounded-md focus:border-primary focus:shadow-primary ring ring-ring focus:shadow-lg w-full outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 mt-5">
        <button 
          onClick={() => setIsModalOpen(false)}
          className="border border-border py-2 px-5 cursor-pointer hover:border-primary rounded-lg font-bold text-foreground">
          Cansl
        </button>
        <button
          type="submit"
          className="border border-border py-2 px-5 cursor-pointer hover:bg-chart-5 rounded-lg font-bold text-foreground bg-chart-4"
        >
          create supplier
        </button>
      </div>
    </form>
  );
};

export default SuppliersModal;
