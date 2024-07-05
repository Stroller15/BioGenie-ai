import Link from "next/link"
import AnimatedGradientText from '../components/magicui/animated-gradient-text';
import { ChevronRight, Sparkles } from "lucide-react";
import InputBox from "@/components/shared/InputBox";
import OutputBox from "@/components/shared/OutputBox";
import { BioContextProvider } from "@/context/BioContext";

export default function Home() {
  return (
    <main className="relative grid grid-cols-2 gap-12 p-24">
      <div className="col-span-full group w-full flex flex-col items-center justify-center text-center space-y-4 mb-4">
      <Link href="https://github.com/Stroller15/twtbio-ai" target="_blank" className="mb-4">
        <AnimatedGradientText className="px-6 py-2 rounded-full">
        <Sparkles className="w-6 h-6 fill-yellow-300 text-yellow-400" />
        <hr className="mx-2 h-4 w-[1px] bg-gray-300"/>
        BioGenie - Star on Github
          <ChevronRight className="ml-1 size-4 transiton-tranform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </Link>
      <h1 className="font-extrabold text-7xl text-center w-full lg:w-[90%] mx-auto mt-4">Instantly create the perfect Linkedin bio with AI</h1>
      <p className="text-lg text-red-400">Answer a few questions and BioGenie creates a bio that truly represents you</p>
      </div>
      
      <BioContextProvider>
      <InputBox />
      <OutputBox />
      </BioContextProvider>
    </main>
  );
}
