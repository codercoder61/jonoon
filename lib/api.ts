import type { Match, Stream } from '@/components/site-shell'

const matchesUrl =
  "https://green-warrior-pharmacies-exceptions.trycloudflare.com/getGames"

export async function getMatches(): Promise<Match[]> {
  const response = await fetch(matchesUrl, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('تعذر تحميل المباريات')
  }

  const data = await response.json()


  return data
}


export async function getStreams(matchLink: string): Promise<Stream[]> {
  const response = await fetch(`http://localhost:3001/getGameServers?gameHref=${encodeURIComponent(matchLink)}`, {
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error('تعذر تحميل المباريات')
  }

  const data = await response.json()


  return data
}

// export async function getStreams(matchLink: string): Promise<Stream[]> {
//   const response = await fetch(
//     `http://localhost:3001/getGameServers?gameHref=${encodeURIComponent(matchLink)}`,
//     { next: { revalidate: 30 } },
//   );
//   if (!response.ok) throw new Error("تعذر تحميل روابط البث");
//   return response.json();
// }
