import localFont from 'next/font/local'

export const ttRuns = localFont({
  src: [
    {
      path: '../fonts/TT Runs Trial Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/TT Runs Trial Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-tt-runs',
  display: 'swap',
})
