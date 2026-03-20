import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Send, Eye, Download } from 'lucide-react'

/* ============================================
   HOOKS
   ============================================ */
const useScrollAnimation = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return { ref, className: `fade-in ${inView ? 'visible' : ''}` }
}

const useStaggerAnimation = () => {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  return { ref, className: `stagger-children ${inView ? 'visible' : ''}` }
}

/* ============================================
   DATA
   ============================================ */
const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Training', id: 'training' },
  { name: 'Certificates', id: 'certificates' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Education', id: 'education' },
  { name: 'Contact', id: 'contact' },
]

const SKILLS = [
  { title: 'Languages', icon: '💻', tech: 'C, C++, Python, Java, Kotlin, JavaScript' },
  { title: 'MERN Stack', icon: '🌐', tech: 'MongoDB, Express.js, React, Node.js' },
  { title: 'Frontend', icon: '🎨', tech: 'HTML, CSS, Tailwind CSS, XML' },
  { title: 'Backend & APIs', icon: '⚙️', tech: 'Socket.io, JWT Authentication, Multer, Node.js, Express.js' },
  { title: 'Tools & Platforms', icon: '🔧', tech: 'MySQL, Power BI, Excel, Git, GitHub, Git Bash, Firebase, Android Studio, Cloudinary, Nodemailer' },
  { title: 'Data Science', icon: '📊', tech: 'EDA, Data Visualization, Pandas, Matplotlib, Seaborn' },
  { title: 'Mobile Dev', icon: '📱', tech: 'Android (Kotlin, XML)' },
  { title: 'AI & Cloud', icon: '☁️', tech: 'Generative AI, Cloud Computing' },
]

const SOFT_SKILLS = [
  'Problem-Solving', 'Leadership', 'Innovation', 'Collaboration', 'Adaptability'
]

const LEADERSHIP = {
  title: 'Event Manager',
  org: 'The Code Breakers — Center of Professional Enhancement (CPE), LPU',
  desc: 'Dedicated to planning and organizing events that bring the community together, demonstrating strong leadership, coordination, and fresh energy in every initiative.',
  img: '/projects/event_manager.png'
}

const PROJECTS = [
  {
    title: 'Skill Hive — Skill Swapping Platform',
    category: 'Full Stack Web App',
    desc: 'A robust platform for skill swapping with real-time requests, a full dashboard for managing swaps, and secure authentication.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    frontendLink: 'https://github.com/SakshiMalik565/Skill-Hive-frontend',
    backendLink: 'https://github.com/SakshiMalik565/Skill-Hive-backend',
    link: 'https://skill-hive-frontend-9d0ecc3o1-sakshimalik565s-projects.vercel.app',
    img: '/projects/skill_hive.png',
    period: 'Mar 2025 – Present',
  },
  {
    title: 'EDA on Washington State CPAs',
    category: 'Data Science',
    desc: 'Exploring licensure trends and demographic patterns in Washington State CPAs using Python and statistical visualizations.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    githubLink: 'https://github.com/SakshiMalik565/Python-project-EDA-on-washington-State-certified-public-accountatnts',
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7315755658803400704/',
    img: '/projects/eda_cpa.png',
    period: 'Mar 2025 – Apr 2025',
  },
  {
    title: 'Crop Production Dashboard',
    category: 'Data Visualization',
    desc: 'An interactive Power BI dashboard analyzing agricultural trends, yield efficiency, and seasonal production across India.',
    tech: ['Power BI', 'Data Analysis', 'Excel'],
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7408314233597169665/',
    img: '/projects/crop_dashboard.png',
    period: 'Jan 2025 – Present',
  },
]

const TRAININGS = [
  {
    title: 'Android Application Development',
    org: 'Lovely Professional University',
    period: 'June 2025 – July 2025',
    desc: 'Developed the "Civic Eye" app using Kotlin and Firebase, implementing core features for reporting and real-time data handling.',
    tech: ['Kotlin', 'XML', 'Firebase', 'Android Studio', 'Git'],
    icon: '📱',
    certImg: '/certs/cert_android_training.png',
    certLink: '/certs/cert_android_training.png',
  },
  {
    title: 'Data Analytics Job Simulation',
    org: 'Deloitte — Forage',
    period: 'May 2025 – Sep 2025',
    desc: 'Completed Deloitte-Forage simulation, applying analytical methodologies to resolve complex data challenges and derive business insights.',
    tech: ['Data Analysis', 'Forensic Technology', 'Excel'],
    icon: '📊',
    certImg: '/certs/cert_data_analytics.png',
    certLink: '/certs/cert_data_analytics.png',
  },
]

