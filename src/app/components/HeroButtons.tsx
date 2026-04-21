"use client";

export default function HeroButtons() {
  const scrollToSection = (elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex gap-4 mt-6 md:mt-8">
      <button
        className="bg-transparent text-white border border-white/50 cursor-pointer hover:bg-white/10 hover:scale-105 active:scale-95 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
        onClick={() => {
          const link = document.createElement('a');
          link.href = '/data/SabirResume.pdf';
          link.download = 'Sabir_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      >
        Resume
      </button>
      <button
        className="bg-white text-black cursor-pointer hover:bg-white/70 hover:scale-105 active:scale-95 transition-all py-2 px-4 md:px-6 rounded-full font-medium shadow-lg"
        onClick={() => scrollToSection('connect-section')}
      >
        Get in touch
      </button>
    </div>
  );
}
