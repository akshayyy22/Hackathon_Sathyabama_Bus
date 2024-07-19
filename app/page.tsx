import Image from "next/image";
import { TypewriterEffectSmoothDemo } from "../components/previews/typewriterpreview";
import { NavbarDemo } from "../components/previews/navbarpreview";
import {StickyScrollRevealDemo} from "../components/previews/featurepreview"
import FooterPreview from "@/components/previews/footerpreview";
export default function Home() {
  return (
    <main>
      <NavbarDemo />
      <TypewriterEffectSmoothDemo />
     <StickyScrollRevealDemo/>
     <FooterPreview/>
    </main>
  );
}