const CERTIFICATIONS = [
  {
    title: 'Data Visualization',
    org: 'TATA — Forage',
    icon: '📊',
    img: '/certs/cert_data_viz.png',
    link: '/certs/cert_data_viz.png',
  },
  {
    title: 'Data Analytics Job Simulation',
    org: 'Deloitte — Forage',
    icon: '📊',
    img: '/certs/cert_data_analytics.png',
    link: '/certs/cert_data_analytics.png',
  },
  {
    title: 'Master Generative AI',
    org: 'Infosys Springboard',
    icon: '🤖',
    img: '/certs/cert_gen_ai.png',
    link: '/certs/cert_gen_ai.png',
  },
  {
    title: 'Cloud Computing',
    org: 'NPTEL — IIT Kharagpur',
    icon: '☁️',
    img: '/certs/cert_cloud.png',
    link: '/certs/cert_cloud.png',
  },
  {
    title: 'Computer Communications',
    org: 'Coursera — Univ. of Colorado',
    icon: '🌐',
    img: '/certs/cert_comms.png',
    link: '/certs/cert_comms.png',
  },
  {
    title: 'Java (Basic)',
    org: 'HackerRank Certification',
    icon: '☕',
    img: '/certs/cert_java.png',
    link: '/certs/cert_java.png',
  },
]

const ACHIEVEMENTS = [
  {
    title: '5-Star Gold Badge',
    desc: 'Python on HackerRank',
    icon: 'https://hrcdn.net/fcore/assets/badges/python-f70befd824.svg'
  },
  {
    title: '5-Star Gold Badge',
    desc: '30 Days of Code on HackerRank',
    icon: 'https://hrcdn.net/fcore/assets/badges/30-days-of-code-a772ae4c2f.svg'
  },
  {
    title: '5-Star Gold Badge',
    desc: '10 Days of Statistics on HackerRank',
    icon: 'https://hrcdn.net/fcore/assets/badges/10-days-of-statistics-94ff22d1c9.svg'
  },
]

const EDUCATION = [
  { degree: 'Bachelor of Technology', field: 'Computer Science and Engineering', school: 'Lovely Professional University', location: 'Punjab, India', grade: 'CGPA: 7.87', period: 'Aug 2023 – Present', icon: '🎓', color: 'rgba(0, 229, 255, 0.1)' },
  { degree: 'Intermediate (12th)', field: 'Science Stream', school: 'Police Modern School', location: 'Meerut, Uttar Pradesh', grade: '82%', period: 'Apr 2021 – Mar 2022', icon: '📚', color: 'rgba(168, 85, 247, 0.1)' },
  { degree: 'Matriculation (10th)', field: 'Secondary Education', school: 'Police Modern School', location: 'Meerut, Uttar Pradesh', grade: '94.6%', period: 'Apr 2022 – Mar 2023', icon: '🏫', color: 'rgba(236, 72, 153, 0.1)' },
]

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
const Particles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    })), []
  )

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ============================================
   SECTION WRAPPER
   ============================================ */
const SectionWrapper = ({ id, children, setActive, className = '' }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false })

  useEffect(() => {
    if (inView && setActive) setActive(id)
  }, [inView, id, setActive])

  return (
    <section ref={ref} id={id} className={`section ${className}`}>
      {children}
    </section>
  )
}

/* ============================================
   APP
   ============================================ */
const App = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Navbar activeSection={activeSection} scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu activeSection={activeSection} open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      <Hero setActive={setActiveSection} />
      <About setActive={setActiveSection} />
      <Skills setActive={setActiveSection} />
      <Projects setActive={setActiveSection} />
      <Training setActive={setActiveSection} />
      <Certificates setActive={setActiveSection} />
      <Achievements setActive={setActiveSection} />
      <EducationSection setActive={setActiveSection} />
      <Contact setActive={setActiveSection} />
      <Footer />
    </div>
  )
}

/* ============================================
   NAVBAR
   ============================================ */
const Navbar = ({ activeSection, scrolled, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
    <div className="container navbar-inner">
      <a href="#home" className="navbar-logo"><span className="gradient-text">SM</span></a>
      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={`nav-link ${activeSection === l.id ? 'active' : ''}`}>{l.name}</a>
        ))}
      </div>
      <button className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>
  </nav>
)

const MobileMenu = ({ activeSection, open, setOpen }) => (
  <div className={`mobile-menu ${open ? 'open' : ''}`}>
    {NAV_LINKS.map((l) => (
      <a key={l.id} href={`#${l.id}`} className={activeSection === l.id ? 'active' : ''} onClick={() => setOpen(false)}>{l.name}</a>
    ))}
  </div>
)

