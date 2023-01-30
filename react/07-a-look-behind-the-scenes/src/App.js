import React, { useState, useCallback, useMemo } from "react";

import Button from "./components/UI/Button/Button";
// import DemoOutput from "./components/UI/Button/Demo/DemoOutput";

import "./App.css";
import DemoList from "./components/UI/Button/Demo/DemoList";

function App() {
  const [listTitle, setListTitle] = useState('My List')
  // const [showParagraph, setShowParagraph] = useState(false);
  // const [allowToggle, setAllowToggle] = useState(false);

  // const toggleParagraphHandler = useCallback(() => {
  //   if (allowToggle) {
  //     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  //   }
  // }, [allowToggle]);

  // const allowToggleHandler = () => {
  //   setAllowToggle((prevAllotToggle) => !prevAllotToggle); 
  // };

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Toggle Paragraph</Button>
      {/* <Button onClick={allowToggleHandler}>Allow Toggling</Button> */}
    </div>
  );
}

export default App;
