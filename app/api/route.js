import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Read the incoming request body as a stream
    const contentType = req.headers.get('content-type');

    if (!contentType || !contentType.startsWith('image')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected an image.' },
        { status: 400 }
      );
    }

    // Read the image data
    const buffer = Buffer.from(await req.arrayBuffer());

    // Convert image to Base64
    const base64String = buffer.toString('base64');

    // Prepare the response payload
    const payload = {
      data: base64String,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('Error processing the image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
