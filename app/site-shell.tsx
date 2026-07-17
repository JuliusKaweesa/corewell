"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Activity,
  BoneFracture,
  Dumbbell,
  HeartHandshake,
  HeartPulse,
  Home,
  CalendarPlus,
  MapPin,
  MessageCircle,
  MonitorCheck,
  Newspaper,
  PersonStanding,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

type PageName = "home" | "about" | "services" | "divisions" | "team" | "patient" | "articles" | "contact" | "appointment" | "notfound";

const nav = [
  ["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Divisions", "/divisions"],
  ["Our Team", "/team"], ["Patient Information", "/patient-information"], ["Articles", "/articles"], ["Contact", "/contact"],
];

const mobileNav = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Our Team", "/team"],
  ["Why CoreWell", "/#why-corewell"],
  ["The CoreWell Clinic", "/articles"],
];

const services = [
  ["MS", "Musculoskeletal Physiotherapy", "Clinical assessment and evidence-based rehabilitation for muscle, joint and movement conditions.", "People living with pain, stiffness or reduced mobility.", "Joint pain, sprains, strains and posture-related pain"],
  ["SR", "Sports Injury Rehabilitation", "Sport-specific rehabilitation that restores movement, confidence and performance.", "Recreational and competitive athletes.", "Sports injuries, overuse problems and reduced performance"],
  ["SP", "Spine and Back Pain Care", "Protocol-driven care for back pain, neck pain and complex spinal conditions.", "People with new, persistent or complex spinal pain.", "Back pain, neck pain, sciatica and disc-related conditions"],
  ["PS", "Post-Surgical Rehabilitation", "Structured return-to-function programmes developed around your surgery and clinical needs.", "People recovering from musculoskeletal or spinal surgery.", "Weakness, stiffness and reduced function after surgery"],
  ["NR", "Neurological Rehabilitation", "Clinically supervised rehabilitation that supports movement, balance and daily function.", "People managing neurological movement challenges.", "Balance, mobility and functional movement limitations"],
  ["PD", "Paediatric Physiotherapy", "Age-appropriate clinical assessment and movement support for children and families.", "Children and families seeking physiotherapy support.", "Movement, mobility and developmental concerns"],
  ["PM", "Pain Management", "Pain science education combined with evidence-based physical rehabilitation for long-term outcomes.", "People with persistent or recurring pain.", "Chronic pain, activity-related pain and movement sensitivity"],
  ["WE", "Workplace Ergonomics", "Physiotherapist-led assessment of workstations and work habits with practical recommendations.", "Teams and individuals in office or operational settings.", "Workstation strain, poor posture and repetitive load"],
  ["CW", "Corporate Wellness", "Clinically supervised workplace programmes with screening, weekly sessions and outcome reporting.", "Companies and organisations across Uganda.", "Workplace screening, injury prevention and employee wellness"],
  ["AP", "Athlete Performance Support", "Strength, mobility and performance programmes designed around the demands of your sport.", "Athletes building resilience and performance.", "Return to sport, injury prevention and performance limitations"],
];

const enquiryOptions = [
  "CoreWell Corporate — Workplace Wellness",
  "CoreWell Spine Specialist Clinic",
  "CoreWell Performance — Golf Physiotherapy",
  "General Enquiry",
];

const divisions = [
  ["Corporate", "CoreWell Corporate", "Protect your workforce. Protect your bottom line.", ["Baseline MSK screening", "Ergonomic workstation assessment", "Weekly supervised sessions", "Home exercise programmes", "Monthly clinical reporting", "Workforce outcome measurement"]],
  ["Spine", "CoreWell Spine Specialist Clinic", "Uganda's home for specialist spine care.", ["Specialist spinal assessment", "Protocol-driven rehabilitation", "MSK ultrasound assessment", "Chronic pain management", "Post-surgical rehabilitation", "Complex spinal care"]],
  ["Performance", "CoreWell Performance", "Play better. Move better. Last longer.", ["Golf physiotherapy assessment", "Golf performance conditioning", "Injury rehabilitation", "Tournament medical presence", "Movement screening", "Sport-specific rehabilitation"]],
];

const corporateFeatures: Array<[LucideIcon, string, string]> = [
  [Stethoscope, "Baseline MSK Screening", "Clinical musculoskeletal screening of all participating employees using validated tools. Identifies at-risk individuals before injury occurs."],
  [MonitorCheck, "Ergonomic Workstation Assessment", "Physiotherapist-led assessment of your workplace environment with immediate, actionable recommendations."],
  [PersonStanding, "Weekly Supervised Sessions", "One clinically supervised group session per week, stratified by risk profile. Delivered at your workplace in 45–60 minute sessions."],
  [Home, "Home Exercise Programme", "Every participant receives a structured home exercise programme to extend clinical benefit beyond the workplace."],
  [Activity, "Monthly Clinical Reporting", "Written outcome report to HR each month covering attendance, participation, MSK symptom changes, and programme effectiveness."],
];

const spineFeatures: Array<[LucideIcon, string, string]> = [
  [Stethoscope, "Specialist Spinal Assessment", "Comprehensive clinical assessment of lumbar disc pathology, cervical disorders, spondylolisthesis, and complex chronic back pain."],
  [Activity, "Protocol-Driven Rehabilitation", "Structured rehabilitation programmes including our 56-day, 17-exercise progressive back pain protocol."],
  [MonitorCheck, "MSK Ultrasound Assessment", "Ultrasound-guided assessment including multifidus biofeedback for outcome monitoring and rehabilitation guidance."],
  [HeartPulse, "Chronic Pain Management", "Integrating pain science education with evidence-based physical rehabilitation for long-term outcomes."],
  [BoneFracture, "Post-Surgical Rehabilitation", "Structured return-to-function programmes following spinal surgery, developed in collaboration with referring surgeons."],
];

