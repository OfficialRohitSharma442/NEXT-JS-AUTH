import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
/* import { User } from "@/models/userModel"; */

connect();

export async function POST(request: NextRequest) {

    try {
        console.log("HIiii")
        /*   const reqBody = await request.json();
          const { token } = reqBody;
          console.log("VERIFY Email call token", token);
          const user = User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
          if (!user) return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
          user.isVarifid = true;
          user.verifyToken = undefined;
          user.verifyTokenExpiry = undefined;
  
  
          await user.save();
  
          return NextResponse.json({
              message: "Email varified successfully",
              success: true,
          }) */

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}