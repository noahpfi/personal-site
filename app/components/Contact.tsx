import { useState } from "react";

import Reveal from "@/app/components/Reveal";
import { sendEmail } from "@/app/actions";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-24 bg-foreground/5">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
      <div className="max-w-2xl">
        <p className="text-lg text-muted-foreground mb-8">
          Interested in working together? I'd love to hear from you.
        </p>
        <div className="space-y-4">
          {/* <div className="flex items-center gap-3">
            <span className="font-semibold">Email:</span>
            <span className="text-muted-foreground">noah.pfister@outlook.com</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">Location:</span>
            <span className="text-muted-foreground">Available worldwide</span>
          </div> */}
          <ContactForm/>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("Send >");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Sending..');

    const response = await sendEmail({ email, message });

    if (response.success) {
      setStatus(response.message);
      setEmail('');
      setMessage('');
    } else {
      setStatus(response.message || "Please try again >");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="w-full flex flex-col gap-1 md:gap-2">
          <label htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              p-2 bg-foreground/5
              border border-foreground/80 rounded-xl
              focus:outline-none focus:border-2 focus:m-[-1px]
            "
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            p-2 bg-foreground/5 
            border border-foreground/80 rounded-xl
            resize-none
            focus:outline-none focus:border-2 focus:m-[-1px]
          "
        />
      </div>
      <Reveal delay="100ms" notOnce>
        <button
          type="submit" 
          className="
            self-start
            mt-4 text-xl font-semibold text-left 
            hover:underline underline-offset-4
          "
        >
          {status}
        </button>
      </Reveal>
    </form>
  );
}
