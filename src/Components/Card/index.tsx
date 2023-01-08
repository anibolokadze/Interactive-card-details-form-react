import style from "../Card/Card.module.scss";
export default function Card(values) {
  return (
    <>
      <div className={style.cardItem}>
        <div className={style.cardWrapper}>
          <div className={style.cardBack}>
            <div className={style.cvc}>
              {<p>{values.cvc === "" ? "000" : values.cvc}</p>}
            </div>
          </div>
          <div className={style.cardFront}>
            <div className={style.cardLogo}></div>
            {
              <p className={style.cardNumber}>
                {values.cardNumber === ""
                  ? "0000 0000 0000 0000"
                  : values.cardNumber}
              </p>
            }
            <div className={style.cardDetails}>
              {
                <p>
                  {values.cardHolderName === ""
                    ? "JANE APPLESEED"
                    : values.cardHolderName}
                </p>
              }
              <div>
                {<p>{values.month === "" ? "00" + "/" : values.month + "/"}</p>}
                {<p>{values.year === "" ? "00" : values.year}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
