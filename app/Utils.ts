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
