Junikom entwickelt Software für Kommunen und öffentliche Auftraggeber. Mit den Produkten arbeiten Verwaltungen, aber auch Politikerinnen und Politiker, die darin öffentliche und interne Inhalte ablegen. Sicherheit ist deshalb kein Zusatz, sondern Teil des Produkts. Als ich das Projekt gestartet habe, war das Ziel klar: Die Entwicklungsteams sollten mit KI schneller liefern, ohne bei Qualität und Sicherheit nachzugeben.

Prompts und Codegenerierung waren dabei nur ein Teil der Arbeit. Im Mittelpunkt stand der Lieferprozess rund um KI: wie ein Kundenproblem zum Ticket wird, welchen Kontext ein Agent braucht, wie das Ergebnis geprüft wird und wer es freigibt.

Ich plane meine Projekte in der Regel auf drei Monate, mit der Option auf eine Verlängerung. Viele Unternehmen buchen danach zwei bis drei weitere Monate. So war es auch bei Junikom. Diese Case Study beschreibt, wo wir gestartet sind, was wir aufgebaut haben, was sich für die Teams verändert hat und woran wir als Nächstes arbeiten.

## Die Ausgangslage

Die Situation bei Junikom ist in vielen deutschen Softwareunternehmen typisch. Einige Entwickler nutzten KI bereits, viele kaum oder gar nicht. Es gab keine Agent-Dateien in den Projekten. Die Repositories der verschiedenen Codebasen waren nicht so beschrieben und eingerichtet, dass ein Coding Agent darin zuverlässig arbeiten konnte. Das Projektwissen lag verteilt in Jira, Confluence und den Köpfen einzelner Mitarbeitender.

Gleichzeitig fehlte die Zeit, das intern zu lösen. Ein CTO kann nicht jeden Entwickler einzeln begleiten. Produktmanager tun sich schwer damit, Entwicklern eine neue Arbeitsweise vorzugeben. Es brauchte jemanden, der direkt mit den Teams arbeitet und den Prozess mit ihnen gemeinsam neu kalibriert.

## Entwicklungsteams auf das nächste Level bringen

Wir haben den gesamten Weg vom Kundenproblem bis zur geprüften Änderung betrachtet. Ein Coding Agent braucht eine klare Aufgabe, die passende Projektdokumentation und Kriterien, anhand derer sich das Ergebnis prüfen lässt. In Pair-Coding-Sessions habe ich gezeigt, wie Coding Agents heute arbeiten und welchen Kontext sie brauchen. Wir haben an echten Tickets gearbeitet, nicht an Demo-Aufgaben, und den Ablauf gemeinsam mit den Teams verbessert: Kontext sammeln, Änderung umsetzen, Ergebnis testen und den Code reviewen.

Von Anfang an haben wir die Token-Nutzung gemessen. Das Ziel war nicht, möglichst viele Tokens zu verbrauchen. Ein hoher Verbrauch allein wäre eher ein Hinweis auf ein schlechtes Setup. Die Zahlen zeigten uns aber, wer KI bereits intensiv nutzt und wer noch kaum damit arbeitet.

Damit wussten wir, wo Unterstützung am meisten bewirkt. Entwickler mit wenig Nutzung bekamen gezielte Sessions. Entwickler, die bereits gut damit arbeiteten, haben in den Team-Meetings gezeigt, wie sie vorgehen. Kollegen aus dem eigenen Team überzeugen oft schneller als ein externer Berater.

## Das Fundament: Agent-Dateien, MCP und eine Wissensbasis

Jedes Repository bekam eine Agent-Datei. Sie beschreibt, was das Projekt tut, wie man es startet, wie man es testet und welche Regeln im Code gelten. Ein Agent muss diese Fragen sonst bei jedem Ticket neu erraten. Ein typischer Aufbau sieht so aus:

```text
AGENTS.md
├── Zweck des Projekts und wichtigste Fachbegriffe
├── Starten, Testen und Linting mit den genauen Befehlen
├── Architektur: Module, Zuständigkeiten, Datenfluss
├── Regeln: Sicherheit, Berechtigungen, Datenschutz
└── Verweise auf Spezifikationen in /docs
```

Dazu kamen MCP-Verbindungen, zum Beispiel zu Atlassian. Damit können Agenten Jira-Tickets und Confluence-Seiten lesen. Für das Onboarding neuer Entwickler war das besonders hilfreich, weil der Agent Fragen zum Projekt mit den richtigen Quellen beantworten konnte.

Ein weiterer Teil der Arbeit bestand darin, das verstreute Projektwissen für Entwickler und Agenten nutzbar zu machen. Die relevanten Inhalte aus Confluence haben wir in Markdown übertragen und als strukturierte Wissensbasis im Repository abgelegt. Gemeinsam mit dem Produktmanager haben wir sie laufend aktuell gehalten. Dadurch konnten Tickets auf dieselben Spezifikationen und Fachbegriffe verweisen, statt dass der Kontext bei jedem Ticket neu zusammengesucht werden musste.

