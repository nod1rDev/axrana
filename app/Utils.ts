export const DateFilt = () => {
  const dateInfo = new Date();
  const date = dateInfo.toString();

  const day = date.slice(8, 10);

  return `${dateInfo.getFullYear()}-yil/${
    dateInfo.getMonth() + 1
  }-oy/${day}-kun`;
};

export const extractNameAndSumma = (
  items: any
): { name: string; summa: number }[] => {
  return items.map((item: any) => ({ name: item.name, summa: item.summa }));
};
export const extractNameAndSumma2 = (
  items: any
): { name: string; number: number }[] => {
  return items.map((item: any) => ({ name: item.name, number: item.number }));
};
export const extractNmae = (items: any): { name: string; summa: number }[] => {
  return items.map((item: any) => ({ name: item.name }));
};

export function latinToCyrillic(latin: string): string {
  const map: { [key: string]: string } = {
    A: "А",
    a: "а",
    B: "Б",
    b: "б",
    D: "Д",
    d: "д",
    E: "Е",
    e: "е",
    F: "Ф",
    f: "ф",
    G: "Г",
    g: "г",
    H: "Ҳ",
    h: "ҳ",
    I: "И",
    i: "и",
    J: "Ж",
    j: "ж",
    K: "К",
    k: "к",
    L: "Л",
    l: "л",
    M: "М",
    m: "м",
    N: "Н",
    n: "н",
    O: "О",
    o: "о",
    P: "П",
    p: "п",
    Q: "Қ",
    q: "қ",
    R: "Р",
    r: "р",
    S: "С",
    s: "с",
    T: "Т",
    t: "т",
    U: "У",
    u: "у",
    V: "В",
    v: "в",
    X: "Х",
    x: "х",
    Y: "Й",
    y: "й",
    Z: "З",
    z: "з",
    Sh: "Ш",
    sh: "ш",
    Ch: "Ч",
    ch: "ч",
    Oʻ: "Ў",
    oʻ: "ў",
    Gʻ: "Ғ",
    gʻ: "ғ",
    Ye: "Е",
    ye: "е",
    Yo: "Ё",
    yo: "ё",
    Yu: "Ю",
    yu: "ю",
    Ya: "Я",
    ya: "я",
  };

  // Kiritilgan matnni tarjima qilish
  let cyrillic = "";
  let i = 0;

  while (i < latin.length) {
    // Ikki harfli harflarni tekshirish
    if (i + 1 < latin.length) {
      const doubleChar = latin[i] + latin[i + 1];
      if (map[doubleChar]) {
        cyrillic += map[doubleChar];
        i += 2;
        continue;
      }
    }

    // Bir harfli harflarni tekshirish
    const singleChar = latin[i];
    if (map[singleChar]) {
      cyrillic += map[singleChar];
    } else {
      cyrillic += singleChar; // Agar xaritada topilmasa, o'zini qo'shadi
    }
    i++;
  }

  return cyrillic;
}

type InputObject = {
  name: string;
  summa: number;
};

type OutputObject = {
  name: string;
  coefficient: number;
};

export function transformArray(arr: InputObject[]): OutputObject[] {
  return arr.map((obj) => ({
    name: obj.name,
    coefficient: obj.summa,
  }));
}

export const FiltDate = (date: any) => {
  return `${date.$y}-${
    `${date.$M + 1}`.length > 1 ? date.$M + 1 : `0${date.$M + 1}`
  }-${`${date.$D}`.length > 1 ? date.$D : `0${date.$D}`}`;
};
