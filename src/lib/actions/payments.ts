const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export const checkoutVerify= async (sessionId :string) =>{
    const response= await fetch (`${baseUrl}/payments/checkout-verify`,{
method: 'POST',
headers:{
    'content-Type': 'application/json',
},
body:JSON.stringify({sessionId})


    })
    return response.json()

}