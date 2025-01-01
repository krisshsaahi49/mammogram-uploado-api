// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     // Read the incoming request body as a stream
//     const contentType = req.headers.get('content-type');

//     if (!contentType || !contentType.startsWith('image')) {
//       return NextResponse.json(
//         { error: 'Invalid content type. Expected an image.' },
//         { status: 400 }
//       );
//     }

//     // Read the image data
//     const buffer = Buffer.from(await req.arrayBuffer());

//     // Convert image to Base64
//     const base64String = buffer.toString('base64');

//     // Prepare the response payload
//     const payload = {
//       data: base64String,
//     };

//     return NextResponse.json(payload, { status: 200 });
//   } catch (error) {
//     console.error('Error processing the image:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Add CORS headers
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allowed methods
    headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
      return NextResponse.json(null, { headers, status: 204 }); // No content response for preflight
    }

    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected an image.' },
        { headers, status: 400 }
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

    return NextResponse.json(payload, { headers, status: 200 });
  } catch (error) {
    console.error('Error processing the image:', error);
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*'); // Add CORS headers in error responses too
    return NextResponse.json(
      { error: 'Internal server error' },
      { headers, status: 500 }
    );
  }
}
