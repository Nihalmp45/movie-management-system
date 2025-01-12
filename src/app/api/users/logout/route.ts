import { NextResponse } from "next/server"

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"logout successful",
            success:true
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires:new Date(0)
        })
        return response
        
    } catch {
        return NextResponse.json({error: "An unexpected error occurred. Please try again later."},{status:500})
    }
    
}