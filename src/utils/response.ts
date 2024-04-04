import { NextResponse } from "next/server";

export const NotFoundResponse = (message: string = "Not found") =>
  NextResponse.json({ message }, { status: 404 });

export const InternalErrorResponse = (
  error: unknown,
  message: string = "Internal error"
) => NextResponse.json({ message, error }, { status: 500 });
