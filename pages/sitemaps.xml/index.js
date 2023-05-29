// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { getServerSideProps } from 'next'
import axios from "lib/axios";

const siteUrl = "https://exepart.com";
export const getServerSideProps = async (ctx) => {
  const res = await axios.get("/search/xrt");
    const fields = res.data.data.map((item) => (siteUrl+"/product/search?q="+item));
  return getServerSideSitemapIndexLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}