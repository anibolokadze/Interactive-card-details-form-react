import React from "react";
import { useState } from "react";
import { text } from "stream/consumers";
import "./App.css";
import FormInput from "./Components/FormInput";

interface data {
  cardHolderName: string;
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
}
interface inputData {
  name: string;
  placeholder: string;
  label: string;
  pattern?: string;
  value: string | number;
  onChange?: any;
  errorMsg?: string;
  required?: boolean;
}
function App() {
  const [values, setValues] = useState<data>({
    cardHolderName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const inputs: inputData[] = [
    {
      name: "cardholderName",
      value: values.cardHolderName,
      placeholder: "e.g. Jane Appleseed",
      label: "Cardholder Name",
      required: true,
      onChange: (value) => {
        setValues((prevState) => ({
          ...prevState,
          cardHolderName: value,
        }));
      },
    },
    {
      name: "cardNumber",
      value: values.cardNumber,
      errorMsg: "Can’t be blank",
      placeholder: "e.g. 1234 5678 9123 0000",
      label: "Card Number",
      required: true,
      onChange: (value) => {
        const formattedValue = formatNumber(value);
        setValues((prevState) => ({
          ...prevState,
          cardNumber: formattedValue,
        }));
      },
    },
    {
      name: "month",
      placeholder: "MM",
      value: values.month,
      errorMsg: "Can’t be blank",
      label: "Exp. Date (MM/YY)",
      required: true,
      onChange: (value) => {
        const month_Year = monthYear(value);
        setValues((prevState) => ({
          ...prevState,
          month: month_Year,
        }));
      },
    },
    {
      name: "year",
      value: values.year,
      label: "year",
      errorMsg: "Can’t be blank",
      placeholder: "YY",
      required: true,
      onChange: (value) => {
        const month_Year = monthYear(value);
        setValues((prevState) => ({
          ...prevState,
          year: month_Year,
        }));
      },
    },
    {
      name: "cvc",
      value: values.cvc,
      placeholder: "e.g. 123",
      errorMsg: "Can’t be blank",
      label: "CVC",
      required: true,
      onChange: (value) => {
        const cvc = cvcValue(value);
        setValues((prevState) => ({
          ...prevState,
          cvc: cvc,
        }));
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
  const submit = (e) => {
    e.preventDefault();
    if (
      values.month === "" ||
      values.year === "" ||
      values.cvc === "" ||
      values.cardNumber === "" ||
      values.cardHolderName === ""
    ) {
      console.log("cant be zero");
    }
  };
  return (
    <div className="app">
      <p>name:{values.cardHolderName}</p>
      <p>number:{values.cardNumber}</p>
      <p>month:{values.month}</p>
      <p>year:{values.year}</p>
      <p>cvc:{values.cvc}</p>
      <form onSubmit={submit}>
        {inputs.map((input, i) => (
          <FormInput
            label={input.label}
            key={i}
            errorMsg={input.errorMsg}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
        <button type="submit" value={"Submit"}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
