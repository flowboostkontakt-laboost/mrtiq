import Hero from "@/components/sections/Hero";
import ValueLadder from "@/components/sections/ValueLadder";
import Tribe from "@/components/sections/Tribe";
import Manifesto from "@/components/sections/Manifesto";
import DataProof from "@/components/sections/DataProof";
import Ecosystem from "@/components/sections/Ecosystem";
import FAQTeaser from "@/components/sections/FAQTeaser";
import FinalGate from "@/components/sections/FinalGate";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueLadder />
      <Tribe />
      <Manifesto />
      <DataProof />
      <Ecosystem />
      <FAQTeaser />
      <FinalGate />
    </>
  );
}
