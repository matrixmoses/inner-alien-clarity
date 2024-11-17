import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("Z1WoteF4NnvjYepnt");

export const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create the template parameters
      const templateParams = {
        to_name: 'Admin',
        from_name: name,
        to_email: 'theinneralien1@gmail.com',
        from_email: email,
        message: `New waitlist signup request from ${name} (${email})`,
        email: email,
        user_email: email, // Added explicit user_email parameter
        user_name: name,
        reply_to: email,
      };
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_7a9af58',
        'template_upclq98',
        templateParams
      );

      if (response.status === 200) {
        toast.success("Thanks for joining! We'll be in touch soon.");
        setName("");
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
        {isLoading ? "Joining Waitlist..." : "Join Waitlist"}
      </Button>
    </form>
  );
};