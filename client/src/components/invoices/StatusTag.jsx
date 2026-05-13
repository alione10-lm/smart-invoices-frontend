const StatusTag = ({ status }) => {
    const statusStyles = {
        paid: "bg-green-200 text-green-800 border",
        partially_paid: "bg-yellow-200 text-yellow-800",
        unpaid: "bg-red-200 text-red-900",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}
        >
            {status.replace("_", " ")}
        </span>
    );
};

export default StatusTag;
