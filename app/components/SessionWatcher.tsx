"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTabId } from "@/lib/getTabId";

export default function SessionWatcher() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const res = await fetch(
          "/api/check-session",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              tabId: getTabId(),
            }),
          }
        );
        if (res.status === 401) {
          alert(
            "Your account has been logged in from another tab/device. You will be logged out."
          );
          sessionStorage.clear();
          router.replace("/signin");
        }
      },
      3000
    );

    return () =>
      clearInterval(interval);
  }, [router]);

  return null;
}