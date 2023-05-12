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

## De applicatie op Adaptable.io
Een link naar de gepubliceerde applicatie die staat op [Adaptable.io](https://adaptable.io)

``` shell
# ...
https://danian-marengo-real-time-web.adaptable.app/
```
<br>

## De data- lifecycle.
...

<br>

## De real- time events.
...

### Kamers.
...

<br>

###### ...
##### Join.
Een speler probeert deel te nemen aan een spelkamer met een gebruikersnaam en kamernaam.

###### ...
##### CreateRoom.
Een nieuwe spelkamer wordt aangemaakt.

###### ...
##### RoomCreated.
 Bevestigt dat de kamer is aangemaakt en stuurt de kamernaam naar de speler die de kamer heeft aangemaakt.

<br>

### Het spel.
...

<br>


###### ...
##### UpdateScoreboard.
Het scorebord wordt bijgewerkt met de huidige scores van alle spelers in de kamer.

###### ...
##### UpdateCountdown.
 De aftelklok wordt bijgewerkt en naar alle spelers in de kamer gestuurd.

###### ...
##### SubmitAnswer.
Een speler dient een antwoord in voor de huidige vraag in de kamer.

###### ...
##### DisableButtons.
Schakelt de antwoordknoppen uit voor de speler die een fout antwoord heeft ingediend.

###### ...
##### NextRound.
Verzoekt een nieuwe ronde te starten in de kamer.

###### ...
##### NewQuestion.
Een nieuwe vraag wordt naar alle spelers in de kamer gestuurd.

###### ...
##### EnableButtons.
Schakelt de antwoordknoppen in voor alle spelers in de kamer.

###### ...
##### RedirectToResults.
Stuurt de winnaar door naar de resultatenpagina.



<br>

## Complexiteit én functionaliteit.
...

<br>

###### Functionaliteiten.
...

### Spelruimtes.
...
<br>

###### ...
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