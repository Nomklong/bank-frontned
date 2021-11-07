export type WalletTransferResponseType = {
    data: {
        message: string;
    }
    status: {
        code: number;
        message: string;
    }
    error?: {
        message: string;
        error: [];
    }
}

export type WalletCheckBalanceType = {
    data: {
        "_id": string;
        "user_id": string;
        "balance": number;
        "wallet_number": number;
        "createdAt": string;
        "updatedAt": string;
        "__v": number;
    }
    status: {
        code: number;
        message: string;
    }
    error?: {
        message: string;
        error: [];
    }
}
