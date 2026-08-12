import { DILRSet, Question } from "./types";

export const dilrSets: DILRSet[] = [
  {
    id: "set1",
    title: "DILR Set 1: Visa Processing Office (VPO)",
    text: "A visa processing office (VPO) accepts visa applications in four categories - US, UK, Schengen, and Others. The applications are scheduled for processing in twenty 15-minute slots starting at 9:00 am and ending at 2:00 pm. Ten applications are scheduled in each slot.\n\nThere are ten counters in the office, four dedicated to US applications, and two each for UK applications, Schengen applications and Others applications. Applicants are called in for processing sequentially on a first-come-first-served basis whenever a counter gets freed for their category. The processing time for an application is the same within each category. But it may vary across the categories. Each US and UK application requires 10 minutes of processing time. Depending on the number of applications in a category and time required to process an application for that category, it is possible that an applicant for a slot may be processed later.\n\nOn a particular day, Ira, Vijay and Nandini were scheduled for Schengen visa processing in that order. They had a 9:15 am slot but entered the VPO at 9:20 am. When they entered the office, exactly six out of the ten counters were either processing applications, or had finished processing one and ready to start processing the next.\n\nMahira and Osman were scheduled in the 9:30 am slot on that day for visa processing in the Others category.\n\nThe following additional information is known about that day.\n1. All slots were full.\n2. The number of US applications was the same in all the slots. The same was true for the other three categories.\n3. 50% of the applications were US applications.\n4. All applicants except Ira, Vijay and Nandini arrived on time.\n5. Vijay was called to a counter at 9:25 am."
  },
  {
    id: "set2",
    title: "DILR Set 2: Housing Complex Grid Layout",
    text: "The schematic diagram shows 12 rectangular houses in a housing complex. House numbers are mentioned in the rectangles representing the houses. The houses are located in six columns - Column-A through Column-F, and two rows - Row-1 and Row-2. The houses are divided into two blocks - Block XX and Block YY. The diagram also shows two roads, one passing in front of the houses in Row-2 and another between the two blocks.\n\nSome of the houses are occupied. The remaining ones are vacant and are the only ones available for sale.\n\nThe road adjacency value of a house is the number of its sides adjacent to a road. For example, the road adjacency values of C2, F2, and B1 are 2, 1, and 0, respectively. The neighbour count of a house is the number of sides of that house adjacent to occupied houses in the same block. For example, E1 and C1 can have the maximum possible neighbour counts of 3 and 2, respectively.\n\nThe base price of a vacant house is Rs. 10 lakhs if the house does not have a parking space, and Rs. 12 lakhs if it does. The quoted price (in lakhs of Rs.) of a vacant house is calculated as (base price) + 5 × (road adjacency value) + 3 × (neighbour count). The following information is also known.\n1. The maximum quoted price of a house in Block XX is Rs. 24 lakhs. The minimum quoted price of a house in block YY is Rs. 15 lakhs, and one such house is in Column-E.\n2. Row-1 has two occupied houses, one in each block.\n3. Both houses in Column-E are vacant. Each of Column-D and Column-F has at least one occupied house.\n4. There is only one house with parking space in Block YY.",
    hasDiagram: true
  },
  {
    id: "set3",
    title: "DILR Set 3: Restaurant Gig Worker Ratings",
    text: "Five restaurants, coded R1, R2, R3, R4 and R5 gave integer ratings to five gig workers - Ullas, Vasu, Waman, Xavier and Yusuf, on a scale of 1 to 5.\n\nThe means of the ratings given by R1, R2, R3, R4 and R5 were 3.4, 2.2, 3.8, 2.8 and 3.4 respectively.\nThe summary statistics of these ratings for the five workers is given in the table below.\n\n* Range of ratings is defined as the difference between the maximum and minimum ratings awarded to a worker.\n\nThe following is partial information about ratings of 1 and 5 awarded by the restaurants to the workers.\n(a) R1 awarded a rating of 5 to Waman, as did R2 to Xavier, R3 to Waman and Xavier, and R5 to Vasu.\n(b) R1 awarded a rating of 1 to Ullas, as did R2 to Waman and Yusuf, and R3 to Yusuf.",
    hasTable: true
  },
  {
    id: "set4",
    title: "DILR Set 4: Management School Dean Election",
    text: "Faculty members in a management school can belong to one of four departments - Finance and Accounting (F&A), Marketing and Strategy (M&S), Operations and Quants (O&Q) and Behaviour and Human Resources (B&H). The numbers of faculty members in F&A, M&S, O&Q and B&H departments are 9, 7, 5 and 3 respectively.\n\nProf. Pakrasi, Prof. Qureshi, Prof. Ramaswamy and Prof. Samuel are four members of the school's faculty who were candidates for the post of the Dean of the school. Only one of the candidates was from O&Q.\n\nEvery faculty member, including the four candidates, voted for the post. In each department, all the faculty members who were not candidates voted for the same candidate. The rules for the election are listed below.\n1. There cannot be more than two candidates from a single department.\n2. A candidate cannot vote for himself/herself.\n3. Faculty members cannot vote for a candidate from their own department.\n\nAfter the election, it was observed that Prof. Pakrasi received 3 votes, Prof. Qureshi received 14 votes, Prof. Ramaswamy received 6 votes and Prof. Samuel received 1 vote. Prof. Pakrasi voted for Prof. Ramaswamy, Prof. Qureshi for Prof. Samuel, Prof. Ramaswamy for Prof. Qureshi and Prof. Samuel for Prof. Pakrasi."
  }
];