const performanceFeatures: Array<[LucideIcon, string, string]> = [
  [Activity, "Golf Physiotherapy Assessment", "Specialist assessment of swing-related injuries, movement restrictions, and physical asymmetries affecting your game and your health."],
  [Dumbbell, "Golf Performance Conditioning", "Strength, flexibility, and rotational power programmes designed specifically for the demands of golf."],
  [HeartPulse, "Injury Rehabilitation", "Management of back pain, golfer's elbow, shoulder impingement, hip dysfunction, and wrist injuries common in golf."],
  [Stethoscope, "Tournament Medical Presence", "On-site physiotherapy at golf tournaments, including injury assessment, pre-round warm-up support, and post-round recovery guidance."],
  [HeartHandshake, "Uganda Golf Union Partnership", "CoreWell Performance is the proposed official sports physiotherapy partner of the Uganda Golf Union, bringing specialist care to every affiliated club and tournament."],
];

const whyCoreWellPoints: Array<[LucideIcon, string, string]> = [
  [Stethoscope, "Clinical Leadership", "Every CoreWell engagement is led by licensed physiotherapists. Not fitness instructors. Not wellness coaches. Clinical professionals with the training, registration, and accountability that corporate contracts and patient care demand."],
  [MonitorCheck, "Evidence-Based Protocols", "All CoreWell programmes are built on validated clinical protocols, not generic wellness content. This enables outcomes measurement, insurer alignment, and a level of clinical defensibility that no fitness-based provider can offer."],
  [Activity, "Measurable Outcomes", "Every corporate programme generates monthly clinical outcome data. We do not ask you to take our word for it — we give you the numbers. Attendance, MSK symptom changes, risk stratification, programme effectiveness."],
  [MapPin, "Pioneer Positioning", "CoreWell Spine Specialist Clinic will be the first private specialist spine rehabilitation centre in Uganda. First-mover advantage in a high-need, high-value segment that is currently completely unserved by the private sector."],
  [HeartHandshake, "Integrated Model", "CoreWell is the only entity in Uganda offering corporate wellness, specialist spine care, and sports physiotherapy under one brand and one clinical governance framework. One company. One standard. Three entry points."],
  [HeartPulse, "Built From Clinical Observation", "CoreWell was not created in a boardroom. It grew from the clinical evidence our founders gathered treating hundreds of corporate patients. We are not solving a hypothetical problem — we are solving one we watched develop in our own clinics."],
];

const generalWellnessComparison = [
  "Gets people moving generally",
  "Can be delivered by any instructor",
  "No clinical baseline or outcome data",
  "Cannot identify at-risk employees",
  "Cannot manage an injury when it occurs",
  "Provides no data for HR or insurers",
];

const corewellClinicalComparison = [
  "Targets specific MSK risk factors in your workforce",
  "Designed and supervised by licensed physiotherapists",
  "Begins with clinical screening, ends with outcome data",
  "Identifies high-risk individuals before they become injuries",
  "Has clinical authority to assess and manage injuries on-site",
  "Delivers monthly clinical reports to HR and insurers",
];

