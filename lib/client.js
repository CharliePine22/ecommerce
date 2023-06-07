import sanityClient, { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "omtd7ljt",
  dataset: "production",
  apiVersion: "2023-05-24",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source.asset) return;
  return builder.image(source);
};
