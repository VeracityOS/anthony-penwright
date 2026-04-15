export type TimelineEntry = {
  org: string;
  role: string;
  period: string;
  value: string;
};

export const timeline: TimelineEntry[] = [
  { org: "NEOM", role: "Director — Innovation", period: "Nov 24 – Present", value: "£80M" },
  { org: "NEOM", role: "Director — Tech & Digital", period: "Apr 23 – Nov 24", value: "£230M" },
  { org: "Wipro", role: "Director — Smart Cities & IoT", period: "Apr 22 – Apr 23", value: "£80M" },
  { org: "Quantela", role: "Growth & Delivery Consultant", period: "Sept 21 – Apr 22", value: "£98M" },
  { org: "Cisco", role: "Smart City Global Consultant", period: "Nov 15 – Apr 21", value: "£250M" },
  { org: "Cabinet Office", role: "Program Director", period: "Mar 13 – Nov 15", value: "£18M pa" },
  { org: "Environment Agency", role: "Program Director", period: "Dec 11 – Mar 13", value: "£38M" },
  { org: "FCO", role: "Director — Strategic Operations", period: "Aug 08 – Dec 11", value: "£720M" },
  { org: "Ministry of Justice (YJB)", role: "Program Director", period: "Feb 08 – Aug 08", value: "£7M" },
  { org: "Ministry of Defence", role: "Overseas Delivery Director", period: "Nov 05 – Feb 08", value: "£4BN" },
  { org: "Corus Steel", role: "Transformation Lead", period: "Aug 04 – Nov 05", value: "£19M" },
  { org: "DWP", role: "Implementation Lead", period: "Mar 04 – Aug 05", value: "£4M" },
  { org: "HM Prison Service", role: "Deployment Lead", period: "Jan 03 – Mar 04", value: "£6M" },
];
