import "./styles/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Carousel, CarouselItem } from "./components/Carousel";

export default function Index() {

  const projects = [
    {
      id: 1,
      title: "MediFind",
      description: "A web and mobile app that users can use to find medical professionals.",
      image: "/src/assets/react-placeholder.jpg",
      tech: ["React, Node.js, Firebase, Expo"],
      link: "github.com/loag0/MediFind",
    },
    {
      id: 2,
      title: "MechConnect",
      description: "A platform for employees to view training videos, attempt quizzes and earn certificates.",
      image: "/src/assets/react-placeholder.jpg",
      tech: ["React, Node.js, Firebase"],
      link: "github.com/loag0/MechConnect",
    },
    {
      id: 3,
      title: "FieldSet Devices",
      description: "A basic front-end website about a fictional company that sells smartphones.",
      image: "/src/assets/react-placeholder.jpg",
      tech: ["HTML, CSS, JavaScript"],
      link: "github.com/loag0/FieldSet-Devices",
    },
  ];

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="min-w-screen mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#111111] justify-start">
                Loago Moremi
              </div>

              <div className="links-container">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
                <a href="https://github.com/loag0" target="_blank">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href="https://www.linkedin.com/in/loago-moremi"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/*Intro Section */}

        <div className="py-20 px-6 bg-[#f5f5f5] min-h-2xl mx-auto min-w-screen">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-[#111111] mb-6">
              Hello, I'm <span className="text-[#3f3f3f]">Loago Moremi</span>
            </h1>
            <p className="text-xl text-[#727272] mb-8 max-w-2xl mx-auto">
              A passionate software developer with a knack for building scalable
              web applications.
            </p>
          </div>
        </div>

        {/* About Section */}

        <div className="py-20 px-6" id="about">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#111111] mb-12 text-center">
              About Me
            </h2>
            <div className="grid md:grid cols-2 gap-12 items-center">
              <div>
                <img
                  src="./src/assets/profile.jpg"
                  alt="Loago Moremi"
                  className="rounded-full w-64 h-64 mx-auto object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-lg text-[#727272] mb-6 leading-relaxed">
                  I am a software developer with a passion for creating
                  innovative solutions. I have experience in various programming
                  languages and frameworks, and I love to learn new
                  technologies.
                </p>
                <p className="text-[#727272] text-lg leading-relaxed">
                  I enjoy working on challenging projects that push my limits
                  and allow me to grow as a developer. In my free time, I
                  contribute to open-source projects and explore new programming
                  languages.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section id="projects" className="py-20 px-6 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-[#111111] text-center mb-12">
              Projects
            </h2>
            <div className="relative">
              <Carousel className="w-full max-w-5xl mx-auto">
                {projects.map((project) => (
                  <CarouselItem key={project.id}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mr-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#111111] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-[#727272] mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#cbcbcb] text-[#3f3f3f] rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.link}
                          className="inline-flex items-center text-[#3f3f3f] hover:text-[#111111] transition-colors"
                        >
                          <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="bg-[#111111] text-white py-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Loago Moremi. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              Built with <span className="text-red-500">♥</span> using React.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}