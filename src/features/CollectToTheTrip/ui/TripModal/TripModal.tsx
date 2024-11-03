import { Suspense } from 'react';
import classNames from 'classnames';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { TripFormAsync } from '../TripForm/TripForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  typeTour: string;
  author: string;
}

export const LoginModal = ({
  className,
  isOpen,
  typeTour,
  author,
}: LoginModalProps) => (
  <Modal lazy className={classNames('', {}, [className])} isOpen={isOpen}>
    <Suspense fallback={<div>...Loading</div>}>
      <TripFormAsync tripTour={typeTour} author={author} />
    </Suspense>
  </Modal>
);
