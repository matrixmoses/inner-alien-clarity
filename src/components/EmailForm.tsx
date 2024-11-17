import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("slKf6_uMZllB1T5Mg");

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await emailjs.send(
        'service_yvr0ixk', // Updated service ID
        'template_klspyeo',
        {
          to_email: 'theinneralien1@gmail.com',
          from_email: email,
          from_name: name,
          message: `New waitlist signup from ${name} (${email})`,
        },
        'slKf6_uMZllB1T5Mg'
      );
      
      toast.success("Thanks for joining! We'll be in touch soon.");
      setEmail("");
      setName("");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-2">
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white/90"
      />
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/90"
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-primary hover:bg-primary-dark transition-colors"
      >
        {isLoading ? "Joining..." : "Join Now"}
      </Button>
    </form>
  );
};