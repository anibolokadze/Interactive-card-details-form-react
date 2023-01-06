import "./FormInput.css";

interface InputProps {
  label: string;
  onChange: any;
  value: any;
  errorMsg: string;
}

export default function FormInput({
  label,
  onChange,
  errorMsg,
  value,
}: InputProps) {
  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <span>{errorMsg}</span>
    </div>
  );
}
