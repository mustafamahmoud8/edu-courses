import { leaderboardMessages } from "@/data/dummy-data";

interface LeaderboardModalProps {
  percent: number;
}

const LEADERBOARD_DATA = {
  courseName: "Course Name Shown Here",
  players: Array.from({ length: 6 }, (_, index) => ({
    id: `player-${index + 1}`,
    rank: index + 1,
    name: "Player Placeholder",
  })),
};

export function LeaderboardModal({ percent }: LeaderboardModalProps) {
  const matchedMessage =
    leaderboardMessages.find(({ minimumPercent }) => percent >= minimumPercent)
      ?.message ?? "";

  const encouragement = matchedMessage.replace("{percent}", String(percent));

  return (
    <div className="text-center text-foreground">
      <p className="m-0 mb-1 text-[15px] font-medium">
        {LEADERBOARD_DATA.courseName}
      </p>

      <h2 id="modal-title" className="m-0 mb-4.5 text-lg font-semibold">
        Leaderboard
      </h2>

      <p className="mb-7.5 rounded-[5px] bg-muted p-[16px_18px] text-[15px] leading-[1.85]">
        {encouragement}
      </p>

      <ol
        className="m-0 grid list-none gap-5.5 rounded-[28px] bg-muted p-6"
        aria-label="Leaderboard standings"
      >
        {LEADERBOARD_DATA.players.map((player) => (
          <li
            key={player.id}
            className="relative flex h-16.5 items-center justify-center rounded-md border border-border bg-card"
          >
            <span className="font-bold text-card-foreground">
              #{player.rank} {player.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
