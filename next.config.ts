// next.config.js (Next 13/14/15 ESM)
export default {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      // kadang pakai host regional:
      { protocol: "https", hostname: "scontent-*.cdninstagram.com" },
      { protocol: "https", hostname: "instagram.f**.fbcdn.net" }, // opsional, beberapa region
    ],
  },
};
