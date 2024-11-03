import { Suspense } from 'react';
import TripForm from '../TripForm/TripForm';
import classNames from 'classnames';
import { Modal } from 'src/shared/ui/Modal/Modal';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  typeTour: string; 
  author: string
}

export const LoginModal = ({ className, isOpen, typeTour, author }: LoginModalProps) => (
  <Modal
    lazy
    className={classNames('', {}, [className])}
    isOpen={isOpen}
  >
    <Suspense fallback={<div>...Loading</div>}>
      <TripForm tripTour={typeTour}author={author} />
    </Suspense>
  </Modal>
);
