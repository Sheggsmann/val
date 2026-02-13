import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Pic from "./pic.JPG";
import confetti from "canvas-confetti";

const MUSIC_URL = "/song.mp3";

const PAGES = [
  {
    body: [
      "From our very first conversation,",
      "I knew there was something different about you.",
      "",
      "The way you laugh.",
      "The way you think.",
      "The way you cared about the little things.",
      "",
      "You make ordinary moments feel special.",
      "",
      "And somehow…",
      "you make my world feel lighter.",
    ],
    footer: "Page 1 of 5 💌",
  },
  {
    body: [
      "I still replay our early moments in my head.",
      "",
      "The random jokes.",
      "The deep conversations.",
      "The comfortable silence.",
      "",
      "The way time moves too fast",
      "whenever I am with you.",
      "",
      "Somehow, you make simple days",
      "feel unforgettable.",
    ],
    footer: "Page 2 of 5 💌",
  },
  {
    body: [
      "You make me feel calm.",
      "You make me feel understood.",
      "You make me want to be better.",
      "And that is a rare combination.",
      "",
      "Being with you doesn’t feel forced.",
      "It feels natural.",
      "",
      "It feels right.",
    ],
    footer: "Page 3 of 5 💌",
  },
  {
    body: [
      "I don’t just like talking to you.",
      "",
      "I don’t just like spending time with you.",
      "",
      "I like us.",
      "",
      "And I want more moments.",
      "More laughs.",
      "More memories.",
      "",
      "So there’s something",
      "I have been wanting to ask you…",
    ],
    footer: "Page 4 of 5 💌",
  },
  {
    body: [],
    footer: "Page 5 of 5 💌",
    isQuestion: true,
  },
];

const HEART_POSITIONS = [
  { left: "10%", size: "text-base", delay: 0 },
  { left: "24%", size: "text-xl", delay: 2 },
  { left: "40%", size: "text-lg", delay: 4 },
  { left: "56%", size: "text-base", delay: 1 },
  { left: "72%", size: "text-xl", delay: 3 },
  { left: "86%", size: "text-lg", delay: 5 },
];

const BUBBLE_POPS = Array.from({ length: 10 }).map((_, index) => ({
  size: 26 + (index % 5) * 8,
  delay: index * 0.12,
  x: 18 + (index % 5) * 14,
  y: 34 + Math.floor(index / 5) * 20,
}));

const CONFETTI_COLORS = ["#ff7fb1", "#ffd1e6", "#ffb090", "#ffe2d6", "#f7c0d9"];

const SPARKLE_POSITIONS = [
  { x: "18%", y: "22%", size: "text-lg", delay: 0.1 },
  { x: "30%", y: "18%", size: "text-xl", delay: 0.2 },
  { x: "64%", y: "20%", size: "text-base", delay: 0.35 },
  { x: "78%", y: "28%", size: "text-lg", delay: 0.5 },
  { x: "22%", y: "70%", size: "text-base", delay: 0.25 },
  { x: "38%", y: "78%", size: "text-lg", delay: 0.4 },
  { x: "62%", y: "76%", size: "text-xl", delay: 0.55 },
  { x: "80%", y: "70%", size: "text-base", delay: 0.65 },
];

function FloatingHearts({ density = 6, className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {HEART_POSITIONS.slice(0, density).map((heart, index) => (
        <span
          key={`heart-${index}`}
          className={`heart-float ${heart.size}`}
          style={{
            left: heart.left,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💗
        </span>
      ))}
    </div>
  );
}

function BackgroundHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.span
          key={`bg-heart-${index}`}
          className="absolute text-2xl opacity-60"
          initial={{
            x: `${8 + index * 7}%`,
            y: "110%",
            scale: 0.8,
          }}
          animate={{
            y: "-10%",
            scale: [0.8, 1.1, 0.9],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            duration: 12 + index * 0.6,
            delay: index * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.span>
      ))}
    </div>
  );
}

