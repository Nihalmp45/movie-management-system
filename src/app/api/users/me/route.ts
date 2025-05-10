import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({
            message:"User Found",
            data:user
        })
        
    } catch{
        return NextResponse.json( { error: "An unexpected error occurred. Please try again later." },{status:400}
    )
    }
}