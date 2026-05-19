// import styles from '../../styles/LandingPage.module.css'

export default function FeatureCard({ icon, title, description, iconBg }) {
  return (
    <article
      className={`group flex h-full cursor-default flex-col rounded-2xl bg-white p-8 border-[3px] border-[#283f3b] shadow-[8px_8px_0_0_#283f3b] transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-[8px_12px_0_0_#283f3b]`}
    >
      <div
        className={`mb-8 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 border-[3px] border-[#283f3b] shadow-[4px_4px_0_0_#283f3b]`}
        style={{ backgroundColor: iconBg }}
      >
        <span className="material-symbols-outlined text-3xl font-black">{icon}</span>
      </div>
      <h3 className="mb-4 text-2xl font-black">{title}</h3>
      <p className="grow font-medium leading-relaxed text-[#283f3bb3]">{description}</p>
    </article>
  )
}