export const articles = [
  { slug: "why-your-lower-back-hurts-at-your-desk", category: "Workplace Health", author: "Julius Kaweesa", title: "Why Your Lower Back Hurts After a Long Day at Your Desk", excerpt: "If you finish work every day with a dull ache in your lower back, you are not alone — and you are not imagining it. Here is the clinical explanation and what you can do about it.", date: "June 2026", time: "4 min read", image: "/images/articles/back-pain-at-work.jpg", imageAlt: "A physiotherapist helping an office worker adjust his chair and sitting posture", content: [
    "If you finish work every day with a dull ache in your lower back, you are not alone — and you are not imagining it. Lower back pain is the single most common complaint we see in office-based workers at our clinic, and in the vast majority of cases, it has a very specific and very preventable cause.",
    "Your spine is designed for movement. It has 33 vertebrae, 23 intervertebral discs, and over 30 muscles working together to keep you upright, flexible, and pain-free. When you sit at a desk for six, seven, or eight hours a day, you are placing your spine in a sustained position it was never designed to hold for that long.",
    "Your hip flexors gradually tighten while seated and can pull your pelvis forward. At the same time, the multifidus and transversus abdominis — the deep muscles responsible for protecting your spine — reduce their activity. Prolonged sitting also compresses the front of the intervertebral discs and tires the postural muscles of the upper and mid-back, encouraging a slumped position that increases pressure on the lumbar spine.",
    "A mild ache at the end of a long day that resolves after movement is common and manageable. Seek clinical assessment if pain radiates down one or both legs, if you experience numbness, tingling or weakness in the legs or feet, if pain wakes you from sleep, if it is present before you have even sat down, or if it has continued for more than six weeks without improvement.",
    "Most of the back pain we treat did not start with a dramatic injury. It started with months or years of sitting — and it is almost always preventable if caught early enough.",
    "Desk-related back pain is largely preventable and highly treatable. Move every 30–45 minutes, even if only for 60 seconds. Adjust your chair so your hips are at 90 degrees, your feet are flat and your screen is at eye level. Strengthen the deep spinal stabilisers and stretch the hip flexors daily to reduce sustained loading on the spine.",
    "If your back pain has been present for more than two weeks, affects sleep or concentration, or radiates into the legs, book an assessment with a licensed physiotherapist. A proper clinical assessment can identify the structures involved, rule out serious pathology and provide a targeted rehabilitation plan. At CoreWell Uganda, significant improvement is often achievable within four to eight weeks of proper clinical management."
  ] },
  { slug: "warning-signs-neck-pain-is-work-related", category: "Workplace Health", author: "Kajwiga Emmanuel", title: "Five Warning Signs That Your Neck Pain Is Work-Related", excerpt: "Neck pain affects a significant proportion of Uganda's office workforce — but most people do not connect it to their desk. Here is how to tell if your neck pain is being caused by how you work.", date: "June 2026", time: "3 min read", image: "/images/articles/neck-pain-assessment.jpg", imageAlt: "A physiotherapist carefully assessing a patient's neck movement", content: [
    "Neck pain is the second most common musculoskeletal complaint we encounter in office-based patients at CoreWell Uganda. Many patients assume it is stress, sleeping position or simply getting older, when the cause may be sitting at a poorly arranged workstation for eight hours a day, five days a week.",
    "Your head weighs approximately 5 to 6 kilograms in a neutral position. For every centimetre it moves forward as you lean toward a screen, the effective load on the cervical spine increases. At a 45-degree forward lean, the neck muscles may be managing the equivalent of 22 kilograms of load. Sustained over a working day, this causes muscle fatigue, joint irritation and eventually pain.",
    "The first warning sign is stiffness that improves after the morning but returns by late afternoon. The second is pain on one side that matches the habitual position of your monitor, phone or paperwork. The third is a headache that begins at the base of the skull and moves forward, which may be a cervicogenic headache originating from the neck.",
    "The fourth warning sign is a clear weekly pattern: symptoms worsen on working days and improve at weekends. The fifth is tingling, numbness or weakness in an arm or hand. These symptoms suggest possible nerve involvement and require prompt physiotherapy assessment rather than self-management.",
    "Neck pain dismissed as just stress can become chronic when the working environment is never addressed. Early intervention changes the pattern before it becomes more difficult to manage.",
    "A licensed physiotherapist will assess cervical movement, deep neck flexor activation, thoracic mobility and signs of nerve involvement. We also review the workstation, because treating the patient without addressing the environment that created the problem solves only half the equation. In many work-related cases without nerve involvement, significant improvement is achievable within three to six weeks of structured physiotherapy management."
  ] },
  { slug: "what-hr-managers-need-to-know-about-msk-disorders", category: "For Employers", author: "Julius Kaweesa", title: "What Every HR Manager in Uganda Needs to Know About Musculoskeletal Disorders", excerpt: "Your organisation is almost certainly carrying a musculoskeletal health burden that nobody has quantified yet. Here is what it is costing you — and what you can do about it.", date: "June 2026", time: "5 min read", image: "/images/articles/workplace-ergonomics.jpg", imageAlt: "A workplace physiotherapist reviewing a computer workstation with an employee", content: [
    "As physiotherapists who work daily with corporate employees, we want to share something most HR managers in Uganda need to know. Your organisation is almost certainly carrying a significant musculoskeletal health burden, and it is costing you across several parts of the business even when it does not appear on one line of the budget.",
    "Musculoskeletal disorders affect muscles, tendons, ligaments, nerves, discs and bones. In the workplace this commonly includes lower back pain, neck and cervical disorders, shoulder and upper-limb conditions, repetitive strain injuries and postural fatigue that reduces concentration and output. These conditions build gradually through repeated loading, inactivity and poor ergonomics, often without appearing in an HR report.",
    "The first cost is absenteeism through MSK-related sick days. The second is presenteeism: employees remain at work while pain reduces their speed, accuracy, engagement and decision quality. The third is rising healthcare claims for consultations, imaging, medication and rehabilitation. The fourth is staff turnover when chronic pain contributes to disengagement and departure.",
    "The question is not only whether an organisation can afford a clinical workplace wellness programme, but how much the absence of one is already costing.",
    "General fitness programmes are well intentioned, but workplace musculoskeletal disorders are a clinical issue with business consequences. A clinical programme led by licensed physiotherapists can identify at-risk employees, target specific movement and muscle factors, manage existing problems and produce outcome information that HR teams can use.",
    "CoreWell Corporate delivers clinically supervised workplace wellness programmes designed for Uganda's office-based workforce. We begin with musculoskeletal screening to build a clinical picture of the workforce, then use that information to guide a programme designed around the organisation's risk profile.",
    "Contact CoreWell Uganda to arrange a conversation about your workforce. Understanding the current burden is the first step toward protecting employee health, improving participation and creating a more sustainable workplace."
  ] },
  { slug: "why-golf-causes-back-pain", category: "Golf & Sport", author: "Kajwiga Emmanuel", title: "Why Golf Causes Back Pain — And How to Fix It", excerpt: "Lower back pain is the most common injury in golf at every level. It is not an inevitable part of the game — and the real cause is often found beyond the back itself.", date: "June 2026", time: "4 min read", image: "/images/articles/sports-injury-recovery.jpg", imageAlt: "An athlete completing a controlled rehabilitation exercise with a physiotherapist", content: [
    "Lower back pain is the most common injury in golf at every level, from recreational players to elite competitors. It should not be accepted as an inevitable part of the game, because the factors that create it can often be identified and changed.",
    "The modern golf swing is a complex athletic movement. It asks the spine to rotate, side-bend and transfer force at speed while the lower body remains controlled. This combination creates significant rotational and compressive forces through the lumbar spine, especially when it is repeated over a full round or several practice sessions.",
    "Limited hip mobility can force the lower back to create rotation that should come from the hips. Weak gluteal and core muscles reduce the body's ability to control force through the swing. Repeated rotation and side-bending around impact can then overload spinal joints, discs and muscles.",
    "In golf, back pain is almost never just a back problem. It is usually a movement problem — and the back is simply the structure that pays the price.",
    "Common golf-related conditions include facet joint irritation, disc strain or bulge, muscle strain and, in some athletes, stress injuries such as spondylolysis. The diagnosis matters because each condition requires a different balance of protection, movement and progressive loading.",
    "Golf physiotherapy goes beyond treating the painful area. A proper assessment considers the player's swing pattern, hip and upper-back mobility, strength, balance and the point at which symptoms appear. This helps identify why the back is being overloaded rather than only calming the pain temporarily.",
    "Treatment may combine manual therapy, targeted strengthening, hip mobility work and a gradual return to swinging. Most golfers without significant disc or nerve pathology can return to play within four to eight weeks when rehabilitation is structured around both the injury and the demands of the game."
  ] },
  { slug: "physiotherapist-vs-fitness-instructor", category: "General Health", author: "Julius Kaweesa", title: "Physiotherapist vs Fitness Instructor: What Is the Difference?", excerpt: "Both professionals can help people move, but their education, clinical responsibilities and scope of practice are very different. Here is what patients and employers need to know.", date: "June 2026", time: "3 min read", image: "/images/articles/physiotherapy-consultation.jpg", imageAlt: "A physiotherapist discussing a treatment plan with a patient during a consultation", content: [
    "Physiotherapists and fitness instructors both help people become more active, but they are not interchangeable. The distinction matters most when pain, injury, disability or a medical condition is involved.",
    "A physiotherapist completes university-level clinical education in anatomy, physiology, pathology, diagnosis and rehabilitation. In Uganda, physiotherapists are regulated by the Allied Health Professionals Council and are accountable for the safety and quality of the clinical care they provide.",
    "A physiotherapist can assess and diagnose movement-related problems, identify when symptoms may require medical referral, treat injuries and pain, prescribe rehabilitation for medical and surgical conditions, and measure clinical outcomes over time. Their decisions are guided by a patient's health history as well as physical findings.",
    "A fitness instructor is trained to guide exercise and improve general fitness in healthy populations. That is a valuable role, but the training does not usually include clinical diagnosis or the management of complex pain, injury, neurological conditions or post-surgical rehabilitation.",
    "An exercise that is appropriate for a healthy employee may be unsafe for someone with an undiagnosed disc herniation, nerve involvement or another clinical condition. This is why good intentions alone are not enough when a programme is expected to manage musculoskeletal health.",
    "For employers, the distinction affects screening, risk management and programme outcomes. A workplace with employees already experiencing pain needs clinical oversight, not only general exercise. Licensed physiotherapists can identify risk, modify activity safely and refer when necessary.",
    "Every CoreWell programme is led and delivered by licensed physiotherapists. We do not subcontract clinical work to fitness instructors or general wellness providers, because clinical authority is central to the safety and results of our care."
  ] },
  { slug: "back-pain-when-to-rest-move-or-see-a-physiotherapist", category: "Back & Spine", author: "Julius Kaweesa", title: "Back Pain: When to Rest, When to Move, and When to See a Physiotherapist", excerpt: "The old advice was to stay in bed until back pain settled. We now know that movement is often the best medicine — but there are important exceptions.", date: "June 2026", time: "4 min read", image: "/images/articles/return-to-sport.jpg", imageAlt: "A patient completing a progressive rehabilitation exercise under physiotherapy guidance", content: [
    "The traditional advice for back pain was to rest in bed until it settled. We now know that prolonged rest can increase stiffness, weakness and fear of movement. In many cases, comfortable movement is part of the treatment — but there are important exceptions.",
    "Approximately 85 to 90 percent of back pain is non-specific, meaning it cannot be attributed to one serious structural disease. This type of pain commonly responds well to education, gradual activity and rehabilitation that restores confidence, mobility and strength.",
    "Specific back pain may be linked to a defined structure or condition and requires an accurate diagnosis. Disc injury, nerve compression, fracture, inflammatory disease and other causes do not all behave in the same way, so the right advice depends on a clinical assessment.",
    "Seek urgent medical attention if back pain follows major trauma or is accompanied by loss of bladder or bowel control, numbness around the groin or saddle area, rapidly worsening weakness, fever, unexplained weight loss, a history of cancer or severe unrelenting night pain. These are warning signs that should not be managed with exercise alone.",
    "Pain does not always mean damage, and movement does not always mean danger. The important question is whether the movement is appropriate for the condition and introduced at the right dose.",
    "See a physiotherapist when pain has lasted more than two weeks without improvement, keeps returning, limits work or sleep, travels into a leg, or is accompanied by tingling, numbness or weakness. Assessment can identify relevant movement, strength and nerve findings and help rule out reasons for medical referral.",
    "For mild pain present for less than two weeks with no warning signs, keep moving within a comfortable range. Short walks, gentle mobility, swimming, heat and simple pain relief may help. Avoid long periods in bed, and seek assessment if symptoms are not steadily improving.",
    "CoreWell Uganda begins with a clear clinical assessment and explanation. The goal is to understand what is driving the pain, establish what is safe and build a practical path back to normal movement, work and activity."
  ] },
];

