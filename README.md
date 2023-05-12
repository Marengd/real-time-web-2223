# Quiz
Daag een ander uit voor de últieme muziek quiz.

<img src="docs/assets/imgs/readme-header-image.jpg" alt="..." width="100%">

Dit is de repository van <a href="https://danianmarengo.nl">Danian Marengo</a> zijn, 'Real- time- application' website. Deze website is gemaakt voor het project <a href="https://github.com/cmda-minor-web/real-time-web-2223">'Real time web' </a>, dat deel uitmaakt van de <a href="https://github.com/cmda-minor-web">Minor Webdesign And Development 2022- 2023</a> aan de <a href="https://www.hva.nl/">Amsterdamse Hogeschool voor de Kunsten</a>, onderdeel van het programma <a href="https://www.hva.nl/opleidingen/communication-and-multimedia-design?gclid=Cj0KCQiAgaGgBhC8ARIsAAAyLfFCp5OTcBLGcx-_uMWa2sowONOebB19jLA1KMt2yEmVFGWaHdsi9DwaAq0PEALw_wcB">Communicatie en Multimedia Design.</a>

<br>

## Beschrijving
Dit is een uiterst vermakelijke en uitdagende manier om jouw en je vrienden hun kennis van hedendaagse muziek te testen. Het doel is om als eerste speler 10 punten te behalen door het raden van de artiest achter het gehoorde muziekfragment. 

Snelheid is van cruciaal belang, omdat er slechts één punt per ronde te verdienen is en alleen de snelste speler deze punten kan scoren.

<br>

## Installatie en uitvoering
Stapsgewijze instructies voor het installeren en uitvoeren van de applicatie.

<br>


```shell
# Kloon de repository.
Git clone https://github.com/Marengd/real-time-web-2223.git

# Navigeer naar de gekloonde projectfolder.
Cd ...

# Installeer de projectafhankelijkheden.
Npm ...

# Start de projectserver.
Npm run start
```
<br>

## Projectstructuur
De organisatie en hiërarchie van mappen en bestanden, binnen mijn project.

<br>

### Tree
De mappen en bestanden van mijn project in een boomstructuur worden getoond.

<br>

```  

.
├── Api/
│   └── Spotify.js
├── Controller/
│   └── Controller.js
├── Docs
├── Node_Modules
├── Public/
│   ├── Css/
│   │   └── Styles.css
│   └── Js/
│       ├── Create_Or_Join.js
│       ├── Enter_Username.js
│       └── Quiz_Room.js
├── Routes/
│   └── Routes.js
├── Views/
│   ├── Pages/
│   │   ├── Create_Or_Join.ejs
│   │   ├── Enter_Username.ejs
│   │   ├── Join_By_Id.ejs
│   │   ├── Quiz_Result.ejs
│   │   ├── Quiz_Room.ejs
│   │   └── Start_Quiz.ejs
│   └── Partials/
│       └── Head.ejs
├── .env
├── .gitignore
├── License
├── package.json
├── server.js
└── socket.js

```

<br>

### Verantwoordelijk voor de logica.
De mappen en bestanden die het gedrag van de applicatie sturen.

<br>

<details>

  <summary>

  ### Set- up en configuratie.
  De bestanden die nodig zijn voor het instellen en configureren van de server en de ontwikkelings- omgeving.
  </summary>

<br>

###### Server.js : 
Dit is het belangrijkste bestand dat de server initialiseert. Het stelt Express en Socket.IO in en start de server.

<br>

###### Socket.js : 
Dit bestand bevat de logica voor de realtime communicatie tussen de server en de clients. Het behandelt verschillende Socket.IO- events, zoals het joinen van een room, het creëren van een room en het verbreken van de verbinding.

<br>
<br>

</details>


<details>

<summary>

  ### Api interactie
  De scripts die zijn ontworpen om te communiceren met externe API's.
</summary>

<br>

###### Spotify.js : 
Dit bestand bevat functies om met de Spotify API te communiceren en om tokens aan te vragen, willekeurige artiesten te krijgen en willekeurige nummers te zoeken.

<br>

</details>


<details>

<summary>

### View contollers
De scripts die de logica beheren achter de weergave van de webpagina's.

</summary>

<br>

###### Controller.js : 
Dit bestand bevat uw controller functies. Deze functies regelen de logica voor elke route en sturen de juiste respons terug naar de client.

