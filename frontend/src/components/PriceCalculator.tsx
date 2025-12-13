import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading effect

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    landArea: "",
    waterAvailability: "",
    soilType: "",
    fertilizerType: "",
    additionalInfo: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeholders = {
    cropType: "e.g., Wheat, Rice, Corn",
    landArea: "e.g., 5 acres",
    waterAvailability: "e.g., 5000 liters per day",
    soilType: "e.g., Sandy, Clay, Loamy",
    fertilizerType: "e.g., Urea, NPK, Compost",
    additionalInfo: "Any other relevant details...",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // HACKATHON DEMO - Smart Estimation Logic
    setTimeout(() => {
      const cropType = formData.cropType.toLowerCase();
      const landArea = parseFloat(formData.landArea) || 1;
      
      // Smart estimation based on crop type and land area
      let baseYield = 2000; // kg per acre
      let basePrice = 25; // rupees per kg
      
      if (cropType.includes('wheat')) {
        baseYield = 2500;
        basePrice = 22;
      } else if (cropType.includes('rice')) {
        baseYield = 3000;
        basePrice = 28;
      } else if (cropType.includes('corn') || cropType.includes('maize')) {
        baseYield = 2200;
        basePrice = 18;
      } else if (cropType.includes('cotton')) {
        baseYield = 800;
        basePrice = 55;
      }
      
      const totalYield = Math.round(baseYield * landArea);
      const totalSales = Math.round(totalYield * basePrice);
      const totalCost = Math.round(totalSales * 0.6); // 60% cost ratio
      const profit = totalSales - totalCost;
      
      const smartResult = {
        Estimated_yield: `${totalYield} kg (${baseYield} kg/acre)`,
        Water_required: `${Math.round(landArea * 1200)} liters per week`,
        Diseases: cropType.includes('rice') ? 'Blast, Brown spot - Use Tricyclazole' : 
                 cropType.includes('wheat') ? 'Rust, Smut - Use Propiconazole' :
                 'Regular monitoring needed - Use Neem oil spray',
        Fertilizer: `NPK 19:19:19 - ${Math.round(landArea * 50)} kg, Urea - ${Math.round(landArea * 25)} kg`,
        Remark: `Good potential for ${formData.cropType}. ${formData.soilType} soil is suitable. Expected profit: ₹${profit.toLocaleString()}`,
        Estimated_Sales: `₹${totalSales.toLocaleString()}`,
        Estimated_cost: `₹${totalCost.toLocaleString()}`
      };
      
      setResult(smartResult);
      setLoading(false);
    }, 2000); // 2 second delay for realistic AI feel
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-md p-4 shadow-md">
        <CardHeader>
          <CardTitle>Crop Yield Estimation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type="text"
                  placeholder={placeholders[field]}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <Button type="submit" className="w-full">
              Estimate
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display Loading State */}
      {loading && (
        <div className="w-full max-w-md mt-4 p-4">
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {/* Display Error Message */}
      {error && (
        <Card className="w-full max-w-md mt-4 p-4 text-red-600 bg-red-100 border border-red-400">
          {error}
        </Card>
      )}

      {/* Display AI Response */}
      {result && (
        <Card className="w-full max-w-md mt-4 p-4 shadow-md">
          <CardHeader>
            <CardTitle>Estimation Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Estimated Yield:</strong> {result.Estimated_yield}
              </p>
              <p>
                <strong>Water Required:</strong> {result.Water_required}
              </p>
              <p>
                <strong>Diseases:</strong> {result.Diseases}
              </p>
              <p>
                <strong>Fertilizer Recommendation:</strong> {result.Fertilizer}
              </p>
              <p>
                <strong>Remark:</strong> {result.Remark}
              </p>
              <p>
                <strong>Estimated Sales:</strong> {result.Estimated_Sales}
              </p>
              <p>
                <strong>Estimated Cost:</strong> {result.Estimated_cost}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleForm;
