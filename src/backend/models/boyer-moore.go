package models

func value(word, pattern string) map[string]int {
	/* I.S. word pattern terdefinisi */
	/* F.S. menghasilkan map yang berisi indeks terakhir pada pattern dari setiap karakter di word, -1 jika tidak ditemukan */
	value := map[string]int{}
	for _, val := range word {
		_, ok := value[string(val)]

		// Apabila belum ada karakter yang sama di tabel value, daftarkan
		if !ok {
			i := len(pattern) - 1
			// iterasi berlangsung hingga karakter ditemukan / -1 jika tidak ada karakter
			for i >= 0 {
				if string(pattern[i]) == string(val) {
					break
				}
				i--
			}
			value[string(val)] = i
		}
	}
	return value
}

func BoyerMoore(word, pattern string) bool {
	/* I.S. word dan pattern terdefinisi */
	/* F.S. menghasilkan indeks awal dan akhir dari occurence pattern di word, apabila tidak ditemukan dikembalikan -1,-1 */
	value := value(word, pattern)
	i := 0
	for i <= len(word)-len(pattern) {
		j := len(pattern) - 1

		// iterasi diberlangsungkan dari kanan ke kiri, hingga -1 atau ketidaksamaan karakter
		for j >= 0 {
			if word[i+j] != pattern[j] {
				break
			}
			j--
		}

		// Apabila -1 dikembalikan, artinya terdapat matching pattern
		if j == -1 {
			return true
		}

		// Apabila -1 tidak dikembalikan, disesuaikan hasilnya dengan tabel value indeks yang telah dibuat
		// KASUS 1, karakter tidak ditemukan di pattern
		if value[string(word[i+j])] == -1 {
			i += len(pattern) - 1

			// KASUS 2, karakter ditemukan di sisi kiri
		} else if value[string(word[i+j])] < j {
			i += j - value[string(word[i+j])]

			// KASUS 3, karakter ditemukand i sisi kanan
		} else if value[string(word[i+j])] > j {
			i++
		}
	}
	return false
}
