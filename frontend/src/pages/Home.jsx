import { useState, useEffect } from "react";
import api from "../api";
import Profile from "../components/Profile"
import "../styles/Home.css"
import ProfileForm from "../components/ProfileForm";
import { useNavigate } from "react-router-dom";


function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [cfr_level,setCFRLevel] = useState("")
    const [score,setScore] = useState(0)


    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({
        text_title: 'aaaaaaaaaaaaaaaa',
        text_content: '', // Make sure other required fields are included here too
        text_cfr_level: '',
        text_score: 0,
        cv_title: '', // Add cv_title field
        cv_content: '', // Make sure other required fields are included here too
        cv_file: null
      });
      

    const navigate = useNavigate()

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = () => {
        api
            .get("/api/profiles/")
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setProfiles(data);
            })
            .catch((err) => {
                alert(err);
                // Navigate to the login page on error
                //navigate("/login");
            });
    };

    const deleteProfile = (id) => {
        api
            .delete(`/api/profiles/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getProfiles();
            })
            .catch((error) => alert(error));
    };

    const createProfile = (e) => {
        e.preventDefault();
        api
            .post("/api/profiles/create/", { title,content,cfr_level,score })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getProfiles();
            })
            .catch((err) => alert(err));
    };

    // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv_file: file });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    formData.text_score = parseInt(formData.text_score)
    
    try {
      await api.post('/api/profiles/create/', formData,{
        headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
     
      alert('Profile created successfully!');
      // Check if getProfiles is defined before calling it
      if (getProfiles) {
          getProfiles();
      } else {
          console.error('getProfiles is not defined');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('An error occurred while creating the profile.');
    }
};


    return (
        <div>
            <div>
                <header>
                    <h2>Profiles</h2>
                </header>
                <div className="note-main">
                    {profiles && profiles.map((profile) => (
                        <Profile getProfiles={getProfiles} profile={profile} onDelete={deleteProfile} key={profile.id} />
                    ))}
                </div>

                <h2>Create Profile</h2>
                <main>
                    <ProfileForm setFormData={setFormData} formData={setFormData} handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
                </main>
            </div>

        </div>
    );
}

export default Home;