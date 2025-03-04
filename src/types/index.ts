export type Speaker = {
  fullName: string;
  title: string;
  phrase?: string;
};

export type Session = {
  topic: string;
  date: string;
  dateTime?: string;
  startTime: string; // start time for session
  endTime: string; // end time for session
  speakerName: string;
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

export type Event = {
  speakers: Speaker[];
  sessions: Session[];
  sponsors: Sponsor[];
  afterMetrics?: AfterMetrics;
};
