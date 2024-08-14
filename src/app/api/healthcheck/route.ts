import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  //const params = req.nextUrl.searchParams;
  return NextResponse.json({up: true});
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   return NextResponse.json(body);
// }
