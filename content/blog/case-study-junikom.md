Junikom entwickelt Software für Kommunen und öffentliche Auftraggeber. Mit den Produkten arbeiten Verwaltungen, aber auch Politikerinnen und Politiker, die darin öffentliche und interne Inhalte ablegen. Sicherheit ist deshalb kein Zusatz, sondern Teil des Produkts. Als ich das Projekt gestartet habe, war das Ziel klar: Die Entwicklungsteams sollten mit KI schneller liefern, ohne bei Qualität und Sicherheit nachzugeben.

Ich plane meine Projekte in der Regel auf drei Monate, mit der Option auf eine Verlängerung. Viele Unternehmen buchen danach zwei bis drei weitere Monate. So war es auch bei Junikom. Diese Case Study beschreibt, wo wir gestartet sind, was wir aufgebaut haben und was sich für die Teams verändert hat.

## Die Ausgangslage

Die Situation bei Junikom ist in vielen deutschen Softwareunternehmen typisch. Einige Entwickler nutzten KI bereits, viele kaum oder gar nicht. Es gab keine Agent-Dateien in den Projekten. Die Repositories der verschiedenen Codebasen waren nicht so beschrieben und eingerichtet, dass ein Coding Agent darin zuverlässig arbeiten konnte.

Gleichzeitig fehlte die Zeit, das intern zu lösen. Ein CTO kann nicht jeden Entwickler einzeln begleiten. Produktmanager tun sich schwer damit, Entwicklern eine neue Arbeitsweise vorzugeben. Es brauchte jemanden, der direkt mit den Teams arbeitet und den Prozess mit ihnen gemeinsam neu kalibriert.

## Entwicklungsteams auf das nächste Level bringen

Der Schwerpunkt lag auf der Arbeitsweise der Entwickler. In Pair-Coding-Sessions habe ich gezeigt, wie Coding Agents heute arbeiten, welchen Kontext sie brauchen und wie ein guter Arbeitsablauf aussieht. Wir haben an echten Tickets gearbeitet, nicht an Demo-Aufgaben.

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

Dazu kamen MCP-Verbindungen, zum Beispiel zu Atlassian. Damit konnten Agenten Jira-Tickets und Confluence-Seiten lesen. Für das Onboarding neuer Entwickler war das besonders hilfreich, weil der Agent Fragen zum Projekt mit den richtigen Quellen beantworten konnte.

Außerdem haben wir eine Wissensbasis direkt im Code aufgebaut. Die relevanten Inhalte aus Confluence haben wir in Markdown übertragen und gemeinsam mit dem Produktmanager laufend aktuell gehalten. Diese Dokumente dienen als Spezifikation, die Entwickler und Agenten bei jedem Ticket nutzen können.

## Schleifen und Verifikation: Code, der nachweislich funktioniert


Ein Agent, der Code schreibt, muss auch prüfen können, ob dieser Code funktioniert. Deshalb haben wir den Teams beigebracht, mit Schleifen und Verifikationsmethoden zu arbeiten. Der Agent setzt eine Änderung um, prüft das Ergebnis, liest Fehler und korrigiert gezielt.

Bei Webanwendungen nutzen wir dafür Playwright mit einer isolierten Chrome-Sitzung. Der Agent schreibt einen End-to-End-Test, klickt sich durch die betroffenen Funktionen und stellt fest, ob die Funktion tatsächlich funktioniert. Ein erfolgreicher Build reicht als Nachweis nicht. Wie dieser Ablauf im Detail aussieht, beschreibe ich im Artikel [Coding Agents im Team: Kontext, MCP und überprüfbare Ergebnisse](/blog/coding-agents-verifikation).

Dieses Wissen war der Kern des Projekts. Mit wachsender Erfahrung haben die Entwickler schneller, sicherer und mit weniger Nacharbeit geliefert. Einzelne Teams haben Vorhaben zwei bis drei Monate früher abgeschlossen als ursprünglich geplant.

## Ein Agent auf dem VPS und regelmäßige Prüfungen

Neben der Arbeit in den Teams haben wir einen Agenten auf einem eigenen VPS eingerichtet, der jederzeit erreichbar ist. Der Produktmanager nutzt ihn für Aufgaben, die er nicht selbst in den Entwicklerwerkzeugen erledigen möchte. Ein Beispiel sind Kommentare in GitLab.

Dazu kommen geplante Aufgaben, die täglich oder wöchentlich laufen. Ein Beispiel ist die Rechtslage: Junikom arbeitet viel mit Kommunen. Neue Gesetze und Verordnungen können dort Anpassungen am Produkt erfordern. Ein regelmäßiger Job prüft deshalb Änderungen im rechtlichen Umfeld und fasst zusammen, was für das Produkt relevant werden könnte. So können wir gemeinsam mit dem Kunden frühzeitig planen, statt erst auf eine Anfrage zu reagieren.

## Sicherheit: Pentests mit Open-Source-Modellen

Für Penetrationstests haben wir vor allem Open-Source-Modelle eingesetzt. Proprietäre Modelle von OpenAI oder Anthropic lehnen offensive Sicherheitsaufgaben aufgrund ihrer Schutzmechanismen oft ab, und Details zu Schwachstellen sollen die eigene Infrastruktur ohnehin nicht verlassen.

Für Junikom war das besonders wichtig. Software, die von Kommunen und politischen Akteuren genutzt wird, muss gründlich getestet sein. Die selbst betriebenen Modelle haben es ermöglicht, die Produkte regelmäßig und ohne Datenweitergabe auf Schwachstellen zu prüfen.

## Salesforce und Claude: heute MCP, morgen eigene Agenten

Auf der Unternehmensseite haben wir die Salesforce-Anbindung betrachtet, die gerade umgesetzt wird. Die Frage war, wie sie gut mit KI zusammenarbeitet. Wir haben Claude über MCP mit Salesforce verbunden, sodass Mitarbeitende Daten direkt im Chat abfragen und bearbeiten können.

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

## Ergebnis und nächste Schritte

Nach den ersten drei Monaten hat Junikom das Projekt verlängert. Die Entwicklungsteams arbeiten heute mit beschriebenen Repositories, einer aktuellen Wissensbasis und Agenten, die ihre eigene Arbeit prüfen. Einzelne Teams haben Projekte zwei bis drei Monate früher abgeschlossen. Pentests mit Open-Source-Modellen, regelmäßige Prüfungen des rechtlichen Umfelds und eine dokumentierte KI-Schulung ergänzen das.

Wenn Ihr Entwicklungsteam vor einer ähnlichen Ausgangslage steht, lassen Sie uns darüber sprechen. Als Freelancer und Fractional Head of AI arbeite ich direkt mit Ihren Teams und baue die Werkzeuge und Abläufe gemeinsam mit ihnen auf.
