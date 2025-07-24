import { PrismaClient } from "@prisma/client";
import { setPrismaClient } from "@stralya/auth";
import prisma from "@/lib/prisma";

setPrismaClient(prisma as PrismaClient);
