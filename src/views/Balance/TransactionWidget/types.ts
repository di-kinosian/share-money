interface IAmountDetails {
    paidUsers: Record<string, string>;
    spentUsers: Record<string, string>;
    amount: string;
}

interface IUser {
    id: string;
    name: string;
}

interface IAmountStepProps {
    onSubmit: (amountDetails: IAmountDetails) => void;
    onBack: () => void;
    users: IUser[];
    amountDetails: IAmountDetails;
    onChangeAmountDetails: (amountDetails: IAmountDetails) => void;
}

export type {IAmountDetails, IUser, IAmountStepProps}