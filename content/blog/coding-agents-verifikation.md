Ein Coding-Agent kann Code schreiben, Tests ausführen und Änderungen vorbereiten. Ob daraus eine brauchbare Funktion wird, hängt davon ab, ob er das richtige Problem bearbeitet und sein Ergebnis tatsächlich prüfen kann. Für ein Unternehmen ist die entscheidende Frage deshalb nicht, welcher Agent die meisten Dateien verändert. Entscheidend ist, ob Entwicklerinnen und Entwickler nachvollziehen können, was sich für die Nutzer verbessert und welche Nachweise dafür vorliegen.

Ich empfehle einen Arbeitsablauf, der mit einem konkreten Ergebnis beginnt. Der Agent bekommt den nötigen Projektkontext, arbeitet in einer eigenen Umgebung und prüft die Funktion über dieselbe Oberfläche, die später Menschen benutzen. Die folgenden Schritte verbinden diese Arbeitsweise mit gezielt ausgewählten MCP-Verbindungen und einer überprüfbaren Browser-Schleife.

## Mit einem überprüfbaren Auftrag beginnen

„Verbessere unser Kundenportal“ ist kein brauchbarer Abnahmepunkt. „Ein Supportmitarbeiter kann einen Vorgang einem Team zuweisen; nach dem Neuladen bleibt die Zuordnung erhalten“ beschreibt dagegen ein beobachtbares Ergebnis. Dazu gehören die Ausgangslage, die erlaubte Testumgebung und der Nachweis, der am Ende erwartet wird.

Ein erster Auftrag kann so aussehen:

```text
Ziel: Ein Supportmitarbeiter weist einen Vorgang dem richtigen Team zu.
Ausgangslage: Der Testvorgang ist noch keinem Team zugeordnet.
Abnahme: Die neue Zuordnung ist nach einem Neuladen weiterhin sichtbar.
Umgebung: Lokale App, eigene Testdaten und separates Browserprofil.
Nachweis: Durchgeführter Nutzerweg, Testausgabe und Fehler-Trace bei Bedarf.
Grenze: Keine Änderungen an produktiven Vorgängen oder Benutzerkonten.
```

Der Agent soll zunächst die bestehende Funktion und ihre Zuständigkeiten lesen. Bei einer kleinen Änderung reichen dafür wenige Dateien und ein kurzer Vorschlag. Bei einem Eingriff in Datenmodell oder Berechtigungen braucht es zuerst eine Entscheidung über die Architektur. Ein Plan ist dann nützlich, wenn er eine echte Unsicherheit auflöst. Eine lange Aufgabenliste allein macht die Umsetzung nicht zuverlässiger.

## Was ich aus Theo und pstack übernehme

