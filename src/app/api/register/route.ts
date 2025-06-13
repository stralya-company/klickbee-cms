import {setPrismaClient, register} from "@stralya/auth";
import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../lib/prisma"

setPrismaClient(prisma);

export async function POST(req: NextRequest) {
    const {email, password} = await req.json();
    console.log("test")
    try {
        const user = await register(email, password);
        return NextResponse.json({user}, {status: 201});
    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: 400});
    }
}