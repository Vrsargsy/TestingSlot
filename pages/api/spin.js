export default function handler(req, res) {
  const symbols = ["🍒", "🍋", "🔔", "🍇", "💎"];
  const result = Array(3)
    .fill()
    .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    .join("");
  const newBalance = 990;
  res.status(200).json({ result, newBalance });
}