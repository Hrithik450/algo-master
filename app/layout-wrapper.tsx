"use client";

import React from "react";
import type { Session } from "next-auth";
import { useErrorStore } from "@/store/error";
import { SuccessAlert } from "@/components/alerts/success-alert";
import { FailureAlert } from "@/components/alerts/failure-alert";

export const SessionContext = React.createContext<Session | null>(null);

export function LayoutWrapper({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  const { status, message, setMessage, setStatus } = useErrorStore();

  return (
    <SessionContext.Provider value={session}>
      {children}
      {status === "saved" && message && (
        <SuccessAlert
          message={message}
          duration={4000}
          setMessage={setMessage}
          setStatus={setStatus}
        />
      )}
      {status === "error" && message && (
        <FailureAlert
          message={message}
          duration={4000}
          setMessage={setMessage}
          setStatus={setStatus}
        />
      )}
    </SessionContext.Provider>
  );
}
