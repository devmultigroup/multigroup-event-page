import React from "react";
import { motion } from "framer-motion";
import { Sponsor } from "@/types";

interface SponsorGroups {
  [key: string]: Sponsor[];
}

const Sponsors = ({ sponsors }: { sponsors: Sponsor[] }) => {
  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce<SponsorGroups>((groups, sponsor) => {
    const tier = sponsor.tier;
    if (!groups[tier]) {
      groups[tier] = [];
    }
    groups[tier].push(sponsor);
    return groups;
  }, {});

  // Sort tiers by importance
  const tierOrder = ["Platin", "Altın", "Gümüş", "Bronz"];
  const sortedTiers = Object.keys(sponsorsByTier).sort(
    (a, b) => tierOrder.indexOf(a) - tierOrder.indexOf(b)
  );

  // Tier configurations for logo sizing
  const tierConfig = {
    "platin": {
      logoHeight: "h-16 md:h-20",
      maxWidth: "max-w-xs",
    },
    "altın": {
      logoHeight: "h-14 md:h-16",
      maxWidth: "max-w-xs",
    },
    "gümüş": {
      logoHeight: "h-12 md:h-14",
      maxWidth: "max-w-xs",
    },
    "bronz": {
      logoHeight: "h-10 md:h-12",
      maxWidth: "max-w-xs",
    },
  };

  const formatTierTitle = (tier: string): string => {
    const tierMap: Record<string, string> = {
      "Platin": "PLATİN SPONSORLARIMIZ",
      "Altın": "ALTIN SPONSORLARIMIZ",
      "Gümüş": "GÜMÜŞ SPONSORLARIMIZ",
      "Bronz": "BRONZ SPONSORLARIMIZ",
    };
    return tierMap[tier] || `${tier.toUpperCase()} SPONSORLARIMIZ`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {sortedTiers.map((tier) => {
        const tierKey = tier.toLowerCase() as keyof typeof tierConfig;
        const config = tierConfig[tierKey];
        
        return (
          <div key={tier} className="mb-16">
            <div className="relative flex items-center justify-center mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full md:w-2/3 border-t border-gray-400/30 mx-auto"></div>
              </div>
              <div className="relative z-10">
                <span className="px-6 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-900 rounded-full">
                  {formatTierTitle(tier)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              {sponsorsByTier[tier].map((sponsor) => (
                <motion.div
                  key={sponsor.sponsorSlug}
                  className={`flex items-center justify-center ${config.maxWidth} mb-4`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`/images/sponsors/${sponsor.sponsorSlug}.png`}
                    alt={sponsor.sponsorSlug || `${tier} Sponsor`}
                    className={`${config.logoHeight} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sponsors;