import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/better-auth/auth";

export const { POST, GET } = toNextJsHandler(auth);
