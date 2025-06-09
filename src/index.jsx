import { useEffect, useState } from "react";
import gsap from "gsap";
import "./styles/index.css";
import "animate.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationPin } from "@fortawesome/free-solid-svg-icons"
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

  useEffect(() => {
    const first = document.getElementById("first-name");
    const last = document.getElementById("last-name");

    const bounce = (el) => {
      gsap.to(el, {
        y: -10,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(el, {
            y: 0,
            duration: 0.4,
            ease: "bounce.out",
          });
        },
      });
    };

    first.addEventListener("mouseenter", () => bounce(first));
    last.addEventListener("mouseenter", () => bounce(last));

    return () => {
      first.removeEventListener("mouseenter", () => bounce(first));
      last.removeEventListener("mouseenter", () => bounce(last));
    };
  }, []);

  {/* Dark Mode Toggle */}

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = document.documentElement.getAttribute("data-theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );

  };

  return (
    <>
      <div className="container" id="container">
        <nav className="navbar">
          <div className="min-w-full mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-[#111111] justify-start px-5">
                <a
                  href="/"
                  onClick={(e) =>
                    window.scrollTo({ top: 0, behavior: "smooth" }) ||
                    e.preventDefault()
                  }
                >
                  Loago Moremi
                </a>
              </div>

              <div className="links-container">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
                <a href="#contact">Contact</a>
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
        
        <div className="page-container">
          <div className="py-20 px-6 bg-[#f5f5f5] min-h-2xl mx-auto min-w-screen">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-[#111111] mb-6">
                Hello, I'm <span className="text-[#3f3f3f]">Loago Moremi</span>
              </h1>
              <p className="text-xl text-[#727272] mb-8 max-w-4xl mx-auto">
                I'm a Computer Science student with a strong passion for
                front-end development and creative design. I enjoy building
                clean, responsive web interfaces and continuously exploring new
                technologies to improve my skills. I'm driven, curious, and
                committed to crafting digital experiences that are both
                functional and visually engaging."
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
                    innovative solutions. I have experience in various
                    programming languages and frameworks, and I love to learn
                    new technologies.
                  </p>
                  <p className="text-[#727272] text-lg leading-relaxed">
                    I enjoy working on challenging projects that push my limits
                    and allow me to grow as a developer. In my free time, I
                    contribute to open-source projects and explore new
                    programming languages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*Projects Section */}

          <section id="projects" className="py-20 px-6 bg-[#f0f0f0]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-[#111111] text-center mb-12">
                Projects
              </h2>
              <div className="relative">
                <Carousel className="w-full max-w-5xl mx-auto">
                  {projects.map((project) => (
                    <CarouselItem key={project.id}>
                      <div className="project-card group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mr-4 relative">
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
                        </div>

                        {/* overlay for darkening bg */}
                        <div className="card-overlay"></div>

                        {/* centered github icon */}
                        <a
                          href={"https://" + project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-overlay"
                        >
                          <FontAwesomeIcon
                            icon={faGithub}
                            className="text-black text-4xl"
                          />
                        </a>
                      </div>
                    </CarouselItem>
                  ))}
                </Carousel>
              </div>
            </div>
          </section>

          {/*Contact Section */}

          <section id="contact" className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-[#111111] mb-4">
                Let's Work Together
              </h2>
              <p className="text-1xl text-[#727272] mb-16 max-w-2xl mx-auto">
                Got a project in mind? I'd love to hear about it.{" "}
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="bg-[#111111] p-4 rounded-full"
                    id="contact-icons"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-white"
                      size={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">
                      Email
                    </h3>
                    <a href="mailto:loagomoremi@gmail.com">
                      <p className="text-[#727272]" id="email-text">
                        loagomoremi@gmail.com
                      </p>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="bg-[#111111] p-4 rounded-full"
                    id="contact-icons"
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">
                      Phone
                    </h3>
                    <p className="text-[#727272]">+267 76102933</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="bg-[#111111] p-4 rounded-full"
                    id="contact-icons"
                  >
                    <FontAwesomeIcon
                      icon={faLocationPin}
                      className="text-white"
                      size={28}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111111] mb-2">
                      Location
                    </h3>
                    <p className="text-[#727272]">Francistown, BW</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="bg-[#111111] text-white py-12 min-w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a
                href="/"
                onClick={(e) =>
                  window.scrollTo({ top: 0, behavior: "smooth" }) ||
                  e.preventDefault()
                }
              >
                <span className="text-xl font-semibold mb-2" id="first-name">
                  Loago
                </span>
                <span className="text-xl font-semibold mb-2" id="last-name">
                  {" "}
                  Moremi
                </span>
              </a>
              <p className="text-[#a0a0a0]">Building cool stuff on the web</p>
            </div>

            <div className="flex items-center space-x-5">
              <a
                href="https://github.com/loag0"
                target="_blank"
                className="text-[#a0a0a0] hover:text-white transition-colors"
                id="footer-icons"
              >
                <FontAwesomeIcon icon={faGithub} size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/loago-moremi"
                target="_blank"
                className="text-[#a0a0a0] hover:text-white transition-colors"
                id="footer-icons"
              >
                <FontAwesomeIcon icon={faLinkedin} size={20} />
              </a>
              <a
                href="mailto:loagomoremi@gmail.com"
                className="text-[#a0a0a0] hover:text-white transition-colors"
                id="footer-icons"
              >
                <FontAwesomeIcon icon={faEnvelope} size={20} />
              </a>
            </div>
          </div>

          <div className="border-t border-[#3f3f3f] mt-8 pt-6 text-center">
            <p className="text-[#a0a0a0] text-sm">© 2024 Loago Moremi.</p>
          </div>
        </div>
      </footer>

      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#cbcbcb] dark:bg-[#cbcbcb] hover:bg-[#1a1a2c] dark:hover:bg-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        aria-label="Toggle dark mode"
      >
        {/* Sun Icon for Light Mode */}
        <svg
          className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-180 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon for Dark Mode */}
        <svg
          className={`w-6 h-6 text-blue-400 absolute transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-180 scale-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    </>
  );
}