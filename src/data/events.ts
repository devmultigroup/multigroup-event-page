import { Event } from "@/types";

const events: Event[] = [
  {
    speakers: [
      {
        fullName: "Daron Yöndem",
        title: "Tech Lead for Application Innovation, Microsoft",
      },
      {
        fullName: "Kardel Rüveyda Çetin ",
        title: "Software Development Lead, Doğuş Teknoloji",
        phrase:
          "Konuşma yaptığım en ilgi çekici topluluk, herkese tavsiye ederim!",
      },
      {
        fullName: "Bilge Yücel ",
        title: "DevRel Engineer, Deepset",
      },
      {
        fullName: "Fatih Kadir Akın",
        title: "DevRel Manager, Teknasyon",
      },
      {
        fullName: "Şeyma Sarıgil",
        title: "Senior Software Engineer, Softtech",
      },
      {
        fullName: "Tolga Kurtuluş ",
        title: "Revenue Management R&D Specialist, Turkish Airlines",
      },
      {
        fullName: "Göker Güner",
        title: "AI Platform Engineer, Codeway",
      },
      {
        fullName: "Emrah Mete",
        title:
          "Senior Cloud Solution Architect - AI and Data Analytics, Microsoft",
      },
      {
        fullName: "Selin Çıldam",
        title: "Data Scientist, Pazarama",
      },
      {
        fullName: "Enes Fehmi Manan",
        title: "Risk Analytics & Data Science Intern, Fibabanka",
      },
    ],
    sessions: [
      {
        topic: "AI-Driven App Personalization",
        date: "2024-03-05",
        startTime: "09:00",
        endTime: "10:00",
        speakerName: "Özcan Zafer Ayan",
      },
      {
        topic: "Building Smarter Apps with AI",
        date: "2024-03-07",
        startTime: "10:30",
        endTime: "11:30",
        speakerName: "Özcan Zafer Ayan",
      },
      {
        topic: "Building Smart Apps with AI",
        date: "2024-03-09",
        startTime: "10:30",
        endTime: "12:30",
        speakerName: "Özcan Zafer Ayan",
      },
      {
        topic: "Building Smartest Apps with AI",
        date: "2024-03-11",
        startTime: "12:30",
        endTime: "13:30",
        speakerName: "Özcan Zafer Ayan",
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
  },
];

export default events;