## Verifikation: Wann eine Änderung fertig ist

Wir haben die Definition von „fertig“ erweitert. Ein erfolgreicher Build zeigt noch nicht, ob eine Funktion im Produkt wie erwartet arbeitet. Ein Agent, der Code schreibt, muss deshalb auch prüfen können, ob dieser Code funktioniert. Wir haben den Teams beigebracht, in Schleifen zu arbeiten: Der Agent setzt eine Änderung um, prüft das Ergebnis, liest Fehler und korrigiert gezielt.

Bei Webanwendungen nutzen wir dafür Playwright mit einer isolierten Chrome-Sitzung. Der Agent schreibt einen End-to-End-Test, klickt sich durch die betroffenen Abläufe und prüft, ob die Funktion tatsächlich funktioniert. Das gibt Entwicklern und Reviewern einen konkreten Nachweis für die Änderung. Wie dieser Ablauf im Detail aussieht, beschreibe ich im Artikel [Coding Agents im Team: Kontext, MCP und überprüfbare Ergebnisse](/blog/coding-agents-verifikation).

## Vom Kundenproblem zum Pull Request

Aus diesen Bausteinen entsteht der Ablauf, an dem wir mit Junikom als Nächstes arbeiten. Agent-Dateien, der Zugriff auf Jira und Confluence, die Wissensbasis und die Verifikation mit Playwright sind bereits im Einsatz. Die vollständige Kette, in der ein Agent ein Ticket bis zum Pull Request bearbeitet und eine Demo für den Produktmanager erstellt, ist das Zielbild. Sie ist noch nicht der Standardablauf. In GitLab heißt der Pull Request Merge Request, gemeint ist dasselbe.

1. Ein Kundenproblem oder eine Anfrage wird als Ticket in Jira erfasst.
2. Das Ticket geht an das Entwicklungsteam, mit dem nötigen Kontext, den Anforderungen und Akzeptanzkriterien. Fehlt etwas davon, benennt der Agent die Lücke, bevor die Umsetzung beginnt.
3. Bei einem geeigneten Ticket setzt ein Agent eine erste Version um und öffnet einen Pull Request.
4. Mit einem Verification Skill führt der Agent die relevanten Prüfungen aus und erstellt eine Demo der funktionierenden Änderung. Der Skill beschreibt dem Agenten, wie er die Anwendung startet, den betroffenen Ablauf durchspielt und das Ergebnis aufzeichnet.
5. Der Produktmanager prüft anhand der Demo, ob die Lösung das ursprüngliche Kundenproblem löst und die Funktion wie gewünscht arbeitet.
6. Die Entwickler reviewen den Pull Request mit den Prüfergebnissen und geben ihn frei. Ohne ihre Freigabe wird nichts gemergt oder ausgeliefert.

Ist eine Aufgabe komplex, unklar oder technisch riskant, steigen Entwickler früh ein und übernehmen die Umsetzung selbst. Bei einfachen Änderungen konzentrieren sie sich auf Review und Freigabe, statt die erste Version selbst zu schreiben. Die Verantwortung für den Code bleibt in beiden Fällen beim Team.

## Projektkoordination und ein Agent auf dem VPS

Auch die Projektkoordination profitiert, wenn Informationen aus Tickets, Dokumentation und Code-Reviews leichter zugänglich sind. Dafür haben wir einen Agenten auf einem eigenen VPS eingerichtet, der jederzeit erreichbar ist. Der Produktmanager nutzt ihn heute für Aufgaben außerhalb der Entwicklerwerkzeuge, zum Beispiel für Kommentare in GitLab.

Diese Rolle wollen wir ausbauen. Der Agent soll Diskussionen zusammenfassen, offene Fragen sichtbar halten und technische Rückmeldungen aus Reviews für den Produktmanager verständlich aufbereiten. Die Entscheidungen bleiben bei den Verantwortlichen. Der Agent hilft dabei, den Überblick zu behalten.

Dazu kommen geplante Aufgaben, die täglich oder wöchentlich laufen. Ein Beispiel ist die Rechtslage: Junikom arbeitet viel mit Kommunen. Neue Gesetze und Verordnungen können dort Anpassungen am Produkt erfordern. Ein regelmäßiger Job prüft deshalb Änderungen im rechtlichen Umfeld und fasst zusammen, was für das Produkt relevant werden könnte. So können wir gemeinsam mit dem Kunden frühzeitig planen, statt erst auf eine Anfrage zu reagieren.

## Sicherheit: Pentests mit Open-Source-Modellen

Für Penetrationstests haben wir vor allem Open-Source-Modelle eingesetzt. Proprietäre Modelle von OpenAI oder Anthropic lehnen offensive Sicherheitsaufgaben aufgrund ihrer Schutzmechanismen oft ab, und Details zu Schwachstellen sollen die eigene Infrastruktur ohnehin nicht verlassen.

