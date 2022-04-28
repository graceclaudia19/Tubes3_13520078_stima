package models

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func levenshtein(word, pattern string) float64 {
	/* I.S. s dan t terdefinisi */
	/* F.S. menghasilkan ratio kemiripan berupa levenshtein_dist / length(word) */
	matrix := make([][]int, len(pattern)+1)
	for i := range matrix {
		matrix[i] = make([]int, len(word)+1)
	}

	//horizon sides
	for i := 0; i <= len(word); i++ {
		matrix[0][i] = i
	}

	//vertical sides
	for i := 0; i <= len(pattern); i++ {
		matrix[i][0] = i
	}

	//filling matrix with surrounding algorithm
	for i := 1; i <= len(pattern); i++ {
		for j := 1; j <= len(word); j++ {
			if word[j-1] == pattern[i-1] {
				matrix[i][j] = min(min(matrix[i][j-1]+1, matrix[i-1][j])+1, matrix[i-1][j-1])
			} else {
				matrix[i][j] = min(min(matrix[i][j-1], matrix[i-1][j-1]), matrix[i-1][j]) + 1
			}
		}
	}
	return float64(len(word)-matrix[len(pattern)][len(word)]) * 100.0 / float64(len(word))
}

func MovingPatternSimilarity(word, pattern string) float64 {
	/* I.S. word dan pattern terdefinisi, dipastikan len(word) >= len(pattern) */
	/* F.S. menghasilkan ratio tertinggi kemiripan untuk setiap substring dengan panjang len(word) */
	maxPercentage := 0.0
	for i := 0; i < len(word)-len(pattern)+1; i++ {
		percentage := (levenshtein(word[i:i+len(pattern)], pattern))
		if percentage > maxPercentage {
			maxPercentage = percentage
		}
	}
	return maxPercentage
}
