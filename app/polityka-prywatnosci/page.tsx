import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności | MRTIQ · WEKTOR",
  description:
    "Jak MRTIQ przetwarza dane osobowe zebrane przez formularz zgłoszenia do naboru WEKTOR (Fundusze Europejskie dla Pomorza). Polityka cookies i Consent Mode v2.",
  robots: { index: false, follow: true },
};

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl lg:text-2xl font-semibold tracking-tight">
        <span className="font-mono text-cyan-neon text-[15px] mr-3">{n}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-bone-mute">{children}</div>
    </section>
  );
}

export default function PolitykaPrywatnosci() {
  return (
    <main className="relative z-[2] bg-ink text-bone min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-10 py-24 lg:py-32">
        <Link href="/pomorskie" className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-neon hover:text-electric-yellow transition-colors">
          ← Wróć do strony naboru
        </Link>

        <h1 className="mt-8 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05]">
          Polityka prywatności i cookies
        </h1>
        <p className="mt-4 text-[14px] text-bone/50">Data ostatniej aktualizacji: 27.05.2026.</p>

        <div className="mt-6 rounded-2xl border border-electric-yellow/30 bg-electric-yellow/[0.05] p-4 text-[13px] leading-relaxed text-bone-mute">
          To szablon, nie porada prawna. Przed publikacją zweryfikuj go z prawnikiem / specjalistą ds. ochrony danych, potwierdź, który podmiot jest administratorem (JDG vs sp. z o.o.) oraz uzupełnij pola w nawiasach (dostawcy IT, e-mail do spraw danych, daty).
        </div>

        <h2 className="mt-12 font-display text-lg font-semibold tracking-tight text-bone/70">Część A — Polityka prywatności</h2>

        <Section n="01" title="Administrator danych">
          <p>
            Administratorem Twoich danych osobowych jest <strong className="text-bone">Paweł Michta</strong>, prowadzący działalność
            gospodarczą pod adresem <strong className="text-bone">Szafarnia 11/F8, 80-755 Gdańsk</strong>, <strong className="text-bone">NIP 5833042686</strong>
            {" "}(potwierdź podmiot — jeśli administratorem jest sp. z o.o., podmień nazwę, adres, NIP/KRS).
          </p>
          <p>Kontakt w sprawach danych: e-mail <a href="mailto:intel@mrtiq.pl" className="text-cyan-neon underline underline-offset-2">intel@mrtiq.pl</a>, tel. <a href="tel:+48502417719" className="text-cyan-neon underline underline-offset-2">+48 502 417 719</a>.</p>
        </Section>

        <Section n="02" title="Inspektor Ochrony Danych">
          <p>Administrator nie powołał Inspektora Ochrony Danych (brak takiego obowiązku). We wszystkich sprawach dotyczących danych pisz na adres z pkt 01.</p>
        </Section>

        <Section n="03" title="Jakie dane przetwarzamy">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><span className="text-bone">Z formularza zgłoszeniowego:</span> imię, adres e-mail, numer telefonu (oraz, w ścieżce z asystą, nazwisko, miasto/powiat, opcjonalnie firma i NIP).</li>
            <li><span className="text-bone">W trakcie kontaktu i obsługi naboru:</span> dane podane w korespondencji oraz niezbędne do złożenia i rozliczenia wniosku o dofinansowanie.</li>
            <li><span className="text-bone">Automatycznie podczas wizyty:</span> dane techniczne (adres IP, typ urządzenia/przeglądarki, dane z cookies i narzędzi analitycznych) — zob. Część C.</li>
          </ul>
          <p>Nie zbieramy i nie przyjmujemy haseł do systemu BUR ani systemu naboru WEKTOR — pozostają wyłącznie u Ciebie.</p>
        </Section>

        <Section n="04" title="Cele i podstawy prawne (art. 6 RODO)">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Kontakt i odpowiedź na zgłoszenie ws. szkolenia i naboru WEKTOR — zgoda (art. 6 ust. 1 lit. a) oraz działania na Twoje żądanie przed zawarciem umowy (lit. b).</li>
            <li>Realizacja umowy szkoleniowej — art. 6 ust. 1 lit. b.</li>
            <li>Obowiązki prawne (rozliczenia podatkowe, dokumentacja dofinansowania UE) — art. 6 ust. 1 lit. c.</li>
            <li>Przypomnienia e-mail/SMS i marketing własny — zgoda (lit. a) lub uzasadniony interes (lit. f).</li>
            <li>Ustalenie, dochodzenie lub obrona roszczeń — uzasadniony interes (lit. f).</li>
          </ul>
        </Section>

        <Section n="05" title="Odbiorcy danych">
          <p>Dane możemy udostępniać:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Operatorowi dofinansowania — <span className="text-bone">Agencji Rozwoju Pomorza S.A.</span> oraz Partnerowi (WUP w Gdańsku) w zakresie oceny i rozliczenia wniosku w projekcie WEKTOR;</li>
            <li>dostawcom usług IT: hosting [nazwa dostawcy], system e-mail/SMS [nazwa], narzędzia analityczne [nazwa];</li>
            <li>biuru rachunkowemu i doradcom — w zakresie obowiązków prawnych;</li>
            <li>podmiotom uprawnionym na podstawie przepisów prawa.</li>
          </ul>
          <p>Nie sprzedajemy Twoich danych.</p>
        </Section>

        <Section n="06" title="Przekazywanie poza EOG">
          <p>Jeśli korzystamy z narzędzi dostawców spoza Europejskiego Obszaru Gospodarczego, dane mogą być przekazywane do państw trzecich wyłącznie z zabezpieczeniami wymaganymi przez RODO (m.in. standardowe klauzule umowne). [Uzupełnij listę narzędzi/krajów lub usuń, jeśli nie dotyczy.]</p>
        </Section>

        <Section n="07" title="Okres przechowywania">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Dane ze zgody na kontakt/marketing — do wycofania zgody lub ustania celu.</li>
            <li>Dane związane z umową — przez okres realizacji i przedawnienia roszczeń.</li>
            <li>Dane do rozliczeń podatkowych — przez okres wymagany przepisami (co do zasady 5 lat).</li>
            <li>Dokumentacja dofinansowania — zgodnie z zasadami projektu WEKTOR, do 31.12.2034.</li>
          </ul>
        </Section>

        <Section n="08" title="Twoje prawa">
          <p>Masz prawo do: dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie oraz wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania sprzed wycofania).</p>
          <p>Przysługuje Ci skarga do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</p>
        </Section>

        <Section n="09" title="Dobrowolność podania danych">
          <p>Podanie danych jest dobrowolne, ale niezbędne, byśmy mogli się z Tobą skontaktować, przekazać instrukcję i pomóc w naborze. Bez nich nie zrealizujemy tych działań.</p>
        </Section>

        <Section n="10" title="Zautomatyzowane decyzje i profilowanie">
          <p>Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, które wywoływałyby wobec Ciebie skutki prawne lub podobnie istotne.</p>
        </Section>

        <h2 className="mt-14 font-display text-lg font-semibold tracking-tight text-bone/70">Część C — Polityka cookies</h2>

        <Section n="11" title="Rodzaje cookies">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><span className="text-bone">Niezbędne</span> — konieczne do działania strony (nie wymagają zgody).</li>
            <li><span className="text-bone">Analityczne</span> — pomagają mierzyć ruch i ulepszać stronę (np. Google Analytics 4).</li>
            <li><span className="text-bone">Marketingowe</span> — mierzą skuteczność reklam (np. Meta Pixel) [jeśli stosowane].</li>
          </ul>
        </Section>

        <Section n="12" title="Zgoda i zarządzanie">
          <p>Cookies analityczne i marketingowe uruchamiamy dopiero po wyrażeniu zgody w banerze cookies (zgodnie z Consent Mode v2). Zgodę możesz zmienić lub wycofać w każdej chwili, a także zarządzać cookies w ustawieniach przeglądarki (blokować lub usuwać).</p>
        </Section>

        <div className="mt-14 border-t border-white/10 pt-8">
          <Link href="/pomorskie" className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3 text-[14px] font-bold text-ink neon-yellow">
            ← Wróć do strony naboru
          </Link>
        </div>
      </div>
    </main>
  );
}
