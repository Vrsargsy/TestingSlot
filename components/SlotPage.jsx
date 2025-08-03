"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SlotPage() {
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState(null);
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    if (!tokenFromURL) {
      alert("Персональная ссылка недействительна.");
      return;
    }
    setToken(tokenFromURL);
    fetchBalance(tokenFromURL);
  }, []);

  const fetchBalance = async (token) => {
    const res = await fetch(`/api/get_balance?token=${token}`);
    const data = await res.json();
    setBalance(data.balance);
  };

  const spin = async () => {
    if (spinning || balance === null || balance <= 0) return;
    setSpinning(true);
    setResult("...");
    const res = await fetch(`/api/spin?token=${token}`, { method: "POST" });
    const data = await res.json();
    setTimeout(() => {
      setBalance(data.newBalance);
      setResult(data.result);
      setSpinning(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md text-center bg-gray-800 shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Silen Slots</h1>
        <p className="mb-2">
          Ваш баланс: <strong>{balance !== null ? balance : "..."}</strong>
        </p>
        <motion.div
          className="text-3xl font-mono my-6"
          animate={{ rotate: spinning ? 360 : 0 }}
          transition={{ repeat: spinning ? Infinity : 0, duration: 1 }}
        >
          🎰 {result || ""}
        </motion.div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={spinning || balance <= 0}
          onClick={spin}
        >
          Крутить слот
        </button>
      </div>
    </main>
  );
}