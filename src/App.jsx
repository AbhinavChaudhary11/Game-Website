
import Hero from "./Components/Hero";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Features from "./Components/Features";

function App(){
  return(
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />  
      <Features />    
    </main>
  );
}
export default App




