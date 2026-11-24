// Monday, Reviewed in One Line — entry program.
// Writes exactly one line (a review of the entrant's own Monday) to
// /output/entry.txt. Deterministic: no randomness, no clock, no network.
// The line is hard-coded; the program guards its length and verifies the
// written file by reading it back before exiting.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Monday review: I snoozed the alarm four times, my laptop updated for an hour, and my to-do list got promoted instead of me.";

// Gate: the entry must be 1-200 characters of real text, a single line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(
    `entry line must be 1-200 characters, got ${LINE.length}`,
  );
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read-back verification: the file must contain exactly this line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("read-back verification failed: entry.txt mismatch");
}
