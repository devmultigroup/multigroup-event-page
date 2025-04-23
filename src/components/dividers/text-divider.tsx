import { Star } from "@phosphor-icons/react";

export default function TextDivider() {
  return (
    <section className="w-5/6 mx-auto py-12">
      <div className="border-t border-b border-color-accent py-12">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex flex-col gap-12 text-color-text font-medium w-1/3">
            <div>
              <h3 className="text-xl font-bold">Lorem impus</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Lorem impus</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-color-accent shadow-xl bg-white relative">
            <div className="w-10 h-10 rounded-md flex items-center justify-center">
              <Star size={50} weight="fill" />
            </div>
          </div>
          <div className="flex flex-col gap-12 text-right text-color-text font-medium w-1/3">
            <div>
              <h3 className="text-xl font-bold">Lorem impus</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Lorem impus</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* First item - Left aligned */}
          <div className="w-full text-left text-color-text font-medium">
            <h3 className="text-xl font-bold">Lorem impus</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Second item - Right aligned */}
          <div className="w-full text-right text-color-text font-medium">
            <h3 className="text-xl font-bold">Lorem impus</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          {/* Star icon centered at the top */}
          <div className="p-6 rounded-xl border border-color-accent shadow-xl bg-white mb-6">
            <div className="w-10 h-10 rounded-md flex items-center justify-center">
              <Star size={50} weight="fill" />
            </div>
          </div>

          {/* Third item - Left aligned */}
          <div className="w-full text-left text-color-text font-medium">
            <h3 className="text-xl font-bold">Lorem impus</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>

          {/* Fourth item - Right aligned */}
          <div className="w-full text-right text-color-text font-medium">
            <h3 className="text-xl font-bold">Lorem impus</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
