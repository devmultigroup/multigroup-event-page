import React from "react";
import { motion } from "framer-motion";
import { Sponsor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const getTierHeight = (tier: string): string => {
    switch (tier.toLowerCase()) {
      case "platin":
        return "120px";
      case "altın":
        return "100px";
      case "gümüş":
        return "80px";
      default:
        return "60px";
    }
  };

  const formatTierName = (tier: string): string => {
    return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedTiers.map((tier) => (
          <motion.div
            key={tier}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  {formatTierName(tier)} Sponsor{sponsorsByTier[tier].length > 1 ? "lar" : ""}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  {sponsorsByTier[tier].map((sponsor) => (
                    <motion.div
                      key={sponsor.sponsorSlug}
                      className="w-full flex items-center justify-center p-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={`/images/sponsors/${sponsor.sponsorSlug}.png`}
                        alt={sponsor.sponsorSlug || `${tier} Sponsor`}
                        className="max-w-full h-auto object-contain rounded-lg"
                        style={{
                          maxHeight: getTierHeight(tier),
                          width: `min(100%, ${
                            tier.toLowerCase() === "platin"
                              ? "280px"
                              : tier.toLowerCase() === "altın"
                              ? "230px"
                              : "180px"
                          })`
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;