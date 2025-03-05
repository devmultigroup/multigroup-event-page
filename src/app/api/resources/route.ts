// app/api/resources/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

async function getGoogleSheetsClient() {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Replace literal "\n" in the key with actual newlines
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// GET handler in the new App Router API route
export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient();

    // Adjust spreadsheetId and range as needed.
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A2:C',
    });

    const resources = (response.data.values || [])
      .map(([name, link, description]) => ({
        name: name?.toString().trim() || '',
        link: link?.toString().trim() || '',
        description: description?.toString().trim() || '',
      }))
      .filter((resource) => resource.name && resource.link && resource.description);

    // Return a JSON response and set caching headers.
    return NextResponse.json(resources, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Sheets API Error:', error);

    const message =
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Internal Server Error';

    return NextResponse.json(
      { message: 'Error fetching resources', error: message },
      { status: 500 }
    );
  }
}
