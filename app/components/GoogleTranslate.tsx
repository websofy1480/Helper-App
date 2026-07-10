"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function GoogleTranslate() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const hideGoogleBanner = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) {
        (banner as HTMLElement).style.display = "none";
      }

      document.body.style.top = "0px";
      document.documentElement.style.top = "0px";
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          autoDisplay: false,
        },
        "google_translate_element",
      );

      setInterval(hideGoogleBanner, 1000);
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      document.body.appendChild(script);
    }
  }, []);


  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = e.target.value;

    const interval = setInterval(() => {
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;

      if (select) {
        select.value = language;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 500);
  };

  // const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const language = e.target.value;

  //   document.cookie = `googtrans=/en/${language};path=/`;

  //   window.location.reload();
  // };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden" />

      {/* Custom Dropdown */}
      <select
        onChange={handleLanguageChange}
        className="rounded-md border px-3 py-2 text-sm outline-none"
        defaultValue=""
      >
        <option value="" disabled>
          Language
        </option>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </>
  );
}
