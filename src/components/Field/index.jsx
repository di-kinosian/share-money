import "../../App.css";

function Field(props) {
    return (
        <div className="transaction-field">
            <div className="text">{props.label}</div>
            {props.children}
        </div>
    );
}

export default Field;
