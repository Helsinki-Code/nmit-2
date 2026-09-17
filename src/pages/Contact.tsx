import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Character } from '../components/CharacterGuide';
const subjects = [['general','General enquiry'],['workshop','Book the free integration workshop'],['devops','DevOps'],['cloud','Cloud services'],['api','API integration'],['staffing','Staffing']];
export function Contact() {
  const { preset } = useParams();
  const [subject,setSubject] = useState('general');
  useEffect(() => { setSubject(subjects.some(([value]) => value === preset) ? preset! : 'general'); }, [preset]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`;
    const text = subjects.find(([value]) => value === subject)![1];
    window.location.href = `mailto:info@nmit-solutions.com?subject=${encodeURIComponent('Website enquiry: '+text)}&body=${encodeURIComponent(body)}`;
  }
  return <>
    <section><h1>Get in touch</h1></section>
    <section className="tight"><div className="contact-grid"><div><dl className="contact-detail">
      <dt>address</dt><dd>5th Floor, Samhitha Aspire<br />1st Main Road, Pai Layout<br />Old Madras Road, Bengaluru 560016<br /><a href="https://www.google.com/maps/search/?api=1&query=Samhitha+Aspire+Pai+Layout+Old+Madras+Road+Bengaluru" target="_blank" rel="noopener">Get directions</a></dd>
      <dt>phone</dt><dd><a href="tel:+919886970483">+91 98869 70483</a></dd>
      <dt>email</dt><dd><a href="mailto:info@nmit-solutions.com">info@nmit-solutions.com</a></dd>
      <dt>linkedin</dt><dd><a href="https://www.linkedin.com/company/nmit-solutions-pvt-ltd/" target="_blank" rel="noopener">nmit-solutions-pvt-ltd</a></dd>
    </dl><div className="contact-guide"><Character pose={subject==='devops'?'man-runbook':subject==='cloud'?'man-investigate':'woman-plan'} /><p>Include the systems involved, the workflow you need, and any known constraints. Keep credentials and customer data out of your enquiry.</p></div></div><div><form className="contact" id="contact-form" onSubmit={submit}>
      <div><label htmlFor="name">Name</label><input id="name" name="name" type="text" required /></div>
      <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div>
      <div><label htmlFor="subject">Subject</label><select id="subject" name="subject" value={subject} onChange={event => setSubject(event.target.value)}>{subjects.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></div>
      <div><label htmlFor="message">Message</label><textarea id="message" name="message" required /></div>
      <button className="btn btn-primary" type="submit" style={{ alignSelf:'flex-start' }}>Send via email app</button>
    </form></div></div></section>
  </>;
}
