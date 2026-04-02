"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const question = "2 + 2";

  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 278;

    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#004130ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const startDrawing = (e) => {
      drawing.current = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e) => {
      if (!drawing.current) return;

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      drawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };

  }, []);

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#004130ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const submitDrawing = () => {
    const canvas = canvasRef.current;

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "drawing.png";

    link.click();
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.headingDiv}>
        <span>Learn</span>
        <span>Maths</span>
        <span>with</span>
        <span>Fun</span>
      </div>
      <div className={styles.questionBox}>
        <span>What is {question} ?</span>
      </div>
      <canvas ref={canvasRef} id="myCanvas" className={styles.canvas}></canvas>
      <div className={styles.buttonDiv}>
        <button className={styles.submitBtn} onClick={submitDrawing}>Submit</button>
        <button className={styles.resetBtn} onClick={resetCanvas}>Reset</button>
      </div>
      <img className={styles.absoluteImgOne} src="/pencilRide.png" />
      <img className={styles.absoluteImgTwo} src="/numberJoy.png" />
      <img className={styles.absoluteImgThree} src="/splash-orange.png" />
      <img className={styles.absoluteImgFour} src="/splash-blue.png" />
    </div>
  );
}
