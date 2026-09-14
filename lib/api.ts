import type { Match, Stream } from '@/components/site-shell'

const matchesUrl =
  "https://supplied-comprehensive-penguin-encouraging.trycloudflare.com/getGames"

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


```ts
export async function getStreams(matchLink: string): Promise<Stream[]> {
  const response = await fetch(
    `https://supplied-comprehensive-penguin-encouraging.trycloudflare.com/getGameServers?gameHref=${encodeURIComponent(matchLink)}`,
    {
      next: { revalidate: 60 },
    }
  );

  // Try to read the API response even when status is not 2xx
  const data = await response.json().catch(() => null);

  // Expected cases such as no iframe / no servers
  if (!response.ok) {
    console.error("getStreams error:", data?.error);

    return [];
  }

  // API returns: { list: [...] }
  return data?.list ?? [];
}
```


//   if (!response.ok) throw new Error("تعذر تحميل روابط البث");
//   return response.json();
// }
