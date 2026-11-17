# RunLog 10.1

Diario di corsa in un solo file HTML: piano di allenamento che si rigenera dai parametri,
registro allenamenti, monitoraggio del tendine, analisi del carico. I dati restano nel
browser del dispositivo (localStorage); nessun server.

## File

| File | A cosa serve |
|---|---|
| `index.html` | L'app completa. Funziona anche da sola, aperta dal telefono. |
| `sw.js` | Service worker: app installabile e utilizzabile senza rete (solo online). |
| `manifest.webmanifest` | Nome, colori e icone per "Aggiungi a schermata Home". |
| `icon-192.png`, `icon-512.png` | Icone dell'app. |
| `google-apps-script.txt` | Script da incollare nel Google Sheet (backup e ripristino). |
| `piano-2026-11-16.json` | Il piano di default (18 settimane fino alla mezza del 21/03/2027), per consultazione. |

## Metterla online (15 minuti, gratis)

1. Crea un account su github.com e un repository **pubblico**, ad esempio `runlog`.
2. **Add file → Upload files**: carica `index.html`, `sw.js`, `manifest.webmanifest`,
   `icon-192.png`, `icon-512.png`. Conferma con **Commit changes**.
3. **Settings → Pages**: Source "Deploy from a branch", Branch `main`, cartella `/ (root)`, **Save**.
4. Entro una decina di minuti apri `https://TUONOME.github.io/runlog/` dal telefono.
   In RunLog: **Altro → Impostazioni → Versione online → Installa sulla schermata Home**,
   oppure dal menu del browser: Installa app (Chrome) o Aggiungi al telefono (Edge).
   Usa sempre lo stesso browser: Chrome ed Edge tengono archivi separati.
5. Porta i dati: nella versione vecchia **Scarica backup**, in quella online
   **Altro → Impostazioni → Carica backup**. La versione aperta da file e quella online
   hanno archivi separati.

Il codice è pubblico, i dati no: restano nel telefono.

### Aggiornare l'app

Carica il nuovo `index.html` nel repository (stesso nome: sostituisce il vecchio).
Alla successiva apertura con rete l'app si aggiorna da sola. Se cambi icone o manifest,
aumenta il numero di versione in `sw.js` (`runlog-v10.1`).

## Backup su Google Sheet (10 minuti, facoltativo)

1. Crea un foglio su sheets.google.com.
2. **Estensioni → Apps Script**: cancella tutto, incolla `google-apps-script.txt`.
3. **Esegui il deployment → Nuovo deployment → App web**.
   Esegui come: te stesso. Accesso: Chiunque. Autorizza.
4. Copia l'URL che finisce con `/exec` in **Altro → Impostazioni → Google Sheet** e premi **Prova**.

Da quel momento ogni allenamento finisce nel foglio "Corse" e l'intero diario viene salvato
nel foglio "Backup". Su un altro telefono: incolla lo stesso URL e premi **Ripristina**.
Chi conosce l'URL può leggere il backup: non condividerlo.

## Come funziona, in breve

- **Piano**: calcolato da PB 10 km, lungo attuale, date delle gare e giorno del calcio.
  Tre corse a settimana, tre settimane a salire e una di scarico. Si rigenera da
  **Piano → Rigenera** e gli allenamenti già registrati vengono ricollegati per data.
- **Adattamento**: check mattutino ≥7 annulla la seduta; rigidità +2 da ieri toglie la qualità;
  achille ≥5 all'ultimo allenamento trasforma le ripetute in corsa facile.
- **Carico**: km degli ultimi 7 giorni contro la media delle 4 settimane precedenti; avviso oltre +40%.
- **Log**: km, tempo, sforzo, dolori, scarpe; import da file GPX con parziali al km.

Il codice in `index.html` è commentato sezione per sezione (nucleo, piano, motore, pagine).

RunLog è un diario, non un parere medico: carichi ed esercizi vanno decisi con chi ti segue.
