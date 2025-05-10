import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

interface DecodedToken {
    id: string;
    // add other properties if necessary
  }
  
export const getDataFromToken = (request:NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:DecodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        return decodedToken.id;
        
    } catch {
        throw new Error("invalid token")
    }
}