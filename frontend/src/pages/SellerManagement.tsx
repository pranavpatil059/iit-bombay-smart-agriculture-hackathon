import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Seller {
  _id?: string;
  sellerName: string;
  location: string;
  contact?: string;
  itemName: string;
  quantity: number;
  type: "Consumer Market" | "Industry Supply" | "Equipment Rental";
}

const SellerManagement: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Seller>({
    sellerName: '',
    location: '',
    contact: '',
    itemName: '',
    quantity: 0,
    type: "Consumer Market",
  });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/sellers`);
      setSellers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const addSeller = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/sellers/add`, formData);
      fetchSellers();
      setAlertMessage('Seller successfully added!');
      setTimeout(() => setAlertMessage(null), 3000);
      setFormData({ sellerName: '', location: '', contact: '', itemName: '', quantity: 0, type: "Consumer Market" });
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Seller Management</h2>
        {alertMessage && <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">{alertMessage}</div>}
        <h3 className="mb-4 text-lg font-medium text-center">Add New Seller</h3>
        <input className="border p-2 rounded mb-2 w-full" name="sellerName" placeholder="Seller Name" onChange={handleChange} value={formData.sellerName} />
        <input className="border p-2 rounded mb-2 w-full" name="location" placeholder="Location" onChange={handleChange} value={formData.location} />
        <input className="border p-2 rounded mb-2 w-full" name="contact" placeholder="Contact (optional)" onChange={handleChange} value={formData.contact} />
        <input className="border p-2 rounded mb-2 w-full" name="itemName" placeholder="Item Name" onChange={handleChange} value={formData.itemName} />
        <input className="border p-2 rounded mb-2 w-full" name="quantity" placeholder="Quantity" type="number" onChange={handleChange} value={formData.quantity} />
        <select className="border p-2 rounded mb-2 w-full" name="type" onChange={handleChange} value={formData.type}>
          <option value="Consumer Market">Consumer Market</option>
          <option value="Industry Supply">Industry Supply</option>
          <option value="Equipment Rental">Equipment Rental</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={addSeller}>Submit</button>
      </div>
    </div>
  );
};

export default SellerManagement;