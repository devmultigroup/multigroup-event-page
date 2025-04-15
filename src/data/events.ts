import { Event } from "@/types";

const events: Event[] = [
  {
    id: 1,
    name: "Mobile Developer Summit 2024",
    title: "Summit For",
    subTitle: "Who're interested in MoDe",
    description: "A detailed event on mobile development trends.",
    location: {
      latitude: 41.085660366250444,
      longitude: 28.950240039927138,
      name: "Adesso Office",
      subtext: "Adesso Türkiye Maslak Ofisi",
    }, // San Francisco coordinates
    registerLink:
      "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5",
    videoUrl: "https://example.com/event-video",
    date: "2024-01-29T13:00:00+03:00", // ISO date object
    speakers: [
      {
        fullName: "John Doe",
        title: "Senior Developer",
      },
      {
        fullName: "Özcan Zafer Ayan",
        title: "CTO at MobileTech",
        phrase:
          "Konuşma yaptığım en ilgi çekici topluluk, herkese tavsiye ederim!",
        company: "Trendyol",
        linkedin: "https://www.linkedin.com/in/daronyondem/",
        twitter: "https://x.com/daronyondem",
      },
    ],
    sessions: [
      {
        topic: "Future of Android Development",
        startTime: "10:00", // Hour only
        endTime: "11:00", // Hour only
        speakerName: "John Doe",
        room: "Ana Salon",
      },
      {
        topic: "Cross-Platform Mobile Frameworks",
        startTime: "11:30",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Yan Salon",
      },
    ],
    sponsors: [
      {
        tier: "platin",
        sponsorSlug: "all-done",
      },
      {
        tier: "altın",
        sponsorSlug: "perseva",
      },
      {
        tier: "gümüş",
        sponsorSlug: "softtech",
      },
      {
        tier: "bronz",
        sponsorSlug: "adesso",
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.jpg",
      "/images/events/mobile-developer-summit-2024/2.jpg",
      "/images/events/mobile-developer-summit-2024/3.jpg",
    ],
    afterMetrics: {
      applications: "500",
      vipGuests: "100+",
      supporter: "150+",
      speakers: "30",
      workingParticipant: "60%",
      jobSeeker: "35%",
      jobProvider: "65%",
      satisfaction: "83%",
    },
    colorPalette: {
      primary: "214 83.7% 51%", // Blue
      secondary: "214 83.7% 65%",
      tertiary: "214 83.7% 95%",
      text: "214 83.7% 20%",
    },
  },
  {
    id: 2,
    name: "Trendyol Meetup",
    title: "Summit For",
    subTitle: "Who're interested in MoDe",
    description:
      "Mobile, Web, Data Science ve Cloud tutkunlarının sabırsızlıkla beklediği etkinliğimiz #multitechsum24 için gerisayım başladı! Heyecan dorukta! Peki, bu etkinlikte seni neler bekliyor?\n\n🎙️ Sektörün öncülerinden ilham verici konuşmalar ve etkileşimli panellerle yepyeni bilgiler edinme fırsatı!\n\n🌟 Birbirinden değerli ve eşsiz network imkanları!\n\n☕ Enerji dolu kahve molalarıyla dinamik bir atmosfer!",
    location: {
      latitude: 41.085660366250444,
      longitude: 28.950240039927138,
      name: "Trendyol Maslak Ofis",
      subtext:
        "Located at Moscone Center, easily accessible via public transport.",
    }, // San Francisco coordinates
    registerLink:
      "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5",
    videoUrl: "https://example.com/ai-event-video",
    date: "2025-04-26T13:00:00+03:00",
    speakers: [
      {
        fullName: "Alice Johnson",
        title: "AI Research Lead",
      },
      {
        fullName: "Özcan Zafer Ayan",
        title: "CTO at MobileTech",
        phrase:
          "Konuşma yaptığım en ilgi çekici topluluk, herkese tavsiye ederim!",
        company: "Trendyol",
        linkedin: "https://www.linkedin.com/in/daronyondem/",
        twitter: "https://x.com/daronyondem",
      },
      {
        fullName: "Alice Johnson2",
        title: "AI Research Lead",
      },
      {
        fullName: "Bob William2",
        title: "CTO at MobileTech",
      },
      {
        fullName: "Alice Johnson3",
        title: "AI Research Lead",
      },
      {
        fullName: "Bob Williams3",
        title: "CTO at MobileTech",
      },
      {
        fullName: "Alice Johnson4",
        title: "AI Research Lead",
      },
      {
        fullName: "Bob Williams4",
        title: "CTO at MobileTech",
      },
    ],
    sessions: [
      {
        topic: "Future of Android Development",
        startTime: "10:00", // Hour only
        endTime: "11:00", // Hour only
        speakerName: "Özcan Zafer Ayan",
        room: "Ana Salon",
      },
      {
        topic: "Cross-Platform Mobile Frameworks",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Yan Salon",
      },
    ],
    sponsors: [
      {
        tier: "platin",
        sponsorSlug: "trendyol",
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    afterMetrics: {
      applications: "700",
      vipGuests: "200+",
      supporter: "250+",
      speakers: "40",
      workingParticipant: "70%",
      jobSeeker: "45%",
      jobProvider: "75%",
      satisfaction: "90%",
    },
    colorPalette: {
      primary: "17, 85%, 58%", // Green
      secondary: "54, 89%, 69%",
      tertiary: "229, 41%, 45%",
      text: "5 77% 64%",
    },
  },
];

export default events;
