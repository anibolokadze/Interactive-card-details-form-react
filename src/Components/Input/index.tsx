interface InputProps {
  label: string;
  onChange: any;
  value: any;
  errorMessage: string;
  errorStatus: boolean;
}

export default function FormInput({
  label,
  onChange,
  value,
  errorMessage,
  errorStatus,
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
      {errorStatus && <p> {errorMessage} </p>}
    </div>
  );
}
