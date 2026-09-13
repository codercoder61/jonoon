import { getStreams } from "@/lib/api";
import MatchPlayer from "./MatchPlayer";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const decodedMatchLink = decodeURIComponent(id);

  const streams = await getStreams(decodedMatchLink);

  return <MatchPlayer streams={streams} />;
}