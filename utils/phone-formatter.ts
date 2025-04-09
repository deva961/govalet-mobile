export const formatCanadianPhone = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 10) return phone; // fallback if not 10 digits

  const area = cleaned.slice(0, 3);
  const middle = cleaned.slice(3, 6);
  const last = cleaned.slice(6, 10);

  return `(${area}) ${middle}-${last}`;
};
