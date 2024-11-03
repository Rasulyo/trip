import { LoginModal } from '../../../features/CollectToTheTrip';
import { useState } from 'react';
import styles from './MainPage.module.scss'

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const toggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className={styles.main} >
      <LoginModal isOpen={isModalOpen} onClose={toggleModal} typeTour='Экскурсия' author='Иван К.'/>
    </div>
  );
}
