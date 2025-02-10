import axios from 'axios';
import toast from 'react-hot-toast';

export const API_URL = import.meta.env.VITE_API_URL


// Get all files
export const getUserFiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/files`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`, // Assuming you have JWT token handling
      },
    });
    return response.data.files;
  } catch (error) {
    throw new Error("Failed to fetch user files.");
  }
};

//Delete file
export const deleteFile = async (id: number)=>{
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('No authentication token found');
  }
  try{
    const response = await axios.delete(`${API_URL}/files/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${authToken}`,
      },
    })
    // console.log("done")
    if(response){
      toast.success("deleted successfully")
    
    }
  }catch(e : any){
    toast.error("Error occured")
  }
}

//Rename file 
export const RenameFile = async (id :number,name : string) => {

  const authToken = localStorage.getItem('authToken');
  // console.log(authToken)
  if (!authToken) {
    throw new Error('No authentication token found');
  }
  try{
    const response = await axios.put(`${API_URL}/files/rename/${id}`,{name}, {
      headers: {
        'Authorization': `${authToken}`,
      },
    })
    if(response){
      toast.success("File name has been updated")
      
    }
  }catch(e : any){
    toast.error("Error while renaming")
    console.log(e.message)
  }
};

  // Function to fetch the QR code
  export const GetQRCode = async (url: string) => {

    const authToken = localStorage.getItem('authToken');
    // console.log(authToken)
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    // console.log(url)

    try {
      const response = await axios.get<{ qrCode: string }>(
        `${API_URL}/files/generateQR`, 
        {
          params: { fileUrl: url },
          headers :{
            'Authorization': `${authToken}`,
          } // Encode URL if necessary
        }
      );
      return response.data.qrCode;
    } catch (err) {
      toast.error("Some error occurred while generating QR Code");
      console.error(err);
      return null;
    }
  };
  

// Upload a file
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const authToken = localStorage.getItem('authToken');
  // console.log(authToken)
  if (!authToken) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.post(`${API_URL}/files/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${authToken}`,
      },
    });
    return response.data; // Assuming the response is in the form of JSON
  } catch (error) {
    // Enhanced error handling
    if (axios.isAxiosError(error)) {
      // Handle specific axios error
      if (error.response) {
        // Request made and server responded
        // @ts-ignore 
        throw new Error(`File upload failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response received
        throw new Error('File upload failed: No response from server');
      } else {
        // Something happened in setting up the request
        throw new Error(`File upload failed: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred during file upload');
    }
  }
};

// User login
export const loginUser = async (username: string, password: string) => {
  // Validate if username and password are not empty
  // console.log(import.meta.env.VITE_API_URL)
  // console.log(API_URL)
  if (!username || !password) {
    // console.log("Username and password are required.");
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });

    if (response.data?.token) {
      localStorage.setItem("authToken", "Bearer " + response.data.token);
      // console.log("****************************")
      // console.log("****************************")
      // console.log(response.data.token)
      // console.log("****************************")
      // console.log("****************************")
      // toast.success("Login successful")
      return response;
    } else {
      console.log("Login failed. No token received.");
    }
  } catch (e) {
    console.log("An error occurred while logging in: ", e);
  }
};

// User sign-up
export const signUpUser = async (username: string,email: string, password: string) => {
  try{
    const response = await axios.post(`${API_URL}/auth/signup`, {username, email, password });
    localStorage.setItem("authToken","Bearer " + response.data.token)
    return response
  }catch(e){
    console.log(e)
  }
};
