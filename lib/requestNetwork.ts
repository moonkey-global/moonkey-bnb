import { EthereumPrivateKeySignatureProvider } from '@requestnetwork/epk-signature';
import * as RequestNetwork from '@requestnetwork/request-client.js';


export async function сreateTaxRequest() {
    // payee information
    const payeeSignatureInfo = {
        method: RequestNetwork.Types.Signature.METHOD.ECDSA,
        privateKey: process.env.TAX_SERVICE_PRIVATE_KEY,
    };
    const payeeIdentity = {
        type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: TAX_SERVICE_ADDRESS,
    };

    // payer information
    const payerIdentity = {
        type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: PAYER_ADDRESS,
    };
    
    // Signature providers
    const signatureProvider = new EthereumPrivateKeySignatureProvider(payeeSignatureInfo);

    const requestInfo: RequestNetwork.Types.IRequestInfo = {
    currency: 'USDT',
    expectedAmount: TAX_AMOUNT,
    payee: payeeIdentity,
    payer: payerIdentity,
    };
    
    const paymentNetwork: RequestNetwork.Types.Payment.PaymentNetworkCreateParameters = {
        id: RequestNetwork.Types.Extension.PAYMENT_NETWORK_ID.ERC20_ADDRESS_BASED,
        parameters: {
          paymentAddress: TAX_SERVICE_ADDRESS,
        },
    };

    const requestNetwork = new RequestNetwork.RequestNetwork({
        nodeConnectionConfig: { baseURL: "https://xdai.gateway.request.network/" },
        signatureProvider,
        // useMockStorage: true,
      });

      const createParams = {
        paymentNetwork,
        requestInfo,
        signer: payeeIdentity,
      };
    let requestId: string;

    const request = await requestNetwork.createRequest(createParams);
    const confirmedRequest = await request.waitForConfirmation();
    console.log('request id: ', confirmedRequest.requestId);
 
    return confirmedRequest.requestId;
}

// payment link to implement on the frontend
//  https://pay.request.network/${requestId}