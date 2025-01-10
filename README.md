# Community Overlay Template

Ein wiederverwendbares Overlay-Template mit fortgeschrittener Event-Isolation, entwickelt für Communities, die sich eine eigene Overlay-App erstellen möchten.

## 🎯 Features

- **Vollständige Event-Isolation:** Keine ungewollten Interaktionen mit dem Spiel im Hintergrund
- **Drag & Drop:** Frei positionierbares Overlay-Fenster
- **Position Speicherung:** Automatisches Speichern der letzten Position
- **Minimieren/Maximieren:** Kompaktes Design, wenn nicht benötigt
- **Modernes Design:** Anpassbares, semi-transparentes Layout
- **Touch-Support:** Grundlegende Unterstützung für Touch-Geräte

## 🚀 Installation

1. Installiere [Tampermonkey](https://www.tampermonkey.net/) für deinen Browser.
2. Erstelle ein neues Script in Tampermonkey.
3. Kopiere den Code aus der `overlay-template.js`.
4. Passe die `@match` URL in den UserScript-Metadaten an.
5. Speichere das Script.

## 💡 Anpassung

### URL anpassen
```javascript
// @match        https://www.deine-url.tld
```

### Titel & Version ändern
```javascript
<span class="overlay-title">Dein Titel</span>
<span class="overlay-version">Deine Version</span>
```

### Content-Bereiche hinzufügen
```javascript
<div class="content-section">
    <h3>Dein Bereich</h3>
    <div class="section-content">
        <!-- Dein Content hier -->
    </div>
</div>
```

## 🔧 Technische Details

### Event-Isolation
Das Template verwendet eine spezielle Event-Handling-Strategie:
```javascript
function preventEventBubbling(e) {
    e.stopPropagation();
    e.preventDefault();
}
```

### Event-Listener
Wichtige Event-Listener sind mit `passive: false` konfiguriert:
```javascript
element.addEventListener('event', handler, { passive: false });
```

### Position Speicherung
Automatische Speicherung der Position im localStorage:
```javascript
localStorage.setItem('overlayX', position.toString());
localStorage.setItem('overlayY', position.toString());
```

## 🎨 Styling

Das Template nutzt ein modernes, dunkles Design mit:
- Semi-transparentem Hintergrund
- Angepassten Scrollbars
- Responsivem Layout
- Hover-Effekten

Anpassung des Designs über CSS-Variablen möglich.

## 📝 Verwendung

1. Importiere das Template in dein Projekt.
2. Passe die Metadaten an deine Bedürfnisse an.
3. Füge deinen eigenen Content in die vorgesehenen Bereiche ein.
4. Erweitere die Funktionalität nach Bedarf.

## 🤝 Beitragen

Contributions sind willkommen! Du kannst:
- Bugs melden
- Feature-Requests erstellen
- Pull Requests einreichen

## ⚠️ Wichtige Hinweise

- Das Script entstand, weil ein Freund etwas für "Die Siedler Online" erstellen wollte.
- Verwende das Template verantwortungsvoll.

## 📜 Lizenz

MIT License - siehe [LICENSE](LICENSE) Datei.

## 🙏 Danksagung

- Entwickelt für die "Die Siedler Online" Community.
- Besonderer Dank an SirDafiPlug.

---
*Entwickelt mit ❤️ für die TSO Watch Community.*

