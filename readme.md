# Hópverkefni 2


|   | Mikael Andri Ingason |Pálmar Sæmundsson |Sigurður Örn Gunnarsson |
| ------------- |:-------------:|:-------------:|:-------------:|
| HÍ     | mai24    |pas4     |sog6     |
| GitHub     |  MikaelAndriIngason    |palmarhi    |sog6    |



## High-fidelity prótótýpa

Verkefnið felst í því að smíða todo vefforrit sem geymir stöðu í vafra notanda.

## Keyrsla

Til að keyra verkefni þarf Node.js og npm að vera uppsett á tölvunni. 

Verkefnið er keyrt með `npm run dev`. Skipunin setur í af stað ferli sem þýðir sass yfir í css og kveikir á browser-sync þjóni sem fylgist með breytingum á _þýddri_ css skrá.

Með `npm run lint` er stylelint keyrt á Sass

## Raun

Með `npm run build` er búið til _production build_. Við það keyrist skilgreind `build` skipun í `package.json` Þær skrár eru settar í `build/` möppu sem vefur keyrir úr.

Það er búið að tengja GitHub við Netlify. Skilgreind `build` skipun í `package.json` verður keyrð og síðan skilgreinum við að vefur keyri úr `build/` möppu.

## Skipulag

Verkefninu er skipt þannig upp í möppur að allar _html_ skrár, _.css_ og _.sass_ skrár og `main.js` eru í rót. Aðrar _js_ skrár eru í `lib` möppu.

Mynd sem notuð er sem icon í hnapp á síðunni er geymd í `images` möppu.

## Vefsíður

Hægt að sjá allar skrár á [GitHub](https://github.com/palmarhi/hopverkefni2).

Á [Netlify](https://confident-booth-c7e08e.netlify.app) má skoða vefinn.
