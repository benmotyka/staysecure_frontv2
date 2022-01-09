import SqlInteractive from "./sqlInjection/parts/SqlInteractive"
import HighlightSqlCode from './sqlInjection/parts/HighlightSqlCode'
import HighlightHtml from "./sqlInjection/parts/HighlightHtml"
import Introduction from "./sqlInjection/parts/Introduction"
import WhatIsProxy from "./sqlInjection/parts/WhatIsProxy"
import SqlApiAbstractionLayers from './sqlInjection/parts/SqlApiAbstractionLayers'

import RansomwareDownload from "./ransomware/parts/RansomwareDownload"
import RansomwareFilterEmail from "./ransomware/parts/RansomwareFilterEmail"
import RansomwareRun from "./ransomware/parts/RansomwareRun"
import RansomwareEncrypted from "./ransomware/parts/RansomwareEncrypted"
import RansomwareInfection from './ransomware/parts/RansomwareInfection'
import RansomwareAsymetricKey from './ransomware/parts/RansomwareAsymetricKey'
import RansomwareProtectMethods from './ransomware/parts/RansomwareProtectMethods'

import PhishingTypes from './phishing/parts/PhishingTypes'
import WebScrapping from './phishing/parts/WebScrapping'
import PhishingEnterSimulation from './phishing/parts/PhishingEnterSimulation'
import PhishingProtection from './phishing/parts/PhishingProtection'
import U2FKeys from "./phishing/parts/U2FKeys"
import PhishingSendDataSimulation from "./phishing/parts/PhishingSendDataSimulation"
const content = [
    {
        course: "sql-injection",
        language: "pl",
        content: [
            {
                header: "Scenariusz kursu",
                text: "W przeglądarce uruchomiona jest prosta strona sklepu internetowego. Podstawową jej funkcjonalnością jest wyszukanie produktu, aby następnie przeglądać produkty związane z wpisaną frazą.<br><br>Pierwszym krokiem który podejmuje atakujący jest dokładne zbadanie i analiza kodu źrodłowego strony internetowej. Dzięki temu może przeglądać kod strony w poszukiwaniu potencjalnych podatności i luk bezpieczeństwa. ",
                level: "basic",
                slide: <Introduction/>,
            },
            {
                header: "Analiza kodu strony internetowej",
                text: "Jak widać na załączonym fragmencie kodu źródłowego, aplikacja sklepu zawiera się z ciała (rozpoczynającego się znacznikiem <b>&lt;body&gt;</b>), w którym to znajduje się struktura strony, oraz skryptu (rozpoczynającego się znacznikiem <b>&lt;script&gt;</b>), który jest wykonywany po wystąpieniu określonych okoliczności. W tym wypadku po naciśnięciu przycisku, znajdującego się w tagu <b>&lt;button&gt;</b>, zostanie wywołana funkcja <i>search</i>. Zadaniem funkcji jest wysłanie żądania HTTP typu GET do adresu url https://api/search z ciałem w postaci obiektu. W obiekcie tym znajduje się para klucz-wartość, określająca ciąg znaków szukany przez użytkownika.<br><br><b>W tym interaktywnym ćwiczeniu postaraj się zaznaczyć kursorem funkcję znajdującą się w kodzie, która odpowiada za przesłanie formularza.</b>",
                level: "basic",
                slide: <HighlightHtml/>,
                interactive: true,
            },
            {
                header: "Przechwycenie i modyfikacja żądania",
                text: "Pola formularzy zazwyczaj walidowane są pod kątem występowania znaków specjalnych, które, zgodnie z założeniami twórców aplikacji, nie powinny zostać wysyłane do aplikacji działającej po stronie serwera.<br><br>Aby ominąć walidację wartości formularza po stronie klienta, atakujący może użyć <b>serwera proxy</b>, najczęściej uruchomionego na tej samej maszynie, z której dokonywany jest atak. Pozwala on na przechwycenie całego żądania i zmodyfikowanie go w dowolny sposób. W tym przykładzie została zmodyfikowana wartość pola 'value'. Takie żądanie nie powinno być możliwe do wysłania, ze względu na działającą walidację pola formularza. Na podstawie zwracanych kodów błędu, atakujący jest w stanie stwierdzić, czy to miejsce jest podatne na atak Wstrzyknięcia SQL.",
                slide: <WhatIsProxy/>,
                level: "advanced",
            },
            {
                header: "Analiza kodu API",
                text: "Wartość wysłana z aplikacji internetowej zostaje przekazana do aplikacji serwerowej, celem jej przetworzenia i zwrócenia odpowiednich informacji. W poniższym kodzie źródłowym przedstawiony jest fragment aplikacji działającej po stronie serwera wykonanej w środowisku Node.js, odpowiadający pobraniu zawartości żądania, a następnie bezpośrednie przekazanie go do zapytania bazodanowego. <br>W zwyczajnych okolicznościach atakujący nie ma możliwości wglądu w kod aplikacji serwerowej, jednak poprzez eksperymentowanie z wartościami wysłanych danych jest on w stanie określić jej podatność na atak typu SQL Injection.<br><br> <b>W tym interaktywnym ćwiczeniu zaznacz fragment kodu, w którym znajduje się parametr przesyłany do aplikacji z formularza.</b>",
                slide: <HighlightSqlCode/>,
                level: "basic",
                interactive: true,
            },
            {
                header: "Symulacja kodu API po otrzymaniu żądania",
                text: "Atakujący, przesyłająć różne wartości w formularzu, i analizując kody błędów, jest w stanie określić, czy dana aplikacja działająca po stronie serwera jest podatna na atak SQL Injection.<br><br>Odbywa się to poprzez dodawanie do szukanej wartości nietypowych znaków, np: <strong>'</strong>, <strong>\"</strong>, <strong>-</strong>... Jeśli wartość przekazywana do zapytania SQL nie jest w żaden sposób czyszczona, dodatkowe znaki mogą przedostać się do zapytania i całkowicie je zmodyfikować. Zauważyć można, że poprzez dodanie <strong>'</strong> na początku wyrazu, można zamknąć apostrof znajdujący się w zapytaniu w aplikacji serwerowej, i dodać własną część zapytania, która poprzednio się tam nie znajdowała.<br><br><strong>W tym interaktywnym ćwiczeniu, postaraj się samodzielnie wykonać atak SQL Injection. Wykorzystaj znak apostrofu, dowolnej prawdziwej wartości (np. 1=1) i komentarza.</strong>",
                level: "basic",
                interactive: true,
                slide: <SqlInteractive/>,
            },
            {
                header: "Poziomy abstrakcji w API",
                text: "Projektując aplikację działającą po stronie serwera, programiści muszą się zdecydować, na jakiej warstwie abstrakcji aplikacja będzie komunikowała się z bazą danych.<br><br>Co do zasady im wyższy poziom abstrakcji, tym niższa podatność na atak SQL Injection, błędy programistów i zazwyczaj bardziej przyjazna składnia. Każdy wyższy poziom abstrakcji komunikacji z bazą w aplikacji, zazwyczaj wspiera elementy w niższym poziomie, przykładowo używając konstruktorów kwerend czy ORM, można posiłkować się czystym SQL.<br><br>Jednakże im wyższa warstwa abstrakcji, tym większa szansa, że zapytania do bazy nie będą dostatecznie dobrze zoptymalizowane, przez co czas na otrzymanie odpowiedzi może być dłuższy. ",
                slide: <SqlApiAbstractionLayers/>,
                level: "advanced"
            },
            {
                header: "Header 7",
                text: "Aliquam sodales interdum odio, ut tristique quam viverra sed. Suspendisse ut bibendum enim. Pellentesque lobortis imperdiet tortor ut pellentesque.",
                level: "advanced"
            }
        ]
    },
    {
        course: "sql-injection",
        language: "en",
        content: [
            {
                header: "Course scenario",
                text: "A simple web store page is launched in the browser. Its basic functionality is to search for a product and then browse products related to the phrase you typed.<br><br>The first step an attacker takes is to carefully examine and analyze the source code of the website. This allows him to review the code of the website for potential vulnerabilities and security holes. The browser runs a simple online store page. The basic functionality is to search for a product and then browse products related to the search term.<br><br>The first step an attacker takes is to carefully examine and analyze the source code of the website. This allows him to review the code of the website for potential vulnerabilities and security holes.",
                level: "basic",
                slide: <Introduction/>,
            },
            {
                header: "Website code analysis",
                text: "As you can see in the attached source code snippet, the store application consists of a body (starting with <b>&lt;body&gt;</b> tag), which contains the page structure, and a script (starting with <b>&lt;script&gt;</b> tag), which is executed when certain circumstances occur. In this case, the <i>search</i> function is called when the button, located in the <b>&lt;button&gt;</b> tag, is pressed. The function's task is to send an HTTP request of GET type to the url https://api/search with the body as an object. This object contains a key-value pair specifying the string the user is searching for.<br><br><b>In this interactive exercise, try to highlight with your cursor the function located in the code that is responsible for submitting the form.</b>",
                level: "basic",
                slide: <HighlightHtml/>,
                interactive: true,
            },
            {
                header: "Sending a request",
                text: "#FORMATWyslane zadanie moze byc zmodyfikowane np przez proxy, gdzie trafia? do api, ktoro jest połączone z db, atakuajcy musi poeksperymentowac tzn zapodac ; - i rozne takie symbole i zobaczyc na kody bledu aby ustalic czy api jest podatne na sql injection, jesli front blokuje przed znakami specjalnymi to moze to zrobic uzywajac proxy",
                // slide: <HighlightSqlCode/>,
                level: "basic",
            },
            {
                header: "API code analysis",
                text: "The value sent from the web application is passed to the server-side application for processing and returning the appropriate information. The source code below shows a fragment of a server-side application that retrieves the contents of a request and then passes it directly to a database query. <Under normal circumstances, an attacker is not able to see the code of the server-side application, but by experimenting with the values of the sent data, he is able to determine its vulnerability to an SQL Injection attack.<br><br> <b>In this interactive exercise, select the code snippet that contains the SQL query</b>.",
                slide: <HighlightSqlCode/>,
                level: "basic",
                interactive: true,
            },
            {
                header: "Symulacja kodu API po otrzymaniu żądania",
                text: "#FORMAT Mając na uwadze, że api odsyla nietypowe kody bledow dla wartosci typu -, ;, atakujący może być pewny że że wartość nie jest w żaden sposób czyszczona, i jest prosto podawana do zapytania SQL, przesyłanego do bazy. Zmiana wartości parametru powoduje zmianę zapytania, a dodanie symboli komentarzy -- lub ' może znacznie zmodyfikować działanie zapytania.",
                level: "advanced",
                interactive: true,
                slide: <SqlInteractive/>,
            },
            {
                header: "Header 6",
                text: "Sed id semper dui, non mollis magna. Nunc arcu metus, scelerisque eu orci quis, rhoncus viverra felis. Donec vel ornare lectus, sit amet suscipit risus. In placerat congue libero sit amet efficitur. ",
                level: "advanced"
            },
            {
                header: "Header 7",
                text: "Aliquam sodales interdum odio, ut tristique quam viverra sed. Suspendisse ut bibendum enim. Pellentesque lobortis imperdiet tortor ut pellentesque.",
                level: "advanced"
            }
        ]
    },
    {
        course: "phishing",
        language: "pl",
        content: [
            {
                header: "Rodzaje ataków phishingowych",
                text: "Zagadnienie phishingu jest bardzo obszerne - zawiera w sobie wiele rodzajów i sposobów phishingu, jednak w większości przypadków sprowadza się do oszukania, złudzenia ofiary.<br><br>Atakujący może używać phishingu samego w sobie do zdobycia poufnych danych, jednak jest on często wykorzystywany jako element pośredniczący dla innego ataku.<br><br>Przykładowo, aby rozesłać wirusa ransomware, atakujący może spreparować i wykorzystać <strong>maile phishingowe</strong>. Kolejnym przykładem może być instalacja Keyloggera na urządzeniu mobilnym, poprzez <strong>phishing telefoniczny</strong>.<br><br>Ofiarami ataków phishingowych mogą być zarówno pracownicy firm, jak i zwykli użytkownicy internetu, których adresy email lub numery telefonów zostały ujawnione, przykładowo w wyniku wycieku bazy danych.",
                slide: <PhishingTypes/>,
                level: "basic"
            },
            {
                header: "Web Scrapping",
                text: "Atakujący obierając sobie za cel phishingu firmę, może chcieć zebrać jak najwięcej adresów email bądź numerów telefonu członków danej firmy. Wydawać się może to pracochłonnym zadaniem,  dlatego częstym sposobem pozyskiwania danych potencjalnych ofiar, są narzędzia zwane <strong>Web Scrapperami</strong>.<br><br>Są to w pełni zautomatyzowane narzędzia, które pozwalają na pobranie całej zawartości strony internetowej, odnalezieniu w niej pewnych wzorców, na przykład adresów email, a następnie zapisaniu ich.<br><br>Web scrappery mogą być również wyposażone w mechanizm odwiedzania witryn powiązanych z pierwotną stroną, celem pobierania jeszcze większej ilości danych. Zebrane i przygotowane dane mogą być bezpośrednio użyte do ataków phishingowych na dużą skalę.",
                level: "advanced",
                slide: <WebScrapping/>
            },
            {
                header: "Otrzymanie SMS phishingowego",
                text: "Załóżmy, że Twój numer telefonu znalazł się na liście ofiar ataku phishingu telefonicznego. Atak ma na celu złudzić ofiary do wejścia na stronę internetową w wiadomości, aby opłacić dodatkowe koszty przesyłki.<br><br>Z pozoru SMS wygląda rzetelnie: nadawcą jest 'Poczta Polska', a sama treść wiadomości nie wydaje się podejrzana.<br><br>Atakujący, używając specjalnych serwisów, mogą podszywać się pod dowolnego nadawcę, a samo hiperłącze, nie musi przenosić użytkownika na stronę, z którą rzekomo jest powiązane.<br><br><strong>W tym interaktywnym ćwiczeniu, przejdź do otrzymanej wiadomości SMS, przeanalizuj jej zawartość, a następnie kliknij podejrzany link.</strong>",
                level: "basic",
                slide: <PhishingEnterSimulation/>,
                interactive: true,
            },
            {
                header: "Skutki wizyty strony",
                text: "Po wejściu na stronę zauważyć można cztery podstawowe elementy, świadczące o tym, że witryna może próbować wyłudzić dane:<br>- kwota do zapłaty znacząco różni się od tej zadeklarowanej w SMS<br>- adres URL strony ma w sobie błąd<br>- odbiorcą przelewu nie jest Poczta Polska, a podejrzany ciąg znaków<br>- strona nie używa certyfikatu SSL (HTTPS)<br><br>Osoba, która będzie polegała jedynie na informacjach w SMS i nie przeanalizuje miejsca, na którym dokona zapłaty, może paść ofiarą wykradnięcia danych. Dzieje się tak, ponieważ jest to fałszywa strona, której zadaniem jest przekazanie danych do logowania atakującemu, zapewniając mu tym samym dostęp do konta bankowego ofiary.<br><br><strong>W tym interaktywnym ćwiczeniu, wejdź do wybranej metody płatności, i podaj dowolne dane logowania.</strong>",
                level: "basic",
                interactive: true,
                slide: <PhishingSendDataSimulation/>
            },
            {
                header: "Metody ochrony",
                text: "Ataki phishingowe w głównej mierze polegają na zmanipulowaniu ofiary, używając odpowiednich narzędzi inżynierii społecznej, do wejścia w podejrzany adres URL, opłacenia zamówienia itp.<br/><br/>Najbardziej podatnym elementem jest tutaj człowiek - jeśli atakującemu uda się stworzyć odpowiednie złudzenie, na przykład poprzez staranne odwzorowane wiadomości email czy strony internetowej, istnieje szansa, że ofiara będzie myślała, że odwiedza prawdziwy serwis internetowy.<br/><br/>Pełna ochrona przed atakami phishingowymi jest praktycznie nie możliwa - dlatego należy stosować dodatkowe zasady, które uchronią ofiarę przed eskalacją skutków ataku, takie jak <strong>stosowanie odpowiedniej polityki haseł</strong>.<br/><br/>Najważniejszym elementem ochrony jest jednak zachowanie uwagi przy dokonywaniu wrażliwych czynności (wykonywania przelewu, logowania się do ulubionego serwisu).",
                level: "basic",
                slide: <PhishingProtection/>
            },
            {
                header: "Zaawansowane metody ochrony",
                text: "Do bardziej zaawansowanych metod ochrony przed atakami phishingowymi zaliczyć można <b>klucze U2F</b>. Są to urządzenia nośniki danych, które łączą się z urządzeniem użytkownika poprzez port USB.<br><br>Działają na bazie kryptografii asymetrycznej i pozwalają na stosowanie ich jako uwierzytelnienia dwuskładnikowego. Dzięki temu nawet jeśli atakującemu przy próbie logowania uda się ukraść kod SMS, stanowiący uwierzytelnienie dwuskładnikowe, próba finalnie się nie powiedzie, gdyż nie będzie posiadał on fizycznego dostępu do klucza U2F.<br><br>Klucze U2F to powszechne i bezpieczne rozwiązanie, wspierane nie tylko przez systemy operacyjnych Windows, macOS i Linux, ale również przez największe portale społecznościowe. Mogą być również stosowane przy urządzeniach mobilnych, łączać się z urządzeniem poprzez protokoły NFC.",
                level: "advanced",
                slide: <U2FKeys/>
            },
        ]
    },
    {
        course: "spoofing",
        content: [
            {
                header: "Header 2",
                text: "phishing",
                level: "basic"
            },
        ]
    },
    {
        course: "ransomware",
        language: "pl",
        content: [
            {
                header: "Metody infekcji",
                text: "Ransomware, podobnie jak każdy inny rodzaj złośliwego oprogramowania, może dostać się do urządzenia końcowego różnymi sposobami. Najpopularniejszymi wektorami ataku są <b>zdalny dostęp</b>, <b>maile phishingowe</b> lub <b>zdalne wykonanie kodu</b><br><br>Każdy z wyżej wymienionych sposobów sprowadza się do jednego - zainstalowania na urządzeniu ofiary złośliwego oprogramowania (wirusa).<br><br>Głównym celem ransomware jest <strong>zaszyfrowanie danych</strong> znajdujących się na urządzeniu końcowym, celem zażądania okupu za ich odszyfrowanie.",
                level: "basic",
                slide: <RansomwareInfection/>,
            },
            {
                header: "Wygenerowanie kluczy dostępu",
                text: "Atakujący generuje parę kluczy: publiczny i prywatny. Kryptografia asymetryczna działa w ten sposób, że cokolwiek zaszyfrowane kluczem publicznym, można odszyfrować <strong>tylko</strong> kluczem prywatnym.<br><br>Wirus, który zostanie rozsyłany przez atakującego, zaszyfruje pliki <strong>kluczem publicznym</strong>. Jeśli ofiara wywiąże się z narzuconego okupu, może jej zostać dostarczony klucz prywatny, który jest jedynym sposobem na odszyfrowanie danych. W zdecydowanej większości przypadków tak się nie stanie - jeśli padniemy ofiarą ransomware, złym pomysłem jest spłacenie okupu. Najczęściej atakującemu nie będzie już zależało na dostarczeniu ofierze klucza, celem odszyfrowaniu danych.<br><br> ",
                level: "basic",
                slide: <RansomwareAsymetricKey/>,
            },
            {
                header: "Filtry antyspamowe",
                text: "Powszechną praktyką stosowaną u większości dostawców skrzynek pocztowych jest funkcjonalność <strong>filtrów załączników</strong>.<br><br>Mogą one analizować treść załączonych plików, bez względu na ich typ. Następnie, treść plików porównywana jest z bazą zawierającą każde znane złośliwe oprogramowanie - w tym przypadku ransomware - co pozwala na oszacowanie prawdopodobieństwa, że analizowany załącznik jest wirusem typu ransomware.<br><br>Wiadomość mailowa, która okaże bardzo podobna do wirusa, nie zostanie dostarczona do odbiorcy, tym samym chroniąc potencjalne ofiary przed infekcją.",
                slide: <RansomwareFilterEmail/>,
                level: "advanced"
            },
            {
                header: "Pobranie i uruchomienie wirusa",
                text: "Załóżmy, że wirus ransomware został rozesłany do ofiar w postaci <strong>maili phishingowych</strong>. <br><br>Dobrze spreparowana wiadomość będzie zachęcała odbiorcę do niezwłocznego pobrania i uruchomienia pliku, bez wcześniejszego zweryfikowania nadawcy ani typu załącznika. Na pierwszy rzut oka nadawca i plik wyglądają prawidłowo, jednak po dalszej analizie, zauważyć można wzbudzający wątpliwości adres mailowy, oraz typ (rozszerzenie) pobranego pliku.<br><br>Jeśli ofiara da się przekonać wiadomości, najprawdopodobniej natychmiast pobierze i uruchomi załącznik. <br><br><strong>W tym interaktywnym ćwiczeniu wykonaj symulację pobrania złośliwego załącznika.</strong>",
                level: "basic",
                slide: <RansomwareDownload/>,
                interactive: true
            },
            {
                header: "Uruchomienie ransomware",
                text: "Uruchomienie wirusa nie będzie skutkowało natychmiastowym zablokowaniem dostępu do danych na urządzeniu, gdyż musi minąć pewien czas, w ciągu którego ransomware zaszyfruje wszystkie pliki.<br><br>Aby wzbudzić zaufanie ofiary i tym samym dać wirusowi więcej czasu na wykonanie swojego zadania, często po uruchomieniu pliku może wyświetlić się oczekiwana treść - w tym przypadku będzie to rachunek bankowy.<br><br>Po dokładniejszej analizie zauważyć można jednak, iż nie jest on zgodny z rzeczywistością. Na tym etapie zazwyczaj jest już za późno na podjęcie akcji.<br><br><strong>W tym interaktywnym ćwiczeniu postaraj się uruchomić wcześniej pobrany plik.",
                level: "basic",
                slide: <RansomwareRun/>,
                interactive: true
            },
            {
                header: "Sytuacja po uruchomieniu wirusa",
                text: "Kiedy ransomware zakończy swoją pracę, użytkownik końcowy <strong>traci dostęp do wszystkich danych na urządzeniu</strong>. W zależności od typu ransomware, zazwyczaj jedynym sposobem na odszyfrowanie danych jest użycie szyfrującego klucza prywatnego, w którego posiadaniu jest atakujący.<br><br>Uzyskanie tego klucza nie jest jednak trywialnym zadaniem - towarzyszy temu opłata pieniężna, wykonana jak najbardziej anonimowym sposobem. Dodatkowo celem przyśpieszenia procesu uzyskania zapłaty, atakujący często zagraża ofiarze zniszczeniem klucza, który jest jedynym sposobem na uzyskanie dostępu do zaszyfrowanych danych.<br><br> <strong>W tym interaktywnym ćwiczeniu postaraj się uruchomić nowo powstały plik, a następnie przeanalizuj jego zawartość.</strong>",
                level: "basic",
                slide: <RansomwareEncrypted/>,
                interactive: true
            },
            {
                header: "Metody ochrony przed ransomware",
                text: "Przed atakiem typu ransomware ciężko się w pełni ochronić. Można jednak podjąć akcje, które pomogą zniwelować jego skutki.<br><br>Najważniejszym elementem jest <strong>zasada ograniczonego zaufania</strong> i dokładnego analizowania otrzymanych maili, pobranych plików.<br><br>Kolejnym ze sposobów na ochronę jest częste wykonywanie kopii zapasowych, jednak istnieje możliwość, że ransomware zaszyfruje także wszystkie kopie zapasowe, przez co staną się one bezużyteczne.",
                level: "basic",
                slide: <RansomwareProtectMethods/>,
            },
        ]
    },
    {
        course: "social-engineering",
        content: [
            {
                header: "Header 1",
                text: "social enginering",
                level: "basic"
            }
        ]
    },
    {
        course: "dos",
        content: [
            {
                header: "Header 1",
                text: "dos",
                level: "basic"
            }
        ]
    }
    ]

export default content