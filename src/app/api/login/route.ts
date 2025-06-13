import {setPrismaClient, login} from "@stralya/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

setPrismaClient(prisma);

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password } = await req.json();
    try {
        const data = await login( email, password );
        if (!data) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        return NextResponse.json({ data }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 401 });
    }
}a