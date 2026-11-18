import { useState } from 'react';
import { EMAIL } from '../data';
import { ArrowUpRightIcon, ChevronDownIcon } from './Icons';
import HoverText from './HoverText';
import Socials from './Socials';

// Drop a square photo at public/me.jpg and it shows up next to the heading.
const PHOTO_SRC = '/me.jpg';

function Photo() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img className="photo" src={PHOTO_SRC} alt="Ulisses Molina" onError={() => setFailed(true)} />;
}

const HACKATHON_DETAIL =
  'codeLinc 11: my five-person team won with Molar Money, a dental benefits copilot that estimates procedure costs and plans treatment across plan years.';

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="hero">
      <div className="hero-top">
        <div>
          <h1><HoverText text="Hey, I'm Ulisses" /></h1>
          <p className="tagline">Interested in full-stack and AI products.</p>
        </div>
        <Photo />
      </div>

      <ul className="roles">
        <li><span className="dim">Incoming SWE Intern @</span> Capital One, 2027</li>
        <li><span className="dim">Software Engineering @</span> Auburn University</li>
        <li><span className="dim">Student Developer @</span> Auburn RFID Lab</li>
      </ul>

      <p className="feats">
        <button type="button" className="feat" aria-expanded={open} onClick={() => setOpen(!open)}>
          1× hackathon winner
          <ChevronDownIcon />
        </button>
      </p>
      {open && <p className="feat-detail">{HACKATHON_DETAIL}</p>}

      <a className="chat" href={`mailto:${EMAIL}`}>
        Let's chat <ArrowUpRightIcon />
      </a>

      <Socials />
    </section>
  );
}
