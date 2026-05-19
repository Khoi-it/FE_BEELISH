import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router-dom'

export default function VideoCard({
  imageSrc,
  duration,
  levelLabel,
  levelClassName,
  title,
  views,
  timeAgo,
}) {
  return (
    <Link
      to={ROUTES.DICTATION}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border-none bg-white chunky-border shadow-chunky transition-all group hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      aria-label={`Mở bài học: ${title}`}
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img className="h-full w-full object-cover" src={imageSrc} alt={title} />
        <span className="absolute bottom-3 right-3 rounded bg-border-dark px-2 py-1 text-xs font-black text-white chunky-border border-white">
          {duration}
        </span>
        <span
          className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-black uppercase chunky-border ${levelClassName}`}
        >
          {levelLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-extrabold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between opacity-60 text-xs font-bold">
          <span>{views}</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  )
}

