import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Check if content is clipped by max-height
    setIsOverflowing(el.scrollHeight > el.clientHeight);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card ${isExpanded ? "project-card--expanded" : ""}`}
    >
      {project.label && (
        <span className="project-card-label">
          {project.label}{" "}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
            >
              <FontAwesomeIcon icon={faGithub} />
              &nbsp; View on GitHub
            </a>
          )}
        </span>
      )}
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-desc">{project.description}</p>
      <div className="project-tags">
        {project.tech.map((tech, index) => (
          <span key={index} className="project-tag">
            {tech}
          </span>
        ))}
      </div>
      {isOverflowing && (
        <button
          className="project-card-toggle"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
