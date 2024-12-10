import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export const SettingsContainer = () => {
  const { toast } = useToast();
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [journalReminders, setJournalReminders] = useState(
    localStorage.getItem("journalReminders") === "true"
  );
  const [taskAlerts, setTaskAlerts] = useState(
    localStorage.getItem("taskAlerts") === "true"
  );
  const [feedback, setFeedback] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleProfileUpdate = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast({
      title: "Theme Updated",
      description: `Theme has been changed to ${newTheme} mode.`,
    });
  };

  const handleNotificationChange = (type: "journal" | "task", enabled: boolean) => {
    if (type === "journal") {
      setJournalReminders(enabled);
      localStorage.setItem("journalReminders", String(enabled));
    } else {
      setTaskAlerts(enabled);
      localStorage.setItem("taskAlerts", String(enabled));
    }
    toast({
      title: "Notifications Updated",
      description: `${type === "journal" ? "Journal reminders" : "Task alerts"} have been ${
        enabled ? "enabled" : "disabled"
      }.`,
    });
  };

  const handleResetData = () => {
    localStorage.clear();
    toast({
      title: "Data Reset",
      description: "All your data has been cleared.",
      variant: "destructive",
    });
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Thank You!",
        description: "Your feedback has been received.",
      });
      setFeedback("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <Button onClick={handleProfileUpdate} className="bg-[#6EC4A8] hover:bg-[#6EC4A8]/90">
            Save Profile
          </Button>
        </div>
      </section>

      {/* Theme Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Settings</h2>
        <div className="flex gap-4">
          <Button
            onClick={() => handleThemeChange("light")}
            variant={theme === "light" ? "default" : "outline"}
            className={theme === "light" ? "bg-[#9C8ADE] hover:bg-[#9C8ADE]/90" : ""}
          >
            Light Mode
          </Button>
          <Button
            onClick={() => handleThemeChange("dark")}
            variant={theme === "dark" ? "default" : "outline"}
            className={theme === "dark" ? "bg-[#9C8ADE] hover:bg-[#9C8ADE]/90" : ""}
          >
            Dark Mode
          </Button>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="journal-notifications">Journal Reminders</Label>
            <Switch
              id="journal-notifications"
              checked={journalReminders}
              onCheckedChange={(checked) => handleNotificationChange("journal", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="task-notifications">Task Alerts</Label>
            <Switch
              id="task-notifications"
              checked={taskAlerts}
              onCheckedChange={(checked) => handleNotificationChange("task", checked)}
            />
          </div>
        </div>
      </section>

      {/* Reset Data */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Reset Data</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Reset All Data</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your data
                including journal entries and tasks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetData}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Feedback Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Feedback</h2>
        <div className="space-y-4">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts with us..."
            className="min-h-[100px]"
          />
          <Button
            onClick={handleFeedbackSubmit}
            className="bg-[#6EC4A8] hover:bg-[#6EC4A8]/90"
          >
            Submit Feedback
          </Button>
        </div>
      </section>
    </div>
  );
};