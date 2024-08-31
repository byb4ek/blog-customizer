import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { MouseEventHandler, useEffect, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOverlayClick = () => {
		setIsOpen(false);
	};

	/* 	const handleFormClick = (e: MouseEventHandler<HTMLDivElement>) => {
		e.stopPropagation();
	} */

/* 	const handleFormClick = () => {
		const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
			event.stopPropagation();
		};
	}; */

	const handleEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			// document.addEventListener('click', handleOverlayClick);
		} else {
			document.removeEventListener('keydown', handleEsc);
			// document.removeEventListener('click', handleOverlayClick);
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
			// document.removeEventListener('click', handleOverlayClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			{/* Если нажали на кнопку отображаем форму
			ToDo: добавить обработку на закрытие формы (по оверлею и ESC) */}
			{isOpen && (
				<div className={styles.overlay} onClick={handleOverlayClick}>
					<aside
						className={`${styles.container} ${
							isOpen ? styles.container_open : ''
						}`}
						// onClick={handleFormClick}
						>
						<form className={styles.form}>
							{/* Todo: Добавить сюда все компоненты из файлов с параметрами статьи */}
							<div className={styles.bottomContainer}>
								<Button title='Сбросить' type='reset' />
								<Button title='Применить' type='submit' />
							</div>
						</form>
					</aside>
				</div>
			)}
		</>
	);
};
