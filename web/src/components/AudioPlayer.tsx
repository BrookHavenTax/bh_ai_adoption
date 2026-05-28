import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Rewind,
  FastForward,
  Volume2,
  Headphones,
} from "lucide-react";

interface AudioPlayerProps {
  src: string;
  label?: string;
}

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  src,
  label = "Listen to this tutorial",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState<1 | 1.25 | 1.5 | 1.75 | 2>(1);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    function onTime() {
      setCurrent(audio!.currentTime);
    }
    function onMeta() {
      setDuration(audio!.duration);
    }
    function onEnd() {
      setPlaying(false);
    }
    function onError() {
      setLoadError(true);
    }
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
  }, [rate]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setLoadError(true));
      setPlaying(true);
    }
  }

  function seek(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  }

  function seekTo(value: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
  }

  function cycleRate() {
    const rates: typeof rate[] = [1, 1.25, 1.5, 1.75, 2];
    const idx = rates.indexOf(rate);
    setRate(rates[(idx + 1) % rates.length]);
  }

  if (loadError) {
    return (
      <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-500 dark:text-slate-400">
        <Headphones size={14} aria-hidden="true" />
        Audio narration not available for this tutorial yet.
      </div>
    );
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-brand-50 dark:from-violet-950/40 dark:to-brand-950/40 border border-violet-200 dark:border-violet-800 rounded-xl"
      role="region"
      aria-label={label}
      data-testid="audio-player"
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause narration" : "Play narration"}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-400 text-white flex items-center justify-center transition-colors shadow-sm"
        data-testid="audio-play-toggle"
      >
        {playing ? (
          <Pause size={16} aria-hidden="true" />
        ) : (
          <Play size={16} aria-hidden="true" className="ml-0.5" />
        )}
      </button>

      <button
        type="button"
        onClick={() => seek(-15)}
        aria-label="Rewind 15 seconds"
        className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 items-center justify-center hover:border-violet-400 transition-colors"
      >
        <Rewind size={14} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => seek(15)}
        aria-label="Skip forward 15 seconds"
        className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 items-center justify-center hover:border-violet-400 transition-colors"
      >
        <FastForward size={14} aria-hidden="true" />
      </button>

      <div className="flex-1 flex items-center gap-2 min-w-0">
        <Headphones
          className="text-violet-600 dark:text-violet-400 flex-shrink-0 hidden sm:block"
          size={14}
          aria-hidden="true"
        />
        <div className="text-xs font-medium text-slate-700 dark:text-slate-200 tabular-nums whitespace-nowrap">
          {formatTime(current)}
        </div>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={(e) => seekTo(Number(e.target.value))}
          aria-label="Audio progress"
          className="flex-1 h-1 accent-violet-600 dark:accent-violet-400"
          style={{
            background: `linear-gradient(to right, rgb(124 58 237) 0%, rgb(124 58 237) ${progress}%, rgb(226 232 240) ${progress}%, rgb(226 232 240) 100%)`,
          }}
        />
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums whitespace-nowrap">
          {formatTime(duration)}
        </div>
      </div>

      <button
        type="button"
        onClick={cycleRate}
        aria-label={`Playback speed: ${rate}x`}
        className="flex-shrink-0 text-xs font-mono font-bold text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-100 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 hover:border-violet-400 transition-colors"
      >
        {rate}x
      </button>

      <Volume2
        className="hidden lg:block text-slate-400 dark:text-slate-500 flex-shrink-0"
        size={14}
        aria-hidden="true"
      />
    </div>
  );
}
