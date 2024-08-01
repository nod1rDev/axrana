"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SingleTab from "./SingleTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alertChange } from "../Redux/ShaxsiySlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import BudgetTable from "./SingleTab";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";
import Documenttt from "../Components/Document";
import {
  deleteContract,
  getAllBank,
  getAllBoshliq,
  getAllManzil,
  getAllMfo,
  getAllShahar,
  getAllstr,
  getToPrint,
} from "../Api/Apis";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Document2 from "../Components/Document2";
import { formatString } from "../Utils";
function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getToPrint(JWT, id);
    setTasks(res.tasks);
    setData(res.data[0]);
  };

  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();
  const deleteItem = async () => {
    const res = await deleteContract(JWT, id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma ochirildi"),
          status: "success",
        })
      );

      router.push("/shartnoma");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });
  const [info, setInfo] = useState<any>();
  const getShahar = async () => {
    const res = await getAllShahar(JWT);
    const res2 = await getAllBoshliq(JWT);
    const res3 = await getAllManzil(JWT);
    const res4 = await getAllBank(JWT);
    const res5 = await getAllMfo(JWT);
    const res6 = await getAllstr(JWT);
    setInfo({
      ...info,
      ijrochi: res.data[0].executor,
      boshliq: res2.data[0].leader,
      manzil: res3.data[0].address,
      bank: res4.data[0].bank,
      mfo: res5.data[0].mfo,
      str: res6.data[0].str,
    });
  };

  useEffect(() => {
    getShahar();
  }, []);
  const getMonthNameInCyrillic = (month: number): string => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return months[month];
  };
  const getCurrentYearAndMonth = (): any => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // getMonth() returns 0-indexed month (0 = January, 11 = December)
    const monthName = getMonthNameInCyrillic(month);

    return { year: year, month: monthName };
  };
  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <>
      {data && (
        <>
          <div className=" hidden">
            {versiya ? (
              <Documenttt
                tasks={tasks}
                data={data}
                info={info}
                ref={componentRef}
              />
            ) : (
              <Document2
                tasks={tasks}
                data={data}
                info={info}
                ref={componentRef}
              />
            )}
          </div>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6">
              <Button
                startIcon={<ArrowBackIcon />}
                color="info"
                variant="contained"
                onClick={() => router.push("/read/" + id)}
              >
                {"орқага"}
              </Button>
            </div>
            <div className="rounded-lg w-full mb-5 bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">{data?.contractnumber}</h1>
              <div className="flex gap-3">
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="contained"
                  onClick={() => deleteItem()}
                >
                  {"учириш"}
                </Button>
                <Button
                  onClick={() => router.push("/shartnoma/editInfo/" + id)}
                  startIcon={<ModeEditOutlineIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("shartnomani malumotlari")}
                </Button>
                <Button
                  onClick={() => router.push("/shartnoma/edit/" + id)}
                  startIcon={<ModeEditOutlineIcon />}
                  variant="contained"
                >
                  {"таҳрирлаш"}
                </Button>
                <Button
                  onClick={handlePrint}
                  color="success"
                  startIcon={<LocalPrintshopIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("Chop etish")}
                </Button>
              </div>
            </div>
            <div className="flex mb-2">
              <Button
                startIcon={<CompareArrowsIcon />}
                color="secondary"
                onClick={() => setVersiya(!versiya)}
                variant="contained"
              >
                {latinToCyrillic("Almashtirish")}
              </Button>
            </div>
            {versiya ? (
              <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  text-justify">
                <h1 className="text-2xl font-bold mb-4 text-center">
                  Оммавий тадбирни ўтказишда фуқаролар хавфсизлигини таъминлаш
                  ва жамоат тартибини сақлаш тўғрисида намунавий шартнома
                </h1>
                <div className="mb-4 text-center">
                  <p className="font-bold underline text-[24px]">
                    {data.contractnumber + latinToCyrillic("-son")}
                  </p>
                </div>
                <div className="mb-4 flex  justify-between">
                  <p className="font-bold">{data.contractdate}</p>
                  <p className="font-bold">{info && info.ijrochi}</p>
                </div>
                <section className="mb-4">
                  <p>
                    <span className="font-bold">{data.clientname}</span> номидан
                    _________ асосида фаолият юритувчи
                    <span className="font-bold">
                      ______________________
                    </span>{" "}
                    келгусида «Буюртмачи» деб номланувчи бир томондан ва
                    Ўзбекистон Республикаси Миллий гвардияси{" "}
                    {info && info?.ijrochi} бўйича бошқармаси номидан шартнома
                    асосида фаолият юритувчи Бошқарма бошлиғи{" "}
                    {info && info?.boshliq} келгусида «Бажарувчи» деб номланувчи
                    иккинчи томондан биргаликда эса томонлар ўртасида Ўзбекистон
                    Республикаси Вазирлар Маҳкамасининг 2014 йил 29 июлдаги
                    205-сон қарорига мувофиқ оммавий тадбирни ўтказишда
                    фуқаролар хавфсизлигини таъминлаш ва жамоат тартибини сақлаш
                    юзасидан шартнома тузилди.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    1. Шартнома предмети
                  </h2>
                  <p className="mb-0">
                    1.1 «Буюртмачи»нинг топшириғига мувофиқ «Бажарувчи»{" "}
                    <span className="font-bold">{data.timelimit}</span> гача{" "}
                    <span className="font-bold"> {data.address} </span>да бўлиб
                    ўтадиган тадбирлар бўйича ўтказиладиган оммавий тадбир
                    вақтида фуқаролар хавфсизлигини ва жамоат тартибини сақлаш
                    бўйича мажбуриятни ўз зиммасига олади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    2. Ҳисоблашиш тартиблари ва хизмат нархлари
                  </h2>
                  <p className="mb-0">
                    2.1 «Буюртмачи» «Бажарувчи»нинг хизмат тўловларини ҳисоб
                    рақамига пул ўтказиш ёки нақд тўлаш орқали амалга оширади ва
                    тўлов ҳужжатлари нусхасини 3.3-бандда кўрсатилган муддатдан
                    кечиктирмаган ҳолда тақдим этади.
                  </p>
                  <p className="mb-0">
                    2.2 Жамоат тартибини сақлаш борасидаги хизмат нархи Миллий
                    гвардия Тошкент шаҳри бўйича бошқармаси томонидан тақдим
                    этилган шартноманинг ажралмас қисми хисобланган смета
                    харажатлари асосида жами миқдори
                    <span className="font-bold ">
                      {" " + formatNumber(+data.allmoney)} сўм
                    </span>{" "}
                    деб белгиланди.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    3. Томонларнинг мажбуриятлари ва ҳуқуқлари
                  </h2>
                  <p className="mb-0">
                    3.1 «Бажарувчи» оммавий тадбир ўтказиш даврида жамоат
                    тартибини сақлаш ҳуқуқбузарликларни ва бошқа қонун бузилиши
                    ҳаракатларининг олдини олиш мажбуриятини олади.
                  </p>
                  <p className="mb-0">
                    3.2 «Бажарувчи» оммавий тадбир ўтказиш даврида
                    томошабинларнинг сони ва тадбир ўтказилаётган ҳудуддаги
                    тезкор вазиятга асосланган ҳолда ҳарбий хизматчилар ва
                    ходимлар сонини камайтириш кўпайтириш ёки зарурият
                    туғилганда оммавий тадбирни ўтказишни тўхтатишгача бўлган
                    ҳуқуққа эга.
                  </p>
                  <p className="mb-0">
                    3.3 Шартнома имзолангач ___ кун ичида «Буюртмачи» тўловни
                    100% амалга ошириш мажбуриятини олади ва «Бажарувчи»дан
                    жамоат тартибини сақлаш юзасидан ёзма мажбуриятини олиш ва
                    ваколатли орган оммавий тадбирларни ўтказилишини назорат
                    қилиш комиссиясига тақдим этиш учун тўлов ҳужжатлари
                    нусхаларини тақдим этади.
                  </p>
                  <p className="mb-0">
                    3.4 «Бажарувчи» тўловнинг амалга оширилганлиги тўғрисидаги
                    ҳужжат нусхаларини олгандан сўнг бир иш куни ичида
                    «Буюртмачи»га _________ваколатли орган ҳузуридаги оммавий
                    тадбирларнинг ўтказилишини назорат қилиш комиссиясига тақдим
                    этиш учун жамоат тартибини сақлаш бўйича ёзма мажбуриятни
                    тақдим этади.
                  </p>
                  <p className="mb-0">
                    3.5 «Буюртмачи» тадбир бошланишидан олдин уч календар куни
                    ичида «Бажарувчи»га маълум қилган ҳолда тадбирни бекор қилиш
                    ёки ўтказиш санасини ўзгартириш ҳуқуқига эга.
                  </p>
                  <p className="mb-0">
                    3.6 «Буюртмачи» объект маъмурияти билан ҳамкорликда Миллий
                    гвардия ва ИИО ходимларига оммавий тадбир ўтадиган бинонинг
                    маъмурий омборхона ва бошқа хоналарини текширувдан ўтказиш
                    ҳамда жамоат тартибини сақлаш учун тақдим этиш мажбуриятини
                    ўз зиммасига олади.
                  </p>
                  <p className="mb-0">
                    3.7 «Буюртмачи» томон шартноманинг 3.3-бандида кўрсатилган
                    мажбуриятларни тўлиқ бажармаган тақдирда ваколатли орган
                    оммавий тадбирларни ўтказилишини назорат қилиш комиссияси
                    оммавий тадбирни ўтказишни тўхтатиш ҳуқуққа эга.
                  </p>
                  <p className="mb-0">
                    3.8 Вазирлар Маҳкамасининг 2014 йил 29 июлдаги 205-сонли
                    қарори асосида «Буюртмачи» «Бажарувчи»га тадбир бошланишидан
                    олдин объектга эркин киришларини тасдиқловчи ҳужжатларни
                    (чипталар таклифномалар ва бошқалар) Миллий гвардия ва ИИО
                    (ходимлари ёки ҳарбий хизматчилари) зал ичида ўтиришлари
                    учун ҳар бир тадбирга энг камида ______донадан тақдим этиш
                    мажбуриятини ўз зиммасига олади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold text-center mb-0">
                    4. Томонларнинг жавобгарлиги
                  </h2>
                  <p className="mb-0">
                    4.1 Ушбу шартномада белгиланган мажбуриятлар бажарилмаган
                    тақдирда айбдор томон қонунчилик ҳужжатларига мувофиқ
                    жавобгар ҳисобланади.
                  </p>
                  <p className="mb-0">
                    4.2 Ушбу шартнома ёки унга алоқадор масалалар бўйича баҳслар
                    юзага келган тақдирда, томонлар ўзаро музокаралар орқали
                    уларнинг ечимини топишнинг барча зарур чора-тадбирларини
                    кўрадилар. Ушбу шартнома бўйича юзага келган барча
                    баҳсларнинг ечими топилмаган тақдирда, ушбу баҳслар
                    Ўзбекистон Республикасининг амалдаги қонунчиликда
                    белгиланган суд тартибида ҳал қилинади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    5. Форс-мажор
                  </h2>
                  <p className="mb-0">
                    5.1 Томонлар мазкур шартнома бўйича форс-мажор ҳолатлари рўй
                    берганда ўз мажбуриятларини қисман ёки бутунлай бажаришдан
                    озод этиладилар.
                  </p>
                  <p className="mb-0">
                    5.2 Форс-мажор ҳолатларига олдини олиш мумкин бўлмаган
                    ҳодисалар (ёнғин, тошқин, ер қимирлаши, фавқулодда ҳолатлар
                    (вазиятлар) ва бошқа табиий офатлар), шунингдек,
                    қонунчиликдаги ўзгаришлар киради.
                  </p>
                  <p className="mb-0">
                    5.3 Форс-мажор ҳолатлари рўй берганда “Томонлар” бу ҳақда
                    бир-бирларини ёзма равишда хабардор этишлари шарт.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    6. Коррупцияга қарши қўшимча шартлар
                  </h2>
                  <p className="mb-0">
                    6.1 Тарафларнинг шартнома тузишда, шартноманинг амал қилиш
                    муддатида ва ушбу муддат тугагандан сўнг, шартнома билан
                    боғлиқ коррупсиявий ҳаракатлар содир қилмасликка келишиб
                    оладилар.
                  </p>
                  <p className="mb-0">
                    6.2 Тарафлар шартномадаги Коррупцияга қарши қўшимча
                    шартларда белгиланган коррупсиянинг олдини олиш чораларини
                    тан олади ва уларга риоя этилиши бўйича ҳамкорликни
                    таъминлайдилар.
                  </p>
                  <p className="mb-0">
                    6.3 Ҳар бир тараф шартнома тузилган пайтда бевосита ўзи ёки
                    унинг ижроия органлари, мансабдор шахслари ва ходимлари
                    томонидан шартнома билан боғлиқ муносабатлар юзасидан
                    қонунга хилоф равишда пул, мрддий қийматликлар
                    берилмаганлигини, шартнома тузилиши эвазига норасмий пул ёки
                    моддий қийматликлар олининшига йўл қўйилмаганлигини, таклиф
                    этилмаганлигини, уларни беришга ваъда қилинмаганлигини
                    кафолатлайди.
                  </p>
                  <p className="mb-0">
                    6.4 Коррупцияга оид ҳуқуқбузурлик содир қилиш учун
                    таъмагирлик қилиш, ундаш, тазйиқ ўтказиш ёки таҳдид қилиш.
                    Ушбу ҳолат бўйича бир тараф иккинчи тарафни ҳамда ваколатли
                    давлат оргаларини дарҳол хабардор қилиши шарт.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    7. Шартноманинг амал қилиш муддати ва шартномани бекор қилиш
                    тартиблари
                  </h2>
                  <p className="mb-0">
                    7.1. Тарафларнинг юридик манзиллари, банк реквизитлари
                    ўзгарган тақдирда, 2 кун ичида бир-бирларига ўзгарганлик
                    ҳақида ёзма маълумот беришга мажбурдирлар.
                  </p>
                  <p className="mb-0">
                    7.2 Мазкур шартномага киритилган барча ўзгартириш ва
                    қўшимчалар ёзма шаклда тузилиб, белгиланган тартибда
                    тарафларнинг ваколатли вакиллари томонидан имзоланган
                    тақдирдагина амалда бўлади.
                  </p>
                  <p className="mb-0">
                    7.3 Ўтказиладиган дастур вақтига, иштирокчилар ва
                    меҳмонларнинг сонига ўзгартиришлар киритилган тақдирда,
                    тадбир бошланишидан олдин қўшимча келишув шартномаси
                    тузилиб, “Буюртмачи” қўшимча тўловни амалга оширишни ўз
                    зиммасига олади.
                  </p>
                  <p className="mb-0">
                    7.4 Мазкур шартнома икки нусхада тузилиб, томонлар имзолаган
                    кундан, бюджет ҳисобидан молиялаштириладиганлар учун
                    шартнома ғазначилик бўлимлари томонидан рўйхатга олинган
                    кундан кучга киради ва ______йилнинг _______кунигача амалда
                    бўлади.
                  </p>
                  <p className="mb-0">
                    7.5 Шартнома муддатидан олдин томонларнинг ўзаро келишувига
                    кўра ёки улардан бири томонидан шартнома шартларини бошқа
                    томон жиддий равишда бузган тақдирда бекор қилиниши мумкин.
                  </p>
                </section>

                <section className="pb-[300px] mb-4">
                  <h2 className="text-xl text-center font-semibold mb-4">
                    7. Томонларнинг реквизитлари
                  </h2>
                  <div className="flex  justify-between items-start">
                    <div className="flex w-[50%] relative justify-center items-center flex-col">
                      <h2 className="text-lg text-center font-bold mb-2">
                        Буюртмачи:
                      </h2>
                      <p className="font-bold text-xl text-center">
                        {data.clientname}
                      </p>
                      {data.clientaddress && (
                        <div className="flex gap-2">
                          <span className="font-bold text-xl">Манзил:</span>
                          <div className="flex flex-col">
                            <p className=" text-start max-w-[400px]  text-[14px]">{`${data.clientaddress}.  `}</p>
                            <span>
                              <span className="font-bold">
                                Банк реквизитлари:
                              </span>{" "}
                              Марказий банк Тошкент ш. ХККМ
                            </span>
                            <span className="font-bold">Ғазначилиги х/р</span>
                            <span>
                              {formatString(
                                data?.treasuryaccount
                                  ? data?.treasuryaccount
                                  : data?.treasuryaccount27
                              )}
                            </span>
                            <span>
                              {" "}
                              <span className="font-bold">МФО:</span>{" "}
                              {data.clientmfo}.
                            </span>
                            <span>
                              {" "}
                              <span className="font-bold">х/р</span>{" "}
                              {formatString(data.clientaccount)}
                            </span>
                            <span>
                              <span className="font-bold">СТИР:</span>{" "}
                              {formatString(data?.clientstr)}.
                            </span>
                          </div>
                        </div>
                      )}
                      <div className=" absolute top-[250px] left-[40px]">
                        <div className="flex flex-col">
                          <h1 className="font-bold ">
                            Раҳбари: ____________ ________________________
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-[50%] justify-center relative items-center flex-col">
                      <h2 className="text-lg text-center font-bold mb-2">
                        Бажарувчи:
                      </h2>
                      <p className="font-bold text-xl text-center">
                        ЎР Миллий гвардияси Тошкент шаҳри бўйича бошқармаси
                      </p>
                      <div className="flex gap-2">
                        <span className="font-bold text-xl">Манзил:</span>
                        <div className="flex flex-col">
                          <p className=" text-start  text-[14px]">
                            {info && info?.manzil}
                          </p>{" "}
                          <span>
                            <span className="font-bold">
                              Банк реквизитлари:
                            </span>{" "}
                            {info && info?.bank}
                          </span>
                          <span>
                            <span className="font-bold">МФО:</span>{" "}
                            {info && info?.mfo}
                          </span>
                          <span>
                            <span className="font-bold">х/р : </span>{" "}
                            {formatString(data?.accountnumber)}
                          </span>
                          <span>
                            {" "}
                            <span className="font-bold"> СТИР: </span>{" "}
                            {info && formatString(info?.str)}
                          </span>
                        </div>
                      </div>

                      <div className=" absolute top-[250px] left-[40px]">
                        <div className="flex flex-col">
                          <h1 className="font-bold ">
                            Раҳбари: _____________ ______________________
                            <span className="font-[400]">
                              {info && info?.boshliq}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <BudgetTable
                  address={data}
                  data1={tasks}
                  raq={data.contractnumber}
                  dataId={id}
                />

                <div className="w-[75%] mt-10 mx-auto flex justify-between">
                  <div className="flex h-[150px] justify-between flex-col">
                    <h2 className="text-lg text-center font-bold ">
                      Бажарувчи:
                    </h2>

                    <span className="text-center font-bold">
                      ________________________
                    </span>
                  </div>
                  <div className="flex h-[150px] justify-between flex-col">
                    <h2 className="text-lg text-center font-bold ">
                      Буюртмачи:
                    </h2>

                    <span className="text-center font-bold">
                      ________________________
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  text-justify">
                <h1 className="text-2xl font-bold mb-4 text-center">
                  Оммавий тадбирни ўтказишда фуқаролар хавфсизлигини таъминлаш
                  ва жамоат тартибини сақлаш тўғрисида намунавий шартнома
                </h1>
                <div className="mb-4 text-center">
                  <p className="font-bold  text-[24px]">
                    {data.contractnumber + latinToCyrillic("-son")}
                  </p>
                </div>
                <div className="mb-4 flex  justify-between">
                  {" "}
                  <p className="font-bold">{data.contractdate}</p>
                  <p className="font-bold">{info && info?.ijrochi}</p>
                </div>
                <section className="mb-4">
                  <p>
                    <span className="font-bold">{data.clientname}</span> номидан
                    _________ асосида фаолият юритувчи
                    <span className="font-bold">
                      ______________________
                    </span>{" "}
                    келгусида «Буюртмачи» деб номланувчи бир томондан ва
                    Ўзбекистон Республикаси Миллий гвардияси{" "}
                    {info && info?.ijrochi} бўйича бошқармаси номидан шартнома
                    асосида фаолият юритувчи Бошқарма бошлиғи{" "}
                    {info && info?.boshliq} келгусида «Бажарувчи» деб номланувчи
                    иккинчи томондан биргаликда эса томонлар ўртасида Ўзбекистон
                    Республикаси Вазирлар Маҳкамасининг 2014 йил 29 июлдаги
                    205-сон қарорига мувофиқ оммавий тадбирни ўтказишда
                    фуқаролар хавфсизлигини таъминлаш ва жамоат тартибини сақлаш
                    юзасидан шартнома тузилди.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    1. Шартнома предмети
                  </h2>
                  <p className="mb-0">
                    1.1 «Буюртмачи»нинг топшириғига мувофиқ «Бажарувчи»
                    <span className="font-bold">{data.timelimit}</span>гача
                    <span className="font-bold">
                      {" " + data.address + "да"}
                    </span>{" "}
                    бўлиб ўтадиган тадбирлар бўйича ўтказиладиган оммавий тадбир
                    вақтида фуқаролар хавфсизлигини ва жамоат тартибини сақлаш
                    бўйича мажбуриятни ўз зиммасига олади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    2. Ҳисоблашиш тартиблари ва хизмат нархлари
                  </h2>
                  <p className="mb-0">
                    2.1 «Буюртмачи» «Бажарувчи»нинг хизмат тўловларини ҳисоб
                    рақамига пул ўтказиш ёки нақд тўлаш орқали амалга оширади ва
                    тўлов ҳужжатлари нусхасини 3.3-бандда кўрсатилган муддатдан
                    кечиктирмаган ҳолда тақдим этади.
                  </p>
                  <p className="mb-0">
                    2.2 Жамоат тартибини сақлаш борасидаги хизмат нархи Миллий
                    гвардия Тошкент шаҳри бўйича бошқармаси томонидан тақдим
                    этилган шартноманинг ажралмас қисми хисобланган смета
                    харажатлари асосида жами миқдори
                    <span className="font-bold ">
                      {" " + formatNumber(+data.allmoney)} сўм
                    </span>{" "}
                    деб белгиланди.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    3. Томонларнинг мажбуриятлари ва ҳуқуқлари
                  </h2>
                  <p className="mb-0">
                    <span className="">3.1</span> «Бажарувчи» оммавий тадбир
                    ўтказиш даврида жамоат тартибини сақлаш, ҳуқуқбузарликларни
                    ва бошқа қонун бузилиши ҳаракатларининг олдини олиш
                    мажбуриятини олади.
                  </p>
                  <p className="mb-0">
                    <span className="">3.2</span> «Бажарувчи» оммавий тадбир
                    ўтказиш даврида томошабинларнинг сони ва тадбир
                    ўтказилаётган ҳудуддаги тезкор вазиятга асосланган ҳолда
                    ҳарбий хизматчилар ва ходимлар сонини камайтириш, кўпайтириш
                    ёки зарурият туғилганда оммавий тадбирни ўтказишни
                    тўхтатишгача бўлган ҳуқуққа эга.
                  </p>
                  <p className="mb-0">
                    <span className="">3.3</span> Шартнома ғазначилик бўлимлари
                    томонидан рўйхатга олинган кундан 2 кун ичида «Буюртмачи»
                    тўловни <span className="font-bold">30%</span> амалга ошириш
                    мажбуриятини олади ва «Бажарувчи» томонидан шартнома
                    талаблари тўлиқ бажарилгандан сўнг қолган{" "}
                    <span className="font-bold">70%</span> миқдори томонлар
                    имзолаган хисоб-фактурага асосан амалга оширилади
                  </p>
                  <p className="mb-0">
                    <span className="">3.4</span> «Бажарувчи» тўловнинг амалга
                    оширилганлиги тўғрисидаги ҳужжат нусхаларини олгандан сўнг,
                    бир иш куни ичида «Буюртмачи»га 5 ваколатли орган ҳузуридаги
                    оммавий тадбирларнинг ўтказилишини назорат қилиш
                    комиссиясига тақдим этиш учун жамоат тартибини сақлаш бўйича
                    ёзма мажбуриятни тақдим этади.
                  </p>
                  <p className="mb-0 ">
                    <span className="">3.5</span> «Буюртмачи» тадбир
                    бошланишидан олдин уч календарь куни ичида «Бажарувчи»га
                    маълум қилган ҳолда тадбирни бекор қилиш ёки ўтказиш
                    санасини ўзгартириш ҳуқуқига эга.
                  </p>
                  <p className="mb-0 ">
                    <span className="">3.6</span> «Буюртмачи» объект маъмурияти
                    билан ҳамкорликда Миллий гвардия ва ИИО ходимларига оммавий
                    тадбир ўтадиган бинонинг маъмурий, омборхона ва бошқа
                    хоналарини текширувдан ўтказиш ҳамда жамоат тартибини сақлаш
                    учун тақдим этиш мажбуриятини ўз зиммасига олади.
                  </p>
                  <p className="mb-0  ">
                    <span className="">3.7</span> «Буюртмачи» томон шартноманинг
                    3.3-бандида кўрсатилган мажбуриятларни тўлиқ бажармаган
                    тақдирда ваколатли орган оммавий тадбирларни ўтказилишини
                    назорат қилиш комиссияси оммавий тадбирни ўтказишни тўхтатиш
                    ҳуқуққа эга.
                  </p>
                  <p className="mb-0 ">
                    <span className="">3.8</span> Вазирлар Маҳкамасининг
                    2014-йил 29-июлдаги 205-сонли қарори асосида «Буюртмачи»
                    «Бажарувчи»га тадбир бошланишидан олдин объектга эркин
                    киришларини тасдиқловчи ҳужжатларни (чипталар, таклифномалар
                    ва бошқалар) Миллий гвардия ва ИИО (ходимлари ёки ҳарбий
                    хизматчилари) зал ичида ўтиришлари учун ҳар бир тадбирга энг
                    камида ______донадан тақдим этиш мажбуриятини ўз зиммасига
                    олади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-semibold text-center mb-0">
                    4. Томонларнинг жавобгарлиги
                  </h2>
                  <p className="mb-0">
                    4.1 Ушбу шартномада белгиланган мажбуриятлар бажарилмаган
                    тақдирда айбдор томон қонунчилик ҳужжатларига мувофиқ
                    жавобгар ҳисобланади.
                  </p>
                  <p className="mb-0">
                    4.2 Ушбу шартнома ёки унга алоқадор масалалар бўйича баҳслар
                    юзага келган тақдирда, томонлар ўзаро музокаралар орқали
                    уларнинг ечимини топишнинг барча зарур чора-тадбирларини
                    кўрадилар. Ушбу шартнома бўйича юзага келган барча
                    баҳсларнинг ечими топилмаган тақдирда, ушбу баҳслар
                    Ўзбекистон Республикасининг амалдаги қонунчиликда
                    белгиланган суд тартибида ҳал қилинади.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    5. Форс-мажор
                  </h2>
                  <p className="mb-0">
                    5.1 Томонлар мазкур шартнома бўйича форс-мажор ҳолатлари рўй
                    берганда ўз мажбуриятларини қисман ёки бутунлай бажаришдан
                    озод этиладилар.
                  </p>
                  <p className="mb-0">
                    5.2 Форс-мажор ҳолатларига олдини олиш мумкин бўлмаган
                    ҳодисалар (ёнғин, тошқин, ер қимирлаши, фавқулодда ҳолатлар
                    (вазиятлар) ва бошқа табиий офатлар), шунингдек,
                    қонунчиликдаги ўзгаришлар киради.
                  </p>
                  <p className="mb-0">
                    5.3 Форс-мажор ҳолатлари рўй берганда “Томонлар” бу ҳақда
                    бир-бирларини ёзма равишда хабардор этишлари шарт.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    6. Коррупцияга қарши қўшимча шартлар
                  </h2>
                  <p className="mb-0">
                    6.1 Тарафларнинг шартнома тузишда, шартноманинг амал қилиш
                    муддатида ва ушбу муддат тугагандан сўнг, шартнома билан
                    боғлиқ коррупсиявий ҳаракатлар содир қилмасликка келишиб
                    оладилар.
                  </p>
                  <p className="mb-0">
                    6.2 Тарафлар шартномадаги Коррупцияга қарши қўшимча
                    шартларда белгиланган коррупсиянинг олдини олиш чораларини
                    тан олади ва уларга риоя этилиши бўйича ҳамкорликни
                    таъминлайдилар.
                  </p>
                  <p className="mb-0">
                    6.3 Ҳар бир тараф шартнома тузилган пайтда бевосита ўзи ёки
                    унинг ижроия органлари, мансабдор шахслари ва ходимлари
                    томонидан шартнома билан боғлиқ муносабатлар юзасидан
                    қонунга хилоф равишда пул, мрддий қийматликлар
                    берилмаганлигини, шартнома тузилиши эвазига норасмий пул ёки
                    моддий қийматликлар олининшига йўл қўйилмаганлигини, таклиф
                    этилмаганлигини, уларни беришга ваъда қилинмаганлигини
                    кафолатлайди.
                  </p>
                  <p className="mb-0">
                    6.4 Коррупцияга оид ҳуқуқбузурлик содир қилиш учун
                    таъмагирлик қилиш, ундаш, тазйиқ ўтказиш ёки таҳдид қилиш.
                    Ушбу ҳолат бўйича бир тараф иккинчи тарафни ҳамда ваколатли
                    давлат оргаларини дарҳол хабардор қилиши шарт.
                  </p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl text-center font-semibold mb-0">
                    7. Шартноманинг амал қилиш муддати ва шартномани бекор қилиш
                    тартиблари
                  </h2>
                  <p className="mb-0">
                    7.1. Тарафларнинг юридик манзиллари, банк реквизитлари
                    ўзгарган тақдирда, 2 кун ичида бир-бирларига ўзгарганлик
                    ҳақида ёзма маълумот беришга мажбурдирлар.
                  </p>
                  <p className="mb-0">
                    7.2 Мазкур шартномага киритилган барча ўзгартириш ва
                    қўшимчалар ёзма шаклда тузилиб, белгиланган тартибда
                    тарафларнинг ваколатли вакиллари томонидан имзоланган
                    тақдирдагина амалда бўлади.
                  </p>
                  <p className="mb-0">
                    7.3 Ўтказиладиган дастур вақтига, иштирокчилар ва
                    меҳмонларнинг сонига ўзгартиришлар киритилган тақдирда,
                    тадбир бошланишидан олдин қўшимча келишув шартномаси
                    тузилиб, “Буюртмачи” қўшимча тўловни амалга оширишни ўз
                    зиммасига олади.
                  </p>
                  <p className="mb-0">
                    7.4 Мазкур шартнома икки нусхада тузилиб, томонлар имзолаган
                    кундан, бюджет ҳисобидан молиялаштириладиганлар учун
                    шартнома ғазначилик бўлимлари томонидан рўйхатга олинган
                    кундан кучга киради ва ______йилнинг _______кунигача амалда
                    бўлади.
                  </p>
                  <p className="mb-0">
                    7.5 Шартнома муддатидан олдин томонларнинг ўзаро келишувига
                    кўра ёки улардан бири томонидан шартнома шартларини бошқа
                    томон жиддий равишда бузган тақдирда бекор қилиниши мумкин.
                  </p>
                </section>

                <section className="pb-[300px] mb-4">
                  <h2 className="text-xl text-center font-semibold mb-4">
                    7. Томонларнинг реквизитлари
                  </h2>
                  <div className="flex  justify-between items-start">
                    <div className="flex w-[50%] relative justify-center items-center flex-col">
                      <h2 className="text-lg text-center font-bold  mb-2">
                        Буюртмачи:
                      </h2>
                      <p className="font-bold text-xl text-center">
                        {data.clientname}
                      </p>
                      {data.clientaddress && (
                        <div className="flex gap-2">
                          <span className="font-bold text-xl">Манзил:</span>
                          <div className="flex flex-col">
                            <p className=" text-start max-w-[400px]  text-[14px]">{`${data.clientaddress}`}</p>
                            <span>Ўзбекистон Республикаси Молия вазирлиги</span>
                            <span>
                              <span className="font-bold">
                                Банк реквизитлари:
                              </span>{" "}
                              Марказий банк Тошкент шахар ХККМ
                            </span>
                            <span className="font-bold">Ғазначилиги х/р</span>
                            <span>
                              {formatString(
                                data?.treasuryaccount
                                  ? data?.treasuryaccount
                                  : data?.treasuryaccount27
                              )}
                            </span>
                            <span>
                              {" "}
                              <span className="font-bold">ИНН:</span>{" "}
                              {formatString(data?.clientstr)}
                            </span>
                            <span>
                              {" "}
                              <span className="font-bold">МФО:</span>{" "}
                              {data?.clientmfo}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className=" absolute top-[250px] left-[40px]">
                        <div className="flex flex-col">
                          <h1 className="font-bold ">
                            Раҳбари: _________ _______________________
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-[50%] justify-center relative items-center flex-col">
                      <h2 className="text-lg text-center font-bold mb-2">
                        Бажарувчи:
                      </h2>
                      <p className="font-bold text-xl text-center">
                        ЎР Миллий гвардияси Тошкент шаҳри бўйича бошқармаси
                      </p>
                      <div className="flex gap-2">
                        <span className="font-bold text-xl">Манзил:</span>
                        <div className="flex flex-col">
                          <p className=" text-start  text-[14px]">
                            {info && info?.manzil}
                          </p>{" "}
                          <span>
                            <span className="font-bold">
                              Банк реквизитлари:
                            </span>{" "}
                            {info && info?.bank}
                          </span>
                          <span>
                            <span className="font-bold">МФО:</span>{" "}
                            {info && info?.mfo}
                          </span>
                          <span>
                            <span className="font-bold">х/р : </span>{" "}
                            {formatString(data?.accountnumber)}
                          </span>
                          <span>
                            {" "}
                            <span className="font-bold"> СТИР: </span>{" "}
                            {info && formatString(info?.str)}
                          </span>
                        </div>
                      </div>

                      <div className=" absolute top-[250px] left-[40px]">
                        <div className="flex flex-col">
                          <h1 className="font-bold ">
                            Раҳбари: _____________ ______________________
                            <span className="font-[400]">
                              {info && info?.boshliq}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <BudgetTable
                  address={data}
                  data1={tasks}
                  raq={data.contractnumber}
                  dataId={id}
                />

                <div className="w-[75%] mt-10 mx-auto flex justify-between">
                  <div className="flex h-[150px] justify-between flex-col">
                    <h2 className="text-lg text-center font-bold ">
                      Бажарувчи:
                    </h2>

                    <span className="text-center font-bold">
                      ________________________
                    </span>
                  </div>
                  <div className="flex h-[150px] justify-between flex-col">
                    <h2 className="text-lg text-center font-bold ">
                      Буюртмачи:
                    </h2>

                    <span className="text-center font-bold">
                      ________________________
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default page;
