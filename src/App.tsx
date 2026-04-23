import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Calendar, Clock, GraduationCap, Star, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

const turboColor = "#C2A36D";
const clickUrl = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
const kairatAstanaUrl = "/astana.mp3"; 

// ШРИФТ ҮЛКЕЙТІЛДІ (150px), СОҒАН САЙ LETTER_SIZE ӨЗГЕРТІЛДІ
const LETTER_SIZE = 160; 

const teamMembers = [
  { name: "ЖАҚСЫҒАЛИ ГҮЛБАҚЫТ", role: "ТУРБО БАСШЫСЫ" },
  { name: "БОЛАТОВА НҰРАЙ", role: "ТУРБО СУПЕРВАЙЗЕРІ" },
  { name: "БАҚТЫБАЕВ ӘДІЛЖАН", role: "ТУРБО СУПЕРВАЙЗЕРІ" },
  { name: "---", role: "" },
  { name: "АМАНГЕЛДИНОВ ӘДІЛ", role: "ФИЗМАТ ЭДВАЙЗЕР" },
  { name: "БАҚЫТКЕРЕЙ АБУЛСАҒИТ", role: "ИНФОМАТ ЭДВАЙЗЕР" },
  { name: "ОРАЛҚАНОВ БАҒНҰР", role: "ГЕОМАТ ЭДВАЙЗЕР" },
  { name: "СЕЙТАСАНОВ НҰРДОС", role: "БИОХИМ ЭДВАЙЗЕР" },
  { name: "ҚАЙРОЛЛА ЕРАЛЫ", role: "ДЖТАНГЛ ЭДВАЙЗЕР" },
  { name: "АБЗАЛ ОҢҒАРБАЕВ", role: "ДЖТАНГЛ АЙЛТС ЭДВАЙЗЕР" },
  { name: "ШОПШИНОВА ЭЛЬВИРА", role: "ГЕОДЖТ ЭДВАЙЗЕР" },
  { name: "АМАНГЕЛДІҚЫЗЫ ДИНАРА", role: "ТІЛӘДЕБ ЭДВАЙЗЕР" },
  { name: "ТЫНЫШТЫҚ НҰРСАНАМ", role: "ГЕОАНГЛ ЭДВАЙЗЕР" },
  { name: "НҰРЛАН ГҮЛЖАУҺАР", role: "РУСЛИТ ЭДВАЙЗЕР" },
  { name: "КАМЗАЕВ ШЫҢҒЫС", role: "ДЖТҚҰҚЫҚ ЭДВАЙЗЕР" },
  { name: "---", role: "" },
  { name: "ИБЖАРОВА АЙЗАТ", role: "МС ЭДВАЙЗЕР" },
  { name: "КЕНЕСБАЙ NAЗИРА", role: "МС ЭДВАЙЗЕР" },
  { name: "МАРДАН БЕРДІБЕК", role: "МС ЭДВАЙЗЕР" },
  { name: "МАНЕРГЕЙМ АРУЖАН", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "НАУРЫЗҒАЛИЕВА СЫМБАТ", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "НҰРМҰХАНБЕТ НҰРҒАЗЫ", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "УТЕШОВА АРУЖАН", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "---", role: "" },
  { name: "СИСЕНБАЕВА ГҮЛСАНА", role: "ГЕОМАТ ЭДВАЙЗЕР" },
  { name: "РАХМЕТОВ РАМАЗАН", role: "ФИЗМАТ ЭДВАЙЗЕР" },
  { name: "ЭРГАШОВ САРДОРБЕК", role: "ИНФОМАТ ЭДВАЙЗЕР" },
  { name: "РАМАЗАНОВА НАРГИЗ", role: "БИОХИМ ЭДВАЙЗЕР" },
  { name: "ЖАСУЛАНҚЫЗЫ ЖАСМИН", role: "ӘДЕБТІЛ ЭДВАЙЗЕР" },
  { name: "ҚАБДОЛОВА АЙСАНА", role: "ГЕОБИО ЭДВАЙЗЕР" },
  { name: "АКАНОВА АЯГОЗ", role: "ДЖТАНГЛ IELTS ЭДВАЙЗЕР" },
  { name: "ОРЫНТАЙ ДУЛАТ", role: "ДЖТҚҰҚЫҚ ЭДВАЙЗЕР" },
  { name: "БЕКАРЫС ҚЫЗҒАЛДАҚ", role: "ДЖТАНГЛ ЭДВАЙЗЕР" },
  { name: "---", role: "" },
  { name: "ТҰРАРБЕК АНЕЛЬ", role: "МС ЭДВАЙЗЕР" },
  { name: "ЖОЛДАСҚАЛИ ЕРЛАН", role: "МС ЭДВАЙЗЕР" },
  { name: "ЖОЛАМАН АРУЖАН", role: "МС ЭДВАЙЗЕР" },
  { name: "АЙТУОВА ТОМИРИС", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "АБДЫҒАЛИ БАҚТЫҒАЛИ", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "ЖАЙҒАЛИ САЛАМАТ", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "---", role: "" },
  { name: "ТУРЛЫМБЕТ ШЫРАЙЫМ", role: "ГЕОМАТ ЭДВАЙЗЕР" },
  { name: "ТІЛЕУҒАБЫЛ ДАУРЕН", role: "БИОХИМ ЭДВАЙЗЕР" },
  { name: "БАЙРАХМЕТОВ АБАЙ", role: "ИНФОМАТ ЭДВАЙЗЕР" },
  { name: "ҚЫДЫРБАЙ ЕРАСЫЛ", role: "ФИЗМАТ ЭДВАЙЗЕР" },
  { name: "---", role: "" },
  { name: "АРМАНҰЛЫ ЖАНТӨРЕ", role: "МС ЭДВАЙЗЕР" },
  { name: "АСҚАР ДАМИР", role: "ТАРИХ ЭДВАЙЗЕР" },
  { name: "ӨМІРБАЙ МАНСУР", role: "ТАРИХ ЭДВАЙЗЕР" }
];

