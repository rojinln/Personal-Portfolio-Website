import { Sprite } from "./ui";

// Original pixel-art self-portrait: girl with a bow peeking over a laptop.
const ROWS = [
  "......HHHH..PP..",
  "....HHHHHHHHPPPP",
  "...HHHHHHHHHHPP.",
  "..HHHHhHHHHHHH..",
  "..HHSSSSSSSShH..",
  ".HHSSSSSSSSSSHH.",
  ".HHSEESSSSEESHH.",
  ".HHSEWSSSSEWShH.",
  ".HHSBSSSSSSBSHH.",
  ".HHSSSSMMSSSSHH.",
  ".hHHSSSSSSSSHHH.",
  ".HHHHSSSSSSHHHh.",
  ".HHHTTTTTTTTHHH.",
  ".HHTTTTTTTTTTHH.",
  ".LLLLLLLLLLLLLL.",
  ".LGGGRRGRRGGGGL.",
  ".LGGGRRRRRGGGGL.",
  ".LGGGGRRRGGGGGL.",
  ".LGGGGGRGGGGGGL.",
  ".LLLLLLLLLLLLLL.",
];

const PALETTE = {
  H: "#5b3274",
  h: "#7a4a96",
  P: "#ff5fae",
  S: "#f5cdb4",
  E: "#2a1236",
  W: "#ffffff",
  B: "#ff9cc9",
  M: "#d9607f",
  T: "#b79cff",
  L: "#cfc3dd",
  G: "#efe7f7",
  R: "#ff5fae",
};

export function Avatar({ size = 220 }: { size?: number }) {
  return <Sprite rows={ROWS} size={size} palette={PALETTE} label="Pixel-art portrait of Rojin behind a laptop" />;
}
