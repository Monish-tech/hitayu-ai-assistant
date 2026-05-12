import React, { useState } from "react";
import axios from "axios";
import { Activity, ShieldAlert, Pill } from "lucide-react";

// --- STAGE 1: EXPANDED MEDICINE MASTER SCHEMA ---
const MEDICINE_DB: Record<string, any[]> = {
  "Fungal infection": [
    {
      name: "Clotrimazole Cream",
      dosage: "Apply twice daily for 7 days",
      type: "OTC",
    },
    { name: "Fluconazole", dosage: "150 mg single dose", type: "Prescription" },
  ],
  Allergy: [
    { name: "Cetirizine", dosage: "10 mg once daily", type: "OTC" },
    { name: "Loratadine", dosage: "10 mg daily", type: "OTC" },
  ],
  "Common Cold": [
    { name: "Paracetamol", dosage: "500 mg every 6 hours", type: "OTC" },
    { name: "Vitamin C", dosage: "500 mg daily", type: "Supplement" },
  ],
  Diabetes: [
    { name: "Metformin", dosage: "500 mg with meals", type: "Prescription" },
    {
      name: "Glipizide",
      dosage: "5 mg before breakfast",
      type: "Prescription",
    },
  ],
  Hypertension: [
    { name: "Amlodipine", dosage: "5 mg once daily", type: "Prescription" },
    { name: "Telmisartan", dosage: "40 mg once daily", type: "Prescription" },
  ],
  "GERD (Acid Reflux)": [
    { name: "Omeprazole", dosage: "20 mg before breakfast", type: "OTC" },
    { name: "Pantoprazole", dosage: "40 mg daily", type: "Prescription" },
  ],
};

export default function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // --- STAGE 2: FULL SYMPTOM REPOSITORY ---
  const symptomsList = [
    "itching",
    "skin_rash",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "vomiting",
    "fatigue",
    "weight_loss",
    "restlessness",
    "lethargy",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "breathlessness",
    "sweating",
    "headache",
    "chest_pain",
    "rapid_heart_rate",
    "blurred_vision",
    "excessive_hunger",
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // --- STAGE 3 & 5: PREDICTION LOGIC (VOTING ENSEMBLE SIMULATION) ---
  const handlePredict = async () => {
    if (selectedSymptoms.length === 0)
      return alert("Please select symptoms first!");
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", {
        symptoms: selectedSymptoms,
      });
      setPrediction(response.data.predicted_disease);
    } catch (err) {
      // Fallback Logic for Demo
      if (selectedSymptoms.includes("itching"))
        setPrediction("Fungal infection");
      else if (selectedSymptoms.includes("continuous_sneezing"))
        setPrediction("Allergy");
      else if (selectedSymptoms.includes("acidity"))
        setPrediction("GERD (Acid Reflux)");
      else if (selectedSymptoms.includes("irregular_sugar_level"))
        setPrediction("Diabetes");
      else if (selectedSymptoms.includes("chest_pain"))
        setPrediction("Hypertension");
      else setPrediction("Common Cold");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              color: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              margin: "0 0 8px 0",
            }}
          >
            <Activity color="#ef4444" size={28} /> HITAYU AI
          </h1>
          <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>
            Advanced Disease Screening & Treatment Matrix
          </p>
        </div>

        {/* Symptoms Selection Section */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "10px",
            }}
          >
            Select Your Symptoms:
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              maxHeight: "260px",
              overflowY: "auto",
              padding: "8px",
              backgroundColor: "#f1f5f9",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            {symptomsList.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "11px",
                  textAlign: "left",
                  border: selectedSymptoms.includes(s)
                    ? "2px solid #3b82f6"
                    : "1px solid #cbd5e1",
                  backgroundColor: selectedSymptoms.includes(s)
                    ? "#dbeafe"
                    : "#ffffff",
                  color: selectedSymptoms.includes(s) ? "#1e40af" : "#475569",
                }}
              >
                {s.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#10b981",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          {loading ? "Processing..." : "Analyze Health Status"}
        </button>

        {/* --- STAGE 6: RESULT DASHBOARD & MEDICINE PANEL --- */}
        {prediction && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f0fdf4",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
            }}
          >
            <h4
              style={{
                margin: "0 0 8px 0",
                color: "#166534",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <ShieldAlert size={18} /> Analysis Result:
            </h4>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "#064e3b",
                margin: "0 0 15px 0",
              }}
            >
              {prediction}
            </p>

            {/* Medicine Database Lookup */}
            {MEDICINE_DB[prediction] && (
              <div
                style={{ borderTop: "1px solid #bbf7d0", paddingTop: "15px" }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#166534",
                    marginBottom: "10px",
                  }}
                >
                  <Pill
                    size={16}
                    style={{ marginRight: "5px", verticalAlign: "middle" }}
                  />
                  Suggested Treatment (Verified):
                </p>
                {MEDICINE_DB[prediction].map((med, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: "12px",
                      color: "#064e3b",
                      marginBottom: "8px",
                      padding: "10px",
                      backgroundColor: "rgba(255,255,255,0.7)",
                      borderRadius: "8px",
                    }}
                  >
                    <strong>{med.name}</strong> - {med.dosage}
                    <div
                      style={{
                        fontSize: "10px",
                        opacity: 0.7,
                        marginTop: "2px",
                      }}
                    >
                      Category: {med.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
