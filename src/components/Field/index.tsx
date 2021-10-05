import * as s from './styled';

function Field(props) {
    return (
        <s.FieldContainer className={props.className}>
            <s.FileldLabel>{props.label}</s.FileldLabel>
            {props.children}
        </s.FieldContainer>
    );
}

export default Field;
