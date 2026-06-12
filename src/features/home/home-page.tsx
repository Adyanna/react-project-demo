import { Hero } from "./components/hero/hero";
import { Features } from "./components/features/features";
import { Start } from "./components/start/start";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features/>
      <Start />
    </>
  );
};

export default HomePage;