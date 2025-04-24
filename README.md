![screenshot](public/opengraph-image.webp)

<h1 align="center">MultiGroup Etkinlikleri</h1>

<div align="center">

[![Made With Love](https://img.shields.io/badge/Made%20With-Love%20<3-red.svg)](https://github.com/chetanraj/awesome-github-badges)
[![Where Developers Become Together](https://img.shields.io/badge/Where%20Developers%20Become-Together!-blue.svg)](https://kommunity.com/devmultigroup)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
[![License: GNU 3.0](https://img.shields.io/badge/License-GNU%203.0-orange.svg)](https://opensource.org/license/gpl-3-0)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/Developer-MultiGroup/multigroup-event-page.svg)](https://GitHub.com/Developer-MultiGroup/multigroup-event-page/pulls/)
[![GitHub issues](https://img.shields.io/github/issues/Developer-MultiGroup/multigroup-event-page.svg)](https://GitHub.com/Developer-MultiGroup/multigroup-event-page/issues/)

</div>

## Genel Bakış

Bu repository Developer MultiGroup'un etkinliklerine kolayca ulaşabilmeniz için tasarlandı. Daha önceden yapılmış veya en yakın zamanda yapılacak olan etkinlikleri buradan inceleyebilir, katkıda bulunmak isterseniz `issues` kısmına göz atarak bizlere destek olabilirsiniz.

[English Documentation](/README-ENG.md)

## Özellikler

- **Dinamik Yapı:** Hiçbir veritabanı ve depolama servisine gerek duymadan yeni etkinlikler oluşturun ve yayınlayın
- **Takvime Ekle:** Etkinlik oturumlarını takviminize kolayca ekleyin ve akıştan geri kalmayın.
- **Konumlara Erişin:** Platformunuza uygun harita uygulaması ile etkinlik alanına kolayca ulaşın.
- **Duyarlı Tasarım:** Etkinliklerimizi her platformdan takip edebilmeniz için tamamen dinamik bir tasarım.

## Kullanılan Teknolojiler

- **Next.js:** Kullanıcı arayüzünün geliştirilmesi.
- **Shadcn/ui:** Kullanılan hazır bileşenler (components).
- **Tailwind CSS:** Stil ve cihaza duyarlı tasarımlar.
- **Pigeon Maps:** Etkinlik lokasyonlarının dinamik şekilde gösterilmesi.
- **Vercel:** Kod dağıtımı.
- **Framer:** Bileşen ve sayfa animasyonları.

## Proje Dosyalarının Yönetimi

### Event Type Yapısı

```mermaid
classDiagram
    direction LR

    class Event {
        +number id
        +string name
        +string heroDescription
        +string cardDescription
        +Location location
        +string registerLink
        +string videoUrl
        +string date
        +Organizer[] organizers
        +Speaker[] speakers
        +Session[] sessions
        +Sponsor[] sponsors
        +Ticket[] tickets
        +string[] images
        +InitialMetric[] initialMetrics (max 3)
        +AfterMetrics afterMetrics
        +ColorPalette colorPalette
    }

    class Location {
        +number latitude
        +number longitude
        +string name
        +string subtext
    }

    class Speaker {
        +string fullName
        +string title
        +string company
        +string instagram
        +string linkedin
        +string twitter
    }

    class Organizer {
        +number id
        +string name
        +string designation
        +string image
    }

    class Session {
        +string room
        +string topic
        +string startTime
        +string endTime
        +string speakerName
    }

    class Sponsor {
        +string tier ("platin"|"altın"|"gümüş"|"bronz")
        +string sponsorSlug
    }

    class Ticket {
        +string type
        +string description
        +number price
        +string link
        +string[] perks
    }

    class InitialMetric {
        +string title
        +number value
    }

    class AfterMetrics {
        +string applications
        +string vipGuests
        +string supporter
        +string speakers
        +string workingParticipant
        +string jobSeeker
        +string jobProvider
        +string satisfaction
    }

    class ColorPalette {
        +string primary
        +string secondary
        +string accent
        +string background
        +string text
    }

    Event *-- Location : has
    Event *-- Organizer : organized_by
    Event *-- Speaker : features
    Event *-- Session : includes
    Event *-- Sponsor : backed by
    Event *-- Ticket : offers
    Event *-- InitialMetric : highlights
    Event *-- AfterMetrics : evaluates
    Event *-- ColorPalette : themed by

```

### Fotoğraf Klasörleri

```bash
/public/images
    ├── events
    │   └── event-name
    ├── logo
    ├── mockups
    ├── organizer
    ├── speakers
    └── sponsors
```

Projenin fotoğraf depolama yapısı yukarıdaki gibidir.

#### Etkinlik Fotoğrafları

Her etkinliğin kendisiyle alakalı 3 adet fotoğraf belirtilen isimlerde kendi isminin altında (slugify edilmiş isim) bulunur.

#### Logolar

MultiGroup adına kullanılan logoların depolandığı dosya dizinidir.

#### Mockup'lar

Etkinlikler özelinde ve kart tasarımlarında kullanılan mockup'ların biriktirildiği dizindir.

#### Organizatör Fotoğrafları

Etkinlik organizatörlerinin giriş sayfasında kullanılmak üzere toplanan fotoğraflarının bulunduğu dosya dizini.

#### Konuşmacı Fotoğrafları

Tüm konuşmacıların fotoğrafları slugify edilmiş isimler ile bu klasörde tutulur ve herhangi bir etkinliğe konuşmacı eklenirken o isimle eklendiğinde fotoğraflar otomatik olarak bu klasörden alınır

#### Sponsor Fotoğrafları

Sponsor fotoğraflarının mantığı da konuşmacılarla aynıdır. Slugify edilmiş bir isim ile sponsorların logoları bu klasörün içerisinde tutulur ve gerektiğinde etkinlik objesindeki array yapısına bu isim eklenir.

### Component Klasörleri

#### Ortak Bileşenler

(src/components/common)

Diğer bileşenlerde ortak olarak kullanılan, proje genelinde ihtiyaç duyulan bileşenler.

#### Ayırıcı Bileşenler

(src/components/dividers)

Bölüm geçişlerinde kullanılan bileşenler.

#### Etkinlik Bileşenleri

(src/components/event-components)

Etkinlik sayfasında kullanılan veya etkinliklerle ilgili bileşenler.

#### Navigation Bileşenleri

(src/components/navigation-components)

Navigasyon özelinde kullanılan bileşenler.

#### Konuşmacı Bileşenleri

(src/components/speaker-components)

Konuşmacılar ile alakalı olarak kullanılan bileşenler

#### Harici Bileşenler

(src/components/ui)

Shadcn UI, Aceternity UI gibi harici kaynaklardan indirilen bileşenler.

### Duyuru Dosyası

(src/data/announcement.ts)

```mermaid
erDiagram
    ANNOUNCEMENT {
        boolean show "Duyuru çubuğunun görünür olup olmadığını belirtir"
        string text "Banner'da gösterilen mesaj"
        string backgroundColor "Banner'ın arka plan rengi (HEX formatında)"
        string textColor "Banner'ın metin rengi (HEX formatında)"
        string link "Kullanıcı tıkladığında yönlendirilecek URL (örneğin, YouTube)"
        string linkText "Link butonunun metni (örneğin, 'İzle')"
        boolean showLink "Link butonunun gösterilip gösterilmeyeceğini belirler"
    }
```

## Yeni Etkinlik Oluşturma

Yeni bir etkinlik oluştururken yukarında belirtilen alanları `data/events.ts` dosyasında yeni bir obje oluşturup yazmak yeterlidir. Sadece dikkat edilmesi gerek konu fotoğrafların isimleri ve koyuldukları yerlerdir.

## Repo Aktivitesi

<!-- ![Alt](https://repobeats.axiom.co/api/embed/94a2829520bc7e0ee83043b228c0db765d31cf5b.svg "Repobeats analytics image") -->

[![Star History Chart](https://api.star-history.com/svg?repos=Developer-MultiGroup/multigroup-event-page&type=Timeline)](https://star-history.com/#fDeveloper-MultiGroup/multigroup-event-page)

## Lisans

Bu projenin [lisansına](LICENSE) göz atın.

## İletişim

Eğer proje hakkında herhangi bir sorunuz olursa bana `me@furkanunsalan.dev` mail adresi üzerinden ulaşabilirsiniz.
