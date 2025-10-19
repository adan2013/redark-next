"use client";

import { useEffect } from "react";

interface DisqusProps {
  postSlug: string;
  postTitle: string;
  disqusUrl: string;
}

export default function Disqus({
  postSlug,
  postTitle,
  disqusUrl,
}: DisqusProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://redark.disqus.com/embed.js";
    script.async = true;
    script.setAttribute("data-timestamp", Date.now().toString());

    const existingScript = document.querySelector(
      'script[src="https://redark.disqus.com/embed.js"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const existingThread = document.getElementById("disqus_thread");
    if (existingThread) {
      existingThread.innerHTML = "";
    }

    document.body.appendChild(script);

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = postSlug;
          this.page.url = `${disqusUrl}/${postSlug}`;
          this.page.title = postTitle;
        },
      });
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [postSlug, postTitle, disqusUrl]);

  return (
    <div className="mt-6">
      <div id="disqus_thread"></div>
      <noscript>
        <p>
          Proszę włączyć JavaScript, aby zobaczyć komentarze obsługiwane przez{" "}
          <a href="https://disqus.com/?ref_noscript">Disqus</a>.
        </p>
      </noscript>
    </div>
  );
}

declare global {
  interface Window {
    DISQUS: any;
  }
}
