import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		console.log('test');
		setIsOpen((prev) => !prev);
	};

	const handleEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
		} else {
			document.removeEventListener('keydown', handleEsc);
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [isOpen]);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<div ref={formRef}>
				<ArrowButton onClick={toggleForm} isOpen={isOpen} />
				{isOpen && (
					<aside
						className={`${styles.container} ${
							isOpen ? styles.container_open : ''
						}`}>
						<form className={styles.form}>
							{/* Todo: Добавить сюда все компоненты из файлов с параметрами статьи */}
							<div className={styles.bottomContainer}>
								<Button title='Сбросить' type='reset' />
								<Button title='Применить' type='submit' />
							</div>
						</form>
					</aside>
				)}
			</div>
		</>
	);
};
