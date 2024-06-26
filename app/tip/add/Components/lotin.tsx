// components/LatCyrConverter.tsx
import { useEffect, useState } from "react";
import { TextField, Button, Container, Box, IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export const latinToCyrillic = (latin: string): string => {
  const map: any = {
    a: "а",
    b: "б",
    c: "ц",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "ҳ",
    i: "и",
    j: "ж",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "қ",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    w: "ў",
    x: "х",
    y: "й",
    z: "з",
    sh: "ш",
    ch: "ч",
    " ": " ",
  };

  return latin.replace(/sh|ch|./g, (char) => map[char] || char);
};

export const cyrillicToLatin = (cyrillic: string): string => {
  const map: any = {
    а: "a",
    б: "b",
    ц: "c",
    д: "d",
    е: "e",
    ф: "f",
    г: "g",
    ҳ: "h",
    и: "i",
    ж: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    қ: "q",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    в: "v",
    ў: "w",
    х: "x",
    й: "y",
    з: "z",
    ш: "sh",
    ч: "ch",
    " ": " ",
  };

  return cyrillic.replace(/ш|ч|./g, (char) => map[char] || char);
};

const LatCyrConverter = ({
  setValue,
  value,
  clear,
}: {
  setValue: any;
  value: any;
  clear: any;
}) => {
  const [latinText, setLatinText] = useState("");
  const [cyrillicText, setCyrillicText] = useState("");
  const [isLatinToCyrillic, setIsLatinToCyrillic] = useState(true);
  const [isLotin, setIsLotin] = useState(true);

  const handleLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLotin(true);
    const valuee = e.target.value;
    setValue({ ...value, FIOlotin: valuee, FIOkril: latinToCyrillic(valuee) });
    setLatinText(valuee);
    setCyrillicText(latinToCyrillic(valuee));
  };

  const handleLatinChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuee = e.target.value;
    setValue({ ...value, FIOlotin: valuee });
    setLatinText(valuee);
  };

  const handleCyrillicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLotin(false);
    const valuee = e.target.value;
    setValue({ ...value, FIOlotin: cyrillicToLatin(valuee), FIOkril: valuee });
    setCyrillicText(valuee);
    setLatinText(cyrillicToLatin(valuee));
  };

  const handleCyrillicChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuee = e.target.value;
    setValue({ ...value, FIOkril: valuee });
    setCyrillicText(valuee);
  };

  const handleSwitch = () => {
    setIsLatinToCyrillic(!isLatinToCyrillic);
    if (!isLotin) {
      setLatinText(cyrillicText);
      setCyrillicText(latinText);
    } else {
      setLatinText(latinText);
      setCyrillicText(cyrillicText);
    }
  };

  useEffect(() => {
    setLatinText("");
    setCyrillicText("");
  }, [clear]);

  return (
    <Box width={"100%"}>
      {isLatinToCyrillic ? (
        <div className="flex w-full  items-center  justify-between gap-10 ">
          <TextField
            label="Lotin"
            value={latinText}
            onChange={handleLatinChange}
            fullWidth
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />

          <IconButton
            sx={{ width: "60px", height: "60px" }}
            aria-label="delete"
            onClick={handleSwitch}
            size="medium"
          >
            <CompareArrowsIcon fontSize="inherit" />
          </IconButton>

          <TextField
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
            label="Kirill"
            value={cyrillicText}
            onChange={handleCyrillicChange2}
            fullWidth
          />
        </div>
      ) : (
        <div className="flex w-full  items-center  justify-between gap-10 ">
          <TextField
            label="Kirill"
            value={cyrillicText}
            onChange={handleCyrillicChange}
            fullWidth
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
          <IconButton
            aria-label="delete"
            onClick={handleSwitch}
            sx={{ width: "60px", height: "60px" }}
            size="medium"
          >
            <CompareArrowsIcon fontSize="inherit" />
          </IconButton>
          <TextField
            label="Lotin"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
            onChange={handleLatinChange2}
            value={latinText}
            fullWidth
          />
        </div>
      )}
    </Box>
  );
};

export default LatCyrConverter;
