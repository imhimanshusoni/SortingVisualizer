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
  const [arr, setArr] = useState(generateRandomArray(arrLen, 10, 50));
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const handleReset = () => {
    setArr(generateRandomArray(arrLen, 10, 50));
  };

  const bubbleSort = () => {
    const newArr = [...arr];
    const steps = [];
    const highlights = [];
    for (let i = 0; i < newArr.length; ++i) {
      for (let j = 0; j < newArr.length - i - 1; ++j) {
        highlights.push([j, j + 1]);
        if (newArr[j] > newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
        steps.push([...newArr]);
      }
    }
    console.log(highlights);
    console.log(steps);

    steps.forEach((step, index) => {
      setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * 1500);
    });

    setTimeout(() => setHighlightedIndices([]), steps.length * 1500);
  };

  const selectionSort = () => {
    const newArr = [...arr];
    const steps = [];
    const highlights = [];
    let n = newArr.length;
    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
        highlights.push([i, j]);
        steps.push([...newArr]);
        if (newArr[j] < newArr[min_idx]) {
          min_idx = j;
        }
      }
      if (min_idx !== i) {
        let temp = newArr[i];
        newArr[i] = newArr[min_idx];
        newArr[min_idx] = temp;
        highlights.push([i, min_idx]);
        steps.push([...newArr]);
      }
    }

    console.log(highlights);
    console.log(steps);
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * 1500);
    });
    setTimeout(() => setHighlightedIndices([]), steps.length * 1500);
  };

  const insertionSort = () => {
    const newArr = [...arr];
    const steps = [];
    const highlights = [];
    for (let i = 1; i < newArr.length; i++) {
      let key = newArr[i];
      let j = i - 1;
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        newArr[j] = key;
        highlights.push([j, j + 1]);
        steps.push([...newArr]);
        j = j - 1;
      }
      //   }

      //   newArr[j + 1] = key;
      //   highlights.push([j + 1]);
      //   steps.push([...newArr]);
    }
    console.log(steps);
    console.log(highlights);
    steps.forEach((step, index) => {
      setTimeout(() => {
        setArr(step);
        setHighlightedIndices(highlights[index] || []);
      }, index * 1500);
    });

    setTimeout(() => setHighlightedIndices([]), steps.length * 1500);
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
          </div>
        </p>
        <div id="array-items-container">
          {arr.map((x, idx) => {
            return (
              <div
                className="array-items"
                id={x}
                style={{
                  height: `${x}%`,
                  backgroundColor: highlightedIndices.includes(idx)
                    ? "green"
                    : "lightblue",
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
