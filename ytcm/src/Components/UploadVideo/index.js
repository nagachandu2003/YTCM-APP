import "./index.css"
import { useState } from "react"
import axios from "axios"
import YTCMFooter from "../YTCMFooter";

const UploadVideo = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        file: null
    })
    const [uploadStatus, setUploadStatus] = useState("")

    // const onUploadVideo = async (event) => {
    //     event.preventDefault();
    //     setUploadStatus("Initiating upload...");
    //     const videoData = new FormData();
    //     videoData.append("videoFile", form.file);
    //     videoData.append("title", form.title);
    //     videoData.append("description", form.description);

    //     try {
    //         const response = await axios.post(`https://js-member-backend.vercel.app/uploadvideo`, videoData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            
    //         if (response.data.authUrl) {
    //             setUploadStatus("Please complete authentication in the new window.");
    //             window.open(response.data.authUrl, "YouTube Auth", "width=800,height=600");
    //         } else {
    //             setUploadStatus("Upload initiated. Waiting for completion...");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         setUploadStatus("Upload failed. See console for details.");
    //     }
    // };

    const onUploadVideo = async (event) => {
        event.preventDefault();
        setUploadStatus("Initiating upload...")
        const videoData = new FormData();
        videoData.append("videoFile", form.file);
        videoData.append("title", form.title);
        videoData.append("description", form.description);

        try {
            const response = await axios.post(`https://js-member-backend.vercel.app/uploadvideo/uploadvideo`, videoData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.authUrl) {
                setUploadStatus("Please complete authentication in the new window.")
                window.open(response.data.authUrl, "_blank")
            } else {
                setUploadStatus("Upload initiated. Check console for progress.")
            }
        } catch (err) {
            console.error(err);
            setUploadStatus("Upload failed. See console for details.")
        }
    }

    const handleChange = (event) => {
        const inputValue = event.target.name === "file" ? event.target.files[0] : event.target.value;
        setForm({
            ...form,
            [event.target.name]: inputValue
        })
    }

    return (
        <>
        <div className="ytmcregister-main-container">
        <div style={{ textAlign: 'left', backgroundColor: '#ffff00', position: 'fixed', width: '100%', top: '0', zIndex: '100' }} className="ytmcregister-top-container">
                <h2>Post Video</h2>
        </div>
        <div style={{ marginTop: '80px', overflowY: 'auto', paddingBottom: '100px' }} className="ytmcregister-form-container">
                    <form onSubmit={onUploadVideo}>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="title">Title</label>
                            <br />
                            <input placeholder="Enter the Title" onChange={handleChange} className="ytmcregister-user-input" type="text" id="title" name="title" required value={form.title} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="">Description</label>
                            <br />
                            <textarea placeholder="Enter the Description" onChange={handleChange} className="ytmcregister-user-input" type="text" id="description" name="description" required value={form.description} />
                        </div>
                        <div className="ytmcregister-cont-ele">
                            <label htmlFor="accountNumber">Upload Video</label>
                            <br />
                            <input placeholder="Upload the Video" onChange={handleChange} className="ytmcregister-user-input" type="file" id="videofile" accept="video/*" name="file" required />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className="fetchBtn" type="submit">Submit</button>
                        </div>
            </form>
        </div>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
        <YTCMFooter/>
        </>
    )
}

export default UploadVideo;