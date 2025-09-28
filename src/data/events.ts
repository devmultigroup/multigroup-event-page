import { Event } from "@/types";

const events: Event[] = [
  {
    id: 5,
    navigable: true,
    name: "Web Developer Conference 2025",
    heroDescription:
      "Web geliştirme dünyasının en güncel trendlerini keşfetmek, sektörün öncü isimlerinden ilham almak ve güçlü bir network kurmak için gereken her şeyi size sunuyoruz.",
    cardDescription:
      "Web geliştiriciliğe ilgi duyanların yıllık buluşması Web Developer Conference hızla yaklaşıyor! MultiGroup tarafından düzenlenen bu büyük yazılım zirvesi, önde gelen konuşmacıları, özel konukları ve değerli sponsorlarıyla size verimli bir hafta sonu sunmak için hazırlanıyor. Bu heyecan verici yolculuğa hazır mısınız?",
    location: {
      name: "Kadir Has Üniversitesi",
      subtext: "Kadir Has Üniversitesi, Cibali Kampüsü Etkinlik Alanı",
    },
    registerLink: "https://lodos.sh/event/62944986376529159230/details",
    videoUrl: "",
    date: "2025-09-27T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Furkan Ünsalan",
        designation: "Associate Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
      {
        id: 3,
        name: "Esra Kelleci",
        designation: "Pioneer Member",
        image: "/images/organizers/esra-kelleci.webp",
      },
    ],
    speakers: [
      // Ana Salon Konuşmacıları
      {
        fullName: "Feyza Demirel",
        title: "Solutions Architect",
        company: "aws",
      },
      {
        fullName: "Mehmet Nuri Yaman",
        title: "Chief Executive Officer",
        company: "lodos",
      },
      {
        fullName: "Murat Yücedağ",
        title: "Senior Instructor",
        company: "udemy",
      },
      {
        fullName: "Fatih Kadir Akın",
        title: "DevRel Manager",
        company: "teknasyon",
      },
      {
        fullName: "Kardel Rüveyda Çetin",
        title: "Software Development Lead",
        company: "dogus-teknoloji",
      },
      {
        fullName: "Ümit Samimi",
        title: "Software Development Director",
        company: "finartz",
      },
      // Network Alan Konuşmacıları
      {
        fullName: "Sefa Yalçındağ",
        title: "Frontend Developer",
        company: "turkish-technology",
      },
      {
        fullName: "Melis Dinçol",
        title: "UX Designer",
        company: "microsoft",
      },
      {
        fullName: "Tekin Ağgül",
        title: "Frontend Architect",
        company: "rg-labs",
      },
      {
        fullName: "Çağrı Çolakoğlu",
        title: "Senior Team Lead",
        company: "ziyarem",
      },
      {
        fullName: "Urem Sancaktutan",
        title: "Software Developer",
        company: "logo",
      },
      {
        fullName: "İsmail Özçelik",
        title: "Software Architect",
        company: "q-kare",
      },
      {
        fullName: "Mutlu Özkurt",
        title: "Software Development Specialist",
        company: "lc-waikiki",
      },
      {
        fullName: "Sencer Öztüfekçi",
        title: "Sr Software Developer",
        company: "the-big-thing",
      },
      {
        fullName: "Serkan Alc",
        title: "Community Lead",
        company: "multigroup",
      },
    ],
    sessions: [
      {
        topic: "Açılış Konuşması",
        startTime: "13.00",
        endTime: "13.10",
        speakerName: "Serkan Alc",
        room: "Ana Salon",
      },
      {
        topic: "Yapay Zeka Çağında Junior Olmak",
        startTime: "13.10",
        endTime: "13.30",
        speakerName: "Murat Yücedağ",
        room: "Ana Salon",
      },
      {
        topic: "Backend Süreçlerinde Deneyimin İzleri",
        startTime: "14.00",
        endTime: "14.20",
        speakerName: "Mehmet Nuri Yaman",
        room: "Ana Salon",
      },
      {
        topic: "Siber Tehditlere Karşı Web/Mobil Uygulama Güvenliği",
        startTime: "14.40",
        endTime: "15.00",
        speakerName: "Ümit Samimi",
        room: "Ana Salon",
      },
      {
        topic: "Bulutta Güçlü Altyapı: AWS Web Çözümleri",
        startTime: "15.40",
        endTime: "16.00",
        speakerName: "Feyza Demirel",
        room: "Ana Salon",
      },
      {
        topic: "Beyond UUIDs: Smarter Identifier Strategies for Modern Systems",
        startTime: "16.20",
        endTime: "16.40",
        speakerName: "Kardel Rüveyda Çetin",
        room: "Ana Salon",
      },
      {
        topic: "MCP Fundamentals",
        startTime: "17.00",
        endTime: "17.20",
        speakerName: "Fatih Kadir Akın",
        room: "Ana Salon",
      },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "aws",
      },
      {
        tier: "",
        sponsorSlug: "lodos",
      },
      {
        tier: "",
        sponsorSlug: "udemy",
      },
      {
        tier: "",
        sponsorSlug: "teknasyon",
      },
      {
        tier: "",
        sponsorSlug: "dogus-teknoloji",
      },
      {
        tier: "",
        sponsorSlug: "finartz",
      },
      {
        tier: "",
        sponsorSlug: "hepsiburada",
      },
      {
        tier: "",
        sponsorSlug: "turkish-technology",
      },
      {
        tier: "",
        sponsorSlug: "microsoft",
      },
      {
        tier: "",
        sponsorSlug: "rg-labs",
      },
      {
        tier: "",
        sponsorSlug: "ziyarem",
      },
      {
        tier: "",
        sponsorSlug: "logo",
      },
      {
        tier: "",
        sponsorSlug: "aktif-tech",
      },
      {
        tier: "",
        sponsorSlug: "q-kare",
      },
      {
        tier: "",
        sponsorSlug: "gaming-gen-tr",
      },
      {
        tier: "",
        sponsorSlug: "lc-waikiki",
      },
      {
        tier: "",
        sponsorSlug: "the-big-thing",
      },
      {
        tier: "",
        sponsorSlug: "multigroup",
      },
    ],
    tickets: [
      {
        type: "Community Supporter Ticket",
        description:
          "Community Supporter bileti ile etkinliğimize katılabilir ve topluluğumuza destek olabilirsiniz.",
        price: 300,
        link: "https://lodos.sh/event/62944986376529159230/tickets",
        perks: [
          "Etkinlik süreci boyunca tüm oturumlara katılabilme imkanı.",
          "Süreç içi ikramlardan yararlanma fırsatı",
          "Süreç içi networking oturumlarından yararlanma fırsatı",
          "Community Supporter Wall'a İsminizi Ekletme Fırsatı: Destekçilerimiz arasında adınızı görme imkanı",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter bileti ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://lodos.sh/event/62944986376529159230/tickets",
        perks: [
          "VIP Katılımcı alanlarına erişim fırsatı: VIP Katılımcılarımıza özel network ve toplantı alanları",
          "Talebe Göre ekstra kahve Seçenekleri: Damak tadınıza uygun kahve seçenekleri",
          "Özel ikramlardan yararlanma fırsatı: Etkinliği güzel hatırlatacak güzel ikramlar",
          "VIP Supporter Walla İsminizi Ekletme Fırsatı: Destekçilerimiz arasında adınızı görme imkanı.",
        ],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 750 },
      { title: "Etkinlik Konuşmacı", value: 20 },
      { title: "Katılan Şirket", value: 15 },
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
  {
    id: 4,
    navigable: true,
    name: "Data Science Summit 2025",
    heroDescription:
      "Veriyle düşünen, yapay zekâyla üreten, geleceği birlikte şekillendirenlerin buluşma noktası! En yeni teknolojiler, ilham veren konuşmalar ve sınırsız keşif seni bekliyor.",
    cardDescription:
      "Veri biliminin nabzını tutan konuşmalar ve sektörün öncü şirketleriyle tanışma fırsatları. İlham veren konuşmacılar, networking alanları ve kariyer fırsatlarıyla dopdolu bir gün sizleri bekliyor. Veri biliminin geleceğini birlikte şekillendirelim!",
    location: {
      name: "KWORKS Şişli",
      subtext: "Şişli KWORKS ofisinde bulunan harika bir etkinlik alanı.",
    },
    registerLink: "https://lodos.sh/event/96882134119504469163/details",
    videoUrl: "",
    date: "2025-09-06T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Furkan Ünsalan",
        designation: "Associate Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
    ],
    speakers: [
      {
        fullName: "Serkan Alc",
        title: "Founder & Community Lead",
        company: "multigroup",
      },
      {
        fullName: "Ayşe Unye",
        title: "Lead Data Architect",
        company: "RoofStacks",
      },
      {
        fullName: "Kardel Rüveyda Çetin",
        title: "Software Development Lead",
        company: "Doğuş Teknoloji",
      },
      {
        fullName: "Ferhat İşyapan",
        title: "Data Director",
        company: "BiTaksi",
      },
      {
        fullName: "Halil İbrahim Yıldırım",
        title: "Data & AI Leader",
        company: "",
      },
      {
        fullName: "Deniz Alkan",
        title: "Senior Lead Data Analyst",
        company: "Beko",
      },
    ],
    sessions: [
      {
        topic: "Açılış Konuşması",
        startTime: "13.00",
        endTime: "13.10",
        speakerName: "Serkan Alc",
        room: "Ana Salon",
      },
      {
        topic: "1. Oturum",
        startTime: "13.10",
        endTime: "13.30",
        speakerName: "Ayse Unye",
        room: "Ana Salon",
      },
      {
        topic: "2. Oturum",
        startTime: "14.00",
        endTime: "14.20",
        speakerName: "Kardel Rüveyda Çetin",
        room: "Ana Salon",
      },
      {
        topic: "3. Oturum",
        startTime: "14.30",
        endTime: "14.50",
        speakerName: "Ferhat İşyapan",
        room: "Ana Salon",
      },
      {
        topic: "4. Oturum",
        startTime: "15.30",
        endTime: "16.00",
        speakerName: "Halil İbrahim Yıldırım",
        room: "Ana Salon",
      },
      {
        topic: "5. Oturum",
        startTime: "16.10",
        endTime: "16.30",
        speakerName: "Deniz Alkan",
        room: "Ana Salon",
      },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "tom-technology-of-money",
      },
      {
        tier: "",
        sponsorSlug: "roofstacks",
      },

      {
        tier: "",
        sponsorSlug: "multigroup",
      },
      {
        tier: "",
        sponsorSlug: "dogus-teknoloji",
      },
      {
        tier: "",
        sponsorSlug: "bitaksi",
      },
      {
        tier: "",
        sponsorSlug: "beko",
      },
    ],
    tickets: [
      {
        type: "Community Supporter Ticket",
        description:
          "Community Supporter bileti ile etkinliğimize katılabilir ve topluluğumuza destek olabilirsiniz.",
        price: 300,
        link: "https://lodos.sh/event/96882134119504469163/details",
        perks: [
          "Etkinlik süreci boyunca tüm oturumlara katılabilme imkanı.",
          "Süreç içi ikramlardan yararlanma fırsatı",
          "Süreç içi networking oturumlarından yararlanma fırsatı",
          "Community Supporter Wall'a İsminizi Ekletme Fırsatı: Destekçilerimiz arasında adınızı görme imkanı",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter bileti ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://lodos.sh/event/96882134119504469163/details",
        perks: [
          "VIP Katılımcı alanlarına erişim fırsatı: VIP Katılımcılarımıza özel network ve toplantı alanları",
          "Talebe Göre ekstra kahve Seçenekleri: Damak tadınıza uygun kahve seçenekleri",
          "Özel ikramlardan yararlanma fırsatı: Etkinliği güzel hatırlatacak güzel ikramlar",
          "VIP Supporter Walla İsminizi Ekletme Fırsatı: Destekçilerimiz arasında adınızı görme imkanı.",
        ],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 500 },
      { title: "Etkinlik Konuşmacı", value: 15 },
      { title: "Katılan Şirket", value: 10 },
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
      primary: "162, 85%, 96%", // Very light mint green
      secondary: "160, 8%, 17%", // Dark grayish with mint undertone
      accent: "168, 70%, 75%", // Medium mint green
      background: "0, 0%, 100%", // Pure white (unchanged)
      text: "250, 6.98%, 16.86%", // Original text color (unchanged)
    },
  },
  {
    id: 3,
    navigable: false,
    name: "MultiGroup Developer Gathering 2025",
    heroDescription:
      "Yıl boyunca sektöre yön veren büyük teknoloji konferanslarının ardından, şimdi onları birlikte değerlendirme zamanı!",
    cardDescription:
      "Gelin, yılın en büyük teknoloji konferanslarında yapılan heyecan verici duyuruların sektöre nasıl yön verdiğini (veya veremediğini!) birlikte keşfedelim. Bu yenilikleri takip etmenin geliştiriciler için ne gibi fırsatlar sunduğunu konuşalım ve birlikte harika bir gün geçirelim!",
    location: {
      name: "Trendyol Kampüs",
      subtext:
        "Maslak Trendyol ofisinin altında bulunan harika bir etkinlik alanı.",
    },
    registerLink:
      "https://kommunity.com/devmultigroup/events/multigroup-developer-gathering-2025-3f23948e",
    videoUrl: "",
    date: "2025-06-28T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Furkan Ünsalan",
        designation: "Associate Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
    ],
    speakers: [
      {
        fullName: "Serkan Alc",
        title: "Founder & Community Lead",
        company: "multigroup",
      },
    ],
    sessions: [
      // {
      //   topic: "",
      //   startTime: "",
      //   endTime: "",
      //   speakerName: "",
      //   room: "",
      // },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "",
      },
    ],
    tickets: [
      {
        type: "Gathering Ticker",
        description:
          "Bu bilet, sadece bir koltuk değil — WWDC’den Google I/O’ya, OpenAI’den Figma’ya yılın en büyük konferanslarında duyurulan gelişmeleri konuşacağımız, geleceğin teknolojilerini bugünden yakalayacağın, yeni insanlarla tanışıp topluluğun bir parçası olacağın bir günün anahtarı. Aramıza hoş geldin!",
        price: 0,
        link: "https://kommunity.com/devmultigroup/events/multigroup-developer-gathering-2025-3f23948e/tickets/",
        perks: [
          "Supporterlara özel badge'lere sahip olun",
          "Supporterlara özel supporter wall'a dahil olun",
        ],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 200 },
      { title: "Etkinlik Konuşmacı", value: 10 },
      { title: "Katılan Şirket", value: 10 },
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
      primary: "162, 85%, 96%", // Very light mint green
      secondary: "160, 8%, 17%", // Dark grayish with mint undertone
      accent: "168, 70%, 75%", // Medium mint green
      background: "0, 0%, 100%", // Pure white (unchanged)
      text: "250, 6.98%, 16.86%", // Original text color (unchanged)
    },
  },
  {
    id: 2,
    navigable: true,
    name: "Web Developer Summit 2025",
    heroDescription:
      "Seni sadece bir web konferansına değil, modern web teknolojilerinin tüm renklerini keşfedeceğin, ilham verici bir buluşmaya davet ediyoruz!",
    cardDescription:
      "Frontend'den backend'e, modern web teknolojilerine ilgi duyuyorsan, bu etkinliği kaçırmak istemeyeceksin! Şimdiden yerini ayırt ve bu heyecan verici deneyimin bir parçası ol. Gelecek yıla kalma, bu yıl tanışalım!",
    location: {
      name: "Tech Istanbul | Şişli",
      subtext:
        "Şişli Habitat Kütüphane içerisnde bulunan Tech Istanbul etkinlik alanı.",
    },
    registerLink:
      "https://kommunity.com/devmultigroup/events/web-developer-summit-25-d7d891d6",
    videoUrl: "",
    date: "2025-06-14T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Furkan Ünsalan",
        designation: "Associate Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
      {
        id: 3,
        name: "Esra Kelleci",
        designation: "Pioneer Member",
        image: "/images/organizers/esra-kelleci.webp",
      },
    ],
    speakers: [
      {
        fullName: "Serkan Alc",
        title: "Founder & Community Lead",
        company: "multigroup",
      },
      {
        fullName: "Oğuzhan Aslan",
        title: "Engineering Manager",
        company: "PTTAvm",
      },
      {
        fullName: "Çiğdem Kadakoğlu",
        title: "Senior DevOps/Cloud Engineer",
        company: "EPAM Systems",
      },
      {
        fullName: "Mercan Karacabey Eke",
        title: "Software Architect",
        company: "TOM Technology of Money",
      },
      {
        fullName: "Emre Hızlı",
        title: ".NET Architect",
        company: "",
      },
      {
        fullName: "Furkan Portakal",
        title: "Sr. Frontend Developer",
        company: "Şans-Tech",
      },
      {
        fullName: "Vehbi Emiroğlu",
        title: "CTO",
        company: "Samba Pos",
      },
      {
        fullName: "Emine Gürcü",
        title: "Senior UI/UX Designer",
        company: "Reactor Technology",
      },
    ],
    sessions: [
      // Ana Salon
      {
        topic: "Açılış Konuşması",
        startTime: "13.00",
        endTime: "13.10",
        speakerName: "Serkan Alc",
        room: "Ana Salon",
      },
      {
        topic: "The Future of Frontend Architecture ",
        startTime: "13.10",
        endTime: "13.30",
        speakerName: "Oğuzhan Aslan",
        room: "Ana Salon",
      },
      {
        topic: "Think. Train. Deploy. Docker’s AI-Powered ModelOps Workflow",
        startTime: "14.00",
        endTime: "14.20",
        speakerName: " Çiğdem Kadakoğlu",
        room: "Ana Salon",
      },
      {
        topic: "Strangler Pattern & Beyond: Modernizing Legacy Architectures ",
        startTime: "14.30",
        endTime: "14.50",
        speakerName: "Mercan Karacabey Eke",
        room: "Ana Salon",
      },
      {
        topic: "GraphQL - The Future of APIs",
        startTime: "15.30",
        endTime: "16.00",
        speakerName: "Vehbi Emiroğlu",
        room: "Ana Salon",
      },
      {
        topic: "Angular SSR ",
        startTime: "16.10",
        endTime: "16.30",
        speakerName: "Emre Hızlı",
        room: "Ana Salon",
      },
      // Network
      {
        topic: "",
        startTime: "",
        endTime: "",
        speakerName: "Furkan Portakal",
        room: "Network",
      },
      {
        topic: "",
        startTime: "",
        endTime: "",
        speakerName: "Emine Gürcü",
        room: "Network",
      },
      // {
      //   topic: "",
      //   startTime: "",
      //   endTime: "",
      //   speakerName: "Seyfeddin Başsaraç",
      //   room: "Network",
      // },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "epam-systems",
      },
      {
        tier: "",
        sponsorSlug: "pttavm",
      },
      {
        tier: "",
        sponsorSlug: "tom-technology-of-money",
      },
      {
        tier: "",
        sponsorSlug: "sans-tech",
      },
      {
        tier: "",
        sponsorSlug: "samba-pos",
      },
      {
        tier: "",
        sponsorSlug: "reactor-technology",
      },
    ],
    tickets: [
      {
        type: "Community Supporter Ticket",
        description:
          "Community Supporter bileti ile hem etkinliğin bir parçası olun hem de gelecek etkinliklerimize katkıda bulunun!",
        price: 300,
        link: "https://kommunity.com/devmultigroup/events/web-developer-summit-25-d7d891d6/tickets/",
        perks: [
          "Supporterlara özel badge'lere sahip olun",
          "Supporterlara özel supporter wall'a dahil olun",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter Ticket ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://kommunity.com/devmultigroup/events/web-developer-summit-25-d7d891d6/tickets/",
        perks: [
          "Supporterlara özel badge'lere sahip olun",
          "VIP Katılımcılarımıza özel network ve toplantı alanları",
          "Etkinliği güzel hatırlatacak güzel ikramlar",
          "Supporterlara özel supporter wall'a dahil olun",
        ],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 100 },
      { title: "Etkinlik Konuşmacı", value: 20 },
      { title: "Katılan Şirket", value: 10 },
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
      primary: "162, 85%, 96%", // Very light mint green
      secondary: "160, 8%, 17%", // Dark grayish with mint undertone
      accent: "168, 70%, 75%", // Medium mint green
      background: "0, 0%, 100%", // Pure white (unchanged)
      text: "250, 6.98%, 16.86%", // Original text color (unchanged)
    },
  },
  {
    id: 1,
    name: "Mobile Developer Conference 2025",
    heroDescription:
      "Seni yalnızca bir teknik konferansa değil, ilham verici bir mobil developer buluşmasına davet ediyoruz!",
    cardDescription:
      "Mobil development'a ilgi duyuyorsan, bu etkinliği kaçırmak istemeyeceksin! Şimdiden yerini ayırt ve bu heyecana sen de ortak ol. Gelecek yıla kalma bu yıl tanışalım!",
    location: {
      latitude: 41.085660366250444,
      longitude: 28.950240039927138,
      name: "Haliç Üniversitesi | Küçük Konferans Salonu",
      subtext: "Haliç Üniversitesi 5. Levent Kampüsü, Küçük Konferans Salonu",
    },
    registerLink:
      "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5",
    videoUrl: "",
    date: "2025-05-31T13:00:00+03:00",
    organizers: [
      {
        id: 1,
        name: "Serkan Alc",
        designation: "Partner Manager",
        image: "/images/organizers/serkan-alc.webp",
      },
      {
        id: 2,
        name: "Furkan Ünsalan",
        designation: "Associate Member",
        image: "/images/organizers/furkan-unsalan.webp",
      },
      {
        id: 3,
        name: "Elif Çağıl",
        designation: "Associate Member",
        image: "/images/organizers/elif-cagil.webp",
      },
    ],
    speakers: [
      {
        fullName: "Mehmet Nuri Yaman",
        title: "Founder & CEO",
        company: "lodos",
      },
      {
        fullName: "Furkan Aydemir",
        title: "Technical Team Lead",
        company: "lodos",
      },
      {
        fullName: "Kasım Adalan",
        title: "Sr. Mobile Developer & Instructor",
        company: "Sabancı University",
      },
      {
        fullName: "Bilal Durnagöl",
        title: "Expert Architecture Engineer",
        company: "Garanti BBVA",
      },
      {
        fullName: "İrem Aral",
        title: "Human Resources Business Partner",
        company: "RoofStacks",
      },
      {
        fullName: "Necati Sözer",
        title: "Sr. Android Software Engineer",
        company: "Lyrebird Studio",
      },
      {
        fullName: "Seyfeddin Başsaraç",
        title: "Creative Developer",
        company: "Teknasyon",
      },
      {
        fullName: "Mehmet Niyazi Atlıoğlu",
        title: "Sr. Android Developer",
        company: "Softtech",
      },
      {
        fullName: "Osman Çelik",
        title: "Co-Founder ",
        company: "Appcircle",
      },
      {
        fullName: "Emirhan Emmez",
        title: "Manager Android Engineer",
        company: "d360 Bank",
      },
      {
        fullName: "Oğuz Gürler",
        title: "Mobile Engineering Manager",
        company: "Commencis",
      },
      {
        fullName: "Melissa Çoralı",
        title: "Android Developer & Scrum Master",
        company: "Akbank",
      },
      {
        fullName: "Kadriye Macit",
        title: "Senior Flutter Developer",
        company: "Alleo",
      },
      {
        fullName: "Levent Kantaroglu",
        title: "Mobile Team Lead",
        company: "Turkish Technology",
      },
      {
        fullName: "Ece Bahtiyar",
        title: "Founder",
        company: "appleads",
      },
      {
        fullName: "Kaan Enes Kapıcı",
        title: "Sr. Android Engineer Specialist",
        company: "innova",
      },
      {
        fullName: "Gülben Ünal Yaraş",
        title: "Kıdemli İş Analisti",
        company: "gelir-idaresi-baskanligi",
      },
      {
        fullName: "Alper Tekin",
        title: "Co-Founder",
        company: "setgreet",
      },
      {
        fullName: "Göker Güner",
        title: "Senior ML Engineer",
        company: "roofstacks",
      },
      {
        fullName: "Melike Özburma",
        title: "Project Manager",
        company: "teknasyon",
      },
      {
        fullName: "Özge Usta",
        title: "Data Scientist",
        company: "spyke-games",
      },
      {
        fullName: "Enes Zor",
        title: "Android Developer",
        company: "Trendyol",
      },
      {
        fullName: "Mustafa Güneş",
        title: "Senior iOS Developer",
        company: "teknasyon",
      },
      {
        fullName: "Serkan Alc",
        title: "Founder & Community Lead",
        company: "multigroup",
      },
      {
        fullName: "Doğukaan Kılıçarslan",
        title: "iOS Developer",
        company: "migros-one",
      },
      {
        fullName: "Ayşe Gül Topkara",
        title: "People and Culture Lead Associate",
        company: "bilyoner",
      },
    ],
    sessions: [
      // Ana Salon
      {
        topic: "Açılış Konuşması",
        startTime: "13.00",
        endTime: "13.10",
        speakerName: "Serkan Alc",
        room: "Ana Salon",
      },
      {
        topic: "Geleceğin Yazılımcısı 101",
        startTime: "13.10",
        endTime: "13.40",
        speakerName: "Mehmet Nuri Yaman",
        room: "Ana Salon",
      },
      {
        topic: "Jetpack Compose ve Compose Multiplatform Farkları",
        startTime: "14.00",
        endTime: "14.30",
        speakerName: "Kasım Adalan",
        room: "Ana Salon",
      },
      {
        topic: "The Journey of Creating Scalable Tech Products",
        startTime: "14.50",
        endTime: "15.20",
        speakerName: "Osman Çelik",
        room: "Ana Salon",
      },
      {
        topic:
          "Scaling Up with Apple Ads: Developer's Guide to App Store Growth",
        startTime: "15.30",
        endTime: "16.00",
        speakerName: "Ece Bahtiyar",
        room: "Ana Salon",
      },
      {
        topic:
          "AI: Friend or Threat to Software Teams? Our Journey and Predictions",
        startTime: "16.30",
        endTime: "17.00",
        speakerName: "Oğuz Gürler",
        room: "Ana Salon",
      },
      {
        topic:
          "Thread Safe or Sorry: Swift'te Actor ve Sendable ile Modern Eşzamanlılık",
        startTime: "17.20",
        endTime: "17.50",
        speakerName: "Bilal Durnagöl",
        room: "Ana Salon",
      },
      {
        topic: "Kapanış Konuşması",
        startTime: "17.50",
        endTime: "18.00",
        speakerName: "Serkan Alc",
        room: "Ana Salon",
      },
      // Yan Salon
      {
        topic: "Flutter + AI: Mobilde Akıllı Deneyimler",
        startTime: "14.00",
        endTime: "14.30",
        speakerName: "Kadriye Macit",
        room: "Yan Salon",
      },
      {
        topic: "Design Handoffs: Tips Processes and Trends",
        startTime: "14.50",
        endTime: "15.20",
        speakerName: "Seyfeddin Başsaraç",
        room: "Yan Salon",
      },
      {
        topic: "Bir fikir nasıl doğar",
        startTime: "15.30",
        endTime: "16.00",
        speakerName: "Furkan Aydemir",
        room: "Yan Salon",
      },
      {
        topic: "Korku: En iyi itici güç",
        startTime: "16.30",
        endTime: "17.00",
        speakerName: "Emirhan Emmez",
        room: "Yan Salon",
      },
      // {
      //   topic: "",
      //   startTime: "",
      //   endTime: "",
      //   speakerName: "Seyfeddin Başsaraç",
      //   room: "Network",
      // },
    ],
    sponsors: [
      {
        tier: "",
        sponsorSlug: "akbank",
      },
      {
        tier: "",
        sponsorSlug: "teknasyon",
      },
      {
        tier: "",
        sponsorSlug: "appcircle",
      },
      {
        tier: "",
        sponsorSlug: "commencis",
      },
      {
        tier: "",
        sponsorSlug: "d360-bank",
      },
      {
        tier: "",
        sponsorSlug: "migros-one",
      },
      {
        tier: "",
        sponsorSlug: "garanti-bbva",
      },
      {
        tier: "",
        sponsorSlug: "lyrebird-studio",
      },
      {
        tier: "",
        sponsorSlug: "setgreet",
      },
      {
        tier: "",
        sponsorSlug: "roofstacks",
      },
      {
        tier: "",
        sponsorSlug: "appleads",
      },
      {
        tier: "",
        sponsorSlug: "sabanci-university",
      },
      {
        tier: "",
        sponsorSlug: "softtech",
      },
      {
        tier: "",
        sponsorSlug: "spyke-games",
      },
      {
        tier: "",
        sponsorSlug: "bilyoner",
      },
      {
        tier: "",
        sponsorSlug: "gelir-idaresi-baskanligi",
      },
      {
        tier: "",
        sponsorSlug: "alleo",
      },
    ],
    tickets: [
      {
        type: "Community Supporter Ticket",
        description:
          "Community Supporter bileti ile hem etkinliğin bir parçası olun hem de gelecek etkinliklerimize katkıda bulunun!",
        price: 300,
        link: "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5/tickets/",
        perks: [
          "Supporterlara özel badge'lere sahip olun",
          "Supporterlara özel supporter wall'a dahil olun",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter Ticket ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5/tickets/",
        perks: [
          "Supporterlara özel badge'lere sahip olun",
          "VIP Katılımcılarımıza özel network ve toplantı alanları",
          "Etkinliği güzel hatırlatacak güzel ikramlar",
          "Supporterlara özel supporter wall'a dahil olun",
        ],
      },
    ],
    images: [
      "/images/events/mobile-developer-summit-2024/1.webp",
      "/images/events/mobile-developer-summit-2024/2.webp",
      "/images/events/mobile-developer-summit-2024/3.webp",
    ],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 600 },
      { title: "Etkinlik Konuşmacı", value: 30 },
      { title: "Katılan Şirket", value: 50 },
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
  // Past events redirecting to kommunity
  {
    id: 4,
    navigable: false,
    name: "Mobile Developer Conference 2024",
    heroDescription:
      "Tüm mobile developer'lara sesleniyoruz! Mobile Development'taki yenilikleri keşfedeceğiniz heyecan verici bir konferans için bize katılmaya ne dersiniz?",
    cardDescription: "",
    location: {
      name: "",
      subtext: "",
    },
    registerLink:
      "https://kommunity.com/devmultigroup/events/mobile-developer-conference-24-fcd7f10c",
    videoUrl: "",
    date: "2024-03-09T13:00:00+03:00",
    organizers: [],
    speakers: [],
    sessions: [],
    sponsors: [],
    tickets: [],
    images: [],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 200 },
      { title: "Etkinlik Konuşmacı", value: 10 },
      { title: "Katılan Şirket", value: 10 },
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
      primary: "162, 85%, 96%", // Very light mint green
      secondary: "160, 8%, 17%", // Dark grayish with mint undertone
      accent: "168, 70%, 75%", // Medium mint green
      background: "0, 0%, 100%", // Pure white (unchanged)
      text: "250, 6.98%, 16.86%", // Original text color (unchanged)
    },
  },
  {
    id: 4,
    navigable: false,
    name: "Mobile Developer Conference 2023",
    heroDescription:
      "Tüm mobile developer'lara sesleniyoruz! Mobile Development'taki yenilikleri keşfedeceğiniz heyecan verici bir konferans için bize katılmaya ne dersiniz?",
    cardDescription: "",
    location: {
      name: "",
      subtext: "",
    },
    registerLink:
      "https://kommunity.com/devmultigroup/events/mobil-developer-zone-0e660272",
    videoUrl: "",
    date: "2023-09-01T13:00:00+03:00",
    organizers: [],
    speakers: [],
    sessions: [],
    sponsors: [],
    tickets: [],
    images: [],
    initialMetrics: [
      { title: "Etkinlik Kontenjan", value: 200 },
      { title: "Etkinlik Konuşmacı", value: 10 },
      { title: "Katılan Şirket", value: 10 },
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
      primary: "162, 85%, 96%", // Very light mint green
      secondary: "160, 8%, 17%", // Dark grayish with mint undertone
      accent: "168, 70%, 75%", // Medium mint green
      background: "0, 0%, 100%", // Pure white (unchanged)
      text: "250, 6.98%, 16.86%", // Original text color (unchanged)
    },
  },
];

export default events;
