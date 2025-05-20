"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { LayoutContext } from "@/context/LayoutContext";

const ShareTemplateModal = ({ trigger, userEmail }) => {
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { layoutHTML } = useContext(LayoutContext);
  const { templateId } = useParams();

  // Decode optimized image URLs for email delivery
  const decodedHtml = layoutHTML?.replace(
    /\/_next\/image\?url=([^&]+)&[^"]+/g,
    (match, url) => decodeURIComponent(url)
  );

  const handleSend = async () => {
    const recipients = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    if (!recipients.length) {
      alert("Please enter at least one email.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        recipients.map(async (toEmail) => {
          const res = await fetch("/api/sendEmailTemplate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: toEmail,
              subject: "Shared Email Template",
              html: decodedHtml || `<p>${message}</p>`,
              templateId,
              user: userEmail,
              createdAt: new Date().toISOString(),
            }),
          });

          if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error || "Failed to send");
          }
        })
      );

      alert("Emails sent successfully!");
      setEmails("");
      setMessage("");
      setOpen(false);
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send some or all emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Email Template</DialogTitle>
          <DialogDescription>
            Enter one or more email addresses and an optional message.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Recipient emails (comma separated)"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
          <Textarea
            placeholder="Optional message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTemplateModal;
