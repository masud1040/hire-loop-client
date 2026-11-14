
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


export const getPremiumUser = async (userId: string)=>{


    const res= await fetch (`${baseUrl }/users/${userId}/premium`)

    return res.json()
}