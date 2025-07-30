import Link from 'next/link'
import { HomeIcon, LibraryIcon, ListMusicIcon } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full glass-morphism border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              MP3 Player
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <HomeIcon size={20} />
                <span>Home</span>
              </Link>
              <Link
                href="/library"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <LibraryIcon size={20} />
                <span>Library</span>
              </Link>
              <Link
                href="/playlists"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <ListMusicIcon size={20} />
                <span>Playlists</span>
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}