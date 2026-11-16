import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


export const getUsers = async ()=>{

const users = await auth.api.listUsers({
    query: {

        sortBy: "name", // The field to sort by.
        sortDirection: "desc", // The direction to sort by.
     // The operator to use for the filter.
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users;

}



export const getPremiumUser = async (userId: string)=>{


    const res= await fetch (`${baseUrl }/users/${userId}/premium`)

    return res.json()
}