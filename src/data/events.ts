import { Event } from "@/types";

const events: Event[] = [
  {
    id: 1,
    name: "Mobile Developer Summit 2024",
    heroDescription:
      "Seni yalnızca bir teknik konferansa değil, ilham verici bir mobil developer buluşmasına davet ediyoruz!",
    cardDescription:
      "Mobil development'a ilgi duyuyorsan, bu etkinliği kaçırmak istemeyeceksin! Şimdiden yerini ayırt ve bu heyecana sen de ortak ol. Gelecek yıla kalma bu yıl tanışalım!",
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
    organizers: [
      {
        id: 1,
        name: "Furkan Ünsalan",
        designation: "Pioneer Member",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
    ],
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
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 600 },
      { title: "Etkinlik Kontenjan", value: 600 },
      { title: "Etkinlik Kontenjan", value: 600 },
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
      accent: "214 83.7% 95%",
      background: "255 255% 255%",
      text: "214 83.7% 20%",
    },
  },
  {
    id: 2,
    name: "Mobile Developer Conference",
    heroDescription:
      "Seni yalnızca bir teknik konferansa değil, ilham verici bir mobil developer buluşmasına davet ediyoruz!",
    cardDescription:
      "Mobil development'a ilgi duyuyorsan, bu etkinliği kaçırmak istemeyeceksin! Şimdiden yerini ayırt ve bu heyecana sen de ortak ol. Gelecek yıla kalma bu yıl tanışalım!",
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
    date: "2025-05-31T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Furkan Ünsalan",
        designation: "Pioneer Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
      {
        id: 2,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
    ],
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
        room: "Oturumlar",
      },
      {
        topic: "Cross-Platform Mobile Frameworks",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
      {
        topic: "Cross-Platform Mobile Frameworks2",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
      {
        topic: "Cross-Platform Mobile Frameworks3",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
      {
        topic: "Cross-Platform Mobile Frameworks4",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
      {
        topic: "Cross-Platform Mobile Frameworks5",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
      {
        topic: "Cross-Platform Mobile Frameworks6",
        startTime: "10:00",
        endTime: "12:30",
        speakerName: "Jane Smith",
        room: "Network",
      },
    ],
    sponsors: [
      {
        tier: "platin",
        sponsorSlug: "trendyol",
      },
    ],
    tickets: [
      {
        type: "Community Supporter Ticket",
        description:
          "Community Supporter bileti ile hem etkinliğin bir parçası olun hem de gelecek etkinliklerimize katkıda bulunun!",
        price: 300,
        link: "https://kommunity.com",
        perks: [
          "Supporterlara özel badge’lere sahip olun",
          "Supporterlara özel supporter wall’a dahil olun",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter Ticket ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://kommunity.com",
        perks: ["test1", "test2", "test3", "test-4"],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 600 },
      { title: "Etkinlik Kontenjan", value: 600 },
      { title: "Etkinlik Kontenjan", value: 600 },
    ],
    // afterMetrics: {
    //   applications: "700",
    //   vipGuests: "200+",
    //   supporter: "250+",
    //   speakers: "40",
    //   workingParticipant: "70%",
    //   jobSeeker: "45%",
    //   jobProvider: "75%",
    //   satisfaction: "90%",
    // },
    colorPalette: {
      primary: "244.29, 100%, 97.25%",
      secondary: "250, 6.98%, 16.86%",
      accent: "199.53, 75.44%, 77.65%",
      background: "0, 0%, 100%",
      text: "250, 6.98%, 16.86%",
    },
  },
];

export default events;
