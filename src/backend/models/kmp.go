package models

func kmp_boundary(s string) []int {
	/* I.S. s terdefinisi */
	/* F.S. menghasilkan sebuah array yang menyatakan boundary dari s */
	bound := make([]int, len(s))
	for i := 0; i < len(s); i++ {
		count := len(s[:i]) - 1

		// mencari kesamaan suffix dengan prefix
		// pengujian dimulai dari satu kata penuh, dan berhenti saat terdapat kesamaan suffix dan prefix / index < 0 , yang berarti tidak ada yang sama
		for count >= 0 && s[:i][:count] != s[:i][len(s[:i])-count:] {
			count--
		}

		// assign value kesamaan prefix dan suffix terpanjang ke tabel bound
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

	// Untuk setiap iterasinya, diuji substring sepanjang len(pattern)
	for idx <= len(word)-len(pattern) {

		// idx_pattern sementara maju apabila karakter sama, hingga len(pattern) terpenuhi atau karakter berbeda
		for idx_pattern < len(pattern) {
			if word[idx] != pattern[idx_pattern] {
				break
			}
			idx_pattern++

			// idx sebagai indeks utama akan senantiasa maju
			idx++
		}

		// Apabila panjang pattern sementara == panjang pattern yang dicari, dapat dipastikan pattern ditemukan, kembalikan true
		if idx_pattern == len(pattern) {
			return true
		}

		// Apabila berbeda, sesuaikan pergerakan dengan tabel bound yang sudah dibuat
		idx_pattern = bound[idx_pattern]
		if idx_pattern == -1 {
			idx++
			idx_pattern = 0
		}
	}
	return false
}
