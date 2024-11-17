import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await emailjs.send(
        'theinneralien1@gmail.com', // Your EmailJS service ID
        'template_klspyeo', // Your EmailJS template ID
        {
          to_email: 'theinneralien1@gmail.com',
          from_email: email,
          message: `New waitlist signup from ${email}`,
        },
        'slKf6_uMZllB1T5Mg' // Your EmailJS public key
      );
      
      toast.success("Thanks for joining! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
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