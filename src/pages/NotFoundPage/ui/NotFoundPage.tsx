import classNames from 'classnames';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <div className={classNames(styles.NotFoundPage, {}, [className])}>
            {'notFound'}
        </div>
    );
};
