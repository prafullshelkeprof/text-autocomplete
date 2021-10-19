import styles from './PredictionOptions.module.css';
export const maxPredictions = 10;
export interface PredictionOptionsPropsInterface {
    listOptions: string[];
    showPredictions: boolean;
    emphasizedText: string;
    onPredictionClick: (selectionOption: string) => void
}

export function PredictionOptions(props: PredictionOptionsPropsInterface) {
    const getOptionText = (currentOptionText: string) => {
        const regEx: RegExp = new RegExp(props.emphasizedText, 'i');
        const textToInsert: string = currentOptionText.replace(regEx, '');
        return <span><em><b>{props.emphasizedText}</b></em>{textToInsert}</span>;
    }
    const options = (
        <>
            {
                props.listOptions.filter((option, index) => index < maxPredictions).map((currentOption, index) => {
                    return <li
                        className={styles.listItem}
                        key={index}
                        onClick={() => {
                            props.onPredictionClick(currentOption);
                        }}>
                        {getOptionText(currentOption)}
                    </li>
                })
            }
        </>
    );

    return (
        <div>
            {
                props.showPredictions ?
                    <ul className={styles.predictionOptions}>
                        {options}
                    </ul> : ''
            }
        </div>
    );
}
