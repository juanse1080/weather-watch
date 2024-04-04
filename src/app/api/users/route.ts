import { Pagination } from "@/interfaces";
import prisma from "@/libs/prisma";
import { getPaginationParams } from "@/utils/queryParams";
import { InternalErrorResponse } from "@/utils/response";
import { User } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { page, per_page } = getPaginationParams(
      request.nextUrl.searchParams
    );

    const data = await prisma.user.findMany({
      skip: page * per_page,
      take: per_page,
    });
    const count = await prisma.user.count();

    const response: Pagination<User> = {
      data,
      metadata: {
        page,
        per_page,
        count,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return InternalErrorResponse(error);
  }
}
