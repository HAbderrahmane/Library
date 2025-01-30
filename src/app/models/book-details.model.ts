export interface BookDetails {
  id: string;
  title: string;
  kind?: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  printedPageCount?: number;
  language?: string;
  thumbnail?: string;
  categories?: string[];
  maturityRating?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  saleInfo?: {
    country?: string;
    saleability?: string;
    retailPrice?: {
      amount?: number;
      currencyCode?: string;
    };
    buyLink?: string;
  };
  accessInfo?: {
    country?: string;
    viewability?: string;
    publicDomain?: boolean;
    textToSpeechPermission?: string;
    epub?: {
      isAvailable?: boolean;
      downloadLink?: string; // Add downloadLink here
    };
    pdf?: {
      isAvailable?: boolean;
      downloadLink?: string; // Add downloadLink here
    };
    webReaderLink?: string; // Add webReaderLink here
  };
}
