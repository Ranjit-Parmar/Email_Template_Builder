// utils/cleanHtmlForEmail.js
export const cleanHtmlForEmail = (html) => {
  return html
    // Replace _next/image URLs with direct src URL
    .replace(/\/_next\/image\?url=([^&]+)&[^"]*/g, (_, encodedUrl) => decodeURIComponent(encodedUrl))
    // Remove class attributes
    .replace(/\sclass="[^"]*"/g, '')
    // Remove data-* attributes
    .replace(/\sdata-[^=]+="[^"]*"/g, '')
    // Remove srcset
    .replace(/\ssrcset="[^"]*"/g, '')
    // Remove decoding, loading, etc.
    .replace(/\s(decoding|loading)="[^"]*"/g, '')
    // Optional: trim unnecessary white spaces
    .replace(/\s{2,}/g, ' ');
};