/* ============================================
   HERO
   ============================================ */
const Hero = ({ setActive }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false })
  const [subtitleIndex, setSubtitleIndex] = useState(0)
  const subtitles = ['Full Stack Developer', 'AI Enthusiast', 'Aspiring Data Analyst', 'Android Developer']

  useEffect(() => { if (inView) setActive('home') }, [inView, setActive])
  useEffect(() => {
    const i = setInterval(() => setSubtitleIndex((p) => (p + 1) % subtitles.length), 2500)
    return () => clearInterval(i)
  }, [])

  return (
    <section ref={ref} id="home" className="hero">
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
        <Particles />
      </div>
      <div className="container">
        <div className="hero-content">
          <div>
            <div className="hero-badge">
              <span className="pulse-dot" />
              <span>Available for opportunities</span>
            </div>
            <h1>Hi, I'm <span className="gradient-text">Sakshi Malik</span></h1>
            <p className="hero-subtitle">
              <span className="gradient-text" style={{ fontWeight: 600, fontSize: '1.3rem' }}>{subtitles[subtitleIndex]}</span>
              <br />
              <span style={{ fontSize: '0.95rem', opacity: 0.85, display: 'block', marginTop: '0.5rem' }}>
                Crafting smart solutions using Data Science, Android, Full Stack, and AI — turning complex problems into elegant digital experiences.
              </span>
            </p>
            <div className="hero-buttons">
              <a href="/certs/Sakshi_CV_final.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">View CV <Eye size={18} /></a>
              <a href="/certs/Sakshi_CV_final.pdf" download="Sakshi_Malik_CV.pdf" className="btn-outline">Download CV <Download size={18} /></a>
            </div>
          </div>
          <div className="hero-card glass">
            <div className="hero-avatar"><img src="/profile.jpeg" alt="Sakshi Malik" /></div>
            <h3>Sakshi Malik</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>B.Tech CSE Student at LPU</p>
            <div className="hero-tags">
              <span className="tag">Aspiring Data Analyst</span>
              <span className="tag">AI Enthusiast</span>
              <span className="tag">Full Stack</span>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-number">5+</div><div className="stat-label">Projects</div></div>
              <div className="stat-item"><div className="stat-number">16+</div><div className="stat-label">Skills</div></div>
              <div className="stat-item"><div className="stat-number">5⭐</div><div className="stat-label">HackerRank</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================
   ABOUT
   ============================================ */
const About = ({ setActive }) => {
  const anim = useScrollAnimation()
  return (
    <SectionWrapper id="about" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">GET TO KNOW ME</div>
          <h2 className="section-title">Who I Am</h2>
        </div>
        <div ref={anim.ref} className={`about-grid ${anim.className}`}>
          <div className="about-image-wrapper glass tilt-card">
            <img src="/profile.jpg" alt="Sakshi Malik" />
          </div>
          <div className="about-text">
            <p>I'm a Computer Science and Engineering student at Lovely Professional University with a passion for full-stack development, data analysis, and AI technologies. With expertise in multiple programming languages and frameworks, I love building innovative solutions that solve real-world problems.</p>
            <p>My journey in tech has been driven by curiosity and a commitment to continuous learning. From developing AI-powered applications to analyzing complex datasets, I thrive on challenges that push me to grow. I believe in writing clean, efficient code and creating user experiences that make a difference.</p>
            <div className="about-info-cards">
              <div className="about-info-card"><div className="about-info-icon">📍</div><span>Punjab, India</span></div>
              <div className="about-info-card"><div className="about-info-icon">✉️</div><span>sakshiprofessional098@gmail</span></div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   SKILLS
   ============================================ */
const Skills = ({ setActive }) => {
  const stagger = useStaggerAnimation()
  return (
    <SectionWrapper id="skills" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">EXPERTISE</div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-desc">Technologies and tools I use to bring ideas to life</p>
        </div>
        <div ref={stagger.ref} className={`skills-modern-grid ${stagger.className}`} style={{ marginBottom: '4rem' }}>
          {SKILLS.map((s, i) => (
            <div key={i} className="skill-modern-card glass">
              <div className="skill-modern-header">
                <span className="skill-modern-icon">{s.icon}</span>
                <h4>{s.title}</h4>
              </div>
              <div className="skill-tags-container">
                {s.tech.split(', ').map((t) => (
                  <span key={t} className="skill-tag-modern">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div className="section-subtitle">PEOPLE SKILLS</div>
          <h2 className="section-title">Core Competencies</h2>
        </div>
        <div className="skill-tags-container" style={{ justifyContent: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
          {SOFT_SKILLS.map((ss) => (
            <span key={ss} className="skill-tag-modern skill-tag-soft" style={{ fontSize: '1rem', padding: '0.6rem 1.2rem' }}>
              {ss}
            </span>
          ))}
        </div>

        {/* Leadership Spotlight */}
        <div className="leadership-spotlight glass">
          <div className="leadership-content">
            <div className="section-subtitle">LEADERSHIP SPOTLIGHT</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{LEADERSHIP.title}</h3>
            <p style={{ color: 'var(--primary-light)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>{LEADERSHIP.org}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.9rem' }}>{LEADERSHIP.desc}</p>
          </div>
          <div className="leadership-image-container">
            <img src={LEADERSHIP.img} alt="Leadership at LPU" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   PROJECTS
   ============================================ */
const Projects = ({ setActive }) => {
  const stagger = useStaggerAnimation()
  return (
    <SectionWrapper id="projects" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">MY WORK</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">Each project represents a unique challenge and learning experience</p>
        </div>
        <div ref={stagger.ref} className={`projects-grid ${stagger.className}`}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card glass">
              <div className="project-image">
                <img src={p.img} alt={p.title} />
                <div className="project-overlay">
                  {p.frontendLink && p.backendLink ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <a href={p.frontendLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        Frontend Repo <Github size={14} />
                      </a>
                      <a href={p.backendLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        Backend Repo <Github size={14} />
                      </a>
                    </div>
                  ) : p.githubLink && p.link ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        View Live <ExternalLink size={14} />
                      </a>
                      <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                        GitHub Repo <Github size={14} />
                      </a>
                    </div>
                  ) : (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                      View Live <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-body">
                <span className="project-category">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tech-tags">{p.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                <div className="project-footer">
                  <span className="project-period">{p.period}</span>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">Live <ExternalLink size={16} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   TRAINING — WITH CERT IMAGES
   ============================================ */
const Training = ({ setActive }) => {
  const anim = useScrollAnimation()
  return (
    <SectionWrapper id="training" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">HANDS-ON EXPERIENCE</div>
          <h2 className="section-title">Training & Internships</h2>
        </div>
        <div ref={anim.ref} className={`training-grid ${anim.className}`}>
          {TRAININGS.map((t, i) => (
            <div key={i} className="timeline-item glass">
              <div className="timeline-icon">{t.icon}</div>
              <h4>{t.title}</h4>
              <div className="timeline-org">{t.org}</div>
              {t.period && <div className="timeline-period">{t.period}</div>}
              <p>{t.desc}</p>
              {t.tech && (
                <div className="project-tech-tags" style={{ marginTop: '0.75rem' }}>
                  {t.tech.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              )}
              {t.certImg && (
                <a href={t.certLink} target="_blank" rel="noopener noreferrer" className="training-cert-preview">
                  <img src={t.certImg} alt={`${t.title} Certificate`} />
                  <span className="cert-view-label">View Certificate <ExternalLink size={14} /></span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   CERTIFICATES — IMAGE CARDS
   ============================================ */
const Certificates = ({ setActive }) => {
  const stagger = useStaggerAnimation()
  return (
    <SectionWrapper id="certificates" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">CREDENTIALS</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-desc">Professional credentials and verified achievements</p>
        </div>
        <div ref={stagger.ref} className={`certs-grid ${stagger.className}`}>
          {CERTIFICATIONS.map((c, i) => (
            <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="cert-card glass">
              <div className="cert-image">
                <img src={c.img} alt={c.title} />
                <span className="cert-badge">Verified</span>
              </div>
              <div className="cert-body">
                <div className="cert-icon">{c.icon}</div>
                <div>
                  <h4>{c.title}</h4>
                  <p className="cert-org">{c.org}</p>
                </div>
                <ExternalLink size={16} className="cert-external" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   ACHIEVEMENTS
   ============================================ */
const Achievements = ({ setActive }) => {
  const stagger = useStaggerAnimation()
  return (
    <SectionWrapper id="achievements" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">RECOGNITION</div>
          <h2 className="section-title">Achievements</h2>
        </div>
        <div ref={stagger.ref} className={`achievements-modern-grid ${stagger.className}`}>
          {ACHIEVEMENTS.map((a, i) => (
            <a key={i} href="https://www.hackerrank.com/profile/sakshimalik" target="_blank" rel="noopener noreferrer" className="achievement-card-premium glass">
              <div className="badge-display">
                <div className="badge-glow" />
                <img src={a.icon} alt={a.title} className="badge-img" />
              </div>
              <div className="achievement-info-premium">
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   EDUCATION
   ============================================ */
const EducationSection = ({ setActive }) => {
  const stagger = useStaggerAnimation()
  return (
    <SectionWrapper id="education" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">ACADEMIC JOURNEY</div>
          <h2 className="section-title">Education</h2>
        </div>
        <div ref={stagger.ref} className={`edu-premium-grid ${stagger.className}`}>
          {EDUCATION.map((e, i) => (
            <div key={i} className="edu-card-premium glass">
              <div className="edu-icon-premium" style={{ background: e.color }}>{e.icon}</div>
              <div className="edu-content-premium">
                <h4>{e.degree}</h4>
                <div className="edu-university-premium">{e.school}</div>
                <div className="edu-details-premium">
                  <div className="edu-detail-item">📍 {e.location}</div>
                  <div className="edu-detail-item">📅 {e.period}</div>
                  <div className="edu-detail-item">
                    <span className="grade-badge">{e.grade}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   CONTACT
   ============================================ */
const Contact = ({ setActive }) => {
  const formRef = useRef()
  const [sending, setSending] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const anim = useScrollAnimation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setFormStatus(null)
    const formData = new FormData(formRef.current)
    try {
      const res = await fetch('https://formsubmit.co/ajax/sakshiprofessional098@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.get('user_name'),
          email: formData.get('user_email'),
          message: formData.get('message'),
          _subject: 'New Portfolio Contact Message',
        }),
      })
      if (res.ok) { setFormStatus('success'); formRef.current.reset() }
      else { setFormStatus('error') }
    } catch { setFormStatus('error') }
    finally { setSending(false); setTimeout(() => setFormStatus(null), 5000) }
  }

  return (
    <SectionWrapper id="contact" setActive={setActive}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">LET'S CONNECT</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-desc">Have a project in mind? Let's discuss and bring your ideas to life</p>
        </div>
        <div ref={anim.ref} className={`contact-grid ${anim.className}`}>
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Feel free to reach out through any of these channels. I typically respond within 24 hours.</p>
            <div className="contact-item"><div className="contact-item-icon">📧</div><div><h4>Email</h4><a href="mailto:sakshiprofessional098@gmail.com">sakshiprofessional098@gmail.com</a></div></div>
            <div className="contact-item"><div className="contact-item-icon">💼</div><div><h4>LinkedIn</h4><a href="https://www.linkedin.com/in/sakshi-malik-285v/" target="_blank" rel="noopener noreferrer">linkedin.com/in/sakshi-malik-285v</a></div></div>
            <div className="contact-item"><div className="contact-item-icon">🐙</div><div><h4>GitHub</h4><a href="https://github.com/SakshiMalik565" target="_blank" rel="noopener noreferrer">github.com/SakshiMalik565</a></div></div>
            <div className="contact-item"><div className="contact-item-icon">📍</div><div><h4>Location</h4><p>Punjab, India — Lovely Professional University</p></div></div>
          </div>
          <form ref={formRef} className="contact-form-wrapper glass" onSubmit={handleSubmit}>
            <h3>Send Me a Message</h3>
            {formStatus === 'success' && <div className="form-success">✅ Message sent successfully! I'll get back to you soon.</div>}
            {formStatus === 'error' && <div className="form-error">❌ Something went wrong. Please try again or email me directly.</div>}
            <div className="form-group"><label htmlFor="user_name">Full Name *</label><input type="text" id="user_name" name="user_name" required placeholder="Your name" /></div>
            <div className="form-group"><label htmlFor="user_email">Email Address *</label><input type="email" id="user_email" name="user_email" required placeholder="your@email.com" /></div>
            <div className="form-group"><label htmlFor="message">Message *</label><textarea id="message" name="message" required placeholder="Tell me about your project or how I can help..." /></div>
            <button type="submit" className="submit-btn" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}<Send size={18} /></button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ============================================
   FOOTER
   ============================================ */
const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-left">
        <h3><span className="gradient-text">Sakshi Malik</span></h3>
        <p>© 2026 Sakshi Malik. Crafted with passion.</p>
      </div>
      <div className="footer-socials">
        <a href="https://www.linkedin.com/in/sakshi-malik-285v/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn"><Linkedin size={20} /></a>
        <a href="https://github.com/SakshiMalik565" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub"><Github size={20} /></a>
        <a href="mailto:sakshimalik565@gmail.com" className="social-link" title="Email"><Mail size={20} /></a>
      </div>
    </div>
  </footer>
)

export default App
