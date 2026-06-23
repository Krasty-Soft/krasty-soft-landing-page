import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Krasty Soft - Software Development Company'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
                    backgroundColor: '#0a0a0a',
                    backgroundImage:
                        'radial-gradient(circle at 50% 50%, rgba(229, 6, 6, 0.15) 0%, transparent 70%)',
                }}
            >
                {/* Red accent line */}
                <div
                    style={{
                        width: 80,
                        height: 4,
                        backgroundColor: '#E50606',
                        borderRadius: 2,
                        marginBottom: 32,
                    }}
                />
                {/* Company name */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: -2,
                        marginBottom: 16,
                    }}
                >
                    Krasty Soft
                </div>
                {/* Tagline */}
                <div
                    style={{
                        fontSize: 28,
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: 40,
                    }}
                >
                    Software Development Company
                </div>
                {/* Bottom accent */}
                <div
                    style={{
                        width: 200,
                        height: 2,
                        backgroundColor: '#E50606',
                        borderRadius: 1,
                    }}
                />
            </div>
        ),
        { ...size },
    )
}
