import { Star } from "@phosphor-icons/react";

export default function TextDivider() {
  const contentItems = [
    {
      title: "Network'ünü genişlet",
      text: "Network alanımıza katıl ve networkünü genişletmek için ilk adımı at",
    },
    {
      title: "İş Ve Staj İmkanları Yakala",
      text: "Etkinlik alanımızı gez ve potansiyel iş ve staj imkanlarından haberdar ol",
    },
    {
      title: "Sektörü Tanı",
      text: "Katılım gösteren şirketlerle tanış ve geleceğin ihtiyaçlarını ilk ağızdan dinle",
    },
    {
      title: "Harika Teknik Oturumlara Katıl",
      text: "Teknik oturumlarımıza katı ve teknik ekiplerin yenilikçi yaklaşımlarını, nasıl düşündüklerini dinlel",
    },
  ];

  return (
    <section className="w-5/6 mx-auto py-12">
      <div className="border-t border-b border-color-accent py-12">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex flex-col gap-12 text-color-text font-medium w-1/3 text-left">
            {contentItems.slice(0, 2).map((item, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-color-accent shadow-xl bg-white relative">
            <div className="w-10 h-10 rounded-md flex items-center justify-center">
              <img
                src="/images/logo/logo-small-black.png"
                alt="Image"
                className="w-[50px] h-auto bottom-0 rounded-md mx-auto"
              />
            </div>
          </div>

          <div className="flex flex-col gap-12 text-color-text font-medium w-1/3 text-right">
            {contentItems.slice(2).map((item, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Star icon on top */}
          <div className="p-6 rounded-xl border border-color-accent shadow-xl bg-white mb-6">
            <div className="w-10 h-10 rounded-md flex items-center justify-center">
              <img
                src="/images/logo/logo-small-black.png"
                alt="Image"
                className="w-[50px] h-auto bottom-0 rounded-md mx-auto"
              />
            </div>
          </div>

          {contentItems.map((item, i) => (
            <div
              key={i}
              className="w-full text-left text-color-text font-medium"
            >
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
