/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

export const EmojiDrawer = ({ sendEmoji }) => {
  const handleEmoji = (data) => {
    console.log(data.native);
    sendEmoji(data);
  };
  // console.log("Emoji-> ", selectedEmoji.native);

  return <Picker data={data} onEmojiSelect={handleEmoji} />;
};
