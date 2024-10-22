import { useEffect, useState, useRef } from "react";

export const useVercount = () => {
  const [visitorData, setVisitorData] = useState({
    sitePv: "0",
    pagePv: "0",
    siteUv: "0",
  });

  // Use ref to track if we've fired this session
  const hasFired = useRef(false);

  const getBaseUrl = () => "https://events.vercount.one";

  const fetchVisitorCount = async () => {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/log?jsonpCallback=VisitorCountCallback`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: window.location.href
        }),
      });

      const data = await response.json();
      const { site_pv, page_pv, site_uv } = data;

      const newData = {
        sitePv: site_pv,
        pagePv: page_pv,
        siteUv: site_uv,
      };

      setVisitorData(newData);
      localStorage.setItem('visitorCountData', JSON.stringify(newData));

    } catch (error) {
      console.error("Error fetching visitor count:", error);
    }
  };

  useEffect(() => {
    // Only proceed if we haven't fired this session
    if (hasFired.current) {
      return;
    }

    const storedData = localStorage.getItem('visitorCountData');

    if (storedData) {
      setVisitorData(JSON.parse(storedData));
    }

    // Always fetch new data once per session
    fetchVisitorCount();

    // Mark as fired for this session
    hasFired.current = true;
  }, []);

  return visitorData;
};