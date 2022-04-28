package models

func value(word, pattern string) map[string]int {
	/* I.S. word pattern terdefinisi */
	/* F.S. menghasilkan map yang berisi indeks terakhir pada pattern dari setiap karakter di word, -1 jika tidak ditemukan */
	value := map[string]int{}
	for _, val := range word {
		_, ok := value[string(val)]
		if !ok {
			i := len(pattern) - 1
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
		for j >= 0 {
			if word[i+j] != pattern[j] {
				break
			}
			j--
		}

		if j == -1 {
			return true
		}

		if value[string(word[i+j])] == -1 {
			i += len(pattern) - 1
		} else if value[string(word[i+j])] < j {
			i += j - value[string(word[i+j])]
		} else if value[string(word[i+j])] > j {
			i++
		}
	}
	return false
}
