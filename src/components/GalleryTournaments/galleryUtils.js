export const pad2 = (n) => String(n).padStart(2, '0')
export const formatCounter = (i, total) => `${pad2(i + 1)} — ${pad2(total)}`
