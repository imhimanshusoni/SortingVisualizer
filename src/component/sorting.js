import { useState } from "react";
import "./sorting.css";

const Sorting = () => {
  const generateRandomArray = (n, min = 0, max = 100) => {
    let arr = [];
    for (let i = 0; i < n; ++i) {
      arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
  };

  const [arrLen, setArrLen] = useState(7);
  const [arr, setArr] = useState(generateRandomArray(arrLen, 10, 60));
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [animation, setAnimation] = useState([]);
  const setTimeoutId = [];

  const handlePlaybackSpeed = (event) => {
    if (animation) animation.forEach((x) => clearTimeout(x));
    setHighlightedIndices([]);
    setPlaybackSpeed(event.target.value);
  };

  const handleReset = () => {
    if (animation) animation.forEach((x) => clearTimeout(x));
    setHighlightedIndices([]);
    setArr(generateRandomArray(arrLen, 10, 50));
  };

  const bubbleSort = () => {
    if (animation) animation.forEach((x) => clearTimeout(x));
    setHighlightedIndices([]);
    const newArr = [...arr];
    const steps = [];
    const highlights = [];
    for (let i = 0; i < newArr.length; ++i) {
      for (let j = 0; j < newArr.length - i - 1; ++j) {
        highlights.push([
          { index: j, type: "compare" },
          { index: j + 1, type: "compare" },
        ]);
        steps.push([...newArr]);
        if (newArr[j] > newArr[j + 1]) {
          highlights.push([
            { index: j, type: "swap" },
            { index: j + 1, type: "swap" },
          ]);
          steps.push([...newArr]);
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
          highlights.push([
            { index: j, type: "placement" },
            { index: j + 1, type: "placement" },
          ]);
          steps.push([...newArr]);
        }
      }
    }

    steps.forEach((step, index) => {
      let id = setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * playbackSpeed);
      setTimeoutId.push(id);
    });

    let id = setTimeout(
      () => setHighlightedIndices([]),
      steps.length * playbackSpeed
    );
    setTimeoutId.push(id);
    setAnimation(setTimeoutId);
  };

  const selectionSort = () => {
    if (animation) animation.forEach((x) => clearTimeout(x));
    setHighlightedIndices([]);
    const newArr = [...arr];
    const steps = [];
    const highlights = [];
    let n = newArr.length;
    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
        highlights.push([
          { index: i, type: "compare" },
          { index: j, type: "compare" },
        ]);
        steps.push([...newArr]);
        if (newArr[j] < newArr[min_idx]) {
          min_idx = j;
          highlights.push([
            { index: i, type: "swap" },
            { index: j, type: "swap" },
          ]);
          steps.push([...newArr]);
        }
      }
      if (min_idx !== i) {
        highlights.push([
          { index: i, type: "swap" },
          { index: min_idx, type: "swap" },
        ]);
        steps.push([...newArr]);
        let temp = newArr[i];
        newArr[i] = newArr[min_idx];
        newArr[min_idx] = temp;
        highlights.push([
          { index: i, type: "placement" },
          { index: min_idx, type: "placement" },
        ]);
        steps.push([...newArr]);
      }
    }

    steps.forEach((step, index) => {
      let id = setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * playbackSpeed);
      setTimeoutId.push(id);
    });
    let id = setTimeout(
      () => setHighlightedIndices([]),
      steps.length * playbackSpeed
    );
    setTimeoutId.push(id);
    setAnimation(setTimeoutId);
  };

  // const insertionSort = () => {
  //   const newArr = [...arr];
  //   const steps = [];
  //   const highlights = [];
  //   for (let i = 0; i < newArr.length; i++) {
  //     let j = i;
  //     highlights.push([{ index: i, type: "compare" }]);
  //     steps.push([...newArr]);
  //     while (j > 0 && newArr[j - 1] > newArr[j]) {
  //       highlights.push([
  //         { index: i, type: "compare" },
  //         { index: j - 1, type: "swap" },
  //         { index: j, type: "swap" },
  //       ]);
  //       steps.push([...newArr]);
  //       [newArr[j - 1], newArr[j]] = [newArr[j], newArr[j - 1]];
  //       highlights.push([
  //         { index: i, type: "compare" },
  //         { index: j, type: "placement" },
  //         { index: j - 1, type: "placement" },
  //       ]);
  //       steps.push([...newArr]);
  //       j--;
  //       // highlights.push([{ index: j, type: "compare" }]);
  //       // steps.push([...newArr]);
  //     }
  //   }

  //   steps.forEach((step, index) => {
  //     setTimeout(() => {
  //       setArr(step);
  //       setHighlightedIndices(highlights[index] || []);
  //     }, index * playbackSpeed);
  //   });

  //   setTimeout(() => setHighlightedIndices([]), steps.length * playbackSpeed);
  // };

  const insertionSort = () => {
    if (animation) animation.forEach((x) => clearTimeout(x));
    setHighlightedIndices([]);
    const newArr = [...arr];
    const steps = [];
    const highlights = [];

    for (let i = 0; i < newArr.length; i++) {
      let j = i;
      highlights.push([{ index: i, type: "compare" }]);
      steps.push([...newArr]);
      while (j > 0 && newArr[j - 1] > newArr[j]) {
        highlights.push([
          { index: i, type: "placement" },
          { index: j - 1, type: "compare" },
          { index: j, type: "compare" },
        ]);
        steps.push([...newArr]);
        [newArr[j - 1], newArr[j]] = [newArr[j], newArr[j - 1]];
        highlights.push([
          { index: i, type: "placement" },
          { index: j - 1, type: "placement" },
          { index: j, type: "placement" },
        ]);
        steps.push([...newArr]);
        j--;
      }
    }

    steps.forEach((step, index) => {
      let id = setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * playbackSpeed);
      setTimeoutId.push(id);
    });

    let id = setTimeout(
      () => setHighlightedIndices([]),
      steps.length * playbackSpeed
    );
    setTimeoutId.push(id);
    setAnimation(setTimeoutId);
  };

  return (
    <>
      <div id="array-container">
        <p>
          Array:{" "}
          {arr.map((x) => {
            return `${x} `;
          })}
          <div id="array-length-container">
            N ={" "}
            <input
              id="user-arr-size"
              type="number"
              autocomplete="off"
              min="1"
              max="10"
              value={arrLen}
              onChange={(e) => setArrLen(e.target.value)}
            ></input>
            <button className="array-container-buttons" onClick={handleReset}>
              Random
            </button>
            <select id="playback-speed" onChange={handlePlaybackSpeed}>
              <option value={2000}>0.50x</option>
              <option value={1350}>0.75x</option>
              <option value={1000} selected="selected">
                1.00x
              </option>
              <option value={650}>1.50x</option>
              <option value={500}>2.00x</option>
            </select>
          </div>
        </p>
        <div id="array-items-container">
          {arr.map((x, idx) => {
            return (
              <div
                className={`array-items ${
                  highlightedIndices.find((h) => h.index === idx)?.type
                    ? `highlight-${
                        highlightedIndices.find((h) => h.index === idx).type
                      }`
                    : "highlight-default"
                }`}
                style={{
                  height: `${x}%`,
                }}
              >
                {x}
              </div>
            );
          })}
        </div>
        <div id="array-button-container">
          <button onClick={bubbleSort}>Bubble Sort</button>
          <button onClick={selectionSort}>Selection Sort</button>
          <button onClick={insertionSort}>Insertion Sort</button>
        </div>
      </div>
    </>
  );
};

export default Sorting;
