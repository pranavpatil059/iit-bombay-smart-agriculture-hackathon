import React, { useState, useMemo } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from '@/contexts/LanguageContext';
import cropData from "./data.js"; // Static crop data

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
  if (trend === "down")
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  return <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
};

const PriceCard = ({ crop }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {crop.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{crop.state}</p>
      </div>
      <div className="flex items-center space-x-2">
        <TrendIcon trend={crop.trend} />
        <span
          className={`text-sm font-medium ${
            crop.trend === "up"
              ? "text-green-600"
              : crop.trend === "down"
              ? "text-red-600"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {crop.change}
        </span>
      </div>
    </div>
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          ₹{crop.price}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          {t('prices.perUnit')?.replace('{unit}', crop.unit)}
        </span>
      </div>
    </div>
  </div>
);

export default function Prices() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All States");

  const uniqueStates = [
    t('prices.allStates'),
    ...new Set(cropData.map((crop) => crop.state)),
  ];

  const filteredCrops = useMemo(() => {
    return cropData.filter((crop) => {
      const matchesSearch = crop.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesState =
        selectedState === t('prices.allStates') || crop.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchTerm, selectedState]);

  const groupedCrops = useMemo(() => {
    const grouped = {};
    filteredCrops.forEach((crop) => {
      if (!grouped[crop.name]) {
        grouped[crop.name] = [];
      }
      grouped[crop.name].push(crop);
    });
    return grouped;
  }, [filteredCrops]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('prices.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('prices.subtitle')}
          </p>

          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('prices.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {uniqueStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {t('prices.showingResults')
                ?.replace('{count}', filteredCrops.length.toString())
                ?.replace('{plural}', filteredCrops.length !== 1 ? "s" : "")}
              {searchTerm && ` ${t('prices.forSearch')?.replace('{search}', searchTerm)}`}
              {selectedState !== t('prices.allStates') && ` ${t('prices.inState')?.replace('{state}', selectedState)}`}
            </p>
          </div>
        </div>

        {/* Price Cards */}
        {Object.keys(groupedCrops).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedCrops).map(([cropName, crops]) => (
              <div key={cropName}>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-green-500 pb-2">
                  {cropName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crops.map((crop) => (
                    <PriceCard key={crop.id} crop={crop} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              {t('prices.noCropsFound')}
            </div>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              {t('prices.adjustSearch')}
            </p>
          </div>
        )}

        {/* Market Info */}
        <div className="mt-12 bg-blue-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            {t('prices.marketInformation')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>{t('prices.priceUpdates')}:</strong> {t('prices.priceUpdatesTime')}
            </div>
            <div>
              <strong>{t('prices.currency')}:</strong> {t('prices.currencyValue')}
            </div>
            <div>
              <strong>{t('prices.unit')}:</strong> {t('prices.unitValue')}
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            {t('prices.disclaimer')}
          </p>
        </div>
      </div>
    </>
  );
}
