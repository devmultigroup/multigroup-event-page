export type Speaker = {
  fullName: string;
  photoUrl: string;
  title: string;
};

export type Session = {
  topic: string;
  startTime: string; // start time for session
  endTime: string; // end time for session
  speakerName: string;
};

type AfterMetrics = {
  applications: string;
  vipGuests: string;
  supporter: string;
  speakers: string;
  workingParticipant: string;
  jobSeeker: string;
  jobProvider: string;
  satisfaction: string;
};

export type Event = {
  id: number;
  name: any;
  subTitle: string;
  title: string;
  description: string;
  location: string;
  locationName: string;
  locationSubText: string;
  registerLink: string;
  videoUrl?: string;
  date: string; // ISO formatta tarih
  speakers: Speaker[];
  sessions: Session[];
  afterMetrics?: AfterMetrics;
};
