export const projects = [
  {
    slug: "brainwave",
    title: "brAInwave",
    description:
      "An AI-powered mobile app that generates personalized study plans from uploaded syllabi, assignments and deadlines. Leverages Google Gemini to parse files and extract scheduling context, producing structured weekly timetables. Offline support via SQLite, FastAPI backend hosted on Railway and React Native/Expo frontend.",
    tech: [
      "React Native",
      "Firebase",
      "Expo",
      "Python",
      "FastAPI",
      "SQLite",
      "Supabase",
    ],
    link: "https://github.com/loag0/brAInwave",
    label: "Mobile App",
    finished: "2026-05-31",
    start: "2025-08-01",
  },
  {
    slug: "copus",
    title: "copus",
    description:
      "A lightweight, full-stack web app that converts Mp3s to opus/ogg/wav file formats using ffmpeg for Android and Windows sound customization. Deployed on Render with file-type filtering, size limits and CORS configuration.",
    tech: ["HTML", "CSS", "JavaScript", "ffmpeg", "Multer", "Express"],
    link: "https://github.com/loag0/copus",
    label: "Web App",
    finished: "2026-01-31",
    start: "2025-11-01",
  },
  {
    slug: "proxi-net",
    title: "proxi.NET",
    description:
      "A cross-platform messaging application currently being developed while exploring the .NET ecosystem. Built with C#, .NET MAUI and ASP.NET Core. Slowly but surely learning application development outside the React ecosystem.",
    tech: ["C#", ".NET MAUI", "ASP.NET Core"],
    link: "https://github.com/loag0/proxi.NET",
    label: "Mobile App",
    finished: null,
    start: "2026-08-01",
    visibility: "private",
  },
];
