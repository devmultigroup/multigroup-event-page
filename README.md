![screenshot](public/opengraph-image.webp)

# MultiGroup Etkinlik Sayfası

[![Made With Love](https://img.shields.io/badge/Made%20With-Love-orange.svg)](https://github.com/chetanraj/awesome-github-badges) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md) [![License: GNU 3.0](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT) [![GitHub pull-requests](https://img.shields.io/github/issues-pr/Developer-MultiGroup/multigroup-event-page.svg)](https://GitHub.com/Developer-MultiGroup/multigroup-event-page/pulls/) [![GitHub issues](https://img.shields.io/github/issues/Developer-MultiGroup/multigroup-event-page.svg)](https://GitHub.com/Developer-MultiGroup/multigroup-event-page/issues/)

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

## Etkinlik Dosyalarının Yönetimi

### Event Type Yapısı

```mermaid
classDiagram
    direction LR

    class Event {
        +number id
        +string name
        +string subTitle
        +string title
        +string description
        +Location location
        +string registerLink
        +string videoUrl
        +string date
        +string[] sponsors
        +Speaker[] speakers
        +Session[] sessions
        +AfterMetrics? afterMetrics
    }

    class Location {
        +number latitude
        +number longitude
        +string name
        +string subtext
    }

    class Speaker {
        +string fullName
        +string photoUrl
        +string title
    }

    class Session {
        +string topic
        +string startTime
        +string endTime
        +string speakerName
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

    Event *-- Location : has
    Event *-- Speaker : contains
    Event *-- Session : contains
    Event *-- AfterMetrics : tracks
```

### Fotoğraf Klasörleri

```bash
/public/images
    ├── events
    │   └── etkinlik-adi
    ├── speakers
    └── sponsors
```

Projenin fotoğraf depolama yapısı yukarıdaki gibidir.

#### Etkinlik Fotoğrafları

Her etkinliğin kendisiyle alakalı 3 adet fotoğraf belirtilen isimlerde kendi isminin altında (slugify edilmiş isim) bulunur.

#### Konuşmacı Fotoğrafları

Tüm konuşmacıların fotoğrafları slugify edilmiş isimler ile bu klasörde tutulur ve herhangi bir etkinliğe konuşmacı eklenirken o isimle eklendiğinde fotoğraflar otomatik olarak bu klasörden alınır

#### Sponsor Fotoğrafları

Sponsor fotoğraflarının mantığı da konuşmacılarla aynıdır. Slugify edilmiş bir isim ile sponsorların logoları bu klasörün içerisinde tutulur ve gerektiğinde etkinlik objesindeki array yapısına bu isim eklenir.

## Yeni Etkinlik Oluşturma

Yeni bir etkinlik oluştururken yukarında belirtilen alanları `data/events.ts` dosyasında yeni bir obje oluşturup yazmak yeterlidir. Sadece dikkat edilmesi gerek konu fotoğrafların isimleri ve koyuldukları yerlerdir.

## Repo Aktivitesi

<!-- ![Alt](https://repobeats.axiom.co/api/embed/94a2829520bc7e0ee83043b228c0db765d31cf5b.svg "Repobeats analytics image") -->

[![Star History Chart](https://api.star-history.com/svg?repos=Developer-MultiGroup/multigroup-event-page&type=Timeline)](https://star-history.com/#fDeveloper-MultiGroup/multigroup-event-page)

## License

Bu projenin [lisansına](LICENSE) göz atın.

## Contact

If you have any questions, feel free to reach out to me at `me@furkanunsalan.dev`.
