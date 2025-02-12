"use client"

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { List } from "@phosphor-icons/react";

const Navbar = ({ eventLink }: { eventLink: string }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll = (href: string) => {
    const id = href.split('#')[1];
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollClose = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('scroll', handleScrollClose);
    
    return () => {
      window.removeEventListener('scroll', handleScrollClose);
    };
  }, [isExpanded]);

  // Updated navigationItems array with hash links
  const navigationItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/etkinlikler", label: "Etkinlikler" },
    { href: "#konuşmacılar", label: "Konuşmacılar", isScroll: true },
    { href: "#konum", label: "Konum", isScroll: true },
  ];

  return (
    <header className="absolute w-full z-50 px-6 sm:px-12 bg-zinc-900 border-b-2 border-zinc-100 rounded-bl-3xl md:rounded-bl-full rounded-br-3xl md:rounded-br-full">
      <div className="mx-auto px-8 sm:px-6 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-12 w-auto" src="/dmg-logo.png" alt="DMG Logo" />
            </a>
          </div>
          <div className="hidden lg:block">
            <NavigationMenu className="flex-1">
              <NavigationMenuList className="flex gap-8 group">
                {navigationItems.map((item) => (
                  <NavigationMenuItem
                    key={item.href}
                    className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  >
                    {item.isScroll ? (
                      <button
                        onClick={() => handleScroll(item.href)}
                        className="text-lg font-bold text-white hover:text-orange-500 transition-colors"
                        data-umami-event="Kayıt Linki"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className="text-lg font-bold text-white hover:text-orange-500 transition-colors"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden lg:block">
            <Button variant="outline" className="relative h-11 px-6 text-zinc-900 group transition-all duration-300 ease-in-out">
              <a href={eventLink} target="_blank">
                <div className="absolute inset-0 bg-orange-500 transition-transform duration-300 ease-in-out rounded-md" />
                <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                  <span className="relative z-10 font-medium text-sm">Kayıt Ol</span>
                </div>
              </a>
              <span className="invisible font-medium text-sm">Kayıt Ol</span>
            </Button>
          </div>
          <div className="lg:hidden">
            <Button className="text-white" variant="ghost" size="icon" aria-label="Open menu" onClick={() => setIsExpanded(!isExpanded)}>
              <List className="h-6 w-6 hover:bg-none" />
            </Button>
          </div>
        </div>
        <div
          className={`w-full bg-none transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} rounded-b-lg flex flex-col items-center space-y-4`}
        >
          {isExpanded && (
            <div className="flex flex-col items-center space-y-4 p-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-white hover:text-orange-500"
                  onClick={(e) => {
                    if (item.isScroll) {
                      e.preventDefault();
                      handleScroll(item.href);
                      setIsExpanded(false);
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="outline" className="mt-4 rounded-lg font-medium text-lg">
                <a href={eventLink} target="_blank">Kayıt Ol</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
