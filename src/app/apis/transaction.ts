import apiAxios from "./apiAxios";
import {AxiosResponse} from "axios";
import {TransactionType} from "../../shared/type/transaction.type";

export type TransactionGetType = {
    action: string;
}

export function transactions(parameters: TransactionGetType): Promise<AxiosResponse<TransactionType>> {
    const token: string | null = localStorage.getItem('token');

    return apiAxios.post('/transactions', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}
