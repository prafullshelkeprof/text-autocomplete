import { useState, useRef, useContext } from 'react';
import { getPredictions } from './wizkidsAPI';
import { PredictionOptions } from '../prediction-options/PredictionOptions';
import { ThemeContext } from '../../index'

const selectionStart: number = 0;

export function SearchBox() {
    const { lang } = useContext(ThemeContext);
    const [textValue, setTextValue] = useState<string>();
    const [listOptions, setListOptions] = useState<string[]>([]);
    const [showPredictions, setShowPredictions] = useState<boolean>(false);
    const [emphasizedText, setEmphasizedText] = useState<string>('');

    const textareaEl = useRef<null | HTMLTextAreaElement>(null);
    const setPredictionOptions = (res: string[]): void => {
        setListOptions(res);
        setShowPredictions(res.length > 0);
    }
    const getTextAreaValue = (): string => {
        return textareaEl.current?.value || '';
    }
    const getTextAreaSelectionEnd = (): number => {
        return textareaEl.current?.selectionEnd || 0;
    }
    const onPredictionClick = (selectionOption: string): void => {
        const textAreaValue: string = getTextAreaValue();
        const selectionEnd: number = getTextAreaSelectionEnd();
        const startValue = textAreaValue.substring(selectionStart, selectionEnd);
        const endValue = textAreaValue.substring(selectionEnd, textAreaValue.length);
        setTextValue(startValue + selectionOption + endValue);
        textareaEl.current?.focus();
    }

    const onKeyupAndClick = (): void => {
        const textAreaValue: string = getTextAreaValue();
        if (textAreaValue.length > 0) {
            const selectionEnd: number = getTextAreaSelectionEnd();
            const queryValue = textAreaValue.substring(selectionStart, selectionEnd).trim().split(' ').pop() || '';
            setEmphasizedText(queryValue);
            getPredictions(queryValue, lang).then(setPredictionOptions);
        } else {
            setEmphasizedText('');
            setPredictionOptions([]);
        }
    }
    const onTextAreaChange = (): void => {
        setTextValue(getTextAreaValue());
    }
    return (
        <div>
            <textarea
                ref={textareaEl} value={textValue}
                onKeyUp={onKeyupAndClick}
                onChange={onTextAreaChange}
                onClick={onKeyupAndClick}></textarea>
            <PredictionOptions
                showPredictions={showPredictions}
                listOptions={listOptions}
                onPredictionClick={onPredictionClick}
                emphasizedText={emphasizedText}
            ></PredictionOptions>
        </div>
    );
}
