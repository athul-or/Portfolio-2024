import Footer from "@/sections/Footer";
import Header from "@/sections/Header"
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Projects from "@/sections/Projects";
import Experiences from "@/sections/Experiences";

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Intro/>
      <Projects/>
      <Experiences/>
      <Footer/>
    </>
  );
}