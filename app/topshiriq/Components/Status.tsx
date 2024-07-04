import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function Status({ status }: { status: string }) {


  return (
    <button
      className={`${
        status == "bajarildi" ? " bg-[#33D69F] text-[#33D69F]  " : ""
      } ${status == "bajarilmoqda" ? "bg-[#FF8F00] text-[#FF8F00]" : ""} ${
        status == "bajarilmagan"
          ? "bg-[#373B53] transition-all text-[#373B53] "
          : ""
      } px-2 py-1 flex gap-2  items-center rounded-md bg-opacity-[0.2] h-[40px] font-bold text-[15px] leading-[15px] tracking-[-0.25px] justify-center`}
    >
      <img
        className="mb-1"
        width={8}
        height={8}
        src={
          status == "bajarildi"
            ? "/paid.svg"
            : status == "bajarilmoqda"
            ? "/pinding.svg"
            : status == "bajarilmagan"
            ? "/draft.svg"
            : ""
        }
        alt="."
      />
      {status == "bajarildi"
        ? latinToCyrillic("bajarildi")
        : status == "bajarilmoqda"
        ? latinToCyrillic("Bajarilmoqda")
        : status == "bajarilmagan"
        ? latinToCyrillic("Bajarilmagan")
        : ""}
    </button>
  );
}

export default Status;
