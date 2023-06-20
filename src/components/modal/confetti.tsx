import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

export default function Confetti() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  return (
    <div>
      <Particles
        init={particlesInit}
        options={{
          preset: "confetti",
          autoPlay: true,
          detectRetina: true,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          smooth: false,
          style: {},
          zLayers: 100,
          emitters: {
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.4,
            },
            rate: {
              delay: 0.1,
              quantity: 150,
            },
            size: {
              width: 0,
              height: 0,
            },
          },
        }}
      />
    </div>
  );
}
