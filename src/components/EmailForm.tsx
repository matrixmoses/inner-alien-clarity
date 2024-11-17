import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("slKf6_uMZllB1T5Mg");

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send email using EmailJS with template parameters matching exactly
      await emailjs.send(
        'service_yvr0ixk',
        'template_klspyeo',
        {
          to_name: 'Admin',
          from_name: email,
          message: `New waitlist signup from ${email}`,
          user_email: email,
          to_email: 'theinneralien1@gmail.com',
        },
        'slKf6_uMZllB1T5Mg'
      );
      
      toast.success("Thanks for joining! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-2">
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