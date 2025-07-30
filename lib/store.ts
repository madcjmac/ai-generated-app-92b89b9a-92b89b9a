import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Track {
  id: string
  title: string
  artist?: string
  duration: number
  url: string
  coverUrl?: string
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
}

interface PlayerState {
  tracks: Track[]
  playlists: Playlist[]
  currentTrack: Track | null
  isPlaying: boolean
  addTrack: (track: Track) => void
  removeTrack: (id: string) => void
  setCurrentTrack: (track: Track | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  addPlaylist: (playlist: Playlist) => void
  removePlaylist: (id: string) => void
  addTrackToPlaylist: (playlistId: string, track: Track) => void
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void
}

export const useStore = create<PlayerState>()(
  persist(
    (set) => ({
      tracks: [],
      playlists: [],
      currentTrack: null,
      isPlaying: false,
      addTrack: (track) =>
        set((state) => ({ tracks: [...state.tracks, track] })),
      removeTrack: (id) =>
        set((state) => ({
          tracks: state.tracks.filter((track) => track.id !== id),
        })),
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      addPlaylist: (playlist) =>
        set((state) => ({ playlists: [...state.playlists, playlist] })),
      removePlaylist: (id) =>
        set((state) => ({
          playlists: state.playlists.filter((playlist) => playlist.id !== id),
        })),
      addTrackToPlaylist: (playlistId, track) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, tracks: [...playlist.tracks, track] }
              : playlist
          ),
        })),
      removeTrackFromPlaylist: (playlistId, trackId) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: playlist.tracks.filter((track) => track.id !== trackId),
                }
              : playlist
          ),
        })),
    }),
    {
      name: 'mp3-player-storage',
    }
  )
)