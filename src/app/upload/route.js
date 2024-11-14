import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // Check for file
    if (!file || !file.name || !file.stream) {
      return NextResponse.json({ error: 'No file present' }, { status: 400 });
    }

    // Upload file to /tmp for now
    const uploadPath = '/tmp/uploads';
    await mkdir(uploadPath, { recursive: true });
    const filePath = join(uploadPath, `${file.name}`);

    // Read the file stream and collect the chunks
    const fileStream = file.stream();
    const chunks = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const fileContent = Buffer.concat(chunks);

    // Check if the content is valid JSON
    try {
      JSON.parse(fileContent.toString('utf8'));
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON content' }, { status: 400 });
    }

    // Write the file content to the path
    await writeFile(filePath, fileContent);

    return NextResponse.json({
      message: 'File uploaded successfully',
      file: {
        filename: file.name,
        path: filePath,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}
