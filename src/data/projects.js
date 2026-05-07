export const projects = [
  {
    id: 1,
    title: "brAInwave",
    description:
      "An AI-powered mobile app that generates personalized study plans from uploaded syllabi, assignments and deadlines. Leverages Google Gemini to parse files and extract scheduling context, producing structured weekly timetables. Offline support via SQLite, FastAPI backend hosted on Railway and React Native/Expo frontend.",
    tech: ["React Native", "Firebase", "Expo", "Python", "FastAPI", "SQLite", "Supabase"],
    link: "https://github.com/loag0/brAInwave",
    label: "Coming soon",
  },
  {
    id: 2,
    title: "copus",
    description:
      "A lightweight, full-stack web app that converts Mp3s to opus/ogg/wav file formats using ffmpeg for Android and Windows sound customization. Deployed on Render with file-type filtering, size limits and CORS configuration.",
    tech: ["HTML", "CSS", "JavaScript", "ffmpeg", "Multer", "Express"],
    link: "https://github.com/loag0/copus",
    label: "Web App",
  },
];
