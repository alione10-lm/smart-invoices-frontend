import { useNavigate } from "react-router-dom";

const DropwDownItem = (props) => {
    const navigate = useNavigate();

    if (props.type === "delete") {
        return (
            <button className={props.className} onClick={props.handleDelete}>
                {props.children}
            </button>
        );
    }
    if (props.type === "update") {
        return (
            <button className={props.className} onClick={props.handleUpdate}>
                {props.children}
            </button>
        );
    }

    return (
        <button
            className={props.className}
            onClick={() => navigate(`/invoices/${props.invoiceId}`)}
        >
            {props.children}
        </button>
    );
};

export default DropwDownItem;
