import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './Input.module.scss';

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HtmlInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  error?: string | number;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    readonly,
    error,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCaretPosition(e.currentTarget.selectionStart || 0);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaretPosition(e.target.value.length);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const inputWrapperClasses = classnames(
    styles.InputWrapper,
    {
      [styles.readonly]: readonly,
      [styles.error]: !!error,
    },
    className
  );

  return (
    <div className={inputWrapperClasses}>
      {placeholder && (
        <div className={styles.placeHolder}>{`${placeholder}`}</div>
      )}
      <div className={styles.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          className={styles.input}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          readOnly={readonly}
          {...otherProps}
        />
        {isCaretVisible && (
          <span
            className={styles.caret}
            style={{ left: `${caretPosition * 7}px` }}
          />
        )}
      </div>
      {error && <label className={styles.errorLabel}>{typeof error === 'string' ? error : JSON.stringify(error)}</label>}
    </div>
  );
});
