export type Speaker = {
  fullName: string;
  title: string;
  phrase?: string;
  company?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
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
  latitude: number;
  longitude: number;
  name: string;
  subtext: string;
};

export type Sponsor = {
  tier: "platin" | "altın" | "gümüş" | "bronz";
  sponsorSlug: string;
};

export type ColorPalette = {
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
}

export type Event = {
  id: number;
  name: string;
  subTitle: string;
  title: string;
  description: string;
  location: Location;
  registerLink: string;
  videoUrl?: string;
  date: string; // ISO formatta tarih
  speakers: Speaker[];
  sessions: Session[];
  sponsors: Sponsor[];
  images: string[];
  afterMetrics?: AfterMetrics;
  colorPalette: ColorPalette;
};
