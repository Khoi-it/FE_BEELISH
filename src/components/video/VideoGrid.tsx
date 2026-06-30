import VideoCard from './VideoCard'

export default function VideoGrid({ videos }: { videos: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((v) => (
        <VideoCard key={v.title} {...v} />
      ))}
    </div>
  )
}

