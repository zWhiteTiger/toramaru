import AppBar from "@/components/appbar/Appbar";
import VideoPage from "./components/video-page";
import WacthList from "./components/videoFetch";
import Link from "next/link";

export default async function Home() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${process.env.CHANNEL_ID!}&key=${process.env.API_KEY!}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  const item = data.items[0];
  const snippet = item.snippet;
  const statistics = item.statistics;

  const profile = {
    avatar: snippet.thumbnails.high.url,
    title: snippet.title,
    description: snippet.description,
    customUrl: snippet.customUrl,
    subscriberCount: statistics.subscriberCount,
  };

  return (
    <>
      {/* <AppBar
        title={profile.title}
        avatar={profile.avatar}
        description={profile.description}
        subscriberCount={profile.subscriberCount}
        customUrl={profile.customUrl}
      />
      <VideoPage />
      <div className="container mx-auto px-4 py-8 mt-45 md:mt-0">

        <WacthList />

      </div> */}

      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold">
          เว็บไซต์นี้อยู่ในขั้นตอนการพัฒนาใหม่
        </h1>

        <p className="text-muted-foreground">
          สามารถเข้าชมโปรเจกต์อื่น ๆ ได้ที่
        </p>

        <div className="flex flex-col gap-2">
          <Link
            href="https://port.toramaru.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Portfolio
          </Link>

          <Link
            href="https://bytetiger.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            ByteTiger
          </Link>

          <Link
            href="https://lhzn.toramaru.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Team Website
          </Link>
        </div>
      </div>
    </>
  );
}
