# Svenska Toppar

Tracking and documenting the highest peak in each of Sweden's 25 historical provinces (landskap).

## About

A personal project by Björn & Frank to summit the highest point in every Swedish province. Inspired by the highpointing tradition (see [highpointers.org](https://highpointers.org)) and Swedish resources like [peakbagging.se](https://peakbagging.se).

## Progress

- [x] Södermanland - Skanklint (124 m)
- [x] Uppland - Eklundshov (118 m)
- [ ] 23 more to go...

## Tech Stack

- Static site (GitHub Pages)
- Leaflet.js for interactive map
- Vanilla JS, no framework bloat
- Data-driven: all peaks in `data/peaks.json`

## Local Development

```bash
# Just open index.html in a browser, or:
npx serve .
```

## Structure

```
├── index.html          # Main page with interactive map
├── css/
│   └── style.css       # Styles
├── js/
│   └── app.js          # Map logic & peak rendering
├── data/
│   └── peaks.json      # All 25 peaks with coordinates & metadata
├── trips/              # Trip reports (markdown)
└── assets/             # Images & badges
```

## Future Ideas

- Badge/patch shop (physical embroidered patches per peak)
- Trip reports with photos
- GPX track downloads
- English translation
- Difficulty ratings & seasonal tips

## License

MIT
