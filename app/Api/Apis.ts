export const URL = "http://localhost:3002";

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
export const updateBatalyon = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/auth/update/batalyon/" + id, {
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

// workers
export const getAllWorkers = async (
  JWT: any,
  id: any,
  page?: any,
  limit?: any
) => {
  const res = await fetch(
    URL +
      "/worker/get/" +
      id +
      `?page=${page ? page : 1}&limit=${limit ? limit : 1000000}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export const getWorkerById = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/worker/get/one/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getAllBatalyon = async (JWT: any) => {
  const res = await fetch(URL + "/worker/get/all/batalyon", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const createWorker = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/worker/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      workers: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const searchWorker = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/worker/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      fio: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const updateWorker = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/worker/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const deleteWorker = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/worker/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

// contract
export const createContract = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const filterContract = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const getAllContract = async (JWT: any, page: any, limet: any) => {
  const res = await fetch(URL + `/contract/get?page=${page}&limit=${limet}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getForBatalyon = async (JWT: any) => {
  const res = await fetch(URL + `/contract/get/all/batalyon`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const deleteContract = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const paymentToContract = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/contract/payment/contract/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getToPrint = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/contract/to/print/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getWorkersForWatch = async (JWT: any, id: any, what: any) => {
  const res = await fetch(
    URL + `/contract/print/task/worker/${id}?${what}=true`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};
export const getContractById = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/get/contract/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const updateContract = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/contract/update/" + id, {
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

//tasks
export const getAllTasks = async (JWT: any) => {
  const res = await fetch(URL + "/task/get/tasks", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getWorkersForTask = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/task/get/task/workers/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const filterTasks = async (JWT: any, status: any) => {
  const res = await fetch(URL + `/task/filter/by/status?${status}=true`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const searchTasks = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/task/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const giveTime = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/contract/giving/time/to/task/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ date: value }),
  });

  const data = await res.json();

  return data;
};
// BXM
export const getBXM = async (JWT: any) => {
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

export const UpdateBXM = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/bxm/update", {
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

// worker_tasks

export const pushWorkers = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/worker_task/push/worker/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      workers: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const getWorkerInfo = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/worker_task//tasks/of/worker/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const filterWorker = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/worker_task/filter/by/date/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

// resoult

export const createResult = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/result/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const getComand = async (JWT: any, page: any, limit: any) => {
  const res = await fetch(
    URL + `/result/get/command?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export const getByIdComand = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/result/get/battalion/workers/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
