import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useEffect, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

type Props = {
	onChange: ({}: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [params, setParams] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	function handleOptionChange(key: string, option: OptionType) {
		setParams({ ...params, [key]: option });
	}

	const handleEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	const resetParams = () => {
		setParams(defaultArticleState);
		onChange(defaultArticleState);
	};

	const submitParams = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(params);
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
						<form
							className={styles.form}
							onReset={resetParams}
							onSubmit={submitParams}>
							<Text as='p' size={31} weight={800} uppercase={true}>
								Задайте параметры
							</Text>
							<Select
								title='шрифт'
								options={fontFamilyOptions}
								selected={params.fontFamilyOption}
								onChange={(selected) => {
									handleOptionChange('fontFamilyOption', selected);
									
								}}></Select>

							<RadioGroup
								title='размер шрифта'
								name='размер шрифта'
								options={fontSizeOptions}
								selected={params.fontSizeOption}
								onChange={(selected) => {
									handleOptionChange('fontSizeOption', selected);
								}}></RadioGroup>

							<Select
								title='цвет шрифта'
								options={fontColors}
								selected={params.fontColor}
								onChange={(selected) => {
									handleOptionChange('fontColor', selected);
								}}></Select>
							<Separator />

							<Select
								title='цвет фона'
								options={backgroundColors}
								selected={params.backgroundColor}
								onChange={(selected) => {
									handleOptionChange('backgroundColor', selected);
								}}></Select>

							<Select
								title='ширина контента'
								options={contentWidthArr}
								selected={params.contentWidth}
								onChange={(selected) => {
									handleOptionChange('contentWidth', selected);
								}}></Select>

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
