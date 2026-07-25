/**
 * Generates a unique government-standard format Health ID
 * Format: HID-YYYY-XXXX-XXXX
 * Example: HID-2026-4819-2041
 */
const generateHealthId = () => {
  const year = new Date().getFullYear();
  const part1 = Math.floor(1000 + Math.random() * 9000);
  const part2 = Math.floor(1000 + Math.random() * 9000);
  return `HID-${year}-${part1}-${part2}`;
};

module.exports = generateHealthId;
