import { ChatsCircle, Microphone, Sparkle } from "@phosphor-icons/react";

export default function IconDivider() {
  return (
    <section className="w-5/6 2xl:w-2/3 mx-auto py-12">
      <div className="border-t border-b border-color-accent py-12 flex flex-col gap-10 md:flex-row md:justify-between md:items-center text-color-text">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl border border-color-accent shadow-xl bg-white">
            <Microphone size={24} weight="fill" className="text-color-text" />
          </div>
          <h3 className="text-lg font-bold">Alanında Uzman Konuşmacılar</h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl border border-color-accent shadow-xl bg-white">
            <ChatsCircle size={24} weight="fill" className="text-color-text" />
          </div>
          <h3 className="text-lg font-bold">
            Etkileşim Odaklı Network Alanları
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl border border-color-accent shadow-xl bg-white">
            <Sparkle size={24} weight="fill" className="text-color-text" />
          </div>
          <h3 className="text-lg font-bold">
            Sektörün Önde Gelen Şirketleriyle Birebir
          </h3>
        </div>
      </div>
    </section>
  );
}
