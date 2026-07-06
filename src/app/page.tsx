import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Navbar } from "@/components/Navbar";
import { getAllProjects } from "@/lib/content";
import { SkillDomain } from "@/types";
import skillsData from "../../content/skills.json";
import siteConfig from "../../content/site.json";
import socials from "../../content/socials.json";

export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="relative min-h-screen">
      <Navbar socials={socials} siteConfig={siteConfig} />

      <HeroSection siteConfig={siteConfig} />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skillsData as unknown as { domains: SkillDomain[] }} />
      <ExperienceSection />
      <EducationSection siteConfig={siteConfig} />
      {/* <BlogSection /> */}
      <ContactSection socials={socials} siteConfig={siteConfig} />
      <Footer />

      {/* Floating AI Chat */}
      <ChatPanel />
    </main>
  );
}
