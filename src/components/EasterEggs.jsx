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
  basstrick: {
    en: "Global Street Music",
    fr: "Global Street Music"
  },
  jawnsin: {
    en: "Uno, dos...",
    fr: "Uno, dos..."
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
    en: "you're not one of them, are u?",
    fr: "you're not one of them, are u?"
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
  },
  "theo azur": {
    en: "Tuto drop de my eyes stp",
    fr: "Tuto drop de my eyes stp"
  },
  cosmo: {
    en: "In case you didn't remember, our first collab was called Sonar, and it was pretty terrible. Love <3",
    fr: "Au cas ou tu t'en souviendrais pas, notre première collab s'appelle Sonar, et elle était bien à chier. Love <3"
  },
  krewella: {
    en: "You guys shaped my childhood in so many ways and I have so many core memories on your music. Wouldn't be chasing what I'm chasing without you. Thank you so much for everything!",
    fr: "You guys shaped my childhood in so many ways and I have so many core memories on your music. Wouldn't be chasing what I'm chasing without you. Thank you so much for everything!"
  },
  ghostkillertrack: {
    en: "Thanks for believing in me from the start, big boss",
    fr: "Merci d'avoir cru en moi dès le début big boss"
  },
  chopsoe: {
    en: "My system identifies Chopsoe as: The only guy who doesn't have time to work on his projects because he spends all his time making others' better.",
    fr: "Mon système identifie Chopsoe comme: Le seul homme qui n'a pas le temps de bosser ses projets parce qu'il passe son temps à rendre ceux des autres mieux."
  },
  nikitathewicked: {
    en: "We're not saying that planet earth is coming to an end... We're saying that planet earth is about to be refurbished, spaded under, and have another chance to serve as a garden for another human civilization.",
    fr: "We're not saying that planet earth is coming to an end... We're saying that planet earth is about to be refurbished, spaded under, and have another chance to serve as a garden for another human civilization."
  },
  pprod: {
    en: "A typical conversation between Alexandre and Nicolas: - Dude, we need to collab! - Absolutely! --> *Wait 6 months* --> Repeat",
    fr: "Une discussion banale entre Alexandre et Nicolas: - Mec faut qu'on se pète ! - Carrément ! --> *Attendre 6 mois* --> Refaire la boucle"
  },
  smeels: {
    en: "One jacket for two...",
    fr: "Une veste pour deux…"
  },
  mara: {
    en: "Archive related: FOULAMERDE.mp3",
    fr: "Archive reliée: FOULAMERDE.mp3"
  },
  avamind: {
    en: "Let's ask Bernie what he thinks of the EP.",
    fr: "On va demander à Bernie ce qu'il pense de l'EP."
  },
  makesense: {
    en: "Forever the first to play Loving A Liar live <3",
    fr: "À jamais les premiers à avoir joué Loving A Liar en live <3"
  },
  retrovision: {
    en: "Thank you France.",
    fr: "Merci la France."
  },
  "allo floride": {
    en: "See you soon ;)",
    fr: "On se voit bientôt ;)"
  },
  virgin: {
    en: "Can w",
    fr: "On aura quand même atteint Demi Lovato ensemble !"
  },
  "virgin records": {
    en: "We still made it to Demi Lovato together !",
    fr: "On aura quand même atteint Demi Lovato ensemble !"
  },
  apashe: {
    en: "The most polished art direction in the game.",
    fr: "La D.A. la plus soignée du game."
  },
  lemotif: {
    en: "Did you mean to type 'swaggaguru'?",
    fr: "Vous voulez dire 'swaggaguru'?"
  },
  "le motif": {
    en: "Did you mean to type 'swaggaguru'?",
    fr: "Vous voulez dire 'swaggaguru'?"
  },
  "3dyco": {
    en: "Un abruti selon un certain monsieur très important.",
    fr: "Un abruti selon un certain monsieur très important."
  },
  pxrselow: {
    en: "The real voice of Komodo",
    fr: "La vraie voix du Komodo"
  },
  camoufly: {
    en: "The favourite producer of your favourite producer",
    fr: "Le producteur préféré de ton producteur préféré"
  },
  heezylee: {
    en: "Mr. Diamond",
    fr: "Mr. Diamant"
  },
  huni: {
    en: "Wearing every day since 2022, will keep rocking it till I'm on that mainstage. Bold inspires bold.",
    fr: "Wearing every day since 2022, will keep rocking it till I'm on that mainstage. Bold inspires bold."
  },
  "mona thomas": {
    en: "Wearing every day since 2022, will keep rocking it till I'm on that mainstage. Bold inspires bold.",
    fr: "Wearing every day since 2022, will keep rocking it till I'm on that mainstage. Bold inspires bold."
  },
  kronomusik: {
    en: "NE PAS CONFONDRE LES MOUFLES ET LES GANTS (ça se voit que dés le mercredi, il se dit vivement la fin de semaine ton gun)",
    fr: "NE PAS CONFONDRE LES MOUFLES ET LES GANTS (ça se voit que dés le mercredi, il se dit vivement la fin de semaine ton gun)"
  },
  laze: {
    en: "Did you mean to type 'BASS MUSIC QUEEN'?",
    fr: "Vouliez vous taper 'BASS MUSIC QUEEN'?"
  },
  elohim: {
    en: "The whole world feels like a ticking time bomb...",
    fr: "The whole world feels like a ticking time bomb..."
  },
  "part time killer": {
    en: "Your English message for Part Time Killer here",
    fr: "Your French message for Part Time Killer here"
  },
  "feel suite": {
    en: "Your English message for Feel Suite here",
    fr: "Your French message for Feel Suite here"
  },
  darby: {
    en: "Your English message for Darby here",
    fr: "Your French message for Darby here"
  },
  "33below": {
    en: "Your English message for 33BELOW here",
    fr: "Your French message for 33BELOW here"
  },
  "kl!p": {
    en: "Your English message for Kl!p here",
    fr: "Your French message for Kl!p here"
  },
  broady: {
    en: "Your English message for Broady here",
    fr: "Your French message for Broady here"
  },
  "noir mat": {
    en: "Your English message for Noir Mat here",
    fr: "Your French message for Noir Mat here"
  },
  tkkf: {
    en: "The .",
    fr: "L"
  },
  ozzy: {
    en: "Dalé, dalé, dalé...",
    fr: "Dalé, dalé, dalé..."
  },
  svdko: {
    en: "Your English message for Svdko here",
    fr: "Your French message for Svdko here"
  },
  kyger: {
    en: "Your English message for Kyger here",
    fr: "Your French message for Kyger here"
  },
  "les médias là": {
    en: "Your English message for LES MÉDIAS LÀ here",
    fr: "Your French message for LES MÉDIAS LÀ here"
  },
  ronare: {
    en: "Did you mean 'sammy virji'?",
    fr: "Voulez vous dire 'sammy virji'?"
  },
  pandrezz: {
    en: "Your English message for Pandrezz here",
    fr: "Your French message for Pandrezz here"
  },
  "jon casey": {
    en: "Your English message for Jon Casey here",
    fr: "Your French message for Jon Casey here"
  },
  slk: {
    en: "Your English message for SLK here",
    fr: "Your French message for SLK here"
  },
  elmyx: {
    en: "Your English message for Elmyx here",
    fr: "Your French message for Elmyx here"
  },
  lybro: {
    en: "Il pleut, il fait beau, il fait beau, il neige.",
    fr: "Il pleut, il fait beau, il fait beau, il neige."
  },
  redstain: {
    en: "Your English message for Redstain here",
    fr: "Your French message for Redstain here"
  },
  "2mad": {
    en: "My system recognizes 2MAD as 'hottest newcomer'",
    fr: "My system recognizes 2MAD as 'hottest newcomer'"
  },
  trggx: {
    en: "Your English message for TRGGX here",
    fr: "Your French message for TRGGX here"
  },
  camporeale: {
    en: "Your English message for Camporeale here",
    fr: "Your French message for Camporeale here"
  },
  s2keyz: {
    en: "Your English message for S2keyz here",
    fr: "Your French message for S2keyz here"
  },
  "pro pauline": {
    en: "Your English message for Pro Pauline here",
    fr: "Your French message for Pro Pauline here"
  },
  "tom le bourhis": {
    en: "Your English message for Tom Le Bourhis here",
    fr: "Your French message for Tom Le Bourhis here"
  },
  "greg debure": {
    en: "Your English message for Greg Debure here",
    fr: "Your French message for Greg Debure here"
  },
  "raphael da cruz": {
    en: "Your English message for Raphael Da Cruz here",
    fr: "Your French message for Raphael Da Cruz here"
  },
  sora: {
    en: "Your English message for Sora here",
    fr: "Your French message for Sora here"
  },
  carbone: {
    en: "Your English message for Carbone here",
    fr: "Your French message for Carbone here"
  },
  "raise music": {
    en: "Your English message for Raise Music here",
    fr: "Your French message for Raise Music here"
  },
  jakob: {
    en: "Your English message for Jakob here",
    fr: "Your French message for Jakob here"
  },
  pyrene: {
    en: "Your English message for Pyrene here",
    fr: "Your French message for Pyrene here"
  },
  theodort: {
    en: "Your English message for Theodort here",
    fr: "Your French message for Theodort here"
  },
  "demi lovato": {
    en: "Your English message for Demi Lovato here",
    fr: "Your French message for Demi Lovato here"
  },
  naps: {
    en: "Your English message for Naps here",
    fr: "Your French message for Naps here"
  },
  "alice totino": {
    en: "Your English message for Alice Totino here",
    fr: "Your French message for Alice Totino here"
  },
  "fun radio": {
    en: "Your English message for Fun Radio here",
    fr: "Your French message for Fun Radio here"
  },
  michou: {
    en: "Your English message for Michou here",
    fr: "Your French message for Michou here"
  },
  "ismael mereghetti": {
    en: "Your English message for Ismael Mereghetti here",
    fr: "Your French message for Ismael Mereghetti here"
  },
  lujipeka: {
    en: "Your English message for Lujipeka here",
    fr: "Your French message for Lujipeka here"
  },
  "junior a la prod": {
    en: "Your English message for Junior a la prod here",
    fr: "Your French message for Junior a la prod here"
  },
  naskid: {
    en: "Your English message for Naskid here",
    fr: "Your French message for Naskid here"
  },
  ronnie: {
    en: "Your English message for Ronnie here",
    fr: "Your French message for Ronnie here"
  },
  "légendes industries": {
    en: "Un téralitre de légende.",
    fr: "Un téralitre de légende."
  },
  "antoine sureau": {
    en: "Le man qui saisit l'instant.",
    fr: "Le man qui saisit l'instant."
  },
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