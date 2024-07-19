"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Client, Databases } from 'appwrite';

// Appwrite client configuration
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string; // Replace with your Database ID
const COLLECTION_ID = process.env.NEXT_PUBLIC_COMPLAIN_COLLECTION_ID as string; // Replace with your Collection ID

export default function ComplainPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fullname = form.fullname.value;
    const registernumber = form.registernumber.value;
    const date = form.date.value;
    const subject = form.subject.value;
    const complainreason = form.complainreason.value;

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()', // Unique ID for the document, or use a specific ID if needed
        {
          fullname,
          registernumber,
          date,
          subject,
          complainreason,
        }
      );

      console.log('Document created', response);
      setIsSubmitted(true);
      setError(null);
    } catch (err) {
      // Type guard for error
      if (err instanceof Error) {
        setError(`Failed to submit form. ${err.message}`);
      } else {
        setError(`An unexpected error occurred.`);
      }
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="relative max-w-screen-lg w-full mx-auto p-5">
      <div className="rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-900">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Complain Page
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please fill in the form below to submit your complaint.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            <LabelInputContainer>
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" placeholder="John Doe" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="registernumber">Register No</Label>
              <Input id="registernumber" placeholder="123456" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Subject of your complaint" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="complainreason">Complain Reason</Label>
              <Input id="complainreason" placeholder="Describe your complaint in detail" className="h-32" type="text" required />
            </LabelInputContainer>
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>

          {isSubmitted && (
            <div role="alert" className="alert alert-success mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Your complaint has been submitted!</span>
            </div>
          )}

          {error && (
            <div role="alert" className="alert alert-danger mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
