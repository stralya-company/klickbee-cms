export type { Page } from "@/generated/prisma";

import type { Page } from "@/generated/prisma";

export type PageLight = Pick<Page, "id" | "title" | "slug">;
