import style from "../Input/Input.module.scss";
interface InputProps {
  label: string;
  onChange: any;
  value: any;
  errorMessage: string;
  errorStatus: boolean;
  placeholder: string;
}

export default function FormInput({
  label,
  onChange,
  value,
  errorMessage,
  errorStatus,
  placeholder,
}: InputProps) {
  return (
    <div className={style.formInput}>
      <label>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {errorStatus && <p className={style.error}> {errorMessage} </p>}
    </div>
  );
}
