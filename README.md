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

### Set- up en configuratie.
De bestanden die nodig zijn voor het instellen en configureren van de server en de ontwikkelings- omgeving.

<br>

###### Server.js : 
Dit is het belangrijkste bestand dat de server initialiseert. Het stelt Express en Socket.IO in en start de server.

<br>

###### Socket.js : 
Dit bestand bevat de logica voor de realtime communicatie tussen de server en de clients met behulp van Socket.IO.

Het behandelt verschillende Socket.IO-events, zoals het joinen van een room, het creëren van een room en het verbreken van de verbinding.

<br>
<br>

### Api interactie
De scripts die zijn ontworpen om te communiceren met externe API's.

<br>

###### Spotify.js : 
Dit bestand bevat functies om met de Spotify API te communiceren en om tokens aan te vragen, willekeurige artiesten te krijgen en willekeurige nummers te zoeken.

<br>
<br>

### View contollers
De scripts die de logica beheren achter de weergave van de webpagina's.

<br>

###### Controller.js : 
Dit bestand bevat uw controller functies. 

Deze functies regelen de logica voor elke route en sturen de juiste respons terug naar de client.

<br>
<br>

### Web server routes
De webpagina's die aan gebruikers worden getoond.

<br>

###### Routes.js : 
Dit bestand definieert de routes voor de toepassing en welke controller functie moet worden aangeroepen wanneer een route wordt bezocht.

<br>
<br>

### `



<br>

## De applicatie op Adaptable.io
Een link naar de gepubliceerde applicatie.

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

### Kamers.
De gebeurtenissen binnen de 'virtuele ruimtes' in de applicatie applicatie waarin spelers een quiz kunnen organiseren of aan deelnemen.

<br>

###### Join.
Een speler probeert deel te nemen aan een spelkamer met een gebruikersnaam en kamernaam.

###### CreateRoom.
Een nieuwe spelkamer wordt aangemaakt.

###### RoomCreated.
 Bevestigt dat de kamer is aangemaakt en stuurt de kamernaam naar de speler die de kamer heeft aangemaakt.

<br>

### Het spel.
De gebeurtenissen binnen het spel, dat zich afspeelt binnen de 'virtuele ruimtes' in de applicatie.

<br>


###### UpdateScoreboard.
Het scorebord wordt bijgewerkt met de huidige scores van alle spelers in de kamer.

###### UpdateCountdown.
 De aftelklok wordt bijgewerkt en naar alle spelers in de kamer gestuurd.

###### SubmitAnswer.
Een speler dient een antwoord in voor de huidige vraag in de kamer.

###### DisableButtons.
Schakelt de antwoordknoppen uit voor de speler die een fout antwoord heeft ingediend.

###### NextRound.
Verzoekt een nieuwe ronde te starten in de kamer.

###### NewQuestion.
Een nieuwe vraag wordt naar alle spelers in de kamer gestuurd.

###### EnableButtons.
Schakelt de antwoordknoppen in voor alle spelers in de kamer.

###### RedirectToResults.
Stuurt de winnaar door naar de resultatenpagina.

<br>
<br>

## Complexiteit én functionaliteit.
Het belichten van de uitgebreide aard van het project en de diverse functionaliteiten die het biedt. Waarbij de focús ligt op het presenteren van de onderliggende 'logica'.

<br>

###### Functionaliteiten.
De diverse functionaliteit die mijn applicatie te bieden heeft. 

### Spelruimtes.
De diverse functionalieiten die mijn applicatie te bieden heeft met betrekking tot de 'virtuele ruimtes'.
<br>

###### Functionaliteit 1A.
Gebruikers kunnen een eigen gebruikersnaam invoeren.


...
###### 
Gebruikers kunnen een quiz organiseren in een eigen speelruimte.

###### ...
Gebruikers kunnen deelnemen aan een andere quiz, door middel van toegangscode voor de speelruimte.


<br>

### Het spel.
...

<br>

###### ...
Bij een minimaal aantal deelnemers, wordt er afgeteld voordat het spel begint. 


###### ...
Er kunnen maximaal 10 deelnemers meedoen aan een quiz.

###### ...
Iedere ronde wordt er een willekeurig nummer afgespeeld uit de Spotify Afspeellijst <a href=""></a>'Topnummers- van de wereld'.

###### ...
Iedere ronde worden er naast de correcte artiest, 3 incorrecte artiesten uit de Spotify Afspeellijst <a href=""></a>'Topnummers- van de wereld'. weergegeven om een keuze uit te maken.

###### ...
Iedere ronde wordt de score van alle deelnemers bijgehouden.

###### ...
Deelnemers kunnen de 'ultieme muziek quiz' winnen door de eerste te zijn van alle deelnemers die 10 punten heeft behaald.

###### ... 
Alle deelnemers worden na afloop van de quiz naar een pagina gestuurd waar de winnaar van de quiz te zien is.

<br>
<br>

## Client- server interactie.
...

<br>
<br>

## Onderhouden van data.
...

<br>
<br>

## Multi- user ondersteuning.
...

<br>
<br>

## Toekomstige verbeteringen.
...

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