<br>
</details>

<details>

<summary>

### Web server routes
De webpagina's die aan gebruikers worden getoond.

</summary>

<br>

###### Routes.js : 
Dit bestand definieert de routes voor de toepassing en welke controller functie moet worden aangeroepen wanneer een route wordt bezocht.

<br>

</details>

<br>

## De applicatie op Railway.app
Een link naar de gepubliceerde applicatie.

<br>

``` shell
# Link naar gepubliceerde applicatie.
https://real-time-web-2223.up.railway.app//
```
<br>

## De data- lifecycle.
...

<br>

## De real- time events.
De gebeurtenissen of die onmiddellijk worden verwerkt in de applicatie zonder merkbare vertraging.

<br>


<details>
  <summary>

  ### ruimtes.
  De gebeurtenissen binnen de 'virtuele ruimtes' in de applicatie applicatie waarin deelnemers een quiz kunnen organiseren of aan deelnemen.
  </summary>

<br>

###### Join.
Een speler probeert deel te nemen aan een spelruimte met een gebruikersnaam en ruimtenaam.

<br>

###### CreateRoom.
Een nieuwe spelruimte wordt aangemaakt.

<br>

###### RoomCreated.
Bevestigt dat de ruimte is aangemaakt en stuurt de ruimtenaam naar de speler die de ruimte heeft aangemaakt.

<br>

</details>


<details>
  <summary>

  ### Het spel.
  De gebeurtenissen binnen het spel, dat zich afspeelt binnen de 'virtuele ruimtes' in de applicatie.
</summary>

<br>

###### UpdateScoreboard.
Het scorebord wordt bijgewerkt met de huidige scores van alle deelnemers in de ruimte.

<br>

###### UpdateCountdown.
 De aftelklok wordt bijgewerkt en naar alle deelnemers in de ruimte gestuurd.

<br>

###### SubmitAnswer.
Een speler dient een antwoord in voor de huidige vraag in de ruimte.

<br>

###### DisableButtons.
Schakelt de antwoordknoppen uit voor de speler die een fout antwoord heeft ingediend.

<br>

###### NextRound.
Verzoekt een nieuwe ronde te starten in de ruimte.

<br>

###### NewQuestion.
Een nieuwe vraag wordt naar alle deelnemers in de ruimte gestuurd.

<br>

###### EnableButtons.
Schakelt de antwoordknoppen in voor alle deelnemers in de ruimte.

<br>

###### RedirectToResults.
Stuurt de winnaar door naar de resultatenpagina.

<br>

</details>

<br>

## Complexiteit én functionaliteit.
Het belichten van de uitgebreide aard van het project en de diverse functionaliteiten die het biedt. Waarbij de focús ligt op het presenteren van de onderliggende 'logica'.


<details>

<summary>

  ### Spelruimtes.
De diverse functionalieiten die mijn applicatie te bieden heeft met betrekking tot de 'virtuele ruimtes'.

</summary>

<br>

###### Functionaliteiten.

<br>

#### Gebruikersnaam invoeren.
Gebruikers kunnen een eigen gebruikersnaam invoeren.

<br>

#### Quiz organiseren.
Gebruikers kunnen een quiz organiseren in een eigen speelruimte.

<br>

#### Deelnemen aan een quiz.
Gebruikers kunnen deelnemen aan een andere quiz, door middel van toegangscode voor de speelruimte.

<br>

</details>

<br>


<details>

  <summary>

### Het spel.
De diverse functionalieiten die mijn applicatie te bieden heeft met betrekking tot de quiz in de 'virtuele ruimtes'.

  </summary>


<br>

#### Auto- start.
Bij een minimaal aantal deelnemers, wordt er afgeteld voordat het spel begint. 

<br>

#### Maximaal aantal deelnemers.
Er kunnen maximaal 10 deelnemers meedoen aan een quiz.

<br>

#### Willekeurige nummers raden.
Iedere ronde wordt er een willekeurig nummer afgespeeld uit de Spotify Afspeellijst <a href="https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF"></a>'Topnummers- van de wereld'.

<br>

#### Meerkeuze vragen.
Iedere ronde worden er naast de correcte artiest, 3 incorrecte artiesten uit de Spotify Afspeellijst <a href="https://open.spotify.com/playlist/37i9dQZEVXbNG2KDcFcKOF"></a>'Topnummers- van de wereld'. weergegeven om een keuze uit te maken.

