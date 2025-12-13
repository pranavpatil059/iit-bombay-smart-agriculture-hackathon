import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FarmerDetails.css";
import axios from "axios";
import Layout from "../components/Layout";
import { Calendar, Droplets, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Farmer {
    _id: string;
    name: string;
    area: string;
    landArea: number;
    phone: string;
    email: string;
    selectedCrop: string;
    date: string;
}

interface CropSchedule {
    day: number;
    amount: string;
}

interface FertilizerSchedule {
    day: number;
    type: string;
    amount: string;
}

interface CropStage {
    name: string;
    day: number;
}

interface CropData {
    duration: string;
    waterSchedule: CropSchedule[];
    fertilizerSchedule: FertilizerSchedule[];
    stages: CropStage[];
}

const FarmerDetails: React.FC = () => {
    const { phone } = useParams<{ phone: string }>();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [newCrop, setNewCrop] = useState<string>("");
    const [updating, setUpdating] = useState<boolean>(false);
    const [cropInfo, setCropInfo] = useState<CropData | null>(null);
    const [cropLoading, setCropLoading] = useState<boolean>(false);
    const [sendingEmail, setSendingEmail] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleUpdateCrop = async () => {
      if (!newCrop.trim() || !farmer) return;
      try {
        setUpdating(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/farmers/${farmer._id}/crop`,
          {
            selectedCrop: newCrop,
          }
        );
        setFarmer(response.data.farmer);

        // Fetch data for the new crop
        fetchCropData(newCrop);

        setNewCrop("");
        navigate(`/updatecrop`);
      } catch (error) {
        console.error("Error updating crop", error);
      } finally {
        setUpdating(false);
      }
    };
    useEffect(() => {
      const fetchFarmer = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/farmers/phone/${phone}`
          );
          setFarmer(response.data);

          // If farmer has a selected crop, fetch crop data
          if (response.data.selectedCrop) {
            fetchCropData(response.data);
          }
        } catch (err: unknown) {
          setError("Farmer not found");
        } finally {
          setLoading(false);
        }
      };
      fetchFarmer();
    }, [phone, handleUpdateCrop]);

    const fetchCropData = async (data) => {
        setCropLoading(true);
        try {
            if (data.cropData) {
              setCropInfo(data.cropData);
            } else {
              console.error("Failed to fetch crop data");
            }
        } catch (err) {
            console.error("Error fetching crop data:", err);
        } finally {
            setCropLoading(false);
        }
    };

    const handleSendEmail = async () => {
        if (!farmer) return;
        try {
            setSendingEmail(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/email/send_email`, { farmerId: farmer._id });
            alert("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email", error);
            alert("Failed to send email");
        } finally {
            setSendingEmail(false);
        }
    };

    

    if (loading) return (
        <Layout>
            <div className="container flex items-center justify-center h-[70vh]">
                <div className="text-xl animate-pulse">Loading farmer details...</div>
            </div>
        </Layout>
    );
    
    if (error) return (
        <Layout>
            <div className="container flex items-center justify-center h-[70vh]">
                <div className="text-xl text-destructive">{error}</div>
            </div>
        </Layout>
    );

    const formattedDate = farmer?.date ? new Date(farmer.date) : null;

    // Generate daily tasks
    const dailyTasks: { date: Date; task: string }[] = [];

    if (cropInfo && formattedDate) {
        // Combine all events (stages, water schedule, fertilizer schedule)
        const allEvents = [
            ...cropInfo.stages.map(stage => ({ 
                day: stage.day, 
                description:` Stage: ${stage.name} `
            })),
            ...cropInfo.waterSchedule.map(water => ({ 
                day: water.day, 
                description: `Watering: ${water.amount} `
            })),
            ...cropInfo.fertilizerSchedule.map(fert => ({ 
                day: fert.day, 
                description: `Fertilizer: Apply ${fert.amount} of ${fert.type}` 
            }))
        ];

        // Create tasks with dates
        allEvents.forEach(event => {
            const eventDate = new Date(formattedDate.getTime() + event.day * 86400000);
            dailyTasks.push({ 
                date: eventDate, 
                task: event.description 
            });
        });

        // Sort tasks by date
        dailyTasks.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    return (
      <Layout>
        <div className="container py-8 px-4">
          <div className="farmer-details-container glass-panel">
            <h2 className="text-2xl font-semibold mb-6">Farmer Details</h2>
            <div className="farmer-card">
              <div className="farmer-info w-full">
                <p>
                  <strong>Name:</strong> {farmer?.name}
                </p>
                <p>
                  <strong>Area:</strong> {farmer?.area}
                </p>
                <p>
                  <strong>Land Area:</strong> {farmer?.landArea} acres
                </p>
                <p>
                  <strong>Phone:</strong> {farmer?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {farmer?.email}
                </p>
                <p>
                  <strong>Date of Starting:</strong>{" "}
                  {formattedDate?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Selected Crop:</strong>{" "}
                  {farmer?.selectedCrop || "Not Selected"}
                </p>
              </div>

              <div className="crop-update mt-6 w-full">
                <input
                  type="text"
                  placeholder="Enter new crop"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="input-field"
                />
                <button
                  onClick={handleUpdateCrop}
                  disabled={updating}
                  className="update-button"
                >
                  {updating ? "Updating..." : "Update Crop"}
                </button>
              </div>

              {cropLoading ? (
                <div className="w-full mt-8 text-center">
                  <div className="text-lg animate-pulse">
                    Loading crop information...
                  </div>
                </div>
              ) : (
                cropInfo &&
                formattedDate && (
                  <div className="crop-details w-full mt-8">
                    <h3 className="text-xl font-medium flex items-center gap-2">
                      <Sprout className="h-5 w-5" /> Crop Schedule:{" "}
                      {farmer?.selectedCrop}
                    </h3>

                    <div className="mt-4">
                      <h4 className="text-lg font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Daily Tasks
                      </h4>
                      <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-2">
                        <ul className="list-disc pl-6">
                          {dailyTasks.map((task, index) => (
                            <li key={index} className="py-1">
                              <span className="font-medium">
                                {task.date.toLocaleDateString()}
                              </span>{" "}
                              - {task.task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-white bg-opacity-20 rounded-lg p-4">
                        <h4 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Droplets className="h-4 w-4" /> Water Schedule
                        </h4>
                        <ul className="list-disc pl-6">
                          {cropInfo.waterSchedule.map((water, index) => (
                            <li key={index} className="py-1">
                              <span className="font-medium">
                                Day {water.day}:
                              </span>{" "}
                              {water.amount}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white bg-opacity-20 rounded-lg p-4">
                        <h4 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Calendar className="h-4 w-4" /> Growth Stages
                        </h4>
                        <ul className="list-disc pl-6">
                          {cropInfo.stages.map((stage, index) => (
                            <li key={index} className="py-1">
                              <span className="font-medium">
                                Day {stage.day}:
                              </span>{" "}
                              {stage.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white bg-opacity-20 rounded-lg p-4 md:col-span-2">
                        <h4 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Calendar className="h-4 w-4" /> Fertilizer Schedule
                        </h4>
                        <ul className="list-disc pl-6">
                          {cropInfo.fertilizerSchedule.map((fert, index) => (
                            <li key={index} className="py-1">
                              <span className="font-medium">
                                Day {fert.day}:
                              </span>{" "}
                              Apply {fert.amount} of {fert.type}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-500 bg-opacity-20 rounded-lg">
                      <p className="font-medium">
                        Total Crop Duration: {cropInfo.duration} days
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                        className="send-email-button flex justify-center items-center mx-auto bg-green-600 text-white px-4 py-2 rounded-md font-bold hover:bg-green-700"
                      >
                        {sendingEmail ? "Sending..." : "Send Email"}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
};
export default FarmerDetails;