function Brand() { return <Link className="brand" href="/" aria-label="CoreWell Uganda home"><img className="brand-logo" src="/images/corewell-logo.png" alt="" /><span><b>Core<em>Well</em><span className="mobile-brand-suffix"> MSK Uganda</span></b><small>Musculoskeletal Health · Wellness · Performance</small></span></Link>; }

function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><a href="tel:+256761393569">+256 761 393 569</a><i /> <a href="mailto:info@corewellmusculoskeletaluganda.com">info@corewellmusculoskeletaluganda.com</a></span></div></div>
    <header className="header"><div className="container navrow"><Brand/><button className="menubtn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/><span/></button><nav className={open ? "nav open" : "nav"}>{nav.map(([label, href]) => <Link className="desktop-menu-item" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}{mobileNav.map(([label, href]) => <Link className="mobile-menu-item" key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="btn btn-small desktop-menu-item" href="/appointment" onClick={() => setOpen(false)}>Book Appointment</Link><Link className="btn btn-small mobile-menu-item mobile-contact" href="/contact" onClick={() => setOpen(false)}>Contact Us</Link></nav></div></header>
    <nav className="mobile-dock" aria-label="Mobile quick navigation">
      <Link href="/"><Home aria-hidden="true"/><span>Home</span></Link>
      <Link href="/services"><Stethoscope aria-hidden="true"/><span>Services</span></Link>
      <Link className="dock-book" href="/appointment"><CalendarPlus aria-hidden="true"/><span>Book</span></Link>
      <Link href="/articles"><Newspaper aria-hidden="true"/><span>Articles</span></Link>
      <Link href="/contact"><MapPin aria-hidden="true"/><span>Contact</span></Link>
    </nav>
  </>;
}

function Footer() { return <footer><div className="container footergrid"><div><Brand/><p>Uganda&apos;s specialist centre for musculoskeletal health, workplace wellness and physical performance. Built for Uganda.</p></div><div><h4>Our Services</h4><Link href="/divisions">CoreWell Corporate</Link><Link href="/divisions">Spine Specialist Clinic</Link><Link href="/divisions">CoreWell Performance</Link></div><div><h4>Company</h4><Link href="/about">About CoreWell</Link><Link href="/team">Our Team</Link><Link href="/#why-corewell">Why CoreWell</Link><Link href="/contact">Contact Us</Link></div><div><h4>Contact</h4><a href="tel:+256761393569">+256 761 393 569</a><a href="mailto:info@corewellmusculoskeletaluganda.com">info@corewellmusculoskeletaluganda.com</a></div></div><div className="container footnote"><span>© 2026 CoreWell Uganda Limited · Registered in Uganda · URSB</span><span><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></span></div></footer>; }

function SectionHead({ eyebrow, title, copy, center=false }: { eyebrow:string; title:string; copy?:string; center?:boolean }) { return <div className={center ? "sectionhead center" : "sectionhead"}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }

