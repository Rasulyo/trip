import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCardNumber } from '../../model/selectors/getCardNumber/getCardNumber';
import { getExpiryDate } from '../../model/selectors/getExpiryDate/getExpiryDate';
import { getCvc } from '../../model/selectors/getCvc/getCvc';
import { getAmount } from '../../model/selectors/getAmount/getAmount';
import { getName } from '../../model/selectors/getName/getName';
import { getMessage } from '../../model/selectors/getMessage/getMessage';
import { paymentActions } from '../../model/slice/tripSlice';
import { Input } from '../../../../shared/ui/Input/Input';
import classNames from 'classnames';
import styles from './TripForm.module.scss';
import { sendPaymentData } from '../../model/services/fetchTrip/fetchTrip';
import { AppDispatch } from '../../../../app/provider/StoreProvider/config/store';
import { getErrors } from '../../model/selectors/getErrors/getErrors';
import DateInput from '../../../../shared/ui/DateInput/DateInput';
import { FormData } from '../../model/validations/validation';
import { ExpiryDate } from '../../model/types/TripFormSchema';

const TripForm = memo(({ tripTour, author }: { tripTour: string, author: string }) => {
  const dispatch = useDispatch();
  const cardNumber = useSelector(getCardNumber);
  const expiryDate = useSelector(getExpiryDate);
  const cvc = useSelector(getCvc);
  const amount = useSelector(getAmount);
  const name = useSelector(getName);
  const message = useSelector(getMessage);
  const errors = useSelector(getErrors);

  const onCardNumberChange = useCallback(
    (value: string) => {
      dispatch(paymentActions.setCardNumber(value));
    },
    [dispatch]
  );

  const onExpiryDateChange = useCallback(
    (value: ExpiryDate) => {
      dispatch(paymentActions.setExpiryDate(value));
    },
    [dispatch]
  );

  const onCvcChange = useCallback(
    (value: string) => {
      dispatch(paymentActions.setCvc(value));
    },
    [dispatch]
  );

  const onAmountChange = useCallback(
    (value: string | number) => {
      dispatch(paymentActions.setAmount(value as number));
    },
    [dispatch]
  );

  const onNameChange = useCallback(
    (value: string) => {
      dispatch(paymentActions.setName(value));
    },
    [dispatch]
  );
  const goBack = useCallback(() => {
    console.log('go back');
  }, []);

  const onSubmit = useCallback(async () => {
    const data: FormData = {
      cardNumber,
      cvc,
      expiryDate,
      amount,
      name,
    };

    try {
      await sendPaymentData(data, dispatch as AppDispatch);
    } catch (error) {
      console.error('Payment submission failed', error);
    }
  }, [amount, cardNumber, cvc, dispatch, expiryDate, name]);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title} > {author} собирает на «{tripTour}»</h2>
      <Input
        value={cardNumber}
        onChange={onCardNumberChange}
        placeholder='Номер карты'
        className={styles.inputField}
        maxLength={19}
        error={errors && errors.cardNumber}
      />
      <div className={styles.wrapper}>
        <DateInput
          value={expiryDate}
          onChange={onExpiryDateChange}
          error={errors && errors.expiryDate}
          className={styles.inputField}
        />
        <Input
          value={cvc}
          onChange={onCvcChange}
          placeholder='CVV'
          maxLength={3}
          error={errors && errors.cvc}
          className={styles.inputField}
        />
      </div>
      <Input
        value={amount}
        onChange={onAmountChange}
        placeholder='Сумма перевода'
        error={errors && errors.amount}
        className={styles.inputField}
      />
      <Input
        value={name}
        onChange={onNameChange}
        placeholder='Ваше имя'
        error={errors && errors.name}
        className={styles.inputField}
      />
      <Input
        value={message}
        placeholder='Сообщение получателю'
        disabled
        className={styles.inputField}
      />
      <div className={styles.buttons}>
        <button
          className={classNames(styles.button, styles.buttonPrimary)}
          onClick={onSubmit}
        >
          Перевести
        </button>
        <button
          className={classNames(styles.button, styles.buttonSecondary)}
          onClick={goBack}
        >
          Вернуться
        </button>
      </div>
    </div>
  );
});

export default TripForm;
