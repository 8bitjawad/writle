import Link from "next/link";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" className="light">
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className="bg-neutral-950 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <header className="border-b border-neutral-800">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              Writle
            </Link>

            <div className="flex gap-6 text-sm text-purple-800">
              <Link href="/write">Write</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/history">History</Link>
              <SignedOut>
              <Link href="/sign-in">Sign In</Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
    </ClerkProvider>
  );
}
