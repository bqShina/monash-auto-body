import axios from "axios";

const API_HOST = "https://monash-auto-body.onrender.com";
const GOOGLE_API = "https://script.google.com/macros/s/AKfycbxS4_1fKzaXh46kh1wxR3_1Kh1UnWDPvGqbNlPAz8Ur76ch72VRV5duzcNOvAGqvoG5Ag/exec";
const USER_KEY = "user";

async function getUsers() {
  // Extract user data from local storage.
const response = await axios.get(API_HOST + "/api/users/");
  return response.data;
}

// this function will be modified when database built
async function verifyUser(username: string, password: string) {
    const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  if (user !== null) await setUser(user);

  return user;
}

function setUser(user: object) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function addUser(user: object) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

function getUser() {
  const storedUser = localStorage.getItem(USER_KEY);
  
  if (typeof storedUser === 'string') {
    return JSON.parse(storedUser);
  }
  
  return null;
}

async function updateUserInfo(username:string, fields: object) {
    const response = await axios.put(API_HOST + `/api/users/update/${username}`, fields);

  return response.data;
}

async function updatePassword(fields: object) {
    const username = getUser().username
    const response = await axios.put(API_HOST + `/api/users/update-password/${username}`, fields);

  return response.data;
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

async function deleteUser(id: string) {
    const response = await axios.delete(API_HOST + `/api/users/delete/${id}`);
    return response.data;
}

// ----------------------------- record ------------------------------
async function addRecord(record: object) {
    const response = await axios.post(API_HOST + "/api/records", record);

    return response.data;
}

async function getRecords() {
    const response = await axios.get(API_HOST + "/api/records");
    return response.data;
}

async function getRecordById(id: string) {
    const response = await axios.get(API_HOST + `/api/records/select/${id}`);
    return response.data;
}

async function updateRecord(record: object, id:string) {
    const response = await axios.put(API_HOST + `/api/records/update/${id}`, record);
    return response.data;
}


async function deleteRecord(id: string) {
    const response = await axios.delete(API_HOST + `/api/records/delete/${id}`);
    
    return response.data;
}

// ----------------------------- send record to google sheet ------------------------------
// function saveRecordIntoGoogleSheet(data: object) {
//     fetch("https://script.google.com/macros/s/AKfycbwq38KGgnpLWzPGn8wosR3VxuMptatCelBAq5zHcRP8fhsIcPCg1hGUnLwq2o5tGpfobQ/exec", {method: "POST", 
//     headers: {
//       "Content-Type": "application/json", // Set the content type to JSON
//     },
//     body: JSON.stringify(data),}).then((response) => response.json(), 
//     mode: 'no-cors'
//     )
//     .then((data) => {
//       console.log("Data sent successfully:", data);
//     })
//     .catch((error) => {
//       console.error("Error sending data:", error);
//     });
//     // axios.post("https://script.google.com/macros/s/AKfycbxRFbAHZgM86wat5lAXe2NJU8y3Ocq0A0qxEQc98JWy7hRHN5ZlSjCYG6BZpYuSUhynhA/exec", data).then((response) => {console.log(response)});
// }

function saveRecordIntoGoogleSheet(data: object) {
  fetch(GOOGLE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: 'no-cors', // Set the request mode to 'no-cors'
  })
  .then(response => {
    //  if (!response.ok) {
    //   console.log(response.ok);
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    console.log(response)
    // response.json()
})
  .then(data => {
    console.log("Data sent successfully:", data);
  })
  .catch(error => {
    console.error("Error sending data:", error);
  });
}


// ----------------------------- record pdf ------------------------------

async function generateRecordPDF(id: string) {
  try {
    const response = await axios.get(API_HOST + `/api/pdf/select/${id}`, {
      responseType: "blob", // Treat the response as a binary blob
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary link element to download the PDF
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "record.pdf"; // Set the download file name
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);
    }
  } catch (error) {
    console.error("Error generating and handling the PDF: ", error);
  }
}

export {
//   initUsers,
  verifyUser,
  getUser,
  getUsers,
  addUser,
  setUser,
  updateUserInfo,
  updatePassword,
  deleteUser,
  removeUser,
  addRecord,
  getRecords,
  deleteRecord,
  getRecordById,
  updateRecord,
  generateRecordPDF,
  saveRecordIntoGoogleSheet
}
