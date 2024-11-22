import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Initialize EmailJS with your public key
emailjs.init("jhHo90XRXGmG7fIv0");

export const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create the template parameters with the correct variable names
      const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_message: `New waitlist signup from ${name}`,
        reply_to: email
      };
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_vd8y0tc',
        'template_2wjolr3',
        templateParams
      );

      if (response.status === 200) {
        toast.success("Thanks for joining! We'll be in touch soon.", {
          duration: 3000,
        });
        resetForm();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-primary hover:bg-primary-dark transition-colors w-full sm:w-auto"
        >
          Join Waitlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Our Waitlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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
          <Input
            type="tel"
            placeholder="Enter your phone number (+1234567890)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="^\+[0-9]{1,}[0-9\s.-]{4,}$"
            title="Please enter a valid phone number with country code (e.g., +1234567890)"
            className="bg-white/90"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark transition-colors"
          >
            {isLoading ? "Joining Waitlist..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};