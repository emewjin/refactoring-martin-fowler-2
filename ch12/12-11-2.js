// before
// class CatalogItem {
//   constructor(id, title, tags) {
//     this._id = id;
//     this._title = title;
//     this._tags = tags;
//   }

//   get id() {
//     return this._id;
//   }

//   get title() {
//     return this._title;
//   }

//   hasTag(arg) {
//     return this._tags.includes(arg);
//   }
// }

// class Scroll extends CatalogItem {
//   constructor(id, title, tags, dataLastCleaned) {
//     super(id, title, tags);
//     this._lastCleaned = dataLastCleaned;
//   }

//   needsCleaning(targetDate) {
//     const threshold = this.hasTag('revered') ? 700 : 1500;

//     return this.daysSinceLastCleaning(targetDate) > threshold;
//   }

//   daysSinceLastCleaning(targetDate) {
//     return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
//   }
// }

// after
class Scroll {
  // constructor(id, dataLastCleaned, catalogId, catalog) {
  constructor(id, dataLastCleaned, catelogItem) {
    this._id = id;
    // this._catalogItem = catalog.get(catalogId); // repository 패턴. scroll은 순수한 도메인 클래스인데 catalogId 하나 떄문에 catalog를 통째로 가지고 온다는 것은 강력한 커플링의 신호. 필요한 것만 외부에서 주입하도록 수정한다.
    this._lastCleaned = dataLastCleaned;
  }

  get id() {
    return this.id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(aString) {
    return this._catalogItem.tags.hasTag(aString);
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;

    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

const scrolls = aDocument.map(
  (record) =>
    new Scroll(
      record.id,
      LocalDate.parse(record.lastCleaned),
      record.catalogData.id,
      catalog
    )
);
