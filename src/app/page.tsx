import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { WhyPermissionsMatter } from '@/components/WhyPermissionsMatter';
import { HowPermissionsWork } from '@/components/HowPermissionsWork';
import { BotExamples } from '@/components/BotExamples';
import { PermissionChecklist } from '@/components/PermissionChecklist';
import { CallToAction } from '@/components/CallToAction';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-gray-950 min-h-screen">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <WhyPermissionsMatter />
        <HowPermissionsWork />
        <BotExamples />
        <PermissionChecklist />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
