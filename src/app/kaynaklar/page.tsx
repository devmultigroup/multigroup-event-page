"use client";

import { useState } from "react";
import useSWR from "swr";
import { Search } from "lucide-react";
import Masonry from 'react-masonry-css';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Resource {
  name: string;
  link: string;
  description: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Breakpoint object for masonry grid
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

export default function ResourcePage() {
  const { data, error, isLoading } = useSWR<Resource[]>(
    "/api/resources",
    fetcher
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter resources based on search query and reverse the order
  const filteredResources = data
    ?.filter((resource) =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reverse();

  return (
    <div className="flex flex-col justify-center container mx-auto min-h-screen mt-32 md:mt-64">
      <div className="w-5/6 max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Kaynak Kütüphanesi
          </h1>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Gelişim yolculuğunuzu zenginleştirecek araçlar, kılavuzlar ve
            referanslardan oluşan koleksiyonumuzu keşfedin.
          </p>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Kaynakları arayın..."
              className="pl-10 bg-white border-gray-800 text-gray-500 placeholder:text-gray-500 focus-visible:ring-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400">
              Kaynaklar yükleniyor...
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-300 rounded-lg p-4 text-center">
            Failed to load resources. Please try again later.
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
          >
            {filteredResources?.map((resource, index) => (
              <Card
                className="mb-6 bg-[#3682F1] bg-opacity-70 border border-[#3682F1]/30 hover:bg-opacity-80 hover:shadow-lg hover:shadow-[#3682F1]/20 transition-all duration-300 group overflow-hidden rounded-xl will-change-transform"
                key={index}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-white group-hover:text-white/90 transition-colors text-xl font-bold">
                    {resource.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-white/90 text-sm">
                  <p className="whitespace-pre-wrap">{resource.description}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-2">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-medium text-sm transition-colors"
                  >
                    <Button className="bg-[#C55E85] hover:bg-[#C55E85]/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 border border-[#C55E85]/30">
                      İncele
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </Masonry>
        )}

        {filteredResources?.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No resources found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
