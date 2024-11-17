import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("JF-A0VRXJ_cH9ed4M");

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create the template parameters
      const templateParams = {
        to_email: 'theinneralien1@gmail.com',
        from_email: email,
        message: `New waitlist signup from ${email}`,
        email: email,
        reply_to: email,
      };
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_8nldrqo',
        'template_01m56q1',
        templateParams
      );

      if (response.status === 200) {
        toast.success("Thanks for joining! We'll be in touch soon.");
        setEmail("");
      } else {
        throw new Error(`Failed to send email: ${response.text}`);
      }
    } catch (error) {
      console.error('Error:', error);
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
        {isLoading ? "Joining Waitlist..." : "Join Waitlist"}
      </Button>
    </form>
  );
};