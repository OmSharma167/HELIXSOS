




import React, { useState } from "react";
import { Info, HeartPulse, Activity, X, CheckCircle2, AlertTriangle } from "lucide-react";

function Disease() {
    const [formData, setFormData] = useState({
        age: "",
        cp: "",
        thalach: "",
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState({});
    const [showResultModal, setShowResultModal] = useState(false);
    const [predictionStatus, setPredictionStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (formData.age < 0 || formData.age > 120) {
            newErrors.age = "Age must be between 0 and 120";
        }

        if (!formData.cp) {
            newErrors.cp = "Chest Pain Type is required";
        } else if (formData.cp < 0 || formData.cp > 3) {
            newErrors.cp = "Chest Pain Type must be between 0 and 3";
        }

        if (!formData.thalach) {
            newErrors.thalach = "Max Heart Rate is required";
        } else if (formData.thalach < 40 || formData.thalach > 250) {
            newErrors.thalach = "Max Heart Rate must be between 40 and 250";
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (error[name]) {
            setError(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    age: parseInt(formData.age),
                    cp: parseInt(formData.cp),
                    thalach: parseInt(formData.thalach),
                }),
            });

            const data = await response.json();
            if (data.error) {
                setResult(null);
                setError({ submit: data.error });
            } else {
                setResult(data.result);
                // Determine prediction status
                setPredictionStatus(data.result.toLowerCase().includes('positive') ? 'negative' : 'positive');
                setShowResultModal(true);
            }
        } catch (error) {
            setResult(null);
            setError({ submit: "An error occurred while making the prediction." });
            console.error("Error:", error);
        }
    };

    const ResultModal = () => {
        const isPositive = predictionStatus === 'negative';

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className={`relative w-96 p-6 rounded-2xl shadow-2xl ${
                    isPositive 
                    ? 'bg-red-50 border-2 border-red-300' 
                    : 'bg-green-50 border-2 border-green-300'
                }`}>
                    <button 
                        onClick={() => setShowResultModal(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                    
                    {isPositive ? (
                        <div className="text-center">
                            <AlertTriangle 
                                className="mx-auto mb-4 text-red-600" 
                                size={64} 
                                strokeWidth={1.5} 
                            />
                            <h2 className="text-2xl font-bold text-red-700 mb-2">
                                High Risk Detected
                            </h2>
                            <p className="text-red-600 mb-4">
                                {result}
                            </p>
                            <p className="text-sm text-red-500">
                                Please consult with a healthcare professional
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <CheckCircle2 
                                className="mx-auto mb-4 text-green-600" 
                                size={64} 
                                strokeWidth={1.5} 
                            />
                            <h2 className="text-2xl font-bold text-green-700 mb-2">
                                Low Risk
                            </h2>
                            <p className="text-green-600 mb-4">
                                {result}
                            </p>
                            <p className="text-sm text-green-500">
                                Continue maintaining a healthy lifestyle
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen  flex items-center justify-center  from-indigo-300 to-purple-400 p-4">
            {showResultModal && <ResultModal />}
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center text-white">
                    <HeartPulse className="mx-auto mb-4" size={48} />
                    <h1 className="text-3xl font-bold">Heart Health Predictor</h1>
                    <p className="text-indigo-100 mt-2">Get insights into your heart health</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Rest of the form remains the same as previous version */}
                    {/* ... (previous input fields) ... */}
                   <div>
                         <label 
                            htmlFor="age" 
                            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                        >
                            <Activity className="mr-2" size={16} /> Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                                error.age 
                                ? "border-red-500 focus:ring-red-200" 
                                : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                            }`}
                            placeholder="Enter your age"
                        />
                        {error.age && (
                            <p className="text-red-500 text-xs mt-1">{error.age}</p>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="cp" 
                            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                        >
                            <Info className="mr-2" size={16} /> Chest Pain Type (0-3)
                        </label>
                        <input
                            type="number"
                            id="cp"
                            name="cp"
                            value={formData.cp}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                                error.cp 
                                ? "border-red-500 focus:ring-red-200" 
                                : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                            }`}
                            placeholder="0: Typical Angina, 1: Atypical Angina..."
                        />
                        {error.cp && (
                            <p className="text-red-500 text-xs mt-1">{error.cp}</p>
                        )}
                    </div>

                    <div>
                        <label 
                            htmlFor="thalach" 
                            className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                        >
                            <HeartPulse className="mr-2" size={16} /> Max Heart Rate
                        </label>
                        <input
                            type="number"
                            id="thalach"
                            name="thalach"
                            value={formData.thalach}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                                error.thalach 
                                ? "border-red-500 focus:ring-red-200" 
                                : "border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
                            }`}
                            placeholder="Maximum heart rate achieved"
                        />
                        {error.thalach && (
                            <p className="text-red-500 text-xs mt-1">{error.thalach}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg 
                        hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Predict Heart Health
                    </button>

                    {error.submit && (
                        <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mt-4 text-center">
                            {error.submit}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Disease;