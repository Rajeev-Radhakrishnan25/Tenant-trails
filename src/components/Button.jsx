import "./Button.css";

function Button({ label, onClick, variant }) {
  const className = variant === "outline" ? "btn btn-outline" : "btn btn-primary";
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
