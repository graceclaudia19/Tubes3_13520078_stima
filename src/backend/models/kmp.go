package models

func kmp_boundary(s string) []int {
	/* I.S. s terdefinisi */
	/* F.S. menghasilkan sebuah array yang menyatakan boundary dari s */
	bound := make([]int, len(s))
	for i := 0; i < len(s); i++ {
		count := len(s[:i]) - 1
		for count >= 0 && s[:i][:count] != s[:i][len(s[:i])-count:] {
			count--
		}
		bound[i] = count
	}
	return bound
}

func KMP(word, pattern string) bool {
	/* I.S. word dan pattern terdefinisi */
	/* F.S. menghasilkan indeks awal dan akhir dari occurence pattern di word, apabila tidak ditemukan dikembalikan -1,-1 */
	bound := kmp_boundary(pattern)
	idx := 0
	idx_pattern := 0
	for idx <= len(word)-len(pattern) {
		for idx_pattern < len(pattern) {
			if word[idx] != pattern[idx_pattern] {
				break
			}
			idx_pattern++
			idx++
		}
		if idx_pattern == len(pattern) {
			return true
		}
		idx_pattern = bound[idx_pattern]
		if idx_pattern == -1 {
			idx++
			idx_pattern = 0
		}
	}
	return false
}
