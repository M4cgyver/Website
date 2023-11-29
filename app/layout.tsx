import websiteIcon from "@/public/favicon.ico"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL('https://m4cgyver.net'),

  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  
  openGraph: {
    images: websiteIcon.src,
    locale: 'en-US',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}