import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  Coffee,
  YoutubeLogo,
  UsersThree,
  XLogo,
} from "@phosphor-icons/react";
import { link } from "fs";
import { useState, useEffect, useRef } from "react";

const FloatingActionButton = ({ alwaysShow }: { alwaysShow: boolean }) => {
  const [isActive, setIsActive] = useState(false);
  const [showButton, setShowButton] = useState(alwaysShow);
  const containerRef = useRef<HTMLDivElement>(null);

  const socialItems = [
    {
      icon: InstagramLogo,
      label: "Instagram",
      link: "https://instagram.com/devmultigroup",
    },
    {
      icon: XLogo,
      label: "X",
      link: "https://x.com/devmultigroup",
    },
    {
      icon: LinkedinLogo,
      label: "Linkedin",
      link: "https://www.linkedin.com/company/devmultigroup/",
    },
    {
      icon: YoutubeLogo,
      label: "Youtube",
      link: "https://www.youtube.com/@devmultigroup",
    },
    {
      icon: UsersThree,
      label: "Kommunity",
      link: "https://kommunity.com/devmultigroup/events",
    },
    {
      icon: GithubLogo,
      label: "GitHub",
      link: "https://github.com/Developer-MultiGroup",
    },
    {
      icon: Coffee,
      label: "Buy Me a Coffee",
      link: "https://buymeacoffee.com/multigroup",
    },
  ];

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = alwaysShow
        ? true
        : window.scrollY > window.innerHeight * 0.2;
      setShowButton(shouldShow);
    };

    // Debounce scroll handler
    const debouncedScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = debouncedScroll();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [alwaysShow]);

  // Close dropdown if clicking outside of the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 font-montserrat-mid ${
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-color-accent rounded-full shadow-lg cursor-pointer transition-all duration-300 ${
          isActive ? "scale-105 shadow-xl" : "shadow-md"
        }`}
        onClick={() => setIsActive(!isActive)}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
      >
        <img
          src="/images/logo/logo-small.webp"
          alt="Toggle Button Icon"
          className={`select-none absolute inset-0 w-1/2 h-1/2 object-contain transition-transform duration-300 mx-auto my-auto ${
            isActive ? "rotate-180" : ""
          }`}
        />

        <ul
          className={`absolute bottom-14 sm:bottom-16 right-0 bg-[#1f2226] border-2 border-color-accent rounded-xl shadow-2xl p-3 sm:p-4 space-y-2 sm:space-y-3 min-w-[180px] sm:min-w-[220px] transition-all duration-300 ${
            isActive
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-2"
          }`}
        >
          {socialItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a key={index} href={item.link}>
                <li className="flex items-center py-1.5 px-2 sm:py-2 sm:px-3 hover:bg-[#ffffff15] rounded-lg transition-all duration-200 group">
                  <IconComponent
                    color="white"
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-[#ffffffdd] text-xs sm:text-sm group-hover:text-color-accent transition-colors duration-200">
                    {item.label}
                  </span>
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FloatingActionButton;
