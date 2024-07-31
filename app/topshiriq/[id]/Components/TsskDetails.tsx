"use client";
import React, { useEffect, useState } from "react";
import Status from "../../Components/Status";

const TaskDetails: React.FC<any> = ({ data }) => {
  const [status, setStatus] = useState<any>();

  useEffect(() => {
    if (data) {
      const filtStat = data.done
        ? "bajarildi"
        : data.notdone
        ? "bajarilmagan"
        : data.inprogress
        ? "bajarilmoqda"
        : "";

      setStatus(filtStat);
    }
  }, [data]);
  return (
    <>
      {data && (
        <div className="w-full mx-auto p-4 text-xl ">
          <h2 className="text-5xl font-bold mb-6">Топшириқ тафсилотлари</h2>
          <p className="mb-4">
            Батальон:
            <strong>{data.battalionname} </strong>
          </p>
          <p className="mb-4">
            Шартнома рақами:
            <strong>{data.contractnumber} </strong>
          </p>
          <p className="mb-4">
            Буюртмачи номи: <strong>{data.clientname} </strong>
          </p>
          <p className="mb-4">
            Тадбир отадиган охирги кун : <strong>{data.taskdate}</strong> сиз
            ушбу кун отгандан сўнг 2 кун ичида ходимларни барчасини киритиб
            бўлган болишингсиз зарур агар тадбир бир неча кун давом этса
            ходимларни бир неча марта киритишингиз мумкин лекин сиз учун
            ажратилган соатга етганда топшириқ бажарилган мақомга ўзгаради
          </p>
          <p className="mb-4">
            Ходимлар сони: <strong>{data.workernumber}</strong> йодда тутинг бу
            ходимлар сизнинг батальондан ажратилган ходим сонига тенг лекин
            тадбир бир неча кун давом этса бу ходим сони кўпайиши мумкин ва бир
            кунлик ходим сонига тенг бўлади,
          </p>
          <p className="mb-4">
            Бир соат учун <strong>{data.timemoney}</strong> сўм ушбу сумма
            буюртмачи чегирма қилиб берилса ёки БХМ кўтарилса ошиши ёки камайиши
            мумкин,
          </p>
          <p className="mb-4">
            Топшириқ вақти : <strong>{data.tasktime}</strong> соат албатта бу
            вақт битта ходим учун, ушбу топшириқ бўйича батальон учун умумий
            топшириқ вақти :<strong>{data.tasktime * data.workernumber}</strong>{" "}
            соат,
          </p>
          <p className="mb-4">
            Вақт чегараси : <strong>{data.timelimit + " "}</strong>
            ушбу соат тадбир отадиган вақт ёки тадбир бир неча кун бўлса ҳар
            кунлик вақт лимити : Админ билан боғланинг ушбу тадбир ўтадиган
            вақти номаълум ,
          </p>
          <div className="mt-6">
            <Status status={status} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetails;