<br>

#### Bijgehouden score.
Iedere ronde wordt de score van alle deelnemers bijgehouden.

<br>

#### Speldoel.
Deelnemers kunnen de 'ultieme muziek quiz' winnen door de eerste te zijn van alle deelnemers die 10 punten heeft behaald.

<br>

#### Winnaar.
Alle deelnemers worden na afloop van de quiz naar een pagina gestuurd waar de winnaar van de quiz te zien is.

<br>

</details>

<br>

## Onderhouden van data.
...

<br>
<br>

## Multi- user ondersteuning.
De mogelijkheid om gelijktijdige interactie en tussen meerdere deelnemers mogelijk te maken.

<br>

### Gebruikers toevoegen aan een 'virtuele ruimte'.
Wanneer een gebruiker deelneemt aan een ruimte, wordt de gebruiker toegevoegd aan de lijst met deelnemers in die ruimte. Dit gebeurt in de ' socket.on('join') ' functie, waarbij de gebruikersnaam en de ruimte worden doorgegeven. 

De code voegt de speler toe aan de players object in de rooms variabele.

<br>

### Controleren van het aantal deelnemers in een 'virtuele ruimte'.
Na het toevoegen van een speler aan een ruimte, wordt het aantal deelnemers in de ruimte gecontroleerd. Als het aantal deelnemers het ingestelde limiet heeft bereikt, wordt het spel gestart. 

Dit wordt gecontroleerd met behulp van de ' playerCount ' variabele in de ' socket.on('join') ' functie.

<br>

### Het verlaten van een 'virtuele ruimte' afhandelen.
Wanneer een speler de verbinding verbreekt, wordt de ' socket.on('disconnect') ' functie geactiveerd.

In deze functie wordt de speler verwijderd uit de lijst met deelnemers in de betreffende ruimte.

<br>

### Het delen van gegevens in de 'virtuele ruimte'.
 Verschillende gebeurtenissen worden gebruikt om gegevens te delen tussen deelnemers in dezelfde ruimte. 
 
 Bijvoorbeeld, de ' updateScoreboard ' gebeurtenis wordt geactiveerd om het scorebord bij te werken voor alle deelnemers in een ruimte. Het ' io.to(...).emit(...) ' wordt gebruikt om deze ' update ' naar alle verbonden deelnemers in een specifieke ruimte te sturen.

<br>
<br>

## Toekomstige verbeteringen.
...

### Gebruikersnaambeheer.
...

[] Gebruikersnamen controleren op bestaan, lengte en inhoud.
[] Deelnemers kunnen verwijderen uit een georganiseerde quiz.

<br>

### Quizfunctionaliteit.
...

[] Deelnemers kunnen de quiz hervatten binnen 15 seconden na een 'Disconnect'.
[] Deelnemers ontvangen een melding als een andere deelnemer de quiz vroegtijdig verlaat.
[] Deelnemers kunnen tijdens de quiz hun positie zien ten opzichte van andere deelnemers.
[] Deelnemers ontvangen een melding met de naam van de persoon die als eerste het correcte antwoord heeft gegeven.
[] Deelnemers ontvangen een melding als ze zelf een incorrect antwoord hebben gegeven.

<br>

### Vormgeving en gebruikerservaring.
...

[] Geluidseffect toevoegen bij het aftellen.

[] Aantrekkelijkere vormgeving van de startpagina.
[] Aantrekkelijkere vormgeving van de quizpagina.

[] Paginatransities toevoegen tussen gebeurtenissen.

[] Leaderboard tonen met alle plaatsen aan het einde, in plaats van alleen de winnaar.

### Gerelateerd aan mijn code.
...

[] Code refactoren om de code leesbaarder en onderhoudbaar te maken.
[] Implementeren van een code bundler om de code efficiënter te beheren.


### Gegevensbeheer en prestaties.
...

[] Nummers ophalen tijdens het aftellen, in plaats van na het aftellen.

<br>
<br>

## Credits
<ul>
  <li></li>
</ul>

<br>
<br>

## Miscellaneous
Follow Danian Marengo, <a href="https://www.danianmarengo.nl">Website</a>

<br>

## License
<a href="https://github.com/Marengd/kwoot/blob/main/LICENSE"> Mit</a>
<br>
Written by Danian Marengo