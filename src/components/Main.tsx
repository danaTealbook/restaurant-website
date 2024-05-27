import ParticlesBackground from "./ParticlesBackground";

function Main() {
  return (
    <section
      id="main"
      className="flex justify-center flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat text-white shadow-md"
      style={{ backgroundImage: "url('./images/main-background.jpg')" }}
    >
      <ParticlesBackground />
      <p className="font-bold custom-text-shadow">Welcome to</p>
      <h1 className="text-center text-6xl mb-4 font-medium animate-glow">
        Bon Appetit
      </h1>
      <div className="font-bold text-center custom-text-shadow bg-gray-800 bg-opacity-75 rounded-md">
        <p>123 York Street, Toronto</p>
        <p>We work between 8AM - 6PM</p>
      </div>
    </section>
  );
}

export default Main;
