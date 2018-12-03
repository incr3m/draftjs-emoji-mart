import React from "react";
import { Emoji } from "emoji-mart";

export default function Iconify({ type, emojiStyle, ...rest }) {
  return (
    <span {...rest}>
      <Emoji emoji={type} size={16} style={emojiStyle} />
    </span>
  );
}
