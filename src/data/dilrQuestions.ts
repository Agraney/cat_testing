import { DILRSet, Question } from "./types";

export const dilrSets: DILRSet[] = [
  {
    "id": "set1",
    "title": "DILR Set 1: Hockey Team Performance",
    "text": "The following facts are known about the goals scored by these four players only. All the questions refer only to the goals scored by these four players.\n\nThe management of a university hockey team was evaluating performance of four women players - Amla, Bimla, Harita and Sarita for their possible selection in the university team for next year. For this purpose, the management was looking at the number of goals scored by them in the past 8 matches, numbered 1 through 8. The four players together had scored a total of 12 goals in these matches. In the 8 matches, each of them had scored at least one goal. No two players had scored the same total number of goals.\n\n1. Only one goal was scored in every even numbered match.\n2. Harita scored more goals than Bimla.\n3. The highest goal scorer scored goals in exactly 3 matches including Match 4 and Match 8.\n4. Bimla scored a goal in Match 1 and one each in three other consecutive matches.\n5. An equal number of goals were scored in Match 3 and Match 7, which was different from the number of goals scored in either Match 1 or Match 5.\n6. The match in which the highest number of goals was scored was unique and it was not Match 5."
  },
  {
    "id": "set2",
    "title": "DILR Set 2: Graduating Students Get-Together",
    "text": "There are 15 girls and some boys among the graduating students in a class. They are planning a get-together, which can be either a 1-day event, or a 2-day event, or a 3-day event. There are 6 singers in the class, 4 of them are boys. There are 10 dancers in the class, 4 of them are girls. No dancer in the class is a singer.\n\nSome students are not interested in attending the get-together. Those students who are interested in attending a 3-day event are also interested in attending a 2-day event; those who are interested in attending a 2-day event are also interested in attending a 1-day event.\n\nThe following facts are also known:\n1. All the girls and 80% of the boys are interested in attending a 1-day event. 60% of the boys are interested in attending a 2-day event.\n2. Some of the girls are interested in attending a 1-day event, but not a 2-day event; some of the other girls are interested in attending both.\n3. 70% of the boys who are interested in attending a 2-day event are neither singers nor dancers. 60% of the girls who are interested in attending a 2-day event are neither singers nor dancers.\n4. No girl is interested in attending a 3-day event. All male singers and 2 of the dancers are interested in attending a 3-day event.\n5. The number of singers interested in attending a 2-day event is one more than the number of dancers interested in attending a 2-day event."
  },
  {
    "id": "set3",
    "title": "DILR Set 3: Funding For New Initiatives",
    "text": "Adhara, Bithi, Chhaya, Dhanavi, Esther, and Fathima are the interviewers in a process that awards funding for new initiatives. Every interviewer individually interviews each of the candidates individually and awards a token only if she recommends funding. A token has a face value of 2, 3, 5, 7, 11, or 13. Each interviewer awards tokens of a single face value only.\n\nOnce all six interviews are over for a candidate, the candidate receives a funding that is Rs.1000 times the product of the face values of all the tokens. For example, if a candidate has tokens with face values 2, 5, and 7, then they get a funding of Rs.1000 \u00d7 (2 \u00d7 5 \u00d7 7) = Rs.70,000.\n\nPragnyaa, Qahira, Rasheeda, Smera, and Tantra were five candidates who received funding. The funds they received, in descending order, were Rs.390,000, Rs.210,000, Rs.165,000, Rs.77,000, and Rs.66,000.\n\nThe following additional facts are known:\n1. Fathima awarded tokens to everyone except Qahira, while Adhara awarded tokens to no one except Pragnyaa.\n2. Rashida received the highest number of tokens that anyone received, but she did not receive one from Esther.\n3. Bithi awarded a token to Smera but not to Qahira, while Dhanavi awarded a token to Qahira but not to Smera."
  },
  {
    "id": "set4",
    "title": "DILR Set 4: City Metro Lines",
    "text": "Given below is the schematic map of the metro lines in a city with rectangles denoting terminal stations (e.g. A), diamonds denoting junction stations (e.g. R) and small filled-up circles denoting other stations. Each train runs either in east-west or north-south direction, but not both. All trains stop for 2 minutes at each of the junction stations on the way and for 1 minute at each of the other stations. It takes 2 minutes to reach the next station for trains going in east-west direction and 3 minutes to reach the next station for trains going in north-south direction. From each terminal station, the first train starts at 6 am; the last trains leave the terminal stations at midnight. Otherwise, during the service hours, there is metro service every 15 minutes in the north-south lines and every 10 minutes in the east-west lines. A train must rest for at least 15 minutes after completing a trip at the terminal station, before it can undertake the next trip in the reverse direction. (All questions are related to this metro service only. Assume that if someone reaches a station exactly at the time a train is supposed to leave, (s)he can catch that train.)",
    "hasDiagram": true
  }
];

