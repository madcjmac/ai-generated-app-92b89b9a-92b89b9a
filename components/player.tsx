'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
} from 'lucide-react'
import { Slider } from './ui/slider'

export default function Player() {
  const { currentTrack, isPlaying, setIsPlaying } = useStore()
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  if (!currentTrack) return null

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration
      audioRef.current.currentTime = time
      setProgress(value[0])
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-morphism border-t">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.coverUrl || '/default-cover.jpg'}
              alt={currentTrack.title}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div>
              <h3 className="font-medium">{currentTrack.title}</h3>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-1 max-w-xl mx-8">
            <div className="flex items-center space-x-4">
              <button className="hover:text-primary">
                <SkipBackIcon size={24} />
              </button>
              <button
                className="rounded-full p-2 hover:bg-primary hover:text-primary-foreground"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <PauseIcon size={32} />
                ) : (
                  <PlayIcon size={32} />
                )}
              </button>
              <button className="hover:text-primary">
                <SkipForwardIcon size={24} />
              </button>
            </div>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2 w-32">
            <Volume2Icon size={20} />
            <Slider
              value={[volume * 100]}
              max={100}
              onValueChange={(value) => setVolume(value[0] / 100)}
              className="w-24"
            />
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  )
}