import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const EmojiDrawer = () => {
  return (
    <div style={{ padding: "10px 10px" }}>
      <Picker data={data} onEmojiSelect={console.log} />
    </div>
  );
};
