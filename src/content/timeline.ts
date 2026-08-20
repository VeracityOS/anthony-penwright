export type TimelineEntry = {
  org: string;
  role: string;
  period: string;
  value: string;
};

export const timeline: TimelineEntry[] = [
  { org: "Albawani Holding Group", role: "Group Director — Technology, Infrastructure & Operations", period: "Nov 26 – Present", value: "10 subsidiaries" },
  { org: "NEOM", role: "Director — Innovation", period: "Nov 24 – Oct 26", value: "$120M" },
  { org: "NEOM", role: "Director — Tech & Digital", period: "Apr 23 – Nov 24", value: "$290M" },
  { org: "Wipro", role: "Director — Smart Cities & IoT", period: "Apr 22 – Apr 23", value: "$100M" },
  { org: "Quantela", role: "Growth & Delivery Consultant", period: "Sept 21 – Apr 22", value: "$125M" },
  { org: "Cisco", role: "Smart City Global Consultant", period: "Nov 15 – Apr 21", value: "$315M" },
  { org: "Cabinet Office", role: "Program Director", period: "Mar 13 – Nov 15", value: "$23M pa" },
  { org: "Environment Agency", role: "Program Director", period: "Dec 11 – Mar 13", value: "$48M" },
  { org: "FCO", role: "Director — Strategic Operations", period: "Aug 08 – Dec 11", value: "£768M" },
  { org: "Ministry of Justice (YJB)", role: "Program Director", period: "Feb 08 – Aug 08", value: "$9M" },
  { org: "Ministry of Defence", role: "Overseas Delivery Director", period: "Nov 05 – Feb 08", value: "$5BN" },
  { org: "Corus Steel", role: "Transformation Lead", period: "Aug 04 – Nov 05", value: "$24M" },
  { org: "DWP", role: "Implementation Lead", period: "Mar 04 – Aug 05", value: "$5M" },
  { org: "HM Prison Service", role: "Deployment Lead", period: "Jan 03 – Mar 04", value: "$8M" },
];
