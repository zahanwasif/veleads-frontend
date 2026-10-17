import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let phones on the local network load the dev server's scripts.
  // Without this, a phone at http://<your-mac-ip>:3000 renders the HTML but runs no JavaScript.
  // Update the IP if your Mac's address on the network changes.
  allowedDevOrigins: ["192.168.100.130"],
};

export default nextConfig;
