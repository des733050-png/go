import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { newsletterAPI } from "../services/api";

interface NewsletterSubscriptionProps {
  variant?: "default" | "compact" | "popup";
  onClose?: () => void;
}

export function NewsletterSubscription({ variant = "default", onClose }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await newsletterAPI.subscribe(email);
      setStatus("success");
      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>
      <p className="text-blue-100 mb-4">
        Subscribe to our newsletter for the latest healthcare innovations and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 text-gray-900"
          required
        />
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === "success" ? "text-green-200" : "text-red-200"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
