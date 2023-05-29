'use client'
import {сreatePaymentRequest} from '@/lib/requestNetwork';
import { useContext } from 'react';
import { ClientContext } from '@/components/ClientProvider';
import { RequestLogicTypes } from '@requestnetwork/types';

export default async function PaymentRequest(
  currency: string | RequestLogicTypes.ICurrency, 
  payerAddress: string, 
  requestAmount: RequestLogicTypes.Amount
    ){
    const { newAddress } = useContext(ClientContext);
    // Call the function to run it
    const newRequest: string = await сreatePaymentRequest(currency, newAddress, payerAddress, requestAmount);
    return(<a href="https://pay.request.network/${newRequest}">Payment link</a>)
}