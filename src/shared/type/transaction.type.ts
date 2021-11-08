export type TransactionType = {
    data: TransactionItem[],
    status: {
        code: number;
        message: string;
    }
}

type TransactionItem = {
    "_id": string;
    "to_user_id": string;
    "to_wallet_number": number;
    "current_balance": number;
    "from_user_id": string;
    "from_wallet_number": number;
    "action": string;
    "transfer_balance": number;
    "createdAt": string;
    "updatedAt": string;
    "__v": number;
}
