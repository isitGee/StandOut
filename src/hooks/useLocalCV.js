import { useEffect, useRef, useState } from "react";
import { emptyCV } from "../data/cvSchema.js";
import { loadCV, saveCV } from "../engine/storage.js";

export function useLocalCV() {
  const [cv, setCV] = useState(() => loadCV(emptyCV));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    saveCV(cv);
  }, [cv]);

  const update = (patch) => setCV(c => ({ ...c, ...patch }));
  const updatePersonal = (patch) => setCV(c => ({ ...c, personal: { ...c.personal, ...patch } }));
  const updateTarget = (patch) => setCV(c => ({ ...c, target: { ...c.target, ...patch } }));
  const updatePhoto = (patch) => setCV(c => ({ ...c, photo: { ...c.photo, ...patch } }));
  const updateDesign = (patch) => setCV(c => ({ ...c, design: { ...c.design, ...patch } }));

  return { cv, setCV, update, updatePersonal, updateTarget, updatePhoto, updateDesign };
}
