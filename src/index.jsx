import "./styles/index.css";
import "animate.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationPin } from "@fortawesome/free-solid-svg-icons"
import { Carousel, CarouselItem } from "./components/Carousel";

export default function Index() {

  const projects = [
    {
      id: 1,
      title: "MediFind",
      description: "A web and mobile app that users can use to find medical professionals.",
      image: "/src/assets/medifind.png",
      tech: ["React", "Firebase", "Expo"],
      link: "github.com/loag0/MediFind",
    },
    {
      id: 2,
      title: "MechConnect",
      description: "A platform for employees to view training videos, attempt quizzes and earn certificates.",
      image: "/src/assets/mechconnect.png",
      tech: ["React", "Firebase"],
      link: "github.com/loag0/MechConnect",
    },
    {
      id: 3,
      title: "FieldSet Devices",
      description: "A basic front-end website about a fictional company that sells smartphones.",
      image: "/src/assets/blue-lock.png",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "github.com/loag0/FieldSet-Devices",
    },
  ];

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

        <div className="page-container">

          {/*Intro Section */}

          <div className="py-20 px-6 bg-[#f5f5f5] min-h-2xl mx-auto min-w-screen">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-[#111111] mb-6">
                Hello, I'm <span className="text-[#3f3f3f]">Loago Moremi</span>
              </h1>
              <p className="text-xl text-[#727272] max-w-4xl mx-auto">
                Computer Science student passionate about front-end dev and
                clean design.
              </p>
            </div>
          </div>

          {/* About Section */}

          <div className="py-20 px-6" id="about">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-[#111111] mb-12 text-center">
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div>
                  <img
                    src="./src/assets/profile-v2.jpg"
                    alt="Loago Moremi"
                    className="rounded-full w-64 h-64 mx-auto object-cover shadow-lg"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-lg text-[#727272] mb-6 leading-relaxed">
                    I have a passion for software
                    development and a curiosity that keeps me exploring new
                    tools, languages, and frameworks. I enjoy solving problems
                    through code and learning by building, even if that means
                    failing a few times before getting it right.
                  </p>
                  <p className="text-[#727272] text-lg leading-relaxed">
                    I enjoy working on challenging projects that push my limits
                    and allow me to grow as a developer.
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

          {/* Experience Section */}

          <section id="experience" className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-[#111111] text-center mb-12">
                Experience
              </h2>

              <div className="bg-[#f5f5f5] p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                <img
                  src="/src/assets/debswana.jpg"
                  alt="Debswana Logo"
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-[#111111] mb-1">
                    IT Attaché – Debswana Mining Company
                  </h3>
                  <p className="text-[#727272] italic mb-2">
                    June 2025 – July 2025
                  </p>
                  <ul className="list-disc pl-5 text-[#727272] space-y-1">
                    <li>
                      Provided end-user technical support and handled
                      troubleshooting tasks
                    </li>
                    <li>
                      Assisted in deploying and maintaining enterprise software
                      systems
                    </li>
                    <li>
                      Worked closely with the IT team to support domain/network
                      configurations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/*Contact Section */}

          <section id="contact" className="py-20 px-6 bg-[#f0f0f0]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-[#111111] mb-4">
                Let's Work Together
              </h2>
              <p className="text-1xl text-[#727272] mb-16 max-w-2xl mx-auto">
                Got a project in mind? I'd love to hear about it.{" "}
              </p>

              <div className="grid md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                <div className="flex flex-col items-center space-y-4">
                  <a
                    className="cursor-pointer"
                    href="mailto:loagomoremi@gmail.com"
                  >
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
                  </a>
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

      <footer className="bg-[#111111] text-white py-12 w-screen self-stretch">
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
                href="https://www.instagram.com/_m.loago"
                target="_blank"
                className="text-[#a0a0a0] hover:text-white transition-colors"
                id="footer-icons"
              >
                <FontAwesomeIcon icon={faInstagram} size={20} />
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
    </>
  );
}