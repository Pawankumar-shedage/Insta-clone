import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const EmojiDrawer = () => {
  return <Picker data={data} onEmojiSelect={console.log} />;
};
