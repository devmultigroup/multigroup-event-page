import { Event } from "@/types";

const events: Event[] = [
  {
    id: 1,
    name: "Mobile Developer Summit 2024",
    subTitle: "Exploring the Future of Mobile Development",
    title: "Keynote Event",
    description: "A detailed event on mobile development trends.",
    location: "37.7749° N, 122.4194° W", // San Francisco coordinates
    locationSubText: "Located at Moscone Center, easily accessible via public transport.",
    videoUrl: "https://example.com/event-video",
    date: new Date("2024-06-15T00:00:00Z").toISOString(), // ISO date object
    speakers: [
      {
        fullName: "John Doe",
        linkedInUsername: "johndoe123",
        title: "Senior Developer",
      },
      {
        fullName: "Jane Smith",
        linkedInUsername: "janesmith456",
        title: "Lead Mobile Architect",
      },
    ],
    sessions: [
      {
        topic: "Future of Android Development",
        startTime: "10:00", // Hour only
        endTime: "11:00",   // Hour only
        speakerName: "John Doe",
      },
      {
        topic: "Cross-Platform Mobile Frameworks",
        startTime: "11:30",
        endTime: "12:30",
        speakerName: "Jane Smith",
      },
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
  },
  {
    id: 2,
    name: "AI in Mobile Development Conference 2024",
    subTitle: "Harnessing the Power of AI in Mobile Apps",
    title: "AI and Mobile Keynote",
    description: "Discover how AI is transforming mobile development.",
    location: "34.0522° N, 118.2437° W", // Los Angeles coordinates
    locationSubText: "Hosted at LA Convention Center, plenty of parking available.",
    videoUrl: "https://example.com/ai-event-video",
    date: new Date("2024-09-10T00:00:00Z").toISOString(), // ISO date object
    speakers: [
      {
        fullName: "Alice Johnson",
        linkedInUsername: "alicejohnson789",
        title: "AI Research Lead",
      },
      {
        fullName: "Bob Williams",
        linkedInUsername: "bobwilliams321",
        title: "CTO at MobileTech",
      },
    ],
    sessions: [
      {
        topic: "AI-Driven App Personalization",
        startTime: "09:00", // Hour only
        endTime: "10:00",   // Hour only
        speakerName: "Alice Johnson",
      },
      {
        topic: "Building Smarter Apps with AI",
        startTime: "10:30",
        endTime: "11:30",
        speakerName: "Bob Williams",
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
