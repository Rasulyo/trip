import React, { useRef, useEffect, ChangeEvent, memo } from 'react';
import classnames from 'classnames';
import styles from '../Input/Input.module.scss';

interface DateInputProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = memo(
  ({ className, value = '', onChange, autoFocus = false, error }) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      onChange(value);
    }, [onChange, value]);

    useEffect(() => {
      if (autoFocus) {
        ref.current?.focus();
      }
    }, [autoFocus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let input = e.target.value;
      
      input = input.replace(/[^0-9]/g, '');
    
      if (input.length >= 2) {
        input = `${input.slice(0, 2)} / ${input.slice(2)}`;
      }
    
      if (input.length <= 7) {
        onChange(input);
    
        if (/^(0[1-9]|1[0-2]) \/ \d{0,2}$/.test(input)) {
          onChange?.(input);
        }
      }
    };

    const inputClasses = classnames(
      styles.inputWrapper,
      {
        [styles.error]: !!error,
      },
      className
    );

    return (
      <div className={inputClasses}>
        <label className={styles.label}>Срок действия</label>
        <div className={styles.caretWrapper}>
          <input
            ref={ref}
            type='text'
            placeholder='ММ / ГГ'
            value={value}
            onChange={handleChange}
            maxLength={7}
            className={styles.input}
          />
        </div>
        {error && <div className={styles.errorLabel}>{error}</div>}
      </div>
    );
  }
);

export default DateInput;
