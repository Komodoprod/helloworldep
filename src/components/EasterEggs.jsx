import React from 'react';

// Firefly animation component for Seleste/Séleste trigger
const FireflyAnimation = () => (
  <div className="absolute inset-0 pointer-events-none z-50">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-yellow-300 animate-firefly opacity-0"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `firefly 3s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

// Skull ASCII art for Vladimir Cauchemar
const skullAscii = `
    ▒▒▒▒▒▒▒▒
   ▒▒▒▒▒▒▒▒▒▒
  ▒▒▒▒▒▒▒▒▒▒▒▒
 ▒▒▒▒░░░░░░▒▒▒▒
 ▒▒░░░░░░░░░░▒▒
▒▒░░████░░████░░▒▒
▒▒░░████░░████░░▒▒
▒▒░░░░░░░░░░░░▒▒
▒▒░░░░████░░░░▒▒
 ▒▒░░░░░░░░░░▒▒
  ▒▒▒░░░░░░▒▒▒
    ▒▒▒▒▒▒▒▒
    (yes, this is supposed to be a skull... best i could do.)
`;

// Easter egg definitions
export const easterEggs = {
  iman: {
    en: "This is an iman beats production.",
    fr: "C'est une prod d'iman beats."
  },
  seleste: {
    en: <FireflyAnimation />,
    fr: <FireflyAnimation />,
    isComponent: true,
    duration: 3000
  },
  séleste: {
    en: <FireflyAnimation />,
    fr: <FireflyAnimation />,
    isComponent: true,
    duration: 3000
  },
  aristote: {
    en: "Unable to corrupt me, they murdered me.",
    fr: "N'ayant pu me corrompre, ils m'ont assassinés."
  },
  hermenegilde: {
    en: "Unable to corrupt me, they murdered me.",
    fr: "N'ayant pu me corrompre, ils m'ont assassinés."
  },
  herménégilde: {
    en: "Unable to corrupt me, they murdered me.",
    fr: "N'ayant pu me corrompre, ils m'ont assassinés."
  },
  outrenoir: {
    en: "Unable to corrupt me, they murdered me.",
    fr: "N'ayant pu me corrompre, ils m'ont assassinés."
  },
  asdek: {
    en: "You should've closed the door before you left...",
    fr: "Tu aurais dû fermer la porte avant de partir..."
  },
  "vladimir cauchemar": {
    en: skullAscii,
    fr: skullAscii,
    isAscii: true
  },
  habstrakt: {
    en: "I could go for some Chicken Soup right now...",
    fr: "Je mangerais bien un peu de soupe au poulet..."
  },
  paul: {
    en: "Paul is us.",
    fr: "Paul c'est nous."
  },
  low: {
    en: "J'suis dans la trap...",
    fr: "J'suis dans la trap..."
  },
  blvze: {
    en: "TXRN UP THE BASS!",
    fr: "TXRN UP THE BASS!"
  },
  isoxo: {
    en: "Don't get mad at me baby...",
    fr: "Don't get mad at me baby..."
  },
  knock2: {
    en: "Can't get enough of u...",
    fr: "Can't get enough of u..."
  },
  rémi: {
    en: "Right in the donut!",
    fr: "Et toc, dans le beignos"
  },
  remi: {
    en: "Right in the donut!",
    fr: "Et toc, dans le beignos"
  },
  sto: {
    en: "On a plein... de rêves...",
    fr: "On a plein... de rêves..."
  }
};

// CSS for the firefly animation
export const fireflyCSS = `
@keyframes firefly {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(
      ${(Math.random() * 100) - 50}px,
      ${(Math.random() * 100) - 50}px
    );
  }
}

.animate-firefly {
  animation: firefly 3s ease-in-out infinite;
}
`;

// Function to process easter egg commands
export const processEasterEgg = (command, language = 'en') => {
  const lowercaseCommand = command.toLowerCase();
  const easterEgg = easterEggs[lowercaseCommand];

  if (!easterEgg) return null;

  return {
    content: easterEgg[language],
    isComponent: easterEgg.isComponent || false,
    isAscii: easterEgg.isAscii || false,
    duration: easterEgg.duration || null
  };
};