export const dilrQuestions: Question[] = [
  {
    "id": "DILR_1",
    "section": "DILR",
    "type": "MCQ",
    "number": 1,
    "setId": "set1",
    "text": "How many goals were scored in Match 7?",
    "options": [
      "3",
      "2",
      "1",
      "Cannot be determined"
    ]
  },
  {
    "id": "DILR_2",
    "section": "DILR",
    "type": "MCQ",
    "number": 2,
    "setId": "set1",
    "text": "Which of the following is the correct sequence of goals scored in matches 1, 3, 5 and 7?",
    "options": [
      "5, 1, 0, 1",
      "3, 1, 2, 1",
      "3, 2, 1, 2",
      "4, 1, 2, 1"
    ]
  },
  {
    "id": "DILR_3",
    "section": "DILR",
    "type": "MCQ",
    "number": 3,
    "setId": "set1",
    "text": "Which of the following statement(s) is/are true?\n\nStatement-1: Amla and Sarita never scored goals in the same match.\nStatement-2: Harita and Sarita never scored goals in the same match.",
    "options": [
      "Statement-1 only",
      "Statement-2 only",
      "Both the statements",
      "None of the statements"
    ]
  },
  {
    "id": "DILR_4",
    "section": "DILR",
    "type": "MCQ",
    "number": 4,
    "setId": "set1",
    "text": "Which of the following statement(s) is/are false?\n\nStatement-1: In every match at least one player scored a goal.\nStatement-2: No two players scored goals in the same number of matches.",
    "options": [
      "None of the statements",
      "Statement-1 only",
      "Both the statements",
      "Statement-2 only"
    ]
  },
  {
    "id": "DILR_5",
    "section": "DILR",
    "type": "MCQ",
    "number": 5,
    "setId": "set1",
    "text": "If Harita scored goals in one more match as compared to Sarita, which of the following statement(s) is/are necessarily true?\n\nStatement-1: Amla scored goals in consecutive matches.\nStatement-2: Sarita scored goals in consecutive matches.",
    "options": [
      "Statement-2 only",
      "None of the statements",
      "Statement-1 only",
      "Both the statements"
    ]
  },
  {
    "id": "DILR_6",
    "section": "DILR",
    "type": "TITA",
    "number": 6,
    "setId": "set2",
    "text": "How many boys are there in the class?"
  },
  {
    "id": "DILR_7",
    "section": "DILR",
    "type": "MCQ",
    "number": 7,
    "setId": "set2",
    "text": "Which of the following can be determined from the given information?\n\nI. The number of boys who are interested in attending a 1-day event and are neither dancers nor singers.\nII. The number of female dancers who are interested in attending a 1-day event.",
    "options": [
      "Only I",
      "Neither I nor II",
      "Only II",
      "Both I and II"
    ]
  },
  {
    "id": "DILR_8",
    "section": "DILR",
    "type": "MCQ",
    "number": 8,
    "setId": "set2",
    "text": "What fraction of the class are interested in attending a 2-day event?",
    "options": [
      "7/10",
      "7/13",
      "9/13",
      "2/3"
    ]
  },
  {
    "id": "DILR_9",
    "section": "DILR",
    "type": "MCQ",
    "number": 9,
    "setId": "set2",
    "text": "What BEST can be concluded about the number of male dancers who are interested in attending a 1-day event?",
    "options": [
      "5 or 6",
      "6",
      "5",
      "4 or 6"
    ]
  },
  {
    "id": "DILR_10",
    "section": "DILR",
    "type": "MCQ",
    "number": 10,
    "setId": "set2",
    "text": "How many female dancers are interested in attending a 2-day event?",
    "options": [
      "2",
      "1",
      "0",
      "Cannot be determined"
    ]
  },
  {
    "id": "DILR_11",
    "section": "DILR",
    "type": "TITA",
    "number": 11,
    "setId": "set3",
    "text": "How many tokens did Qahira receive?"
  },
  {
    "id": "DILR_12",
    "section": "DILR",
    "type": "MCQ",
    "number": 12,
    "setId": "set3",
    "text": "Who among the following definitely received a token from Bithi but not from Dhanavi?",
    "options": [
      "Pragnyaa",
      "Rasheeda",
      "Qahira",
      "Tantra"
    ]
  },
  {
    "id": "DILR_13",
    "section": "DILR",
    "type": "TITA",
    "number": 13,
    "setId": "set3",
    "text": "How many tokens did Chhaya award?"
  },
  {
    "id": "DILR_14",
    "section": "DILR",
    "type": "TITA",
    "number": 14,
    "setId": "set3",
    "text": "How many tokens did Smera receive?"
  },
  {
    "id": "DILR_15",
    "section": "DILR",
    "type": "MCQ",
    "number": 15,
    "setId": "set3",
    "text": "Which of the following could be the amount of funding that Tantra received?\n(a) Rs. 66,000\n(b) Rs. 165,000",
    "options": [
      "Neither (a) nor (b)",
      "Only (b)",
      "Only (a)",
      "Both (a) and (b)"
    ]
  },
  {
    "id": "DILR_16",
    "section": "DILR",
    "type": "MCQ",
    "number": 16,
    "setId": "set4",
    "text": "If Hari is ready to board a train at 8:05 am from station M, then when is the earliest that he can reach station N?",
    "options": [
      "9:11 am",
      "9:06 am",
      "9:01 am",
      "9:13 am"
    ]
  },
  {
    "id": "DILR_17",
    "section": "DILR",
    "type": "MCQ",
    "number": 17,
    "setId": "set4",
    "text": "If Priya is ready to board a train at 10:25 am from station T, then when is the earliest that she can reach station S?",
    "options": [
      "11:12 am",
      "11:22 am",
      "11:07 am",
      "11:28 am"
    ]
  },
  {
    "id": "DILR_18",
    "section": "DILR",
    "type": "MCQ",
    "number": 18,
    "setId": "set4",
    "text": "Haripriya is expected to reach station S late. What is the latest time by which she must be ready to board at station S if she must reach station B before 1 am via station R?",
    "options": [
      "11:39 pm",
      "11:49 pm",
      "11:35 pm",
      "11:43 pm"
    ]
  },
  {
    "id": "DILR_19",
    "section": "DILR",
    "type": "TITA",
    "number": 19,
    "setId": "set4",
    "text": "What is the minimum number of trains that are required to provide the service on the AB line (considering both north and south directions)?"
  },
  {
    "id": "DILR_20",
    "section": "DILR",
    "type": "TITA",
    "number": 20,
    "setId": "set4",
    "text": "What is the minimum number of trains that are required to provide the service in this city?"
  }
];
