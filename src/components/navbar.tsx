import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navigationItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/etkinlikler", label: "Etkinlikler" },
    { href: "/konusmacilar", label: "Konuşmacılar" },
  ];

  return (
    <header className="absolute w-full z-50 px-24 bg-zinc-900 border-b-2 border-zinc-100 rounded-bl-full rounded-br-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-12 w-auto" src="/dmg-logo.png" alt="DMG Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className="flex-1">
              <NavigationMenuList className="flex gap-8 group">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href} className="transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100">
                    <NavigationMenuLink
                      href={item.href}
                      className="text-lg font-bold text-white hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Register Button */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              className="relative h-11 px-6 text-zinc-900 group transition-all duration-300 ease-in-out"
            >
              <div className="absolute inset-0 bg-orange-500 translate-x-0 translate-y-0 transition-transform duration-300 ease-in-out rounded-md" />
              
              <div className="absolute inset-0 bg-white group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-in-out rounded-md flex items-center justify-center">
                <span className="relative z-10 font-medium text-sm">Kayıt Ol</span>
              </div>

              <span className="invisible font-medium text-sm">Davetiye alın</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>MultiGroup Events</SheetTitle>
                <div className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-gray-800 hover:text-black"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button
                    variant="outline"
                    className="mt-4 border-2 font-medium text-lg"
                  >
                    Kayıt Ol
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
