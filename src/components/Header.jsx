// import { useState } from 'react';
import Instructions from './Instructions';

export default function Header({ handleClickEvent, toggleInstruction }) {
  return (
    <div className="header-container">
      <h1>Memory Poke</h1>
      <button className="instructions-btn" onClick={handleClickEvent}>
        Instructions
      </button>
      {toggleInstruction && <Instructions />}
    </div>
  );
}
