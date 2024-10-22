import { useEffect, useState } from "react";

export const useVercount = () => {
  const [visitorData, setVisitorData] = useState({
    sitePv: "0",
    pagePv: "0",
    siteUv: "0",
  });

  const getBaseUrl = () => "https://events.vercount.one";

  const fetchVisitorCount = async () => {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/log?jsonpCallback=VisitorCountCallback`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: window.location.href }),
      });
      const data = await response.json();
      const { site_pv, page_pv, site_uv } = data;
      setVisitorData({ sitePv: site_pv, pagePv: page_pv, siteUv: site_uv });
      localStorage.setItem(
        "visitorCountData",
        JSON.stringify({
          sitePv: site_pv,
          pagePv: page_pv,
          siteUv: site_uv,
        }),
      );
    } catch (error) {
      console.error("Error fetching visitor count:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("visitorCountData");
    if (storedData) {
      setVisitorData(JSON.parse(storedData));
    }
    fetchVisitorCount();
  }, []);

  return visitorData;
};
