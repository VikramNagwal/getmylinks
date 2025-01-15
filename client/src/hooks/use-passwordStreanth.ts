export function usePasswordStreanth(password: string) {
    const strengthChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Object.values(strengthChecks).filter(Boolean).length;
  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"][
    strengthScore
  ];
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ][strengthScore];
  return { strengthText, strengthColor, strengthChecks, strengthScore };
}