import { useState } from "react";
import Button from "./Components/Button";
import FormInput from "./Components/Input";
import style from "./Components/Input/Input.module.scss";

interface Data {
  cardHolderName: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
}
interface ErrorStatus {
  cardHolderName: boolean;
  cardNumber: boolean;
  month: boolean;
  year: boolean;
  cvc: boolean;
}
interface InputData {
  name: string;
  placeholder: string;
  label: string;
  pattern?: string;
  value: string | number;
  onChange?: any;
  required?: boolean;
}
function App() {
  const defaultValues: Data = {
    cardHolderName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  };

  const [values, setValues] = useState<Data>(defaultValues);

  const [errors, setErrors] = useState<ErrorStatus>({
    cardHolderName: false,
    cardNumber: false,
    month: false,
    year: false,
    cvc: false,
  });

  const errorMessage = "Can't be empty";

  const [screen, setScreen] = useState<"submit" | "completed">("submit");

  const inputs: InputData[] = [
    {
      name: "cardHolderName",
      value: values.cardHolderName,
      placeholder: "e.g. Jane Appleseed",
      label: "Cardholder Name",
      required: true,
      onChange: (value) => {
        setValues((prevState) => ({
          ...prevState,
          cardHolderName: value,
        }));
        if (value.length > 0) {
          errors.cardHolderName = false;
        }
      },
    },
    {
      name: "cardNumber",
      value: values.cardNumber,
      placeholder: "e.g. 1234 5678 9123 0000",
      label: "Card Number",
      required: true,
      onChange: (value) => {
        const formattedValue = formatNumber(value);
        setValues((prevState) => ({
          ...prevState,
          cardNumber: formattedValue,
        }));
        if (value.length > 0) {
          errors.cardNumber = false;
        }
      },
    },
    {
      name: "month",
      placeholder: "MM",
      value: values.month,
      label: "Exp. Date (MM/YY)",
      required: true,
      onChange: (value) => {
        const month_Year = monthYear(value);
        setValues((prevState) => ({
          ...prevState,
          month: month_Year,
        }));
        if (value.length > 0) {
          errors.month = false;
        }
      },
    },
    {
      name: "year",
      value: values.year,
      label: "year",
      placeholder: "YY",
      required: true,
      onChange: (value) => {
        const month_Year = monthYear(value);
        setValues((prevState) => ({
          ...prevState,
          year: month_Year,
        }));
        if (value.length > 0) {
          errors.year = false;
        }
      },
    },
    {
      name: "cvc",
      value: values.cvc,
      placeholder: "e.g. 123",
      label: "CVC",
      required: true,
      onChange: (value) => {
        const cvc = cvcValue(value);
        setValues((prevState) => ({
          ...prevState,
          cvc: cvc,
        }));
        if (value.length > 0) {
          errors.cvc = false;
        }
      },
    },
  ];
  function formatNumber(value: string) {
    const formatedValue = value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .substring(0, 20)
      .trim();
    return formatedValue;
  }
  function monthYear(value: string) {
    const month_Year = value.replace(/[^\dA-Z]/g, "").substring(0, 2);
    return month_Year;
  }
  function cvcValue(value: string) {
    const cvc = value.replace(/[^\dA-Z]/g, "").substring(0, 3);
    return cvc;
  }
  function checkForErrors() {
    let validInput = true;
    if (values.month.length < 1) {
      validInput = false;
      setErrors((prevState) => ({
        ...prevState,
        month: true,
      }));
    }
    if (values.year.length < 1) {
      validInput = false;
      setErrors((prevState) => ({
        ...prevState,
        year: true,
      }));
    }
    if (values.cvc.length < 1) {
      validInput = false;
      setErrors((prevState) => ({
        ...prevState,
        cvc: true,
      }));
    }
    if (values.cardNumber.length < 1) {
      validInput = false;
      setErrors((prevState) => ({
        ...prevState,
        cardNumber: true,
      }));
    }
    if (values.cardHolderName.length < 1) {
      validInput = false;
      setErrors((prevState) => ({
        ...prevState,
        cardHolderName: true,
      }));
    }
    return validInput;
  }
  const submit = () => {
    let errorFree = checkForErrors();
    if (errorFree) {
      setScreen("completed");
    }
  };
  return (
    <div className="app">
      <p>name:{values.cardHolderName}</p>
      <p>number:{values.cardNumber}</p>
      <p>month:{values.month}</p>
      <p>year:{values.year}</p>
      <p>cvc:{values.cvc}</p>
      {screen === "submit" && (
        <div className={style.formContainer}>
          {inputs.map((input, i) => (
            <FormInput
              label={input.label}
              key={i}
              value={input.value}
              onChange={input.onChange}
              errorStatus={errors[`${input.name}`]}
              errorMessage={errorMessage}
            />
          ))}
          <Button label={"submit"} onClick={submit} />
        </div>
      )}
      {screen === "completed" && (
        <div className={style.completedContainer}>
          <p>Thank you</p>
          <Button
            label={"Continue"}
            onClick={() => {
              setValues(defaultValues);
              setScreen("submit");
            }}
          />
        </div>
      )}
    </div>
  );
}
export default App;
