import { ImageResponse } from 'next/server';

/**
 * API Route: /api/profile-card
 * 
 * Server-side rendering of ChainQuest profile card as PNG image.
 * Uses ImageResponse from next/server to render React component to PNG.
 * 
 * Query parameters:
 * - wallet: Wallet address (optional, defaults to 'Demo Mode')
 * - cqt: Total CQT earned (optional, defaults to 0)
 * - level: User level/rank (optional, defaults to 'Beginner')
 * - date: Current date string (optional)
 * - lang: Language ('tr' or 'en', optional, defaults to 'en')
 */

export const runtime = 'edge';

export async function GET(req: Request) {
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

    // Format wallet address
    const formatAddress = (address: string) => {
      if (!address || address === 'Demo Mode') return 'Demo Mode';
      if (address.length <= 12) return address;
      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };

    const formattedWallet = formatAddress(wallet);

    // Card dimensions - 1293x768 as specified
    const width = 1293;
    const height = 768;

    // Full ChainQuest card layout with only hex/rgb colors
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
            background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(59, 7, 100) 50%, rgb(15, 23, 42) 100%)',
            backgroundColor: 'rgb(5, 0, 18)',
            padding: '60px',
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
              gap: '60px',
              padding: '60px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Left Side - Avatar & Rank */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Avatar Circle */}
              <div
                style={{
                  width: '144px',
                  height: '144px',
                  borderRadius: '50%',
                  background: 'linear-gradient(to bottom right, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '72px',
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
                  padding: '12px 24px',
                  color: 'rgb(255, 255, 255)',
                  fontSize: '18px',
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
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, rgb(129, 140, 248), rgb(167, 139, 250))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'rgb(129, 140, 248)',
                  }}
                >
                  ChainQuest
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: 'rgb(148, 163, 184)',
                    marginTop: '8px',
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
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    color: 'rgb(148, 163, 184)',
                    marginBottom: '12px',
                  }}
                >
                  {lang === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    color: 'rgb(255, 255, 255)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '12px 18px',
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
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    color: 'rgb(148, 163, 184)',
                    marginBottom: '12px',
                  }}
                >
                  {lang === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div
                  style={{
                    fontSize: '72px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(251, 146, 60), rgb(251, 191, 36))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'rgb(251, 191, 36)',
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
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgb(34, 197, 94)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgb(255, 255, 255)',
                      fontSize: '24px',
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: 'rgb(203, 213, 225)',
                    }}
                  >
                    {lang === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: 'rgb(148, 163, 184)',
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
  } catch (error) {
    console.error('[API] Profile card generation error:', error);
    return new Response(
      `Failed to generate profile card: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }
}