export const dilrQuestions: Question[] = [
  {
    id: "DILR_1",
    section: "DILR",
    type: "TITA",
    number: 1,
    setId: "set1",
    text: "How many UK applications were scheduled on that day?"
  },
  {
    id: "DILR_2",
    section: "DILR",
    type: "TITA",
    number: 2,
    setId: "set1",
    text: "What is the maximum possible value of the total time (in minutes, nearest to its integer value) required to process all applications in the Others category on that day?"
  },
  {
    id: "DILR_3",
    section: "DILR",
    type: "MCQ",
    number: 3,
    setId: "set1",
    text: "Which of the following is the closest to the time when Nandini’s application process got over?",
    options: ["9:50 am", "9:37 am", "9:35 am", "9:45 am"]
  },
  {
    id: "DILR_4",
    section: "DILR",
    type: "MCQ",
    number: 4,
    setId: "set1",
    text: "Which of the following statements is false?",
    options: [
      "The application process of Osman was completed before 9:45 am.",
      "The application process of Mahira started after Nandini’s.",
      "The application process of Osman was completed before Vijay’s.",
      "The application process of Mahira was completed before Nandini’s."
    ]
  },
  {
    id: "DILR_5",
    section: "DILR",
    type: "MCQ",
    number: 5,
    setId: "set1",
    text: "When did the application processing for all US applicants get over on that day?",
    options: ["2:05 pm", "2:25 pm", "2:00 pm", "3:40 pm"]
  },
  {
    id: "DILR_6",
    section: "DILR",
    type: "TITA",
    number: 6,
    setId: "set2",
    text: "How many houses are vacant in Block XX?"
  },
  {
    id: "DILR_7",
    section: "DILR",
    type: "MCQ",
    number: 7,
    setId: "set2",
    text: "Which of the following houses is definitely occupied?",
    options: ["A1", "D2", "B1", "F2"]
  },
  {
    id: "DILR_8",
    section: "DILR",
    type: "MCQ",
    number: 8,
    setId: "set2",
    text: "Which of the following options best describes the number of vacant houses in Row-2?",
    options: ["Exactly 3", "Either 3 or 4", "Exactly 2", "Either 2 or 3"]
  },
  {
    id: "DILR_9",
    section: "DILR",
    type: "TITA",
    number: 9,
    setId: "set2",
    text: "What is the maximum possible quoted price (in lakhs of Rs.) for a vacant house in Column-E?"
  },
  {
    id: "DILR_10",
    section: "DILR",
    type: "MCQ",
    number: 10,
    setId: "set2",
    text: "Which house in Block YY has parking space?",
    options: ["E1", "F2", "E2", "F1"]
  },
  {
    id: "DILR_11",
    section: "DILR",
    type: "TITA",
    number: 11,
    setId: "set3",
    text: "How many individual ratings cannot be determined from the above information?"
  },
  {
    id: "DILR_12",
    section: "DILR",
    type: "TITA",
    number: 12,
    setId: "set3",
    text: "To how many workers did R2 give a rating of 4?"
  },
  {
    id: "DILR_13",
    section: "DILR",
    type: "TITA",
    number: 13,
    setId: "set3",
    text: "What rating did R1 give to Xavier?"
  },
  {
    id: "DILR_14",
    section: "DILR",
    type: "TITA",
    number: 14,
    setId: "set3",
    text: "What is the median of the ratings given by R3 to the five workers?"
  },
  {
    id: "DILR_15",
    section: "DILR",
    type: "MCQ",
    number: 15,
    setId: "set3",
    text: "Which among the following restaurants gave its median rating to exactly one of the workers?",
    options: ["R2", "R5", "R4", "R3"]
  },
  {
    id: "DILR_16",
    section: "DILR",
    type: "MCQ",
    number: 16,
    setId: "set4",
    text: "Which two candidates can belong to the same department?",
    options: [
      "Prof. Pakrasi and Prof. Qureshi",
      "Prof. Pakrasi and Prof. Samuel",
      "Prof. Qureshi and Prof. Ramaswamy",
      "Prof. Ramaswamy and Prof. Samuel"
    ]
  },
  {
    id: "DILR_17",
    section: "DILR",
    type: "MCQ",
    number: 17,
    setId: "set4",
    text: "Which of the following can be the number of votes that Prof. Qureshi received from a single department?",
    options: ["7", "6", "8", "9"]
  },
  {
    id: "DILR_18",
    section: "DILR",
    type: "MCQ",
    number: 18,
    setId: "set4",
    text: "If Prof. Samuel belongs to B&H, which of the following statements is/are true?\n\n**Statement A:** Prof. Pakrasi belongs to M&S.\n**Statement B:** Prof. Ramaswamy belongs to O&Q.",
    options: [
      "Neither statement A nor statement B",
      "Only statement B",
      "Only statement A",
      "Both statements A and B"
    ]
  },
  {
    id: "DILR_19",
    section: "DILR",
    type: "MCQ",
    number: 19,
    setId: "set4",
    text: "What best can be concluded about the candidate from O&Q?",
    options: [
      "It was Prof. Samuel.",
      "It was either Prof. Ramaswamy or Prof. Samuel.",
      "It was Prof. Ramaswamy.",
      "It was either Prof. Pakrasi or Prof. Qureshi."
    ]
  },
  {
    id: "DILR_20",
    section: "DILR",
    type: "MCQ",
    number: 20,
    setId: "set4",
    text: "Which of the following statements is/are true?\n\n**Statement A:** Non-candidates from M&S voted for Prof. Qureshi.\n**Statement B:** Non-candidates from F&A voted for Prof. Qureshi.",
    options: [
      "Both statements A and B",
      "Only statement B",
      "Only statement A",
      "Neither statement A nor statement B"
    ]
  }
];
