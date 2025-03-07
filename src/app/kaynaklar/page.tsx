"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ResourceProvider,
  useResourceContext,
} from "@/context/ResourceContext";

// Breakpoint object for masonry grid
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function ResourcePage() {
  return (
    <ResourceProvider>
      <InnerResourcePage />
    </ResourceProvider>
  );
}

const InnerResourcePage = () => {
  const { resources, isLoading, isError } = useResourceContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(6);

  // Filter resources based on search query
  const filteredResources = resources?.filter((resource) =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleResources = filteredResources?.slice(0, visibleItems);

  // Check if there are more resources to load
  const hasMoreResources =
    filteredResources && visibleItems < filteredResources.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  // Reset visible items when search query changes
  useEffect(() => {
    setVisibleItems(6);
  }, [searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top spacing */}
      <div className="h-[30vh]"></div>

      {/* Content container */}
      <motion.div
        className="w-11/12 md:w-5/6 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header
          className="mb-12 md:mb-16 text-center"
          variants={headerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-5 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Kaynak Kütüphanesi
          </motion.h1>
          <motion.p
            className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Gelişim yolculuğunuzu zenginleştirecek araçlar, kılavuzlar ve
            referanslardan oluşan koleksiyonumuzu keşfedin.
          </motion.p>

          <motion.div
            className="relative max-w-md mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Kaynakları arayın..."
              className="pl-10 bg-white border-gray-800 text-gray-500 placeholder:text-gray-500 focus-visible:ring-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.header>

        {isLoading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-gray-400"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Kaynaklar yükleniyor...
            </motion.div>
          </motion.div>
        ) : isError ? (
          <motion.div
            className="bg-red-900/20 border border-red-800 text-red-300 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Kaynaklar yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-6 w-auto"
                columnClassName="pl-6 bg-clip-padding"
              >
                {visibleResources?.map((resource, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="mb-6 bg-gray-800/70 backdrop-blur-sm border border-gray-600/30 hover:border-[#C55E85] hover:bg-gray-800/80 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 group overflow-hidden rounded-xl will-change-transform">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white group-hover:text-white/90 transition-colors text-xl md:text-2xl font-bold">
                          {resource.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-white/90 text-sm md:text-base">
                        <p className="whitespace-pre-wrap">
                          {resource.description}
                        </p>
                      </CardContent>

                      <CardFooter className="flex justify-between items-center pt-2">
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-medium text-sm md:text-base transition-colors"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              className="bg-gray-700/90 hover:bg-gray-600/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-gray-500/30"
                              aria-label="kaynak linki"
                            >
                              İncele
                            </Button>
                          </motion.div>
                        </a>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </Masonry>
            </AnimatePresence>

            {hasMoreResources && (
              <motion.div
                className="flex justify-center mt-8 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    onClick={handleLoadMore}
                    className="bg-[#3682F1] hover:bg-[#3682F1]/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-[#3682F1]/30"
                    aria-label="daha fazla kaynak yükle"
                  >
                    Daha Fazla Yükle
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </>
        )}

        {filteredResources?.length === 0 && (
          <motion.div
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Aramanızla eşleşen herhangi bir kaynak bulunamadı.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
