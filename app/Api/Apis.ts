export const URL = "http://localhost:3001";

// Auth

export const loginAuth = async (username: any, password: any) => {
  const res = await fetch(URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("id", data.data.id);
    }
  }

  return data;
};

export const UpdateAuth = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/auth/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

export const createAuth = async (JWT: any, username: any, password: any) => {
  const res = await fetch(URL + "/auth/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  return data;
};

export const getAuth = async (JWT: any) => {
  const res = await fetch(URL + "/auth/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const SelectAuth = async () => {
  const res = await fetch(URL + "/auth/login/for");

  const data = await res.json();

  return data;
};

//unvonlar

//Locations Api

export const CreateLocations = async (JWT: any, locations: any) => {
  const res = await fetch(URL + "/batalyon/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      batalyons: locations,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetLocation = async (JWT: any) => {
  const res = await fetch(URL + "/batalyon/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateLocation = async (JWT: any, location: any, id: any) => {
  const res = await fetch(URL + "/batalyon/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(location),
  });

  const data = await res.json();

  return data;
};

export const DeleteLocation = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/batalyon/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

//Otryad APi
export const Createotryads = async (JWT: any, otryads: any) => {
  const res = await fetch(URL + "/zvaniya/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      zvaniyas: otryads,
    }),
  });

  const data = await res.json();

  return data;
};

export const Getotryads = async (JWT: any) => {
  const res = await fetch(URL + "/zvaniya/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Updateotryads = async (JWT: any, otryad: any, id: any) => {
  const res = await fetch(URL + "/zvaniya/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(otryad),
  });

  const data = await res.json();

  return data;
};

export const Deleteotryad = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/zvaniya/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

// Lavozim Api
export const CreatePositions = async (JWT: any, positions: any) => {
  const res = await fetch(URL + "/position/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      positions: positions,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetPosition = async (JWT: any) => {
  const res = await fetch(URL + "/position/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdatePositions = async (JWT: any, position: any, id: any) => {
  const res = await fetch(URL + "/position/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(position),
  });

  const data = await res.json();

  return data;
};

export const DeletePosition = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/position/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

//Minimum Api

export const GetMinimum = async (JWT: any) => {
  const res = await fetch(URL + "/minimum/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateMinimum = async (JWT: any, minimum: any) => {
  const res = await fetch(URL + "/minimum/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(minimum),
  });

  const data = await res.json();

  return data;
};

// tip Api

export const Createtips = async (JWT: any, tips: any) => {
  const res = await fetch(URL + "/tip/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      tips: tips,
    }),
  });

  const data = await res.json();

  return data;
};

export const Gettips = async (JWT: any) => {
  const res = await fetch(URL + "/tip/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Updatetips = async (JWT: any, tip: any, id: any) => {
  const res = await fetch(URL + "/tip/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(tip),
  });

  const data = await res.json();

  return data;
};

export const Deletetip = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/tip/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

//File Api

export const Createfiles = async (JWT: any, files: any, id: any) => {
  const res = await fetch(URL + "/file/create/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      files: files,
    }),
  });

  const data = await res.json();

  return data;
};

export const Getfiles = async (JWT: any) => {
  const res = await fetch(URL + "/file/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const GetOpenfiles = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/folder/open/file/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Updatefiles = async (JWT: any, file: any, id: any) => {
  const res = await fetch(URL + "/file/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(file),
  });

  const data = await res.json();

  return data;
};

export const Deletefile = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/file/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

export const GetCreateInfofiles = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/file/create/info/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const GetCreateInfoWorker = async (JWT: any) => {
  const res = await fetch(URL + "/FIO/for/page", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

// workers
export const Createworkers = async (JWT: any, workers: any) => {
  const res = await fetch(URL + "/FIO/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      workers: workers,
    }),
  });

  const data = await res.json();

  return data;
};

export const Getworkers = async (JWT: any) => {
  const res = await fetch(URL + "/FIO/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Updateworkers = async (JWT: any, worker: any, id: any) => {
  const res = await fetch(URL + "/FIO/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(worker),
  });

  const data = await res.json();

  return data;
};

export const Deleteworker = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/FIO/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

export const GetForShartnoma = async (JWT: any, language: any) => {
  const res = await fetch(URL + "/contract/for/page?query=" + language, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Createshartnomaa = async (
  JWT: any,
  shartnoma: any,
  language: any
) => {
  const res = await fetch(URL + "/contract/create?query=" + language, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      ...shartnoma,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetAllShartnoma = async (JWT: any) => {
  const res = await fetch(URL + "/contract/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const GetOtchot = async (JWT: any, language: any) => {
  const res = await fetch(URL + "/result/get?query=" + language, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getCantractFilter = async (
  JWT: any,
  shartnoma: any,
  language: any
) => {
  const res = await fetch(URL + "/result/filter?query=" + language, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      ...shartnoma,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetSingleShartnoma = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/get/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const DeleteShartnoma = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

export const UpdateShartnoma = async (
  JWT: any,
  worker: any,
  id: any,
  language: any
) => {
  const res = await fetch(
    URL + "/contract/update/" + id + "?query=" + language,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
      },
      body: JSON.stringify(worker),
    }
  );

  const data = await res.json();

  return data;
};

export const setExelFile = async (JWT: any, file: any) => {
  const res = await fetch(URL + "/worker/create/excel", {
    method: "POST",
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
      Authorization: "Bearer " + JWT,
    },
    body: file,
  });

  const data = await res.json();

  return data;
};

export const SendOtchot = async (JWT: any, shartnoma: any) => {
  const res = await fetch(URL + "/result/excel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ data: shartnoma }),
  });

  const data = await res.json();

  return data;
};

export const GetNames = async (JWT: any) => {
  const res = await fetch(URL + "/bxm/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateNames = async (JWT: any, worker: any, id: any) => {
  const res = await fetch(URL + "/bxm/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(worker),
  });

  const data = await res.json();

  return data;
};

export const UpdateUsers = async (JWT: any, worker: any, id: any) => {
  const res = await fetch(URL + "/auth/users/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(worker),
  });

  const data = await res.json();

  return data;
};

// bank
export const Createbank = async (JWT: any, banks: any) => {
  const res = await fetch(URL + "/bank/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ banks: banks }),
  });

  const data = await res.json();

  return data;
};

export const Getbanks = async (JWT: any) => {
  const res = await fetch(URL + "/bxm/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const Updatebank = async (JWT: any, bank: any, id: any) => {
  const res = await fetch(URL + "/bxm/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(bank),
  });

  const data = await res.json();

  return data;
};

export const Deletebank = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/bank/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

export const SearchBank = async (JWT: any, number: any) => {
  const res = await fetch(URL + "/bank/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      number: number,
    }),
  });

  const data = await res.json();

  return data;
};
