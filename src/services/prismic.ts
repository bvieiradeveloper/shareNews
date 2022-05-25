import prismic from "@prismicio/client"

export function getPrismicCliet({req: unknown}){
  const prismicClient = new prismic.Client(process.env.PRISMIC_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    });

  return prismicClient;
}