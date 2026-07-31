import type { Metadata } from "next";
import "./globals.css";
import { DevLayoutHeader } from 'nextjs-shared/DevLayoutHeader'

export const metadata: Metadata = {
  title: "Dashboard",
  description: "App launchpad",
};

const IS_DEV = process.env.NEXT_PUBLIC_APPENV_ISDEV === 'true'
const DB_LOCATION = process.env.POSTGRES_DATABASE_LOCATION ?? 'unknown'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 min-h-screen antialiased overflow-y-auto'>
        {IS_DEV && <DevLayoutHeader dbLocation={DB_LOCATION} />}
        {children}
      </body>
    </html>
  )
}
