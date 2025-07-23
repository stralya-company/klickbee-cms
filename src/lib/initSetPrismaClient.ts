import { setPrismaClient } from "@stralya/auth";
import prisma from "@/lib/prisma";

setPrismaClient(prisma);
