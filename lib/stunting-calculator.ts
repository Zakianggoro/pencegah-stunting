// Simplified stunting calculation based on WHO growth standards
// In a real application, you would use complete WHO z-score tables

interface GrowthStandard {
  ageMonths: number
  maleHeight: { mean: number; sd: number }
  femaleHeight: { mean: number; sd: number }
  heightWeight: { [key: number]: { mean: number; sd: number } }
}

// Simplified growth standards (normally this would be a comprehensive database)
const growthStandards: GrowthStandard[] = [
  {
    ageMonths: 12,
    maleHeight: { mean: 75.7, sd: 2.9 },
    femaleHeight: { mean: 74.0, sd: 2.8 },
    heightWeight: {
      75: { mean: 9.6, sd: 1.1 },
      74: { mean: 9.2, sd: 1.0 },
    },
  },
  {
    ageMonths: 24,
    maleHeight: { mean: 87.1, sd: 3.3 },
    femaleHeight: { mean: 85.7, sd: 3.2 },
    heightWeight: {
      87: { mean: 12.2, sd: 1.3 },
      86: { mean: 11.9, sd: 1.2 },
    },
  },
  {
    ageMonths: 36,
    maleHeight: { mean: 96.1, sd: 3.7 },
    femaleHeight: { mean: 94.2, sd: 3.6 },
    heightWeight: {
      96: { mean: 14.3, sd: 1.5 },
      94: { mean: 13.9, sd: 1.4 },
    },
  },
  {
    ageMonths: 48,
    maleHeight: { mean: 103.3, sd: 4.0 },
    femaleHeight: { mean: 101.6, sd: 3.9 },
    heightWeight: {
      103: { mean: 16.2, sd: 1.7 },
      102: { mean: 15.8, sd: 1.6 },
    },
  },
  {
    ageMonths: 60,
    maleHeight: { mean: 110.0, sd: 4.2 },
    femaleHeight: { mean: 108.4, sd: 4.1 },
    heightWeight: {
      110: { mean: 18.3, sd: 1.9 },
      108: { mean: 17.8, sd: 1.8 },
    },
  },
]

function calculateZScore(value: number, mean: number, sd: number): number {
  return (value - mean) / sd
}

function getClosestAgeStandard(ageMonths: number): GrowthStandard {
  // Find the closest age standard
  let closest = growthStandards[0]
  let minDiff = Math.abs(ageMonths - closest.ageMonths)

  for (const standard of growthStandards) {
    const diff = Math.abs(ageMonths - standard.ageMonths)
    if (diff < minDiff) {
      minDiff = diff
      closest = standard
    }
  }

  return closest
}

function interpretZScore(zScore: number, type: "height" | "weight"): string {
  if (type === "height") {
    if (zScore < -3) return "Sangat Pendek (Severely Stunted)"
    if (zScore < -2) return "Pendek (Stunted)"
    if (zScore >= -2 && zScore <= 2) return "Normal"
    return "Tinggi"
  } else {
    if (zScore < -3) return "Sangat Kurus (Severely Wasted)"
    if (zScore < -2) return "Kurus (Wasted)"
    if (zScore >= -2 && zScore <= 1) return "Normal"
    if (zScore <= 2) return "Berisiko Gemuk"
    return "Gemuk"
  }
}

export function calculateStuntingStatus(ageMonths: number, height: number, weight: number, gender: string) {
  const standard = getClosestAgeStandard(ageMonths)

  // Calculate height-for-age z-score
  const heightStandard = gender === "male" ? standard.maleHeight : standard.femaleHeight
  const heightZScore = calculateZScore(height, heightStandard.mean, heightStandard.sd)

  // Calculate weight-for-height z-score (simplified)
  const roundedHeight = Math.round(height)
  const weightStandard = standard.heightWeight[roundedHeight] || { mean: weight, sd: 1.5 }
  const weightZScore = calculateZScore(weight, weightStandard.mean, weightStandard.sd)

  // Determine stunting status
  const isStunted = heightZScore < -2
  const heightInterpretation = interpretZScore(heightZScore, "height")
  const weightInterpretation = interpretZScore(weightZScore, "weight")

  let recommendation = ""
  if (isStunted) {
    recommendation =
      "Anak mengalami stunting. Diperlukan intervensi gizi segera, konsultasi dengan ahli gizi, pemberian makanan bergizi tinggi, dan pemantauan rutin pertumbuhan."
  } else if (heightZScore < -1) {
    recommendation =
      "Pertumbuhan anak perlu dipantau lebih ketat. Berikan makanan bergizi seimbang dan lakukan pemeriksaan rutin."
  } else {
    recommendation =
      "Pertumbuhan anak normal. Lanjutkan pola makan sehat dan pemeriksaan rutin untuk memantau pertumbuhan."
  }

  return {
    status: isStunted ? "Stunting" : "Normal",
    heightForAge: `Z-Score: ${heightZScore.toFixed(2)} (${heightInterpretation})`,
    weightForHeight: `Z-Score: ${weightZScore.toFixed(2)} (${weightInterpretation})`,
    recommendation,
  }
}
