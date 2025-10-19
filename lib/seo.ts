export interface SEOConfig {
  siteName: string;
  siteDescription: string;
  defaultTitle: string;
  defaultDescription: string;
  author: string;
  keywords: string[];
}

export const seoConfig: SEOConfig = {
  siteName: "Redark.pl",
  siteDescription:
    "Poradniki, recenzje i projekty DIY z zakresu elektroniki, składania PC i technologii",
  defaultTitle: "Redark.pl - Poradniki, recenzje i projekty DIY",
  defaultDescription:
    "Najnowsze artykuły na Redark.pl - poradniki składania PC, recenzje sprzętu, projekty DIY i elektronika. Praktyczna wiedza dla pasjonatów technologii.",
  author: "Daniel Alberski",
  keywords: [
    "składanie PC",
    "poradniki komputerowe",
    "recenzje sprzętu",
    "projekty DIY",
    "elektronika",
    "druk 3D",
    "komponenty komputerowe",
    "technologia",
    "hardware",
    "gaming",
  ],
};

// Helper functions for generating consistent metadata
export function generatePageTitle(
  pageTitle: string,
  includeSiteName: boolean = true
): string {
  if (includeSiteName) {
    return `${pageTitle} - ${seoConfig.siteName}`;
  }
  return pageTitle;
}

export function generatePageDescription(description: string): string {
  return description;
}

export function generateOpenGraphData(
  title: string,
  description: string,
  type: "website" | "article" = "website"
) {
  return {
    title: generatePageTitle(title, false),
    description: generatePageDescription(description),
    type,
    siteName: seoConfig.siteName,
  };
}

// Predefined metadata for common pages
export const commonPageMetadata = {
  home: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    openGraph: generateOpenGraphData(
      "Poradniki, recenzje i projekty DIY",
      seoConfig.defaultDescription
    ),
  },

  contact: {
    title: generatePageTitle("Kontakt"),
    description: generatePageDescription(
      "Skontaktuj się z autorem Redark.pl - Daniel Alberski. Współpraca, pytania i sugestie dotyczące artykułów o elektronice, druku 3D i projektach DIY."
    ),
    openGraph: generateOpenGraphData(
      "Kontakt",
      "Skontaktuj się z autorem Redark.pl - Daniel Alberski. Współpraca, pytania i sugestie dotyczące artykułów o elektronice, druku 3D i projektach DIY."
    ),
  },

  components: {
    title: generatePageTitle("Podzespoły i urządzenia"),
    description: generatePageDescription(
      "Kompletny przewodnik po podzespołach komputerowych i urządzeniach peryferyjnych. Poradniki doboru procesorów, kart graficznych, pamięci RAM, monitorów i innych komponentów."
    ),
    openGraph: generateOpenGraphData(
      "Podzespoły i urządzenia",
      "Kompletny przewodnik po podzespołach komputerowych i urządzeniach peryferyjnych. Poradniki doboru procesorów, kart graficznych, pamięci RAM, monitorów i innych komponentów."
    ),
  },

  privacy: {
    title: generatePageTitle("Polityka prywatności"),
    description: generatePageDescription(
      "Polityka prywatności serwisu Redark.pl. Informacje o przetwarzaniu danych osobowych, cookies, komentarzach i analityce statystyk."
    ),
    openGraph: generateOpenGraphData(
      "Polityka prywatności",
      "Polityka prywatności serwisu Redark.pl. Informacje o przetwarzaniu danych osobowych, cookies, komentarzach i analityce statystyk."
    ),
  },

  terms: {
    title: generatePageTitle("Regulamin witryny"),
    description: generatePageDescription(
      "Regulamin serwisu Redark.pl. Zasady korzystania z witryny, prawa autorskie, odpowiedzialność użytkownika i publikowanie komentarzy."
    ),
    openGraph: generateOpenGraphData(
      "Regulamin witryny",
      "Regulamin serwisu Redark.pl. Zasady korzystania z witryny, prawa autorskie, odpowiedzialność użytkownika i publikowanie komentarzy."
    ),
  },

  series: {
    title: generatePageTitle("Serie artykułów"),
    description: generatePageDescription(
      "Wszystkie serie artykułów na Redark.pl: Składanie PC, Podzespoły i urządzenia, KOMPendium wiedzy, DIY, Recenzje i Newsy. Zorganizowana wiedza o elektronice i technologii."
    ),
    openGraph: generateOpenGraphData(
      "Serie artykułów",
      "Wszystkie serie artykułów na Redark.pl: Składanie PC, Podzespoły i urządzenia, KOMPendium wiedzy, DIY, Recenzje i Newsy."
    ),
  },

  pcBuilding: {
    title: generatePageTitle("Składanie PC - Kompletny poradnik"),
    description: generatePageDescription(
      "Kompletny poradnik składania komputera PC krok po kroku. Teoria, praktyka, montaż podzespołów, testy i konfiguracja. Poradnik dla początkujących i zaawansowanych."
    ),
    openGraph: generateOpenGraphData(
      "Składanie PC - Kompletny poradnik",
      "Kompletny poradnik składania komputera PC krok po kroku. Teoria, praktyka, montaż podzespołów, testy i konfiguracja."
    ),
  },

  search: {
    title: generatePageTitle("Szukaj"),
    description: generatePageDescription(
      "Wyszukiwarka artykułów na Redark.pl. Znajdź interesujące Cię poradniki, recenzje i projekty DIY dotyczące elektroniki, składania PC i technologii."
    ),
    openGraph: generateOpenGraphData(
      "Szukaj",
      "Wyszukiwarka artykułów na Redark.pl. Znajdź interesujące Cię poradniki, recenzje i projekty DIY dotyczące elektroniki, składania PC i technologii."
    ),
  },

  blog: {
    title: generatePageTitle("Blog"),
    description: generatePageDescription(
      "Wszystkie artykuły na Redark.pl - poradniki, recenzje i projekty DIY"
    ),
    openGraph: generateOpenGraphData(
      "Blog",
      "Wszystkie artykuły na Redark.pl - poradniki, recenzje i projekty DIY"
    ),
  },
};
