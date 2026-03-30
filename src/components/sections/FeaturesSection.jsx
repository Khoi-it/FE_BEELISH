import FeatureCard from './FeatureCard'

const features = [
    {
        icon: 'hearing',
        title: 'Nghe chép chính tả',
        description:
            'Luyện nghe sâu (Intensive Listening) qua video YouTube. Thử thách khả năng nhận diện âm thanh và cấu trúc câu chính xác 100%.',
        iconBg: '#FF9F1C',
    },
    {
        icon: 'style',
        title: 'Học từ vựng thông minh',
        description:
            'Ghi nhớ từ vựng qua Flashcard và bài tập điền khuyết. Ứng dụng thuật toán lặp lại ngắt quãng giúp ghi nhớ sâu vào tiềm thức.',
        iconBg: '#ffbf00',
    },
    {
        icon: 'record_voice_over',
        title: 'Luyện nói Shadowing',
        description:
            'Cải thiện phát âm và ngữ điệu bằng cách bắt chước người bản xứ. Chấm điểm trực tiếp bằng công nghệ nhận diện giọng nói AI.',
        iconBg: '#2EC4B6',
    }
]

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mb-16 flex flex-col gap-4 text-center">
        <h2 className="text-4xl leading-tight font-black uppercase tracking-tight md:text-5xl">
          Tính năng nổi bật
        </h2>
        <p className="text-lg font-medium text-[#283f3bb3]">
          Khám phá cách học mới lạ và hiệu quả nhất hiện nay
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
