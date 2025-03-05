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

  // Generate a simple browser fingerprint to help identify legitimate requests
  const generateBrowserToken = () => {
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const languages = navigator.languages ? navigator.languages.join(',') : navigator.language || '';
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    const glInfo = gl ? gl.getParameter(gl.RENDERER) : '';
    
    // Combine various browser properties to create a simple fingerprint
    const components = [
      screenInfo,
      timeZone,
      languages,
      navigator.userAgent,
      glInfo,
      new Date().getTimezoneOffset()
    ].join('|');
    
    // Create a simple hash of the components
    let hash = 0;
    for (let i = 0; i < components.length; i++) {
      hash = ((hash << 5) - hash) + components.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(36);
  };

  const fetchVisitorCount = async () => {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/v2/log`;
    
    // Generate browser token
    const browserToken = generateBrowserToken();

    try {
      // Try to fetch with the token in header first
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Browser-Token": browserToken
          },
          body: JSON.stringify({ 
            url: window.location.href,
            token: browserToken,
            version: "v2" // Add version parameter for v2 API
          }),
        });

        const responseData = await response.json();
        
        // Handle the new response structure with status, message, and data
        if (responseData.status === "success" && responseData.data) {
          const { site_pv, page_pv, site_uv } = responseData.data;

          const newData = {
            sitePv: site_pv.toString(),
            pagePv: page_pv.toString(),
            siteUv: site_uv.toString(),
          };

          setVisitorData(newData);
          localStorage.setItem('visitorCountData', JSON.stringify(newData));
        } else {
          console.warn("API returned error:", responseData.message);
          throw new Error(responseData.message || "API error");
        }
      } catch (corsError) {
        // If we get a CORS error, try again without the custom header
        console.warn("CORS error with token header, retrying without custom header:", corsError);
        const fallbackResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            url: window.location.href,
            token: browserToken,
            version: "v2" // Add version parameter for v2 API
          }),
        });
        
        const responseData = await fallbackResponse.json();
        
        // Handle the new response structure with status, message, and data
        if (responseData.status === "success" && responseData.data) {
          const { site_pv, page_pv, site_uv } = responseData.data;

          const newData = {
            sitePv: site_pv.toString(),
            pagePv: page_pv.toString(),
            siteUv: site_uv.toString(),
          };

          setVisitorData(newData);
          localStorage.setItem('visitorCountData', JSON.stringify(newData));
        } else {
          console.warn("API returned error:", responseData.message);
          throw new Error(responseData.message || "API error");
        }
      }
    } catch (error) {
      console.error("Error fetching visitor count:", error);
      
      // Try to use cached data if available
      const cachedData = localStorage.getItem("visitorCountData");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setVisitorData(parsedData);
          console.log("Using cached visitor count data");
        } catch (cacheError) {
          console.error("Error parsing cached data:", cacheError);
        }
      }
    }
  };

  useEffect(() => {
    // Only proceed if we haven't fired this session
    if (hasFired.current) {
      return;
    }

    const storedData = localStorage.getItem('visitorCountData');

    if (storedData) {
      try {
        setVisitorData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing stored visitor data:", error);
      }
    }

    // Always fetch new data once per session
    fetchVisitorCount();

    // Mark as fired for this session
    hasFired.current = true;
  }, []);

  return visitorData;
};