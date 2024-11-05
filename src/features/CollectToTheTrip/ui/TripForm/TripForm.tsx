import { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../../../shared/ui/Input/Input';
import classNames from 'classnames';
import styles from './TripForm.module.scss';
import { sendPaymentData } from '../../model/services/fetchTrip/fetchTrip';
import { AppDispatch } from '../../../../app/provider/StoreProvider/config/store';
import DateInput from '../../../../shared/ui/DateInput/DateInput';
import { getCollect } from '../../model/selectors/getCollect/getCollect';
import { paymentActions } from '../../model/slice/tripSlice';
import {
  FormData,
  isValidCardNumber,
} from '../../model/validations/validation';

interface PaymentFormData extends FormData {
  description?: string;
}

const TripForm = memo(
  ({ tripTour, author }: { tripTour: string; author: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { errors: apiErrors, isLoading } = useSelector(getCollect);
    const {
      control,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm({
      defaultValues: {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        amount: '',
        name: '',
      },
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onFail = (errors: unknown) => {
      if (errors instanceof Object) {
        dispatch(paymentActions.setErrors(errors as FormData));
      }
      alert('Transfer failed. Please check the errors and try again.');
    };

    const onSuccess = () => {
      dispatch(paymentActions.setErrors({} as FormData));
      alert('Successfully transfer');
    };

    const onSubmit = async (data: PaymentFormData) => {
      const formData = {
        ...data,
        initiator: author,
        type: tripTour,
      };

      try {
        await sendPaymentData(formData, onSuccess, onFail);
      } catch (error) {
        console.error('Payment submission failed', error);
      }
    };

    const handleValidation = (name: string, value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        switch (name) {
          case 'cardNumber':
            if (!isValidCardNumber(value.replace(/\s/g, ''))) {
              setError(name, { message: 'Неверный номер карты' });
            }
            break;
          default:
            break;
        }
      }, 500);
    };

    if (isLoading) {
      return <div className={styles.title}>...Loading</div>;
    }

    return (
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>
          {author} собирает на «{tripTour}»
        </h2>
        <Controller
          name='cardNumber'
          control={control}
          rules={{
            required: 'Пожалуйста, введите номер карты',
          }}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(value: string) => {
                const maskedValue = value
                  .replace(/\D/g, '')
                  .replace(/(.{4})/g, '$1 ')
                  .trim();
                field.onChange(maskedValue);
                handleValidation('cardNumber', maskedValue);
              }}
              placeholder='Номер карты'
              className={styles.inputField}
              maxLength={19}
              error={errors.cardNumber?.message || apiErrors?.cardNumber}
            />
          )}
        />

        <div className={styles.wrapper}>
          <Controller
            name='expiryDate'
            control={control}
            rules={{ required: 'Пожалуйста, введите дату истечения' }}
            render={({ field }) => (
              <DateInput
                {...field}
                error={errors.expiryDate?.message || apiErrors?.expiryDate}
                className={styles.inputField}
              />
            )}
          />
          <Controller
            name='cvc'
            control={control}
            rules={{
              required: 'Пожалуйста, введите CVV',
              minLength: { value: 3, message: 'CVC должен содержать 3 цифры' },
              maxLength: { value: 3, message: 'CVC должен содержать 3 цифры' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='CVV'
                maxLength={3}
                error={errors.cvc?.message || apiErrors?.cvc}
                className={styles.inputField}
              />
            )}
          />
        </div>

        <Controller
          name='amount'
          control={control}
          rules={{
            required: 'Сумма должна быть не менее 10',
            min: { value: 10, message: 'Сумма должна быть не менее 10' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Сумма перевода'
              error={errors.amount?.message || apiErrors?.amount}
              className={styles.inputField}
            />
          )}
        />

        <Controller
          name='name'
          control={control}
          rules={{ required: 'Пожалуйста, введите ваше имя' }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Ваше имя'
              error={errors.name?.message || apiErrors?.name}
              className={styles.inputField}
            />
          )}
        />

        <Input
          value={tripTour}
          placeholder='Сообщение получателю'
          disabled
          className={styles.inputField}
        />

        <div className={styles.buttons}>
          <button
            type='submit'
            className={classNames(styles.button, styles.buttonPrimary)}
          >
            Перевести
          </button>
          <button
            type='button'
            className={classNames(styles.button, styles.buttonSecondary)}
            onClick={() => window.location.reload()}
          >
            Вернуться
          </button>
        </div>
      </form>
    );
  }
);

export default TripForm;
