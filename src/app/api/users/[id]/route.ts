import { ParamsRequest } from "@/interfaces";
import prisma from "@/libs/prisma";
import { InternalErrorResponse, NotFoundResponse } from "@/utils/response";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: ParamsRequest<{ id: string }>
) {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: +params.id,
      },
    });

    if (!data) return NotFoundResponse("User not found");

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return InternalErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: ParamsRequest<{ id: string }>
) {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: +params.id,
      },
    });

    if (!data) return NotFoundResponse("User not found");

    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return InternalErrorResponse(error);
  }
}