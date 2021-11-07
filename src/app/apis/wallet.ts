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
    //TODO wait implement get url from .env
    return await apiAxios.patch('http://localhost:8081/deposit', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}

export async function withdraw(parameters: WalletDWType, token: string | null): Promise<AxiosResponse<WalletTransferResponseType>> {
    //TODO wait implement get url from .env
    return await apiAxios.patch('http://localhost:8081/withdraw', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}

export async function checkBalance(): Promise<AxiosResponse<WalletCheckBalanceType>> {
    //TODO wait implement get url from .env
    const token = localStorage.getItem('token');
    return await apiAxios.post('http://localhost:8081/check-balance', {}, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}


export async function transfer(parameters: WalletTransferType, token: string | null): Promise<AxiosResponse<WalletTransferType>> {
    //TODO wait implement get url from .env
    return await apiAxios.post('http://localhost:8081/transfer', parameters, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
}
