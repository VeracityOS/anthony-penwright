"use client";

// LinkedIn Insight Tag.
//
// Required before any conversion-objective campaign: LinkedIn cannot measure or
// optimise for a conversion it never sees. Renders nothing until
// NEXT_PUBLIC_LINKEDIN_PARTNER_ID is set, so the site is unchanged until the id
// exists rather than shipping a broken tag.
//
// Partner ID: Campaign Manager → Analytics → Insight Tag → "I will install the
// tag myself". It is a numeric id, not a secret — it is public in the page
// source by design.

import Script from "next/script";

const PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

export function InsightTag() {
  if (!PARTNER_ID) return null;
  return (
    <>
      <Script id="li-partner" strategy="afterInteractive">
        {`_linkedin_partner_id="${PARTNER_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
      </Script>
      <Script id="li-insight" strategy="afterInteractive">
        {`(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${PARTNER_ID}&fmt=gif`}
        />
      </noscript>
    </>
  );
}

/**
 * Fire a LinkedIn conversion.
 *
 * The conversion that matters here is a whitepaper download, not a click — a
 * click proves someone was curious, a download proves they wanted the artifact.
 * That is the metric the content thesis actually tracks.
 *
 * Conversion IDs come from Campaign Manager → Conversions. No id set means this
 * is a no-op rather than an error, so the page works before the campaign exists.
 */
export function trackConversion(conversionId?: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { lintrk?: (a: string, b: unknown) => void };
  if (!w.lintrk || !conversionId) return;
  w.lintrk("track", { conversion_id: Number(conversionId) });
}
