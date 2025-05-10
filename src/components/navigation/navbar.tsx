"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import { announcement } from "@/data/announcement";
import { AnnouncementBanner } from "@/components/navigation/announcement-banner";

const Navbar = ({ eventLink }: { eventLink: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScrollOrRedirect = (href: string) => {
    if (pathname === "/etkinlikler" && href.startsWith("#")) {
      router.push(`/${href}`);
    } else {
      const id = href.split("#")[1];
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
    setIsExpanded(false); // Close navbar after clicking a link
  };

  const navigationItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/etkinlikler", label: "Etkinlikler" },
    { href: "#konusmacilar", label: "Konuşmacılar", isScroll: true },
    { href: "#biletler", label: "Biletler", isScroll: true },
  ];

  return (
    <>
      <AnnouncementBanner />
      <header
        className={`${announcement.show ? "top-[40px] sm:top-[44px]" : "top-0"} absolute w-5/6 mt-[34px] rounded-lg z-50 px-4 sm:px-4 bg-color-primary py-2 left-1/2 -translate-x-1/2`}
      >
        <div className="relative w-full h-20 flex items-center justify-center">
          {/* Logo (solda) */}
          <div className="absolute left-0 pl-4 flex items-center">
            <a href="/">
              <Image
                src="/images/logo/logo-wide-dark.webp"
                alt="DMG Logo"
                width={196}
                height={196}
                priority
                className="object-contain my-auto"
              />
            </a>
          </div>

          {/* Navigation (ortada) */}
          <div className="hidden lg:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4 xl:gap-8 group">
                {navigationItems.map((item) => (
                  <NavigationMenuItem
                    key={item.href}
                    className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  >
                    <button
                      onClick={() => handleScrollOrRedirect(item.href)}
                      className="text-lg font-bold text-color-text transition-colors"
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Button (sağda) */}
          <div className="absolute right-0 pr-4 hidden lg:flex">
            <Button
              variant="outline"
              className="relative h-11 px-6 text-color-black group transition-all duration-300 ease-in-out"
            >
              <a href={eventLink} target="_blank" rel="noreferrer">
                <div className="absolute inset-0 bg-color-accent transition-transform duration-300 ease-in-out rounded-md" />
                <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                  <span className="relative z-10 font-medium text-sm">
                    Kayıt Ol
                  </span>
                </div>
              </a>
              <span className="invisible font-medium text-sm">Kayıt Ol</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden absolute right-4">
            <Button
              className="text-black"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <List className="h-6 w-6 hover:bg-none" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center transition-all duration-300 ${
          isExpanded
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <button
          className="absolute top-12 right-16 text-black text-3xl"
          onClick={() => setIsExpanded(false)}
        >
          <X size={24} weight="bold" />
        </button>

        <div className="flex flex-col items-center space-y-6">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-2xl font-medium text-black transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleScrollOrRedirect(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          <Button
            variant="outline"
            className="mt-6 rounded-lg text-lg text-black border-black px-8 py-3"
          >
            <a href={eventLink} target="_blank" rel="noreferrer">
              Kayıt Ol
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
