import { slugify } from "@/lib/slugify";
import { Event } from "@/types";

const events: Event[] = [
  {
    id: 1,
    name: "Mobile Developer Conference",
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
        fullName: "Nilüfer Erdoğan",
        title: "Sr. iOS Developer",
        company: "sahibinden",
      },
      {
        fullName: "Aysu Yarkın",
        title: "People & Culture Generalist",
        company: "usersdot",
      },
      {
        fullName: "Ece Bahtiyar",
        title: "Founder",
        company: "appleads",
      },
      {
        fullName: "Zafer Atlı",
        title: "Sr. Software Engineer",
        company: "aktif-tech",
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
        fullName: "Simge Akkılıç",
        title: "Senior Human Resources Specialist",
        company: "exclusive-networks",
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
      {
        topic: "Experiences from Large-Scale Flutter Projects",
        startTime: "17.20",
        endTime: "17.50",
        speakerName: "Levent Kantaroğlu",
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
        sponsorSlug: "sahibinden",
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
        sponsorSlug: "aktif-tech",
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
        sponsorSlug: "usersdot",
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
        sponsorSlug: "exclusive-networks",
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
          "Supporterlara özel badge’lere sahip olun",
          "Supporterlara özel supporter wall’a dahil olun",
        ],
      },
      {
        type: "VIP Supporter Ticket",
        description:
          "VIP Supporter Ticket ile etkinlik deneyiminizi özelleştirin ve gelecek etkinliklerimize katkıda bulunarak bize destek olun!",
        price: 1500,
        link: "https://kommunity.com/devmultigroup/events/mobile-developer-conference-2025-445c54f5/tickets/",
        perks: [
          "Supporterlara özel badge’lere sahip olun",
          "VIP Katılımcılarımıza özel network ve toplantı alanları",
          "Etkinliği güzel hatırlatacak güzel ikramlar",
          "Supporterlara özel supporter wall’a dahil olun",
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
];

export default events;
