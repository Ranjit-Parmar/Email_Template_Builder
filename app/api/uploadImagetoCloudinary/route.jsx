import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { file } = body;

    if (!file || !file.startsWith('data:image/')) {
      return new Response(JSON.stringify({ error: 'Invalid image data' }), { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(file); // No preset for now

    return Response.json({ url: uploadResponse.secure_url });
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
    });
  }
}