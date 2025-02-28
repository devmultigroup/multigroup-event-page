"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { List } from "@phosphor-icons/react";
import Image from "next/image";

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
    { href: "#konuşmacılar", label: "Konuşmacılar", isScroll: true },
    { href: "#konum", label: "Konum", isScroll: true },
  ];

  return (
    <header className="absolute w-full z-50 px-6 sm:px-12 bg-transparent py-2">
      <div className="mx-auto px-8 sm:px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/">
              <Image
                src="/dmg-logo.png"
                alt="DMG Logo"
                width={196}
                height={196}
                priority
                className="object-contain my-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-8 ml-auto">
            <NavigationMenu className="flex-1">
              <NavigationMenuList className="flex gap-8 group">
                {navigationItems.map((item) => (
                  <NavigationMenuItem
                    key={item.href}
                    className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  >
                    <button
                      onClick={() => handleScrollOrRedirect(item.href)}
                      className="text-lg font-bold text-white hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="outline"
              className="relative h-11 px-6 text-zinc-900 group transition-all duration-300 ease-in-out"
            >
              <a href={eventLink} target="_blank">
                <div className="absolute inset-0 bg-orange-500 transition-transform duration-300 ease-in-out rounded-md" />
                <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                  <span className="relative z-10 font-medium text-sm">
                    Kayıt Ol
                  </span>
                </div>
              </a>
              <span className="invisible font-medium text-sm">Kayıt Ol</span>
            </Button>
          </div>
          <div className="lg:hidden">
            <Button
              className="text-white"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <List className="h-6 w-6 hover:bg-none" />
            </Button>
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
            isExpanded
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <button
            className="absolute top-12 right-16 text-black text-3xl"
            onClick={() => setIsExpanded(false)}
          >
            &times;
          </button>
          <div className="flex flex-col items-center space-y-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-black hover:text-orange-500 transition-colors"
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
              <a href={eventLink} target="_blank">
                Kayıt Ol
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
