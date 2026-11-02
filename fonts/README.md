# Fonter

Fontene ligger på eget domene, så nettleseren ikke kontakter Google når noen besøker siden.

| Familie | Fil | Vekter (variabel) | Lisens |
|---|---|---|---|
| Space Grotesk | `spacegrotesk/spacegrotesk-latin.woff2` | 300-700 | SIL OFL 1.1, `spacegrotesk/OFL.txt` |
| Manrope | `manrope/manrope-latin.woff2` | 200-800 | SIL OFL 1.1, `manrope/OFL.txt` |
| JetBrains Mono | `jetbrainsmono/jetbrainsmono-latin.woff2` | 400-800 | SIL OFL 1.1, `jetbrainsmono/OFL.txt` |

## Hvor filene kom fra

Hentet 2. november 2026:

- **Fontfilene:** Googles latin-subset (woff2), de samme filene som `fonts.googleapis.com/css2` ga besøkende før flyttingen. Uendret.
- **Lisensene:** `OFL.txt` fra `github.com/google/fonts`, under `ofl/<familie>/`.

Ingen av de tre lisensene har «Reserved Font Name», så det er lov å bruke et subset under originalnavnet.

## Dekning

Latin-subsettet dekker U+0000-00FF og noen få tegn til, blant annet æøå, € og typografiske anførselstegn. Symbolene sida bruker (→ ↗ ∞ ★ ♫ ▌) finnes ikke i noe av Googles subset for disse familiene, og de ble tegnet med systemfonten før flyttingen også.

Brukes `font-weight` utenfor vektområdet i tabellen, velger nettleseren nærmeste vekt.
