import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Entity,
  Modifier,
  CompositeDecorator
} from "draft-js";
import Icon from "./Icon";
import EmojiDecorator from "./EmojiDecorator";
import "emoji-mart/css/emoji-mart.css";
import { NimblePicker } from "emoji-mart";
import data from "emoji-mart/data/emojione.json";

import "draft-js/dist/Draft.css";
import "draft-js-hashtag-plugin/lib/plugin.css";


const customEmojis = [
  {
    name: "Octocat",
    short_names: ["octocat"],
    text: "",
    emoticons: [],
    keywords: ["github"],
    imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
  }
];

export default function Text(props) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(new CompositeDecorator([EmojiDecorator]))
  );
  const [showSelector, setShowSelector] = React.useState(false);
  React.useEffect(
    () => {
      console.log("editState.toJS()", editorState.toJS()); //TRACE
    },
    [editorState]
  );
  const onChange = state => {
    setEditorState(state);
  };
  return (
    <>
      <span
        style={{
          padding: 5,
          cursor: "pointer",
          backgroundColor: showSelector ? "darkgray" : "inherit"
        }}
        onClick={() => setShowSelector(!showSelector)}
      >
        <Icon type=":smile:" />
      </span>
      <Editor
        editorState={editorState}
        placeholder="test"
        onChange={onChange}
      />
      <NimblePicker
        set="emojione"
        custom={customEmojis}
        data={data}
        showSkinTones={false}
        skin={1}
        style={{ width: "100%", border: "none" }}
        onSelect={emoji => {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEmojiEntity = contentState.createEntity(
            "EMOJI",
            "IMMUTABLE",
            { emoji: emoji.colons }
          );
          const entityKey = contentStateWithEmojiEntity.getLastCreatedEntityKey();
          
          const contentStateWithEmoji = Modifier.insertText(
            contentStateWithEmojiEntity,
            contentStateWithEmojiEntity.getSelectionAfter(),
            `${emoji.colons} `,
            null,
            entityKey
          );
          
          const newEditorState = EditorState.push(
            editorState,
            contentStateWithEmoji
          );
          console.log(
            "contentStateWithEmoji.toJS()",
            contentStateWithEmoji.toJS()
          ); //TRACE
          setEditorState(newEditorState);
        }}
      />
    </>
  );
}
