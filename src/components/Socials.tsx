import { EMAIL, GITHUB_USERNAME, LINKEDIN_URL } from '../data';
import { FileIcon, GithubIcon, LinkedinIcon, MailIcon } from './Icons';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Socials() {
  return (
    <div className="socials">
      <a href={`https://github.com/${GITHUB_USERNAME}`} aria-label="GitHub" title="GitHub" {...external}><GithubIcon /></a>
      <a href={LINKEDIN_URL} aria-label="LinkedIn" title="LinkedIn" {...external}><LinkedinIcon /></a>
      <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email"><MailIcon /></a>
      <a href="/uliResume.pdf" aria-label="Resume" title="Resume" {...external}><FileIcon /></a>
    </div>
  );
}
