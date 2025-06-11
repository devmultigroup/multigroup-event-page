export type Speaker = {
  fullName: string;
  title: string;
  company?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
};

export type Organizer = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

export type Session =
  | {
      // For sessions that are NOT in the network room,
      // topic, startTime, and endTime are required.
      room: Exclude<string, "Network">;
      topic: string;
      startTime: string; // start time for session
      endTime: string; // end time for session
      speakerName: string;
    }
  | {
      // For sessions in the network room:
      // topic, startTime, and endTime become optional.
      room: "Network";
      speakerName: string;
      topic?: string;
      startTime?: string;
      endTime?: string;
    };

export type InitialMetric = {
  title: string;
  value: number;
};

// Allow only up to 3 initial metrics for the hero section
type MaxThreeInitialMetrics =
  | [InitialMetric]
  | [InitialMetric, InitialMetric]
  | [InitialMetric, InitialMetric, InitialMetric];

export type AfterMetrics = {
  applications: string;
  vipGuests: string;
  supporter: string;
  speakers: string;
  workingParticipant: string;
  jobSeeker: string;
  jobProvider: string;
  satisfaction: string;
};

export type Location = {
  latitude?: number;
  longitude?: number;
  name: string;
  subtext: string;
};

export type Sponsor = {
  tier: "platin" | "altın" | "gümüş" | "bronz" | "";
  sponsorSlug: string;
};

export type Ticket = {
  type: string;
  description: string;
  price: number;
  link: string;
  perks: string[];
};

// HSL String of Color
export type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type Event = {
  id: number;
  name: string;
  heroDescription: string;
  cardDescription: string;
  location: Location;
  registerLink: string;
  videoUrl?: string;
  date: string; // ISO formatta tarih
  organizers: Organizer[];
  speakers: Speaker[];
  sessions: Session[];
  sponsors: Sponsor[];
  tickets?: Ticket[];
  images: string[];
  initialMetrics: MaxThreeInitialMetrics;
  afterMetrics?: AfterMetrics;
  colorPalette: ColorPalette;
  navigable?: boolean; // If false, event is not navigable
};
