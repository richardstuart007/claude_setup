//==============================================================================================
//  1) DESCRIPTION
//    RootLayout — the app's root layout. Wraps every page in the <html>/<body>
//    shell and pulls in the global stylesheet. The exported `metadata` sets the
//    browser tab title and description.
//
//    Parameters:
//      children — the page content rendered inside <body>
//==============================================================================================

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "App launchpad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 min-h-screen antialiased overflow-y-auto'>
        {children}
      </body>
    </html>
  )
}