function FloralBorder({ className = "", showRect = true }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 360 600"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showRect && (
        <rect
          x="16"
          y="16"
          width="328"
          height="568"
          rx="32"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.55"
        />
      )}
      <path
        d="M32 92C92 34 170 34 230 92C260 118 300 118 328 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M48 112C104 70 168 70 222 112"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M32 508C92 566 170 566 230 508C260 482 300 482 328 508"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M48 488C104 530 168 530 222 488"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M66 120C26 208 26 300 66 388C86 434 86 472 66 520"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M86 132C56 214 56 300 86 382"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M294 120C334 208 334 300 294 388C274 434 274 472 294 520"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M274 132C304 214 304 300 274 382"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M62 150C72 134 94 130 110 142C98 156 78 164 62 150Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M132 120C142 106 160 104 172 116C160 128 144 134 132 120Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M298 150C288 134 266 130 250 142C262 156 282 164 298 150Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M228 120C218 106 200 104 188 116C200 128 216 134 228 120Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M70 470C84 454 110 450 126 464C112 478 90 486 70 470Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M130 496C146 478 174 474 190 490C172 504 150 512 130 496Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M290 470C276 454 250 450 234 464C248 478 270 486 290 470Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M230 496C214 478 186 474 170 490C188 504 210 512 230 496Z"
        fill="currentColor"
        opacity="0.3"
      />
      <g fill="currentColor" opacity="0.55">
        <circle cx="52" cy="80" r="4" />
        <circle cx="62" cy="92" r="4" />
        <circle cx="46" cy="96" r="4" />
        <circle cx="54" cy="106" r="3" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="308" cy="80" r="4" />
        <circle cx="298" cy="92" r="4" />
        <circle cx="314" cy="96" r="4" />
        <circle cx="306" cy="106" r="3" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="52" cy="520" r="4" />
        <circle cx="62" cy="508" r="4" />
        <circle cx="46" cy="504" r="4" />
        <circle cx="54" cy="494" r="3" />
      </g>
      <g fill="currentColor" opacity="0.55">
        <circle cx="308" cy="520" r="4" />
        <circle cx="298" cy="508" r="4" />
        <circle cx="314" cy="504" r="4" />
        <circle cx="306" cy="494" r="3" />
      </g>
      <circle cx="180" cy="78" r="6" fill="currentColor" opacity="0.35" />
      <circle cx="180" cy="522" r="6" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function PageOrnament() {
  return (
    <div className="mb-4 flex items-center gap-3 text-blush-300">
      <span className="h-px w-12 bg-blush-200/70" />
      <span className="font-romance text-2xl text-blush-400">✿</span>
      <span className="h-px w-12 bg-blush-200/70" />
    </div>
  );
}