function HeroArticleCarousel() {
  const featuredArticles = articles.slice(0, 6);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior });
    setActive(index);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActive(current => {
        const next = (current + 1) % featuredArticles.length;
        const track = trackRef.current;
        if (track) track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
        return next;
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [featuredArticles.length]);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return <div className="hero-article-carousel" aria-label="Featured articles">
    <div className="hero-carousel-track" ref={trackRef} onScroll={updateActiveSlide}>
      {featuredArticles.map(article => <Link className="hero-article-slide" href={`/articles/${article.slug}`} key={article.slug}>
        <img src={article.image} alt={article.imageAlt}/>
        <span className="hero-article-category">{article.category}</span>
        <span className="hero-article-copy"><b>{article.title}</b><small>Read article <span aria-hidden="true">→</span></small></span>
      </Link>)}
    </div>
    <div className="hero-carousel-dots" aria-label="Choose an article">
      {featuredArticles.map((article, index) => <button className={active === index ? "active" : ""} type="button" key={article.slug} onClick={() => goTo(index)} aria-label={`Show article ${index + 1}: ${article.title}`} aria-current={active === index ? "true" : undefined}/>) }
    </div>
  </div>;
}

function CoreValuesCarousel() {
  const values = [
    { title: "Our vision", body: "A Uganda that moves without pain.", className: "valuecard-vision" },
    { title: "Our Mission", body: "We are physiotherapists who identified a musculoskeletal health crisis in Uganda's workplaces, sports fields, and communities, and built a company to solve it. We prevent, treat, and rehabilitate with clinical excellence, one patient and one organisation at a time.", className: "valuecard-mission" },
    { title: "Our Approach", body: "Clinical excellence first. Business outcomes follow. Every CoreWell programme is evidence-based, outcomes-measured, and delivered by licensed health professionals, not fitness instructors, not wellness generalists.", className: "valuecard-approach" },
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
    setActive(index);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive(current => {
        const next = (current + 1) % values.length;
        const track = trackRef.current;
        if (track) track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
        return next;
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [values.length]);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return <div className="value-carousel" aria-label="CoreWell vision, mission and approach">
    <div className="valuegrid value-carousel-track" ref={trackRef} onScroll={updateActiveSlide}>
      {values.map(value => <div className={`valuecard ${value.className}`} key={value.title}><b>{value.title}</b><span>{value.body}</span></div>)}
    </div>
    <div className="value-carousel-dots" aria-label="Choose a CoreWell statement">
      {values.map((value, index) => <button className={active === index ? "active" : ""} type="button" key={value.title} onClick={() => goTo(index)} aria-label={`Show ${value.title}`} aria-current={active === index ? "true" : undefined}/>) }
    </div>
  </div>;
}

function Hero() {
  return <section className="hero"><div className="container hero-grid">
    <div>
      <h1 className="hero-title-desktop">A Uganda that<br/><em>moves without pain.</em></h1>
      <p className="lead">As physiotherapists working in clinical practice every day, we saw the same preventable problems affecting office &amp; manual workers, athletes and people living with chronic pain. CoreWell Uganda was built to solve the problem we saw with our own hands.</p>
      <div className="actions"><Link className="btn" href="/appointment">Book a free Workforce Assessment</Link><Link className="btn btn-ghost" href="/services">Explore Our Services</Link></div>
      <div className="trust"><p className="trust-heading">Why it matters</p><div className="trust-stat"><p><b>80%</b> <small>of office workers experience MSK pain</small></p></div><div className="trust-stat"><p><b>#1</b> <small>leading cause of workplace absence globally</small></p></div><div className="trust-stat"><p><b>34%</b> <small>productivity loss from unmanaged MSK pain</small></p></div></div>
    </div>
    <div className="hero-visual">
      <div className="imageframe"><img src="/images/hero-physio.png" alt="Physiotherapist guiding a patient through a shoulder mobility exercise"/></div>
      <HeroArticleCarousel/>
      <div className="floatcard"><b className="floatcard-title">A Uganda that moves without pain.</b><h1 className="hero-title-mobile">A Uganda that<br/><em>moves without pain.</em></h1><span>Founded by clinicians. Built for Uganda.</span></div>
    </div>
  </div></section>;
}

function DivisionFeatures({ items }: { items: Array<[LucideIcon, string, string]> }) {
  return <div className="division-features">{items.map(([Icon,title,copy]) => <article className="division-feature" key={title}><span><Icon aria-hidden="true" size={28} strokeWidth={1.65}/></span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>;
}

function SpecialistServices() {
  return <div className="specialist-services">
    <section className="specialist-division corporate-division"><div className="container specialist-inner">
      <span className="division-number">Specialist division 01</span>
      <h2>CoreWell Corporate</h2>
      <p className="division-promise">Protect your workforce, protect your bottom line.</p>
      <div className="division-copy"><p>Uganda&apos;s growing sedentary workforce is developing musculoskeletal conditions, back pain, neck pain, and postural disorders that are costing organisations in absenteeism, reduced productivity, and rising healthcare claims. CoreWell Corporate delivers clinically supervised workplace wellness programmes that address this burden at its root.</p><p>We are not a fitness provider. We are licensed physiotherapists who design and deliver evidence-based clinical programmes inside your workplace with baseline screening, weekly supervised sessions, home exercise programmes, and monthly outcome reporting to your HR team.</p></div>
      <Link className="division-cta division-cta-blue" href="/contact#contact-form">Request Free Workplace Assessment</Link>
      <DivisionFeatures items={corporateFeatures}/>
    </div></section>

    <section className="specialist-division spine-division"><div className="container specialist-inner">
      <span className="division-number">Specialist division 02</span>
      <h2>CoreWell Spine Specialist Clinic</h2>
      <p className="division-promise">Uganda&apos;s home for specialist spine care.</p>
      <div className="division-copy"><p>Uganda currently has no private specialist spine rehabilitation facility. CoreWell Spine Specialist Clinic is being developed to fill this gap, providing protocol-driven, evidence-based rehabilitation for patients with complex spinal conditions at a level of specialist care previously unavailable in the private sector in Uganda.</p><p>Our clinical approach is built on years of managing complex spinal cases in practice.</p></div>
      <Link className="division-cta division-cta-green" href="/contact#contact-form">Book A Consultation</Link>
      <DivisionFeatures items={spineFeatures}/>
      <aside className="development-status"><b>Development Status</b><p>The CoreWell Spine Specialist Clinic is currently in development, with opening planned on the Kampala–Gayaza highway in 2028. Clinical consultations with the founding physiotherapy team are available now. Contact us to discuss your clinical needs.</p></aside>
    </div></section>

    <section className="specialist-division performance-division"><div className="container specialist-inner">
      <span className="division-number">Specialist division 03</span>
      <h2>CoreWell Performance</h2>
      <p className="division-promise">Play better. Move better. Last longer.</p>
      <div className="division-copy"><p>Golf is a physical sport with a well-documented and highly specific injury profile. The rotational demands of the swing, combined with the repetitive nature of practice and play, place considerable stress on the spine, hips, shoulders, and upper limbs. Yet the vast majority of Uganda&apos;s golf community currently has no access to physiotherapy designed specifically around their sport.</p><p>CoreWell Performance is Uganda&apos;s dedicated golf physiotherapy service. Our clinical team has worked with members of Uganda&apos;s golf community at the highest levels of the sport, and we bring that experience to every player we work with, from competitive to recreational.</p></div>
      <a className="division-cta division-cta-orange" href="https://wa.me/256761393569?text=Hello%20CoreWell%20Uganda%2C%20I%20would%20like%20to%20book%20a%20Golf%20Physio%20Session." target="_blank" rel="noreferrer">Book a Golf Physio Session</a>
      <DivisionFeatures items={performanceFeatures}/>
    </div></section>
  </div>;
}

function DivisionGrid({ detailed=false }: { detailed?:boolean }) { return <div className="divisiongrid">{divisions.map(([tag,title,desc,items]) => <article className="divisioncard" key={title as string}><span className="divisiontag">{tag as string}</span><h3>{title as string}</h3><p>{desc as string}</p>{detailed && <ul>{(items as string[]).map(i => <li key={i}>{i}</li>)}</ul>}<Link className="textlink" href={detailed ? "/appointment" : "/divisions"}>{detailed ? "Book an appointment" : "Learn more"} <span>→</span></Link></article>)}</div>; }

function WhyCoreWellSection() {
  return <section className="section why-corewell-expanded" id="why-corewell"><div className="container">
    <SectionHead center eyebrow="Why CoreWell" title="There is no substitute for clinical authority." copy="Any company can offer wellness programmes. Only licensed healthcare professionals can offer what CoreWell delivers. Here is what that difference means in practice."/>
    <div className="why-difference-grid">{whyCoreWellPoints.map(([Icon,title,copy]) => <article className="why-difference-card" key={title}><span className="why-difference-icon"><Icon aria-hidden="true" size={29} strokeWidth={1.65}/></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <div className="programme-comparison">
      <article className="comparison-panel comparison-general"><h3>A fitness or wellness programme...</h3><ul>{generalWellnessComparison.map(item => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}</ul></article>
      <article className="comparison-panel comparison-corewell"><h3>A CoreWell clinical programme...</h3><ul>{corewellClinicalComparison.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></article>
    </div>
    <Link className="btn why-more" href="/about">Find out more why you should choose us</Link>
  </div></section>;
}

function TeamCards() { const team = [
  { image: "/images/team/julius.jpeg", name: "Julius Kaweesa", role: "Clinical lead and Co-founder CoreWell Uganda" },
  { image: "/images/team/emma.jpeg", name: "Emmanuel Kajwiga", role: "Clinician and Cofounder, CoreWell Uganda" },
]; return <div className="teamgrid team-profile-grid">{team.map(({image,name,role}) => <article className="team-profile-card" key={name}><div className="team-profile-photo"><img src={image} alt={`${name}, ${role}`}/></div><div className="team-profile-copy"><h3>{name}</h3><p>{role}</p></div></article>)}</div>; }

function ArticleCards({ limit=6 }: {limit?:number}) { return <div className="articlegrid">{articles.slice(0,limit).map(a => <article className="articlecard" key={a.slug}><div className="articlevisual"><img src={a.image} alt={a.imageAlt}/><span>{a.category}</span></div><div className="articlebody"><span className="articlemeta">{a.date} · {a.time}</span><h3>{a.title}</h3><p>{a.excerpt}</p><Link className="textlink" href={`/articles/${a.slug}`}>Read article <span>→</span></Link></div></article>)}</div>; }

function ContactForm({ appointment=false }: {appointment?:boolean}) {
  const [sent,setSent] = useState(false);
  const [sending,setSending] = useState(false);
  const [error,setError] = useState("");
  const formName = appointment ? "appointment-request" : "contact-message";

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setError("");
    const body = new URLSearchParams();
    new FormData(form).forEach((value,key)=>body.append(key,String(value)));
    try {
      const response = await fetch("/__forms.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()});
      if(!response.ok) throw new Error("Submission failed");
      form.reset();
      setSent(true);
    } catch {
      setError("We could not send your request. Please try again or call +256 761 393 569.");
    } finally {
      setSending(false);
    }
  }

  return <form className="form" id="contact-form" name={formName} method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
    <input type="hidden" name="form-name" value={formName}/><label hidden>Do not fill this field<input name="bot-field"/></label>
    {sent ? <div className="success"><b>Thank you.</b><p>Your request has been sent successfully to CoreWell Uganda. Our team will contact you using the details you provided.</p><button className="btn" type="button" onClick={()=>setSent(false)}>Send another request</button></div> : <>
      {appointment ? <><label>Full name<input required name="name" autoComplete="name"/></label><div className="formrow"><label>Phone number<input required type="tel" name="phone" autoComplete="tel"/></label><label>Email<input required type="email" name="email" autoComplete="email"/></label></div><div className="formrow"><label>Preferred service<select required name="service" defaultValue=""><option value="">Choose a service</option>{services.map(s=><option key={s[1]}>{s[1]}</option>)}</select></label><label>Patient type<select required name="patient-type" defaultValue="Individual"><option>Individual</option><option>Corporate</option><option>Athlete</option></select></label></div><div className="formrow"><label>Preferred date<input required type="date" name="preferred-date"/></label><label>Preferred time<input required type="time" name="preferred-time"/></label></div><label>Brief description of the problem<textarea required name="message" rows={5}/></label><label className="consent"><input required type="checkbox" name="consent" value="yes"/> I consent to CoreWell Uganda contacting me about this appointment request.</label></> : <><div className="formrow"><label>Full name<input required name="name" autoComplete="name"/></label><label>Phone number<input required type="tel" name="phone" autoComplete="tel"/></label></div><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>I am Enquiring About<select required name="service" defaultValue=""><option value="">Select an option</option>{enquiryOptions.map(option=><option key={option}>{option}</option>)}</select></label><label>Message<textarea required name="message" rows={4}/></label></>}
      {error && <p role="alert">{error}</p>}<button className="btn" type="submit" disabled={sending}>{sending ? "Sending..." : appointment ? "Request Appointment" : "Send Message"}</button>
    </>}
  </form>;
}

function PageHero({ eyebrow, title, copy }: {eyebrow:string;title:string;copy:string}) { return <section className="pagehero"><div className="container narrow"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>; }

function HomePage(){
  return <>
    <Hero/>
    <section className="section aboutpreview">
      <div className="container narrow">
        <div className="sectionhead">
          <span className="eyebrow">Who We Are</span>
          <h2>Founded by clinicians. Built for Uganda.</h2>
          <p>CoreWell Uganda Limited is not a wellness company that decided to enter healthcare. We are a healthcare team who identified a crisis in Uganda&apos;s workplaces, sports fields, and communities and built a company to solve it.</p>
          <p>Every day in our clinics, we were seeing the same pattern: office-based workers presenting with preventable musculoskeletal conditions, back pain, neck pain, shoulder problems directly linked to sedentary work habits and poor ergonomics.</p>
          <p>These were not random injuries. They were predictable, pattern-based, and entirely preventable. Yet the patients sitting in front of us had been living with the pain for months, sometimes years, with no structured clinical support from their employers.</p>
          <blockquote className="story-highlight">“We did not create this problem. We found it in our clinics, in our data, in the stories our patients told us about their workdays. CoreWell aims to <strong>PREVENT</strong> pain before it begins.”</blockquote>
          <p className="story-followup">We are a formally registered private limited company that offers structured clinical programs to address these musculoskeletal issues at workstation sites.</p>
        </div>
        <CoreValuesCarousel/>
        <Link className="btn btn-ghost" href="/about">Learn More About CoreWell</Link>
      </div>
    </section>
    <section className="section pale"><div className="container"><SectionHead eyebrow="Our specialist divisions" title="Three divisions. One clinical standard."/><DivisionGrid/></div></section>
    <WhyCoreWellSection/>
    <ContactSection/>
  </>;
}

function ContactSection(){ return <section className="section contactsection"><div className="container contactgrid"><div className="contactintro"><SectionHead eyebrow="Get in touch" title="Ready to protect your workforce, your patients, your game?" copy="Whether you are an HR manager, a patient or an athlete, CoreWell Uganda has a service designed for you. Reach out and let us start the conversation."/><div className="contactlist"><p><b>Phone</b><a href="tel:+256761393569">+256 761 393 569</a><a href="tel:+256784106753">+256 784 106 753</a></p><p><b>Email</b><a href="mailto:info@corewellmusculoskeletaluganda.com">info@corewellmusculoskeletaluganda.com</a></p></div><a className="whatsapp-btn" href="https://wa.me/256761393569" target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true"/>Chat On WhatsApp</a><aside className="corporate-enquiry"><b>Corporate Enquiries</b><p>Interested in a free workforce MSK assessment? Contact us directly and we will arrange a no-commitment conversation with your HR team within 48 hours.</p></aside></div><ContactForm/></div></section>; }

function AboutPage(){return <><PageHero eyebrow="About CoreWell Uganda" title="Founded by clinicians. Built for Uganda." copy="We are physiotherapists who identified a musculoskeletal health crisis in Uganda's workplaces, sports fields and communities — and built a company to solve it."/><section className="section"><div className="container twocol"><div><SectionHead eyebrow="Our story" title="The problem came through our clinic doors" copy="CoreWell Uganda Limited was co-founded by Julius Kaweesa and Kajwiga Emmanuel, two licensed physiotherapists operating under the Allied Health Professionals Council Uganda."/><p>In clinical practice, we repeatedly saw office workers living with preventable back pain, neck pain and postural problems linked to sedentary habits and poorly designed work environments. We saw athletes whose rehabilitation did not reflect the demands of their sport, and patients with complex spinal conditions who needed specialist, protocol-driven care.</p><p>CoreWell Uganda was built as a clinical response to what we observed first-hand. We prevent, treat and rehabilitate with clinical excellence, one patient and one organisation at a time.</p></div><div className="principles"><article><span>01</span><h3>Vision</h3><p>A Uganda that moves without pain.</p></article><article><span>02</span><h3>Mission</h3><p>We are physiotherapists who identified a musculoskeletal health crisis in Uganda&apos;s workplaces, sports fields and communities — and built a company to solve it. We prevent, treat and rehabilitate with clinical excellence, one patient and one organisation at a time.</p></article><article><span>03</span><h3>Our approach</h3><p>Clinical excellence first. Business outcomes follow. Every CoreWell programme is evidence-based, outcomes-measured and delivered by licensed physiotherapists — not fitness instructors, not wellness generalists.</p></article></div></div></section><section className="section pale"><div className="container"><SectionHead center eyebrow="How we work" title="There is no substitute for clinical authority."/><div className="infogrid"><article><span>01</span><h3>Clinical Leadership</h3><p>Licensed physiotherapists lead assessment, programme design and delivery.</p></article><article><span>02</span><h3>Evidence-Based Protocols</h3><p>Every intervention is grounded in clinical evidence and adapted to real needs.</p></article><article><span>03</span><h3>Measurable Outcomes</h3><p>Progress is recorded and reviewed so care remains accountable and effective.</p></article></div></div></section></>}

function ServicesPage(){return <><PageHero eyebrow="Our services" title="Our specialist divisions" copy="Three focused clinical services, each built around the real needs of Uganda's workforces, spine patients, and golf community."/><SpecialistServices/></>}
function DivisionsPage(){return <><PageHero eyebrow="CoreWell divisions" title="Three divisions. One clinical standard." copy="CoreWell Corporate protects workforces, CoreWell Spine provides specialist spinal care, and CoreWell Performance helps athletes move and perform at their best."/><section className="section"><div className="container"><DivisionGrid detailed/></div></section><CTA/></>}
function TeamPage(){return <><section className="pagehero team-pagehero"><div className="container"><span className="eyebrow">Our team</span><div className="team-advisory-intro"><p>CoreWell Uganda is building a Clinical Advisory and Implementation Panel of medical officers and orthopaedic and spine specialists who support our clinical team. This multidisciplinary model ensures that CoreWell&apos;s programmes benefit from the full spectrum of musculoskeletal clinical expertise: physiotherapy, medicine, and orthopaedics, working together in the interest of our clients and patients. Panel appointments will be announced shortly.</p></div></div></section><section className="section team-profiles-section"><div className="container"><TeamCards/></div></section></>}
function PatientPage(){const steps=[["Before your visit","Bring relevant medical reports, imaging, referral notes and a list of current medicines if available."],["Suitable clothing","Wear comfortable clothing that allows the area being assessed to move freely."],["Assessment","Your physiotherapist will discuss your symptoms and goals, then assess movement, strength and function."],["Treatment planning","Findings will be explained clearly and a plan will be agreed with you."],["Follow-up sessions","Progress will be reviewed and your programme adjusted according to your response and goals."]];return <><PageHero eyebrow="Patient information" title="Your first appointment, explained." copy="Simple guidance to help you arrive prepared and know what to expect."/><section className="section"><div className="container patientlayout"><div>{steps.map(([t,c],i)=><article className="step" key={t}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{t}</h3><p>{c}</p></div></article>)}</div><aside className="urgent"><h3>When to seek urgent medical attention</h3><p>Seek urgent care for severe symptoms after major trauma, sudden weakness, chest pain, difficulty breathing, loss of bladder or bowel control, or any rapidly worsening medical concern.</p><p>This website does not replace emergency medical advice.</p></aside></div></section><section className="section pale"><div className="container narrow"><SectionHead center eyebrow="Frequently asked questions" title="Before you visit"/><details><summary>Do I need a referral?</summary><p>Contact the clinic to discuss your situation and whether a referral or existing medical information would be helpful.</p></details><details><summary>How long will treatment take?</summary><p>The number and frequency of sessions depends on your assessment, goals and response to care. Your physiotherapist will discuss this with you.</p></details><details><summary>Can CoreWell support organisations and athletes?</summary><p>Yes. CoreWell Corporate supports workplaces and CoreWell Performance supports athletes and return-to-sport programmes.</p></details></div></section><CTA/></>}
function ArticlesPage(){return <><PageHero eyebrow="The CoreWell Clinic" title="Clinical insight for work, health and performance." copy="Practical, evidence-informed guidance written by CoreWell Uganda's licensed physiotherapists."/><section className="section"><div className="container"><ArticleCards/></div></section></>}
function ContactPage(){return <><PageHero eyebrow="Contact CoreWell" title="Ready to start the conversation?" copy="Whether you are an HR manager, a patient or an athlete, our clinical team is ready to listen."/><ContactSection/></>}
function AppointmentPage(){return <><PageHero eyebrow="Request an assessment" title="Tell us how we can help." copy="Send an appointment request and the CoreWell team will contact you to confirm availability."/><section className="section"><div className="container appointmentgrid"><div><SectionHead eyebrow="Your visit" title="Personal care starts with a clear conversation." copy="Complete the form with your preferred time and service. This request does not confirm an appointment until our team contacts you."/><div className="contactpanel"><b>Prefer to call?</b><a href="tel:+256761393569">+256 761 393 569</a><a href="tel:+256784106753">+256 784 106 753</a></div></div><ContactForm appointment/></div></section></>}
function CTA(){return <section className="cta"><div className="container"><div><span className="eyebrow light">Ready to start the conversation?</span><h2>Protect your workforce, your patients, your game.</h2></div><Link className="btn btn-white" href="/appointment">Request an Assessment</Link></div></section>}

export function SitePage({page}:{page:PageName}) { let content; switch(page){case "home":content=<HomePage/>;break;case "about":content=<AboutPage/>;break;case "services":content=<ServicesPage/>;break;case "divisions":content=<DivisionsPage/>;break;case "team":content=<TeamPage/>;break;case "patient":content=<PatientPage/>;break;case "articles":content=<ArticlesPage/>;break;case "contact":content=<ContactPage/>;break;case "appointment":content=<AppointmentPage/>;break;default:content=<><PageHero eyebrow="404" title="This page could not be found." copy="The page may have moved, or the address may be incorrect."/><div className="section center"><Link className="btn" href="/">Return Home</Link></div></>;} return <><Header/><main>{content}</main><Footer/></>; }

export function ArticlePage({slug}:{slug:string}) { const a=articles.find(x=>x.slug===slug); if(!a)return <SitePage page="notfound"/>; const related=articles.filter(x=>x.slug!==slug).slice(0,3); return <><Header/><main><article className="articlepage"><div className="container articlecopy"><Link className="backlink" href="/articles">← Back to Articles</Link><span className="eyebrow">{a.category}</span><h1>{a.title}</h1><p className="articledek">{a.excerpt}</p><div className="articlemeta">By {a.author}, Licensed Physiotherapist · CoreWell Uganda · {a.date} · {a.time}</div><div className="articlelead"><img src={a.image} alt={a.imageAlt}/><span>{a.category}</span></div>{a.content.map((p,i)=><p key={i}>{p}</p>)}<div className="articlecallout"><b>Need a personal assessment?</b><p>Article information is general and cannot replace an individual clinical assessment.</p><Link className="btn" href="/appointment">Book an Appointment</Link></div></div></article><section className="section pale"><div className="container"><SectionHead eyebrow="Keep reading" title="Related articles"/><div className="articlegrid">{related.map(r=><article className="articlecard" key={r.slug}><div className="articlevisual"><img src={r.image} alt={r.imageAlt}/><span>{r.category}</span></div><div className="articlebody"><h3>{r.title}</h3><p>{r.excerpt}</p><Link className="textlink" href={`/articles/${r.slug}`}>Read article <span>→</span></Link></div></article>)}</div></div></section></main><Footer/></>; }
