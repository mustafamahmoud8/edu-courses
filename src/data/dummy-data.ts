import { BookOpen, Clock3, Globe2, UserRound, UsersRound } from "lucide-react";

export const courseMaterials = [
  {
    id: "1",
    icon: UserRound,
    label: "Instructor:",
    value: "Edward Norton",
  },
  {
    id: "2",
    icon: Clock3,
    label: "Duration:",
    value: "3 weeks",
  },
  {
    id: "3",
    icon: BookOpen,
    label: "Lessons:",
    value: "8",
  },
  {
    id: "4",
    icon: UsersRound,
    label: "Enrolled:",
    value: "65 students",
  },
  {
    id: "5",
    icon: Globe2,
    label: "Language:",
    value: "English",
  },
  {
    id: "6",
    icon: UserRound,
    label: "Instructor:",
    value: "Edward Norton",
  },
  {
    id: "7",
    icon: Clock3,
    label: "Duration:",
    value: "3 weeks",
  },
  {
    id: "8",
    icon: BookOpen,
    label: "Lessons:",
    value: "8",
  },
  {
    id: "9",
    icon: UsersRound,
    label: "Enrolled:",
    value: "65 students",
  },
  {
    id: "10",
    icon: Globe2,
    label: "Language:",
    value: "English",
  },
];

export const courseWeeks = [
  {
    id: "week-1-4",
    title: "Week 1-4",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      { id: "introduction", name: "Introduction", locked: true },
      { id: "course-overview", name: "Course Overview", locked: true },
      {
        id: "course-quiz-1",
        name: "Course Overview",
        questions: "0 QUESTION",
        duration: "10 MINUTES",
        kind: "exam",
      },
      {
        id: "reference-files",
        name: "Course Exercise / Reference Files",
        locked: true,
        kind: "pdf",
      },
      {
        id: "editor-installation",
        name: "Code Editor Installation (Optional if you have one)",
        locked: true,
        kind: "pdf",
      },
      { id: "embedding-php", name: "Embedding PHP in HTML", locked: true },
    ],
  },
  {
    id: "week-5-8",
    title: "Week 5-8",
    description:
      "Advanced story telling techniques for writers: Personas, Characters & Plots",
    lessons: [
      { id: "defining-functions", name: "Defining Functions", locked: true },
      { id: "function-parameters", name: "Function Parameters", locked: true },
      {
        id: "function-quiz",
        name: "Return Values From Functions",
        questions: "2 QUESTION",
        duration: "15 MINUTES",
        kind: "exam",
      },
      { id: "global-scope", name: "Global Variable and Scope", locked: true },
      {
        id: "constants-modern",
        name: "Newer Way of creating a Constant",
        locked: true,
      },
      { id: "constants", name: "Constants", locked: true },
    ],
  },
  {
    id: "week-9-12",
    title: "Week 9-12",
    description:
      "Build reusable interfaces and connect components to dynamic data",
    lessons: [
      {
        id: "reusable-components",
        name: "Creating Reusable Components",
        locked: true,
      },
      { id: "component-props", name: "Passing Data with Props", locked: true },
      {
        id: "component-quiz",
        name: "Components & Databinding",
        questions: "3 QUESTION",
        duration: "20 MINUTES",
        kind: "exam",
      },
      { id: "user-events", name: "Handling User Events", locked: true },
      {
        id: "lists-conditions",
        name: "Rendering Lists and Conditions",
        locked: true,
      },
      { id: "course-project", name: "Course Project", locked: true },
    ],
  },
];

export const courseComments = [
  {
    id: "student-1",
    name: "Student Name Goes Here",
    date: "Oct 10, 2021",
    avatar: "/images/comment-student-1.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "student-2",
    name: "Student Name Goes Here",
    date: "Oct 15, 2021",
    avatar: "/images/comment-student-2.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "student-3",
    name: "Student Name Goes Here",
    date: "Oct 19, 2021",
    avatar: "/images/comment-student-3.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const leaderboardMessages = [
  {
    minimumPercent: 80,
    message:
      "أداء رائع! وصلت إلى {percent}٪ من مستوى التقدم في الجلسة. أنت قريب جدًا من إكمال الكورس، استمر بنفس الحماس 🏆",
  },
  {
    minimumPercent: 60,
    message:
      "عظيم يا صديقي! مستوى تقدمك في الجلسة {percent}٪. كمّل، عايز أشوف اسمك في الليدر بورد هنا 💪",
  },
  {
    minimumPercent: 40,
    message:
      "أداؤك بيتحسن ووصلت إلى {percent}٪ في الجلسة. كمّل حل الأسئلة، كل إجابة صحيحة تقربك من هدفك 🔥",
  },
  {
    minimumPercent: 20,
    message:
      "بداية قوية! تقدّمك الحالي {percent}٪. ركّز في الأسئلة الجاية وهتشوف مستواك بيعلى 🚀",
  },
  {
    minimumPercent: 1,
    message:
      "أول خطوة اتحسبت! مستوى تقدمك {percent}٪. كمّل المحاولة، تقدر توصل لأعلى 🌱",
  },
  {
    minimumPercent: 0,
    message:
      "جاهز تبدأ؟ جاوب على أسئلة الجلسة عشان تتابع تقدمك وتظهر نتيجتك هنا ✨",
  },
];

export const examQuestions = [
  {
    prompt:
      "Among the following status of India, which one has the oldest rock formations in the country?",
    options: ["Asam", "Bahar", "Karnataka", "Uttar Pardesh"],
    answer: 2,
  },
  {
    prompt: "What does SEO stand for?",
    options: [
      "Search Engine Optimization",
      "Site Entry Option",
      "Search Email Output",
      "System Engine Operation",
    ],
    answer: 0,
  },
  {
    prompt: "Which HTML element creates a hyperlink?",
    options: ["<a>", "<p>", "<img>", "<h1>"],
    answer: 0,
  },
  {
    prompt: "Which language is used to style a web page?",
    options: ["CSS", "SQL", "Python", "PHP"],
    answer: 0,
  },
  {
    prompt: "Which metric counts visits from unpaid search results?",
    options: ["Organic traffic", "Server uptime", "Email opens", "File size"],
    answer: 0,
  },
];
