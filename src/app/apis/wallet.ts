import apiAxios from "./apiAxios";
import {AxiosResponse} from "axios";
import {WalletCheckBalanceType, WalletTransferResponseType} from "../../shared/type/wallet.transfer.type";

export type WalletDWType = {
    balance: number;
}

export type WalletTransferType = {
    balance: number;
    transfer_number: string;
}
export async function deposit(parameters: WalletDWType, token: string | null): Promise<AxiosResponse<WalletTransferResponseType>> {
    return await apiAxios.patch('/deposit', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}

export async function withdraw(parameters: WalletDWType, token: string | null): Promise<AxiosResponse<WalletTransferResponseType>> {
    return await apiAxios.patch('/withdraw', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}

export async function checkBalance(): Promise<AxiosResponse<WalletCheckBalanceType>> {
    const token = localStorage.getItem('token');
    return await apiAxios.post('/check-balance', {}, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}


export async function transfer(parameters: WalletTransferType, token: string | null): Promise<AxiosResponse<WalletTransferType>> {
    return await apiAxios.post('/transfer', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}
