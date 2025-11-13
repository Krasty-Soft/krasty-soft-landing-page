import { EXPERTISE_ITEMS } from "@/lib/expertise";

const OurExpertise = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {EXPERTISE_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col gap-4 p-6 md:p-8 bg-white rounded-lg border border-light-grey hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  {IconComponent && (
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center p-2 md:p-3">
                      <IconComponent />
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;
