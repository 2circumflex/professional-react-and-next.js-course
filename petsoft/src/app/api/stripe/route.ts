export async function POST(request: Request) {
  const body = await request.text();

  // fullfill order

  // return 200 OK
  return Response.json(null, { status: 200 });
}