Theo Browne unterscheidet in seinem Artikel [„What is a harness?“](https://t3.gg/blog/post/what-is-a-harness) zwischen der Oberfläche für Menschen, dem Modell und der Laufzeit, die Werkzeuge ausführt. Für die Auswahl im Unternehmen ist diese Trennung hilfreich. Ein anderer Chat-Client verändert nicht automatisch die Werkzeuge, mit denen der Agent Code lesen, Prozesse starten oder den Browser bedienen kann.

In seinem Video [„How I code with AI changed a lot“ ab etwa 39:29](https://www.youtube.com/watch?v=xJaMTo2YgO8&t=2369s) betont Theo, dass ein Agent die Mittel erhalten muss, seine Arbeit selbst zu überprüfen. Dazu können Kommandozeilenprogramme, Tests oder Computerbedienung gehören. Meine praktische Ableitung daraus ist, den Verifikationsweg bereits im Auftrag festzulegen. Der Agent soll nicht erst am Ende feststellen, dass er die Anwendung gar nicht starten oder öffnen kann.

Bei Lauren Tans pstack steht die Prüfung am tatsächlichen Ergebnis ebenfalls im Mittelpunkt. Der [pstack-Port von Ahmed Benaw](https://github.com/ahmedbenaw/pstack) dokumentiert Lauren Tan als ursprüngliche Autorin. Seine Prinzipien [„Prove It Works“](https://github.com/ahmedbenaw/pstack/blob/main/skills/principle-prove-it-works/SKILL.md) und [„Test Behavior, Not Implementation“](https://github.com/ahmedbenaw/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md) verlangen Nachweise am Verhalten der Software. Ein erfolgreicher Build und ein grüner Test, der nur die eigene Implementierung nacherzählt, reichen dafür nicht.

Die folgenden Empfehlungen verbinden diese Ansätze mit den offiziellen Werkzeug-Dokumentationen für die Arbeit in einem Unternehmen.

## Kontext aus Jira, Confluence und dem Repository holen

Ein Agent braucht selten das gesamte Unternehmenswissen. Für eine konkrete Änderung sind meist das zugehörige Ticket, die relevante Produktentscheidung, die betroffenen Dateien und die bisherigen Tests hilfreich. Lassen Sie ihn zunächst benennen, welche Frage mit welcher Quelle beantwortet werden soll.

MCP steht für Model Context Protocol. Es vereinheitlicht die Verbindung zwischen einem Agenten-Client und externen Werkzeugen oder Datenquellen. Es ersetzt weder die Berechtigungen des jeweiligen Dienstes noch die Prüfung, ob ein konkreter Aufruf sinnvoll ist. Eine gute Auswahl beginnt mit den vorhandenen Werkzeugen. Wenn ein Repository bereits lokal ausgecheckt ist und die passende CLI vorhanden ist, braucht es für denselben Dateizugriff nicht zusätzlich einen MCP-Server.

Für ein Entwicklungsteam würde ich diese Verbindungen einzeln prüfen:

| Verbindung | Wofür sie nützlich ist | Was vorher feststehen muss |
| --- | --- | --- |
| Atlassian MCP | Anforderungen in Jira und Entscheidungen in Confluence recherchieren | Welche Projekte und Seiten der verwendete Account sehen und verändern darf |
| GitHub MCP | Issues, Pull Requests und Repository-Kontext zusammenführen | Benötigte Toolsets und Rechte, statt pauschal alle Werkzeuge freizugeben |
| GitLab MCP | Projektkontext, Merge Requests und CI-Informationen einbeziehen | Verfügbarkeit auf der eigenen Instanz und Voraussetzungen der gewählten Tools |
| Browser-Werkzeuge | Die lokale Anwendung über ihre echte Oberfläche bedienen | Eigene Testumgebung, Testkonten und ein definierter Abnahmepunkt |

Der [offizielle Atlassian MCP Server](https://support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/) unterstützt sowohl Recherche als auch schreibende Vorgänge. Eine Verbindung zu Confluence ist deshalb nicht automatisch eine ausschließlich lesende Verbindung. Prüfen Sie im Client die tatsächlich angebotenen Werkzeuge und die zugrunde liegenden Zugriffsrechte. Die Einrichtung und verfügbaren Funktionen ändern sich. Übernehmen Sie Endpunkte aus der aktuellen Atlassian-Anleitung, nicht aus einer alten Konfigurationsdatei.

Der [offizielle GitHub MCP Server](https://github.com/github/github-mcp-server/blob/main/docs/server-configuration.md) bietet gezielte Toolsets und einen Read-only-Modus. Für den Remote-Server dokumentiert GitHub beispielsweise den Header `X-MCP-Readonly`. Das ist eine konkrete Begrenzung dieser Server-Verbindung. Es begrenzt nicht gleichzeitig eine separat verfügbare Shell oder ein anderes Werkzeug mit umfassenderen Zugangsdaten.

Auch [GitLab bietet einen offiziellen MCP Server](https://docs.gitlab.com/user/model_context_protocol/mcp_server/). Die Dokumentation unterscheidet Transport, Toolsets und Voraussetzungen bestimmter Funktionen. Ein Eintrag in einer Konfigurationsdatei beweist deshalb noch keine funktionierende Integration. Lassen Sie den Agenten ein bekanntes Test-Issue lesen und eine erwartete Information wiedergeben. Erst danach sollte ein Schreibvorgang in einem dafür vorgesehenen Testprojekt folgen.

## Für jede Aufgabe eine eigene Arbeitsumgebung

Parallele Agenten dürfen nicht versehentlich dieselben Dateien, denselben Datenbestand oder dieselbe angemeldete Browsersitzung verändern. Eine eigene Git-Worktree pro Umsetzung trennt Arbeitskopien. Ein eigener Testmandant oder eine eigene Datenbank trennt Anwendungszustand. Diese Grenzen lösen unterschiedliche Probleme und müssen zusammenpassen.

Das gilt auch für Ports, temporäre Uploads und Testkonten. Wenn zwei Agenten denselben Vorgang bearbeiten, kann ein Test grün werden, weil der andere Agent den gewünschten Zustand bereits erzeugt hat. Weisen Sie deshalb jeder Aufgabe einen eigenen Datensatz zu. Führen Sie parallele Browser-Tests erst ein, wenn die Testdaten ebenfalls unabhängig sind.

Ein separates Chrome-Profil verhindert, dass die Testreise Ihre persönlichen Cookies und Anmeldungen übernimmt. Es macht die besuchte Anwendung nicht automatisch ungefährlich und ist keine Sicherheits-Sandbox für beliebige Programme. Ein eingeloggter Testnutzer kann weiterhin alles tun, wozu sein Account berechtigt ist. Wenn der Agent fremden Code ausführt, gehört zusätzlich die Ausführungsumgebung selbst begrenzt, etwa durch eine dafür eingerichtete VM oder einen Container.

## Mit Playwright durch die echte Oberfläche prüfen

[Playwright Test isoliert Tests über eigene Browser-Kontexte](https://playwright.dev/docs/browser-contexts). Für viele UI-Prüfungen reicht das aus. Wenn Sie ausdrücklich Google Chrome prüfen möchten, können Sie einen [Chrome-Kanal konfigurieren](https://playwright.dev/docs/browsers). Die Tests verwenden weiterhin separate Kontexte und übernehmen nicht Ihr persönliches Standardprofil. Chrome muss dafür auf der Testmaschine installiert sein.

Das folgende Beispiel zeigt eine konkrete Navigation auf dieser Website. Es prüft, ob ein Besucher vom Einstieg zu den Vorträgen gelangt und dort einen bestimmten Konferenzbeitrag findet. Es ist ein Muster für ein Projekt mit den entsprechenden Routen und Texten. In Ihrem Produkt ersetzen Sie diesen Nutzerweg durch den tatsächlich versprochenen Geschäftsprozess.

In einem pnpm-Projekt ohne vorhandene Playwright-Konfiguration beginnen Sie mit:

```sh
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

Eine Konfiguration für `playwright.config.ts` kann so aussehen:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'chrome', use: { channel: 'chrome' } },
  ],
  webServer: {
    command: 'pnpm dev --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
});
```

Der Startbefehl muss zu Ihrer App passen. Playwright startet über seine [webServer-Konfiguration](https://playwright.dev/docs/test-webserver) eine eigene lokale Instanz. `reuseExistingServer: false` verhindert, dass der Test unbemerkt einen bereits laufenden Server verwendet. Verwenden Sie dafür eine lokale Testkonfiguration, deren Backend und Datenbank ebenfalls auf eigene Testdaten zeigen.

Der Nutzerweg liegt beispielsweise in `tests/speaking.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('Besucher findet die Konferenzauftritte', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', {
    name: /Vorträge und Auftritte ansehen/,
  }).click();

  await expect(page).toHaveURL(/\/speaking\/?$/);
  await expect(page.getByRole('heading', {
    name: 'Vorträge und Auftritte.', exact: true,
  })).toBeVisible();
  await expect(page.getByRole('heading', {
    name: 'When Agents Transact: Identity, Delegation and Payments',
    exact: true,
  })).toBeVisible();
});
```

Starten Sie zunächst den mitgelieferten Chromium. Für eine sichtbare Prüfung mit installiertem Google Chrome wählen Sie anschließend das zweite Projekt:

```sh
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=chrome --headed
```

Die [webspezifischen Assertions von Playwright](https://playwright.dev/docs/test-assertions) warten auf den erwarteten Zustand. Das ist belastbarer als pauschal einige Sekunden zu schlafen. Ein Klick allein ist kein Erfolgskriterium. Bei einer schreibenden Produktfunktion muss der Test zusätzlich prüfen, dass der gespeicherte Zustand nach einem Neuladen noch existiert und für den vorgesehenen Benutzer sichtbar ist.

Das Beispiel ersetzt keine Prüfung einer echten Kalenderbuchung, eines Logins oder einer Datenbankänderung. Es zeigt bewusst nur den beschriebenen Leseweg. Externe Dienste und schreibende Abläufe brauchen eigene, passend abgegrenzte Testfälle.

## Fehler in einer kurzen Schleife beheben

Die Schleife besteht aus einem Versuch, einer Beobachtung und einer gezielten Korrektur. Der Agent startet den vereinbarten Nutzerweg, liest beim Fehler die tatsächliche Ausgabe und behebt die erste nachgewiesene Ursache. Danach läuft derselbe Test erneut. Erst wenn dieser Test besteht, folgen die angrenzenden Prüfungen.

Ein [Playwright-Trace](https://playwright.dev/docs/trace-viewer) zeigt die Aktionen und den Zustand der Seite während des Laufs. Das hilft beispielsweise zu unterscheiden, ob ein Klick sein Ziel verfehlt hat oder ob der Server die angeforderte Änderung abgelehnt hat. Ein zusätzlicher Timeout löst keines dieser Probleme automatisch.

Setzen Sie für autonome Schleifen eine Grenze. Nach drei Versuchen ohne neue Erkenntnis sollte der Agent die offene Annahme benennen und untersuchen, statt denselben Lösungsweg weiter auszuschmücken. Diese Zahl ist eine von mir empfohlene Arbeitsregel, keine technische Grenze von Playwright. Ein grüner Lauf nach mehreren unveränderten Wiederholungen ist zunächst ein Hinweis auf Instabilität, kein Nachweis einer Reparatur.

Bei authentifizierten Tests enthalten gespeicherte Zustandsdateien unter Umständen verwendbare Zugangsdaten. Die [Playwright-Dokumentation zur Authentifizierung](https://playwright.dev/docs/auth) empfiehlt, solche Dateien nicht einzuchecken. Verwenden Sie eigene Testkonten, schließen Sie den Browser-Kontext nach dem Lauf und prüfen Sie auch Screenshots und Traces auf personenbezogene Inhalte, bevor Sie sie weitergeben.

## Review und Verantwortung bleiben beim Team

Vor einem Merge sollte eine andere Perspektive die Änderung gegen den ursprünglichen Auftrag prüfen. Das kann eine Entwicklerin sein oder ein unabhängiger Review-Agent mit eng umrissener Aufgabe. Er soll keine Zustimmung produzieren, sondern konkrete Fehler suchen und belegen. Für eine Berechtigungsänderung ist eine negative Nutzerreise besonders wertvoll, etwa der Nachweis, dass ein Benutzer aus Team A einen Vorgang aus Team B weiterhin nicht öffnen kann.

Eine gute Übergabe nennt das Ergebnis für den Anwender, die geprüften Wege und die verbleibenden Grenzen. Sie trennt einen erfolgreich ausgeführten Browser-Test von einem bloß formulierten Testvorschlag. Welche Instanz geprüft wurde und welcher Commit getestet wurde, gehört dazu. So kann das nächste Teammitglied den Nachweis wiederholen.

Mehr Agenten lohnen sich, wenn tatsächlich unabhängige Aufgaben vorliegen. Für dieselbe kleine Änderung vier Agenten schreiben zu lassen, vervielfacht dagegen häufig die Abstimmung. Ich würde zuerst einen klaren Auftrag, ein nutzbares Repository und einen verlässlichen Verifikationsweg herstellen. Erst danach sollte das Team die Parallelität erhöhen.

## So würde ich im Unternehmen starten

Wählen Sie einen häufigen, überschaubaren Änderungsfall. Beschreiben Sie das Nutzerergebnis und die dazugehörigen Testdaten. Verbinden Sie nur die Quellen, die für diese Aufgabe fehlen. Lassen Sie anschließend einen Agenten implementieren und denselben Nutzerweg im isolierten Browser prüfen.

Bewerten Sie danach nicht die Zahl der erzeugten Codezeilen, sondern die Nutzbarkeit des Ergebnisses und den Aufwand für Nacharbeit. Entscheidend ist, ob das Team den Auftrag, die Änderung und ihren Nachweis versteht. Als freiberuflicher Applied AI Engineer und Fractional Head of AI unterstütze ich Unternehmen dabei, genau diesen Ablauf in ihrer bestehenden Entwicklung aufzubauen. Dazu gehören die passenden Werkzeuge, nachvollziehbare Zugriffsrechte und Tests, die das Produkt tatsächlich benutzen.
