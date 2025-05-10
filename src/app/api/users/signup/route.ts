import {connect} from "../../dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email, password} = reqBody

        //check if user already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User Already exists"},{status:400})
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //create new user
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save() 


         
        return NextResponse.json({message:"User created successfully",success:true,savedUser})

    } catch{
        return NextResponse.json( { error: "An unexpected error occurred. Please try again later." }),{status:500}
    }
}
