import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = () => {};

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        number: {
          value: 80,
        },
        size: {
          value: {
            min: 0.4,
            max: 1,
          },
        },
        move: {
          enable: false,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 1,
          },
          animation: {
            enable: true,
            speed: 4,
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "star",
        },
      },
    }),
    []
  );

  if (init) {
    return (
      <Particles
        className="w-full min-h-screen absolute transform translate-z-0"
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
