/**
 * API Route: /api/download-card
 * 
 * Downloads the profile card as a JPEG image.
 * Accepts base64-encoded image data via POST request and returns it as a downloadable file.
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { imageData, filename } = req.body;

    // Validate input
    if (!imageData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing imageData in request body' 
      });
    }

    // Remove data URL prefix if present (data:image/jpeg;base64,)
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

    // Validate base64 string
    if (!/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid base64 image data' 
      });
    }

    // Convert base64 to Buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Validate buffer size (max 10MB)
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ 
        success: false, 
        error: 'Image too large (max 10MB)' 
      });
    }

    // Generate filename
    const downloadFilename = filename || `chainquest-card-${Date.now()}.jpg`;

    // Set response headers for file download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadFilename}"`);
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    // Send the image buffer as response
    res.status(200).send(imageBuffer);

  } catch (error) {
    console.error('[API] Download card error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error while processing image download' 
    });
  }
}

