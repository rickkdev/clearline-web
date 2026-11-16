export type HeroConcept = {
  id: string;
  name: string;
  medium: string;
  note: string;
  layout: "split" | "arch" | "poster" | "float" | "wide";
  background: string;
  foreground: string;
  accent: string;
};

export const concepts = [
  {
    "id": "paper",
    "name": "Papierwelten",
    "medium": "Papierkunst",
    "note": "Ein warmer, haptischer Einstieg. Der orange Weg macht aus losen Aufgaben einen klaren Prozess.",
    "layout": "split",
    "background": "#f5efe4",
    "foreground": "#282c26",
    "accent": "#ab501b"
  },
  {
    "id": "clay",
    "name": "Arbeit mit Leichtigkeit",
    "medium": "Clay / 3D",
    "note": "Weiche Formen und freundliche Farben machen ein technisches Angebot zugänglich.",
    "layout": "arch",
    "background": "#f2eee8",
    "foreground": "#313a35",
    "accent": "#ac491f"
  },
  {
    "id": "risograph",
    "name": "Weniger Routine. Mehr Raum.",
    "medium": "Risografie",
    "note": "Ein plakativer Drucklook für einen eigenständigen, kreativen Auftritt.",
    "layout": "poster",
    "background": "#f7ead3",
    "foreground": "#222c46",
    "accent": "#b83e2d"
  },
  {
    "id": "cyanotype",
    "name": "Der Bauplan für Entlastung",
    "medium": "Cyanotypie",
    "note": "Präzise und ruhig. Der technische Charakter wird durch analoge Textur weicher.",
    "layout": "split",
    "background": "#102e60",
    "foreground": "#f4f2dc",
    "accent": "#a9d7f2"
  },
  {
    "id": "bauhaus",
    "name": "Klar gebaut.",
    "medium": "Bauhaus",
    "note": "Klare Geometrie und starke Kontraste bringen Ordnung in die Botschaft.",
    "layout": "poster",
    "background": "#efece0",
    "foreground": "#252725",
    "accent": "#b63122"
  },
  {
    "id": "watercolor",
    "name": "Raum für das Wesentliche",
    "medium": "Aquarell",
    "note": "Luftig und menschlich. Eine sanfte Alternative zu typischer Tech-Bildsprache.",
    "layout": "arch",
    "background": "#f5f3ec",
    "foreground": "#30463d",
    "accent": "#3e6b58"
  },
  {
    "id": "noir",
    "name": "Fokus statt Rauschen",
    "medium": "Schwarzweiß-Fotografie",
    "note": "Eine reduzierte Bildwelt mit viel Kontrast und einem klaren Fokus.",
    "layout": "split",
    "background": "#181a1b",
    "foreground": "#f5f3ed",
    "accent": "#ebbb74"
  },
  {
    "id": "miniature",
    "name": "Das Ganze im Blick",
    "medium": "Isometrische Miniatur",
    "note": "Ein kleines Betriebssystem als Modell. Konkret, räumlich und leicht zu erfassen.",
    "layout": "float",
    "background": "#e8efea",
    "foreground": "#243a35",
    "accent": "#a14225"
  },
  {
    "id": "glass",
    "name": "Verbindungen, die tragen",
    "medium": "Glas / 3D",
    "note": "Transparente Materialien stehen für nachvollziehbare Abläufe.",
    "layout": "split",
    "background": "#eaf0f4",
    "foreground": "#243343",
    "accent": "#345a8a"
  },
  {
    "id": "woodcut",
    "name": "Gutes Handwerk. Gute KI.",
    "medium": "Linolschnitt",
    "note": "Kräftige Linien und handwerkliche Textur passen zum Mittelstand.",
    "layout": "poster",
    "background": "#f5e9d0",
    "foreground": "#283a32",
    "accent": "#a6442c"
  },
  {
    "id": "collage",
    "name": "Neue Perspektiven",
    "medium": "Editorial-Collage",
    "note": "Analoge Ausschnitte und digitale Formen machen Veränderung sichtbar.",
    "layout": "split",
    "background": "#ede6d8",
    "foreground": "#2c3337",
    "accent": "#a4422a"
  },
  {
    "id": "botanical",
    "name": "Wachsen mit System",
    "medium": "Botanische Illustration",
    "note": "Organisches Wachstum statt technischer Überladung. Ruhig und hochwertig.",
    "layout": "arch",
    "background": "#edf0e5",
    "foreground": "#2c4937",
    "accent": "#476d36"
  },
  {
    "id": "blueprint",
    "name": "Vom Plan in den Betrieb",
    "medium": "Architekturzeichnung",
    "note": "Saubere Linien und eine sichtbare Konstruktion betonen die Umsetzung.",
    "layout": "split",
    "background": "#f2f0e7",
    "foreground": "#293c4a",
    "accent": "#365a70"
  },
  {
    "id": "sunlight",
    "name": "Ein guter Arbeitstag",
    "medium": "Editorial-Fotografie",
    "note": "Natürliches Licht und ein echter Arbeitskontext wirken vertraut.",
    "layout": "wide",
    "background": "#f2eee6",
    "foreground": "#32352c",
    "accent": "#95602a"
  },
  {
    "id": "thread",
    "name": "Alles greift ineinander",
    "medium": "Textil / Makro",
    "note": "Ein roter Faden verbindet die Arbeit. Die Textur gibt dem abstrakten Thema Nähe.",
    "layout": "split",
    "background": "#f4ecdf",
    "foreground": "#3c302c",
    "accent": "#a5412e"
  },
  {
    "id": "ceramic",
    "name": "Sorgfältig verbunden",
    "medium": "Keramik / Stillleben",
    "note": "Ein ruhiges Stillleben für eine beratende, hochwertige Positionierung.",
    "layout": "arch",
    "background": "#e9e1d5",
    "foreground": "#4a3f35",
    "accent": "#885332"
  },
  {
    "id": "pixel",
    "name": "Kleine Schritte. Große Wirkung.",
    "medium": "Pixel Art",
    "note": "Eine spielerische Alternative mit einem klaren Bezug zu Software.",
    "layout": "poster",
    "background": "#202b3b",
    "foreground": "#f1eddc",
    "accent": "#f8ba6f"
  },
  {
    "id": "ink",
    "name": "Mit ruhiger Hand",
    "medium": "Tuschezeichnung",
    "note": "Wenige Striche und viel Weißraum. Persönlich, konzentriert und direkt.",
    "layout": "split",
    "background": "#faf7ef",
    "foreground": "#272c2a",
    "accent": "#8d472c"
  },
  {
    "id": "topographic",
    "name": "Komplexität wird übersichtlich",
    "medium": "Topografie / Relief",
    "note": "Ein räumliches Relief übersetzt Orientierung in eine starke Bildmetapher.",
    "layout": "float",
    "background": "#e8eee8",
    "foreground": "#2e403d",
    "accent": "#8d4e2a"
  },
  {
    "id": "prism",
    "name": "Ein klarer Weg",
    "medium": "Prisma / Licht",
    "note": "Eine helle, abstrakte Komposition für eine moderne technische Marke.",
    "layout": "split",
    "background": "#171d2a",
    "foreground": "#f0f2fa",
    "accent": "#b1c7ff"
  },
  {
    "id": "gouache",
    "name": "Mehr Zeit füreinander",
    "medium": "Gouache-Illustration",
    "note": "Eine menschliche, erzählerische Bildwelt für die Arbeit im Team.",
    "layout": "wide",
    "background": "#f1e7d6",
    "foreground": "#3d4134",
    "accent": "#9b4427"
  },
  {
    "id": "concrete",
    "name": "Solide Grundlagen",
    "medium": "Brutalistische Architektur",
    "note": "Monumentale Formen für ein selbstbewusstes Engineering-Angebot.",
    "layout": "poster",
    "background": "#dedbd2",
    "foreground": "#282a28",
    "accent": "#974422"
  },
  {
    "id": "aerial",
    "name": "Abläufe aus neuer Sicht",
    "medium": "Luftbild-Fotografie",
    "note": "Ein Blick auf reale Betriebe. Sachlich und nah an der Zielgruppe.",
    "layout": "wide",
    "background": "#e7ece5",
    "foreground": "#2d3d32",
    "accent": "#4a6542"
  },
  {
    "id": "chalk",
    "name": "Gemeinsam durchdacht",
    "medium": "Kreide / Skizze",
    "note": "Sichtbare Denkprozesse für eine pragmatische, gemeinsame Umsetzung.",
    "layout": "split",
    "background": "#203b37",
    "foreground": "#f1eee2",
    "accent": "#f5b46c"
  },
  {
    "id": "futurism",
    "name": "Fortschritt mit Bodenhaftung",
    "medium": "Retrofuturismus",
    "note": "Optimistisch und ungewöhnlich. Eine Zukunftsvision mit handwerklicher Wärme.",
    "layout": "arch",
    "background": "#f0e5cd",
    "foreground": "#3c3c36",
    "accent": "#a84b29"
  }
] satisfies HeroConcept[];