function CelebrationOverlay({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    const sideBursts = () => {
      myConfetti({
        particleCount: 50,
        spread: 70,
        startVelocity: 45,
        angle: 60,
        origin: { x: 0, y: 0.7 },
        colors: CONFETTI_COLORS,
      });
      myConfetti({
        particleCount: 50,
        spread: 70,
        startVelocity: 45,
        angle: 120,
        origin: { x: 1, y: 0.7 },
        colors: CONFETTI_COLORS,
      });
    };

    sideBursts();

    const end = Date.now() + 2200;
    const frame = () => {
      myConfetti({
        particleCount: 8,
        spread: 75,
        startVelocity: 35,
        gravity: 0.9,
        scalar: 0.9,
        ticks: 200,
        origin: { x: 0.2 + Math.random() * 0.6, y: 0.5 },
        colors: CONFETTI_COLORS,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    const finalBurst = setTimeout(() => {
      myConfetti({
        particleCount: 80,
        spread: 90,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.45 },
        colors: CONFETTI_COLORS,
      });
    }, 350);

    return () => clearTimeout(finalBurst);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {BUBBLE_POPS.map((bubble, index) => (
            <motion.span
              key={`bubble-${index}`}
              className="absolute rounded-full border border-white/70 bg-white/10"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
              }}
              initial={{
                x: `${bubble.x}%`,
                y: `${bubble.y}%`,
                scale: 0.2,
                opacity: 0.9,
              }}
              animate={{
                scale: 1.8,
                opacity: 0,
              }}
              transition={{
                duration: 1.6,
                ease: "easeOut",
                delay: bubble.delay,
              }}
            />
          ))}

          {SPARKLE_POSITIONS.map((sparkle, index) => (
            <motion.span
              key={`sparkle-${index}`}
              className={`absolute ${sparkle.size}`}
              style={{ left: sparkle.x, top: sparkle.y }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.8] }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
                delay: sparkle.delay,
              }}
            >
              ✨
            </motion.span>
          ))}

          {Array.from({ length: 10 }).map((_, index) => (
            <motion.span
              key={`heart-float-${index}`}
              className="absolute text-2xl"
              initial={{
                x: `${20 + index * 6}%`,
                y: "70%",
                opacity: 0,
              }}
              animate={{
                y: ["70%", "20%"],
                opacity: [0, 0.9, 0],
                scale: [0.8, 1.2, 1],
              }}
              transition={{
                duration: 2.8,
                ease: "easeOut",
                delay: 0.2 + index * 0.08,
              }}
            >
              💕
            </motion.span>
          ))}

          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PageContent({
  page,
  celebrate,
  onCelebrate,
  photoUrl,
  onPhotoChange,
}) {
  if (page.isQuestion) {
    return (
      <div className="relative z-50 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <FloatingHearts density={4} />
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-full bg-white/70 text-3xl text-blush-400 shadow-glow"
          animate={{ scale: [1, 1.08, 1], rotate: [0, -6, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          💞
        </motion.div>
        <div className="space-y-3">
          <p className="font-display text-lg text-ink-600/90">
            Jasmine Atinuke Emmanuel
          </p>
          <p className="font-romance text-4xl text-blush-500 drop-shadow-sm">
            Will you be my Valentine? 💖
          </p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onCelebrate();
          }}
          onPointerDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          data-no-flip
          className="rounded-full bg-gradient-to-r from-blush-400 via-blush-300 to-peach-300 px-6 py-3 font-display text-xl text-white shadow-glow transition hover:scale-105"
        >
          Yes, of course ❤️
        </button>
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-white/80 bg-white/70 shadow-glow">
            <img
              src={Pic}
              alt="Her"
              className="h-full w-full object-cover"
              data-no-flip
            />
          </div>
        </div>
        <AnimatePresence>
          {celebrate && (
            <motion.div
              className="absolute inset-0 flex items-end justify-center pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 rounded-[32px] bg-white/40 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="relative w-[88%] max-w-[320px] rounded-[24px] border border-white/70 bg-gradient-to-br from-white/90 via-[#fff3f9]/90 to-[#ffe4ef]/90 p-5 text-center shadow-page"
                initial={{ opacity: 0, y: 30, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              >
                <motion.div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-blush-400 shadow-glow"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  💌
                </motion.div>
                <motion.p
                  className="font-romance text-3xl text-blush-500"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  She said yes. 🤭
                </motion.p>
                <motion.p
                  className="mt-2 font-display text-base text-ink-600/90"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  My heart is doing cartwheels.
                </motion.p>
                <motion.p
                  className="mt-3 font-script text-xl text-blush-500"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  See you when I see you then 😉
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <FloatingHearts density={3} />
      <PageOrnament />
      <div className="max-w-[86%] space-y-2 font-serif text-[1.15rem] text-ink-600 drop-shadow-sm">
        {page.body.map((line, index) => (
          <p key={index} className="leading-relaxed">
            {line || <span className="block h-2" />}
          </p>
        ))}
      </div>
    </div>
  );
}

function PageSheet({
  page,
  flipped,
  isOpen,
  celebrate,
  onCelebrate,
  photoUrl,
  onPhotoChange,
  zIndex,
}) {
  return (
    <motion.div
      className="page-sheet absolute inset-0 overflow-hidden rounded-[32px]"
      style={{ zIndex }}
      animate={{
        rotateY: flipped ? -180 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="page-face page-paper absolute inset-0 h-full w-full rounded-[32px] p-7 shadow-page sm:p-8">
        <FloralBorder
          className="text-blush-200 opacity-40 -z-10"
          showRect={false}
        />
        <PageContent
          page={page}
          celebrate={celebrate}
          onCelebrate={onCelebrate}
          photoUrl={photoUrl}
          onPhotoChange={onPhotoChange}
        />
        <p className="absolute bottom-6 left-0 right-0 text-center font-script text-xs text-rose-400">
          {page.footer}
        </p>
      </div>
      <div className="page-face page-back absolute inset-0 h-full w-full rounded-[32px] bg-gradient-to-br from-[#ffe9f3] via-[#fff2f8] to-white" />
    </motion.div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const audioRef = useRef(null);

  const maxPage = PAGES.length - 1;
  const pageStack = useMemo(
    () => PAGES.map((page, index) => ({ ...page, index })),
    [],
  );
  const orderedPages = useMemo(() => [...pageStack].reverse(), [pageStack]);

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setPhotoUrl((prev) => {
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      return nextUrl;
    });
  };

  const startMusic = () => {
    if (!audioRef.current || !MUSIC_URL) return;
    audioRef.current.volume = 0.2;
    const playPromise = audioRef.current.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  const goNext = () => {
    setCelebrate(false);
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  const goPrev = () => {
    setCelebrate(false);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleOpen = () => {
    if (!isOpen) {
      startMusic();
      setIsOpen(true);
      setCurrentPage(0);
    }
  };

  const handleFlipTap = (event) => {
    if (!isOpen) return;
    startMusic();
    if (event.defaultPrevented) return;
    const target =
      event.target instanceof Element
        ? event.target
        : event.target?.parentElement;
    if (
      target &&
      target.closest("button,[data-no-flip],a,input,textarea,select,label")
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const tapX = event.clientX - bounds.left;
    if (tapX > bounds.width / 2) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#ffd1e6] via-[#ffd9cd] to-[#ffe8f2]"
      onClick={handleFlipTap}
    >
      <BackgroundHearts />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_60%)]" />

      <div className="book-perspective relative z-10">
        <div
          className="book-shell relative"
          style={{
            width: "min(96vw, 440px)",
            height: "min(94svh, 760px)",
          }}
        >
          <motion.div
            data-cover
            className={`page-sheet absolute inset-0 z-30 overflow-hidden rounded-[32px] bg-gradient-to-br from-blush-400 via-blush-300 to-peach-200 shadow-cover ${
              isOpen ? "pointer-events-none" : "cursor-pointer"
            }`}
            animate={{ rotateY: isOpen ? -160 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            onClick={handleOpen}
          >
            <div className="page-face absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-[32px] border border-white/40 bg-gradient-to-br from-blush-400 via-blush-300 to-peach-200 p-8 text-center text-white">
              <div className="page-glow" />
              <FloralBorder className="text-white opacity-30" />
              <p className="font-romance text-3xl drop-shadow">
                A Little Something For You 💖
              </p>
              <p className="mt-4 font-script text-xl">Tap to open…</p>
            </div>
            <div className="page-face page-back absolute inset-0 h-full w-full rounded-[32px] bg-gradient-to-br from-peach-100 via-blush-100 to-white" />
          </motion.div>

          {orderedPages.map((page) => (
            <PageSheet
              key={`page-${page.index}`}
              page={page}
              flipped={isOpen && page.index < currentPage}
              isOpen={isOpen}
              celebrate={celebrate}
              onCelebrate={() => setCelebrate(true)}
              photoUrl={photoUrl}
              onPhotoChange={handlePhotoChange}
              zIndex={29 - page.index}
            />
          ))}

          <div className="absolute inset-0 rounded-[32px] shadow-glow z-[20]" />
        </div>
      </div>

      <CelebrationOverlay active={celebrate} />
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline />
    </div>
  );
}
