import React, {
    MutableRefObject,
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import classNames from 'classnames';

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  lazy?: boolean
  onClose?: () => void
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        lazy,
        onClose,
    } = props;

    const [isClosingModal, setIsClosingModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const modalTime = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const mods: Record<string, boolean | undefined> = {
        [styles.opened]: isOpen,
        [styles.isClosingModal]: isClosingModal,
    };

    const contentHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);
    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosingModal(true);
            modalTime.current = setTimeout(() => {
                onClose();
                setIsClosingModal(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onkeydown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onkeydown);
        }
        return () => {
            clearTimeout(modalTime.current);
            window.removeEventListener('keydown', onkeydown);
        };
    }, [isOpen, onkeydown]);

    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className])}>
                <div
                    className={styles.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={styles.content}
                        onClick={contentHandler}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>

    );
};
