
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { User, MapPin,  Phone, Mail, Sprout } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import ParticleBackground from "@/components/ParticleBackground";

const FarmerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    landArea: "",
    phone: "",
    email: "",
    password:"",
    selectedCrop: "",
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [password,setPasswordInput]=useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://iiit-naya-raipur-hakathon.vercel.app/api/farmers",
        formData
      );
      alert(response.data.message);
      setFormData({
        name: "",
        area: "",
        landArea: "",
        phone: "",
        email: "",
        password:"",
        selectedCrop: "",
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Error registering farmer");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/details/${phoneInput}`);
  };

  return (
    <Layout>
      {/* Animated Particle Background */}
      <ParticleBackground className="opacity-40" />
      
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 relative z-10">
        <div className="max-w-md w-full mx-auto p-6 rounded-lg border border-red-500/20 shadow-2xl bg-black/70 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            🌾 Farmer Portal
          </h2>

          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Register New Account
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  {/* <Farm size={16} /> */}
                </div>
                <input
                  type="number"
                  name="landArea"
                  placeholder="Land Area"
                  value={formData.landArea}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Phone size={16} />
                </div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
    <FontAwesomeIcon icon={faLock} size="sm" />
  </div>
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
  />
</div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Sprout size={16} />
                </div>
                <input
                  type="text"
                  name="selectedCrop"
                  placeholder="Selected Crop"
                  value={formData.selectedCrop}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>

            <button className="w-full py-2 font-semibold rounded-md bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
              Register
            </button>
          </form>

          <div className="mt-8 mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Already Registered?
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Phone size={16} />
              </div>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
            <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
    <FontAwesomeIcon icon={faLock} size="sm" />
  </div>
  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPasswordInput(e.target.value)}
    required
    className="w-full pl-10 pr-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
  />
</div>
            <button className="w-full py-2 font-semibold rounded-md bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-colors">
              View Details
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerForm;