export default function App() {
  const [stage, setStage] = useState<'portal' | 'verify' | 'reveal' | 'exploding' | 'credits' | 'final'>('portal');
  const [letters, setLetters] = useState<any[]>([]);
  const target = "АСТАНА";
  const addressUrl = "https://2gis.kz/astana/geo/9570784863360984/71.494250,51.093756";
  
  const lettersRef = useRef<any[]>([]);
  const bgMusic = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusic.current = new Audio(kairatAstanaUrl);
    clickAudio.current = new Audio(clickUrl);
    if (bgMusic.current) { bgMusic.current.currentTime = 56; bgMusic.current.volume = 0; }
    if (clickAudio.current) { clickAudio.current.volume = 0.5; }
  }, []);

  const animate = () => {
    const updated = lettersRef.current.map(l => {
      let { x, y, dx, dy } = l;
      if (x + dx > window.innerWidth - LETTER_SIZE || x + dx < 0) dx = -dx;
      if (y + dy > window.innerHeight - LETTER_SIZE || y + dy < 0) dy = -dy;
      return { ...l, x: x + dx, y: y + dy, dx, dy };
    });
    lettersRef.current = updated;
    setLetters(updated);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, []);

  const handleReveal = () => {
    setStage('reveal');
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.7 }, colors: [turboColor, '#FFFFFF'] });
    if (bgMusic.current) {
      bgMusic.current.play();
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.5) { vol += 0.05; if (bgMusic.current) bgMusic.current.volume = vol; } 
        else clearInterval(fade);
      }, 200);
    }
  };

  return (
    <div style={{ backgroundColor: '#02040a', minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif', color: 'white', overflow: 'hidden', position: 'relative' }}>
      
      {/* ПРЕМИУМ ФОН - ЕНДІ CREDITS БЕТІНДЕ ДЕ КӨРІНІП ТҰРАДЫ */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%', background: `conic-gradient(from 0deg at 50% 50%, transparent, ${turboColor}11, transparent)`, transform: 'translate(-50%, -50%)', animation: 'spin 20s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${turboColor}33 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      </div>

      {stage !== 'credits' && stage !== 'final' && letters.map((l) => (
        <div key={l.id} style={{ position: 'absolute', left: l.x, top: l.y, width: LETTER_SIZE, height: LETTER_SIZE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '150px', fontWeight: '950', color: turboColor, opacity: 0.07, pointerEvents: 'none', zIndex: 1, filter: 'blur(2px)', letterSpacing: '-5px', lineHeight: 1 }}>
          {l.char}
        </div>
      ))}

      <AnimatePresence mode="wait">
        {stage === 'portal' && (
          <motion.div key="p" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.1 }} style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '40px', background: turboColor }} />
              <span style={{ color: turboColor, fontSize: '10px', fontWeight: '900', letterSpacing: '5px', textTransform: 'uppercase' }}>Turbo Team</span>
              <div style={{ height: '1px', width: '40px', background: turboColor }} />
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: '200', marginBottom: '40px', letterSpacing: '-1px' }}>БІЛІМГЕ <span style={{ fontWeight: '900', color: turboColor }}>ЖЫЛДАМДЫҚ</span> ҚОС</h1>
            <motion.div 
              onClick={() => {
                clickAudio.current?.play();
                if (letters.length < target.length) {
                  const newList = [...letters, { id: Math.random(), char: target[letters.length], x: window.innerWidth/2 - LETTER_SIZE/2, y: window.innerHeight/2 - LETTER_SIZE/2, dx: (Math.random()-0.5)*15, dy: (Math.random()-0.5)*15 }];
                  lettersRef.current = newList; setLetters(newList);
                  if (newList.length === target.length) setTimeout(() => setStage('verify'), 1000);
                }
              }}
              whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
              style={{ width: '160px', height: '160px', border: `1px solid ${turboColor}`, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70% ', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto', background: `${turboColor}05`, backdropFilter: 'blur(10px)', boxShadow: `0 0 50px ${turboColor}22`, transition: 'border-radius 0.5s ease' }}
            >
              <Zap size={60} fill={turboColor} color={turboColor} className="animate-pulse" />
            </motion.div>
          </motion.div>
        )}

        {stage === 'verify' && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <motion.div key="v" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', background: 'rgba(5, 10, 20, 0.7)', padding: '60px 40px', borderRadius: '40px', border: `2px solid ${turboColor}`, width: '450px', backdropFilter: "blur(20px)", boxShadow: `0 0 40px ${turboColor}33` }}>
              <GraduationCap size={56} color={turboColor} style={{ marginBottom: '24px', margin: '0 auto' }} />
              <p style={{ color: 'white', fontSize: '20px', fontWeight: '400', marginBottom: '40px' }}>Тимбилдинг қай қалада?</p>
              <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'center' }}>
                <input autoFocus placeholder="ЖАУАПТЫ ЕНГІЗІҢІЗ" onChange={(e) => e.target.value.toUpperCase() === "АСТАНА" && handleReveal()} style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${turboColor}66`, borderBottom: `3px solid ${turboColor}`, color: 'white', fontSize: '18px', textAlign: 'center', padding: '15px 10px', borderRadius: '12px', outline: 'none', width: '100%', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 'bold' }} />
              </div>
            </motion.div>
          </div>
        )}

        {stage === 'reveal' && (
          <motion.div key="r" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ scale: 15, opacity: 0, filter: 'blur(30px)' }} transition={{ duration: 1.2 }} style={{ zIndex: 10, textAlign: 'center', maxWidth: '800px', width: '95%' }}>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} style={{ color: turboColor, fontSize: '10px', fontWeight: '900', letterSpacing: '4px', marginBottom: '25px', background: `${turboColor}11`, padding: '6px 16px', borderRadius: '100px', border: `1px solid ${turboColor}44`, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={14} /> ТУРБО-ПРОТОКОЛ ІСКЕ ҚОСЫЛДЫ
            </motion.div>
            <h1 style={{ fontSize: 'clamp(50px, 10vw, 110px)', fontWeight: '950', lineHeight: 0.8, marginBottom: '20px', letterSpacing: '-4px' }}>TEAM<br /><span style={{ color: turboColor }}>BUILDING</span></h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '50px' }}>
              <div style={{ textAlign: 'left' }}><div style={{ color: turboColor, fontSize: '10px', fontWeight: '900', letterSpacing: '2px' }}>DATE</div><div style={{ fontSize: '28px', fontWeight: '800' }}>25.04.26</div></div>
              <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'left' }}><div style={{ color: turboColor, fontSize: '10px', fontWeight: '900', letterSpacing: '2px' }}>TIME</div><div style={{ fontSize: '28px', fontWeight: '800' }}>15:00</div></div>
            </div>
            <motion.button 
              onClick={() => {
                clickAudio.current?.play();
                setStage('exploding');
                navigator.clipboard.writeText(addressUrl);
                setTimeout(() => setStage('credits'), 1000);
                setTimeout(() => setStage('final'), 16000);
              }} 
              whileHover={{ scale: 1.02, backgroundColor: 'white', color: 'black' }} 
              style={{ width: '100%', maxWidth: '400px', background: 'transparent', color: turboColor, border: `2px solid ${turboColor}`, padding: '24px', borderRadius: '100px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', transition: '0.4s', letterSpacing: '2px' }}
            >
              ҚАТЫСУДЫ РАСТАУ
            </motion.button>
          </motion.div>
        )}

        {stage === 'exploding' && (
          <motion.div key="ex" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 20, opacity: 0, filter: 'blur(30px)' }} transition={{ duration: 1.2 }}>
            <h1 style={{ color: turboColor, fontWeight: 950, fontSize: '40px' }}>TURBO</h1>
          </motion.div>
        )}

        {stage === 'credits' && (
          <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ zIndex: 20, width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <motion.div initial={{ y: '100vh' }} animate={{ y: '-480%' }} transition={{ duration: 45, ease: 'linear' }} style={{ position: 'absolute', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ height: '30vh' }} />
              {teamMembers.map((member, i) => (
                <div key={i} style={{ marginBottom: member.name === '---' ? '40px' : '10px' }}>
                  {member.name !== '---' && (
                    <><div style={{ color: turboColor, fontSize: '14px', fontWeight: '900', letterSpacing: '3px', marginBottom: '5px' }}>{member.role}</div><div style={{ color: 'white', fontSize: '26px', fontWeight: '800', letterSpacing: '1px' }}>{member.name}</div></>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {stage === 'final' && (
          <motion.div key="f" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ zIndex: 30, textAlign: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} style={{ marginBottom: '30px' }}><Star size={80} color={turboColor} fill={turboColor} /></motion.div>
            <h2 style={{ fontSize: '60px', fontWeight: '950', margin: '30px 0', letterSpacing: '-2px' }}>СЕНІ КҮТЕМІЗ!</h2>
            <div style={{ background: 'rgba(194, 163, 109, 0.1)', padding: '30px 60px', borderRadius: '40px', border: `2px solid ${turboColor}44`, backdropFilter: 'blur(10px)' }}>
              <MapPin size={30} color={turboColor} style={{ marginBottom: '15px', margin: '0 auto' }} /><p style={{ fontSize: '18px', color: '#94a3b8' }}>Мекенжай көшірілді. 2GIS арқылы кел!</p>
            </div>
            <button onClick={() => window.location.reload()} style={{ marginTop: '50px', color: turboColor, background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', opacity: 0.5 }}>Басына қайту</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
    </div>
  );
}