<div style="display: flex; align-items: center;">
  <h1>MeetFit App</h1>
  <img src="./assets/logo2.png" height="100" style="margin: 30px;"/>
</div>

MeetFit jest aplikacją mobilną stworzoną przy wykorzystaniu React Native oraz Expo.

Nasza aplikacja ma za zadanie ułatwić ludziom dostęp do informacji na temat punktów ze zdrową żywnością, jak i punktów aktywności fizycznej.  W celu większej socjalizacji użytkowników zaprojektowaliśmy funkcję tworzenia oraz dołączania do spotkań w wyznaczonych miejscach.
## Przygotowanie
```npm install -g expo-cli```


```npm install``` - po każdym update

## Zmienne środowiskowe

w katalogu głównym projektu stworzyć plik env.js i wkleić adres [MeetFit API](https://github.com/rafalandrzejewski/MeetFitAPI) oraz klucz API GOOGLE:

```API_BASE_URL="https://YOUR_API_URL.pl/api";```

```export const GOOGLE_API_KEY= "YOUR_GOOGLE_API_KEY";```

## Uruchomienie
```npm start``` 

wymagany jest [emulator androida](https://developer.android.com/studio) lub [aplikacja Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pl&gl=US) na naszym telefonie. 

jeśli korzystamy z emulatora androida należy wcisnąć ```a``` w konsoli w której uruchomiliśmy projekt, by uruchomić skrypt instalujący Expo oraz uruchomienie aplikacji na androidzie.

jeśli korzystamy z naszego telefonu wystarczy zeskanować kod QR, który pojawił się w konsoli po wpisaniu komendy.