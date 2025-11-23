import { ImageResponse } from '@vercel/og';

/**
 * API Route: /api/profile-card
 * 
 * Server-side rendering of ChainQuest profile card as PNG image.
 * Uses ImageResponse (OG image API) to render React component to PNG.
 * 
 * Query parameters:
 * - wallet: Wallet address (optional, defaults to 'Demo Mode')
 * - cqt: Total CQT earned (optional, defaults to 0)
 * - level: User level/rank (optional, defaults to 'Beginner')
 * - date: Current date string (optional)
 * - lang: Language ('tr' or 'en', optional, defaults to 'en')
 */

export const config = {
  runtime: 'edge',
};

export default async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get query parameters
    const wallet = searchParams.get('wallet') || 'Demo Mode';
    const cqt = parseInt(searchParams.get('cqt') || '0', 10);
    const level = searchParams.get('level') || 'Beginner';
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const lang = searchParams.get('lang') || 'en';
    const filename = searchParams.get('filename') || `chainquest-card-${Date.now()}.png`;

    // Format wallet address
    const formatAddress = (address) => {
      if (!address || address === 'Demo Mode') return 'Demo Mode';
      if (address.length <= 12) return address;
      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };

    const formattedWallet = formatAddress(wallet);

    // Card dimensions
    const width = 800;
    const height = 450;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
            backgroundColor: '#050012',
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Main Card Container */}
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '40px',
              padding: '40px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Left Side - Avatar & Rank */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Avatar Circle */}
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                }}
              >
                {wallet !== 'Demo Mode' ? '👤' : '🎮'}
              </div>

              {/* Rank Badge */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {level}
              </div>
            </div>

            {/* Right Side - Info */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                flex: 1,
              }}
            >
              {/* Top Section - Logo */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #818cf8, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: '#818cf8', // Fallback
                  }}
                >
                  ChainQuest
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    marginTop: '4px',
                  }}
                >
                  {lang === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                </div>
              </div>

              {/* Wallet Address */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                  }}
                >
                  {lang === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                >
                  {formattedWallet}
                </div>
              </div>

              {/* CQT Earned */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    marginBottom: '8px',
                  }}
                >
                  {lang === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #fbbf24, #fb923c, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: '#fbbf24', // Fallback
                  }}
                >
                  {cqt.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '16px',
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#cbd5e1',
                    }}
                  >
                    {lang === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                  }}
                >
                  {date}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );

    // Clone response to add download headers
    const response = new Response(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    return response;
  } catch (error) {
    console.error('[API] Profile card generation error:', error);
    return new Response('Failed to generate profile card', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }
}

