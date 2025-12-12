"use client";

import { useState } from "react";
import AttributeSlider from "../components/AttributeSlider";

export default function Home() {
  // Position
  const [position, setPosition] = useState("ST");

  // Attributes
  const [pace, setPace] = useState(50);
  const [shooting, setShooting] = useState(50);
  const [passing, setPassing] = useState(50);
  const [dribbling, setDribbling] = useState(50);
  const [defending, setDefending] = useState(50);
  const [physical, setPhysical] = useState(50);

  // Height & Weight
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  function handleGenerate() {
    const stats = {
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defending,
      physical,
      height,
      weight,
    };

    // Save for dashboard later
    localStorage.setItem("userStats", JSON.stringify(stats));

    alert("Profile saved!");
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="flex justify-center text-3xl font-bold mb-6">My Football Identity</h1>

      {/* Position Dropdown */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Position</label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option className="text-black" value="ST">Striker (ST)</option>
          <option className="text-black" value="LW">Left Wing (LW)</option>
          <option className="text-black" value="RW">Right Wing (RW)</option>
          <option className="text-black"value="CAM">Attacking Mid (CAM)</option>
          <option className="text-black" value="CM">Midfielder (CM)</option>
          <option className="text-black" value="LM">Left Midfielder (LM)</option>
          <option className="text-black" value="RM">Right Midfielder (RM)</option>
          <option className="text-black" value="CDM">Defensive Mid (CDM)</option>
          <option className="text-black" value="CB">Center Back (CB)</option>
          <option className="text-black" value="LB">Left Back (LB)</option>
          <option className="text-black" value="LWB">Left Wing Back (LWB)</option>
          <option className="text-black" value="RB">Right Back (RB)</option>
          <option className="text-black" value="RWB">Right Wing Back (RWB)</option>
          <option className="text-black" value="GK">Goalkeeper (GK)</option>
        </select>
      </div>

      {/* Attribute Sliders */}
      <AttributeSlider label="Pace" value={pace} setValue={setPace} />
      <AttributeSlider label="Shooting" value={shooting} setValue={setShooting} />
      <AttributeSlider label="Passing" value={passing} setValue={setPassing} />
      <AttributeSlider label="Dribbling" value={dribbling} setValue={setDribbling} />
      <AttributeSlider label="Defending" value={defending} setValue={setDefending} />
      <AttributeSlider label="Physical" value={physical} setValue={setPhysical} />

      {/* Height and Weight */}
      <div className="mb-4">
        <label className="block font-medium">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="mt-6 bg-[#3e1a61] hover:bg-[#2d0f47] text-white px-4 py-2 rounded w-full"
      >
        Generate Profile
      </button>
    </main>
  );
}
