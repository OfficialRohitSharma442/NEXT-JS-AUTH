import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    /* Getting data form the request  */
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("request Body", reqBody);
    /* check user exist or not  */
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User does not exist" });
    /* check user is exist or not  */
    //const validPassword = await bcryptjs.compare(password, user.password);
    /* check password valid or not  */
    if (!(await bcryptjs.compare(password, user.password)))
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });

    /* Create Token data */
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    /* create token */

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 5000 }
    );
  }
}
