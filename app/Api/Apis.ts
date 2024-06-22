const URL = "http://localhost:3000";

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

export const UpdateAuth = async (
  JWT: any,
  oldPassword: any,
  newPassword: any
) => {
  const res = await fetch(URL + "/auth/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
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
  const res = await fetch(URL + "/auth/login/for", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

//Folder

export const getFolderInUser = async (JWT: any) => {
  const res = await fetch(URL + "/folder/open/user", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getFolderPath = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/folder/path/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const CreateFolder = async (
  JWT: any,
  folderName: any,
  id: any,
  quary: any
) => {
  const res = await fetch(URL + "/folder/create/" + id + "?who=" + quary, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ name: folderName }),
  });
  console.log(URL + "/folder/create/" + id + "?who=" + quary);

  const data = await res.json();

  return data;
};

export const SearchFolder = async (JWT: any, name: any) => {
  const res = await fetch(URL + "/folder/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ name: name }),
  });

  const data = await res.json();

  return data;
};

export const UpdateFOlder = async (JWT: any, name: any, id: any) => {
  const res = await fetch(URL + "/folder/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ name: name }),
  });

  const data = await res.json();

  return data;
};

export const DeleteFolder = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/folder/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

export const OpenFolder = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/folder/open/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

//unvonlar

export const CreateRank = async (JWT: any, ranks: any) => {
  const res = await fetch(URL + "/rank/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      ranks: ranks,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetRanks = async (JWT: any) => {
  const res = await fetch(URL + "/rank/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateRank = async (JWT: any, rank: any, id: any) => {
  const res = await fetch(URL + "/rank/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(rank),
  });

  const data = await res.json();

  return data;
};

export const DeleteRank = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/rank/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

//Locations Api

export const CreateLocations = async (JWT: any, locations: any) => {
  const res = await fetch(URL + "/location/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      locations: locations,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetLocation = async (JWT: any) => {
  const res = await fetch(URL + "/location/get", {
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
  const res = await fetch(URL + "/location/update/" + id, {
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
  const res = await fetch(URL + "/location/delete/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
  });

  const data = await res.json();

  return data;
};

//Sostav APi
export const CreateCoctavs = async (JWT: any, coctavs: any) => {
  const res = await fetch(URL + "/coctav/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      coctavs: coctavs,
    }),
  });

  const data = await res.json();

  return data;
};

export const GetCoctavs = async (JWT: any) => {
  const res = await fetch(URL + "/coctav/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateCoctavs = async (JWT: any, coctav: any, id: any) => {
  const res = await fetch(URL + "/coctav/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(coctav),
  });

  const data = await res.json();

  return data;
};

export const DeleteCoctav = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/coctav/delete/" + id, {
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