Für Junikom war das besonders wichtig. Software, die von Kommunen und politischen Akteuren genutzt wird, muss gründlich getestet sein. Die selbst betriebenen Modelle haben es ermöglicht, die Produkte regelmäßig und ohne Datenweitergabe auf Schwachstellen zu prüfen.

## Salesforce: heute MCP, eigene Agenten als Option

Ähnliche Unterstützung haben wir in einem anderen Bereich untersucht. Junikom führt gerade Salesforce ein. Wir haben Claude über MCP mit Salesforce verbunden, sodass Mitarbeitende Daten direkt im Chat abfragen und bearbeiten können.

Außerdem haben wir Agentforce mit einem eigenen agentischen System verglichen. Ein eigener Agent mit Zugriff auf Salesforce ist eine Option für 2027. Er würde Abläufe abdecken, für die die Claude-Oberfläche mit MCP nicht gut geeignet ist, etwa eigene Pipelines, die Kunden selbst anstoßen.

## Compliance: KI-Kompetenz nach Art. 4 AI Act

Der EU AI Act verpflichtet Unternehmen in Art. 4, die KI-Kompetenz ihrer Mitarbeitenden zu fördern. Die Pflicht gilt seit dem 2. Februar 2025. Mit dem Digital Omnibus wurde sie 2026 abgeschwächt: Unternehmen müssen Maßnahmen ergreifen, aber kein bestimmtes Kompetenzniveau garantieren. Für ein Unternehmen, das für Kommunen arbeitet, bleibt eine dokumentierte Schulung trotzdem sinnvoll.

Für Junikom habe ich dazu einen Workshop gehalten. Er deckte diese Themen ab:

| Thema | Inhalt |
| --- | --- |
| Grundlagen | Wie Sprachmodelle arbeiten, was sie können und wo ihre Grenzen liegen |
| Typische Fehler | Halluzinationen, veraltetes Wissen und überzeugend formulierte Falschaussagen erkennen |
| Datenschutz | Welche Daten in welches Werkzeug dürfen und welche Rolle DSGVO und Auftragsverarbeitung spielen |
| Sicherheit | Prompt Injection, Umgang mit Zugangsdaten und Risiken bei Agenten mit Werkzeugzugriff |
| AI Act | Risikoklassen, verbotene Praktiken und Transparenzpflichten im Überblick |
| Verantwortung | Menschliche Prüfung, Freigaben und interne Regeln für den KI-Einsatz |
| Praxis | Übungen mit den Werkzeugen, die das Team tatsächlich nutzt |

Die Inhalte waren nach Rollen gewichtet. Entwickler brauchen mehr zu Sicherheit und Agenten, Vertrieb und Verwaltung mehr zu Datenschutz und dem Prüfen von Ergebnissen. Die Teilnahme und die Inhalte sind dokumentiert, damit Junikom die Maßnahme belegen kann.

Zur Einführung gehörte auch die Frage, wie Mitarbeitende die Werkzeuge im Alltag sicher nutzen. Dafür haben wir die internen Regeln in konkrete Arbeitshilfen übersetzt. Sie geben drei Punkte vor: freigegebene Werkzeuge mit dem dienstlichen Zugang nutzen, personenbezogene Daten minimieren und KI-Ergebnisse vor der Nutzung prüfen. So wurde aus einer Richtlinie eine praktische Orientierung für die unterschiedlichen Rollen im Unternehmen. Wie eine solche Schulung aufgebaut ist und was Art. 4 genau verlangt, beschreibe ich im Artikel [KI-Kompetenz nach Art. 4 AI Act](/blog/ki-kompetenz-schulung-ai-act).

## Ergebnis und nächste Schritte

Nach den ersten drei Monaten hat Junikom das Projekt verlängert. Die Entwicklungsteams arbeiten heute mit beschriebenen Repositories, einer gemeinsam gepflegten Wissensbasis und Agenten, die ihre eigene Arbeit mit Playwright prüfen. Pentests mit Open-Source-Modellen, regelmäßige Prüfungen des rechtlichen Umfelds und eine dokumentierte KI-Schulung mit Arbeitshilfen ergänzen das.

Mit wachsender Erfahrung haben die Entwickler schneller, sicherer und mit weniger Nacharbeit geliefert. Einzelne Teams haben ihre Entwicklungsvorhaben zwei bis drei Monate früher abgeschlossen, als ihre ursprüngliche Planung vorsah. Das ist eine Beobachtung aus diesen Vorhaben und keine Zusage für jedes Projekt.

Als Nächstes geht es um die vollständige Kette vom Ticket bis zum geprüften Pull Request mit Demo für den Produktmanager und um die Unterstützung der Projektkoordination durch den Agenten auf dem VPS.

Wenn Ihr Entwicklungsteam vor einer ähnlichen Ausgangslage steht, lassen Sie uns darüber sprechen. Als Fractional Head of AI und Forward Deployed Engineer arbeite ich direkt mit Ihren Teams und baue die Werkzeuge und Abläufe gemeinsam mit ihnen auf.
