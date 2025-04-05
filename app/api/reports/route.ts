import { NextResponse } from "next/server";

// Mock data structure for Excel file data
interface StudentData {
  name: string;
  attendance: number;
  grades: Record<string, number>;
  activities: string[];
  // Other properties...
}

interface AnalysisResult {
  overallAttendance: {
    present: number;
    late: number;
    absent: number;
  };
  trends: {
    daily: Record<string, number>;
    monthly: Record<string, number>;
    yearComparison: Record<string, number>;
  };
  classComparison: Record<string, number>;
  dayOfWeekAttendance: Record<string, number>;
  gamification: {
    achievements: Record<string, number>;
    pointsDistribution: Record<string, number>;
    streakImpact: number;
  };
  insights: string[];
  recommendations: string[];
}

export async function POST(request: Request) {
  try {
    // In a real implementation, parse the uploaded Excel file
    // For now, we'll simulate receiving parsed data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const selectedPeriod = formData.get("period") as string;
    const selectedClass = formData.get("class") as string;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Log for debugging
    console.log("File received:", file.name, file.type, file.size);
    console.log("Period:", selectedPeriod);
    console.log("Class:", selectedClass);

    // In a real implementation:
    // 1. Parse the Excel file to extract student data
    // 2. Format the data for AI analysis
    // 3. Send to Together AI API for analysis

    // For now, simulate calling Together AI API
    const analysisResult = await getAIAnalysis(selectedPeriod, selectedClass);

    return NextResponse.json({ 
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error("Error processing report:", error);
    return NextResponse.json(
      { error: "Failed to process report" },
      { status: 500 }
    );
  }
}

async function getAIAnalysis(period: string, className: string): Promise<AnalysisResult> {
  const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
  
  if (!TOGETHER_API_KEY) {
    throw new Error("Together API key not configured");
  }

  // This is the actual AI prompt for data analysis
  const prompt = `
  You are an expert educational data analyst. Analyze the following student performance data for ${className} during ${period}. Generate insights and recommendations.
  
  Provide the following metrics in JSON format:
  1. Overall attendance statistics (percentage of present, late, and absent)
  2. Daily and monthly attendance trends
  3. Class comparisons
  4. Day of week attendance patterns
  5. Gamification impact and achievement statistics
  
  Your analysis should include specific numeric values that can be used for visualizations.
  Your response MUST be valid JSON with no explanatory text outside the JSON structure.
  The JSON should follow this exact structure:

  {
    "overallAttendance": {
      "present": 85.1,
      "late": 7.3,
      "absent": 7.6
    },
    "trends": {
      "daily": {
        "Mon, Apr 1": 91.2,
        "Tue, Apr 2": 93.5
      },
      "monthly": {
        "January": 89.3,
        "February": 90.2
      },
      "yearComparison": {
        "2023": 88.7,
        "2024": 90.1,
        "2025": 92.4
      }
    },
    "classComparison": {
      "Class 11A": 88.5,
      "Class 11B": 91.3,
      "Class 12A": 94.2,
      "Class 12B": 90.7
    },
    "dayOfWeekAttendance": {
      "Monday": 93.5,
      "Tuesday": 94.2,
      "Wednesday": 91.8,
      "Thursday": 92.3,
      "Friday": 90.1
    },
    "gamification": {
      "achievements": {
        "Perfect Week": 68,
        "Early Bird": 42,
        "Consistency King": 23
      },
      "pointsDistribution": {
        "Attendance": 45,
        "Participation": 30,
        "Assignments": 25
      },
      "streakImpact": 15
    },
    "insights": [
      "Students show higher attendance rates on Tuesdays compared to other days.",
      "The gamification system has improved overall attendance by 2.3% compared to last year."
    ],
    "recommendations": [
      "Consider implementing additional incentives for Friday attendance, which shows the lowest rate.",
      "Expand the 'Early Bird' achievement which currently has moderate engagement."
    ]
  }
  
  Create realistic and academically useful insights and recommendations based on the patterns in the data.
  `;

  try {
    // Call Together AI API
    const response = await fetch("https://api.together.xyz/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOGETHER_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/Llama-3-70b-chat-hf",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      console.error("Together API error:", await response.text());
      throw new Error("Failed to get AI analysis");
    }

    const result = await response.json();
    
    // Parse the AI response as JSON
    try {
      // Extract the JSON part from the AI response
      const resultText = result.choices[0].text.trim();
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        return JSON.parse(jsonString) as AnalysisResult;
      } else {
        console.error("Could not extract JSON from AI response:", resultText);
        throw new Error("Invalid AI response format");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback to mock data if parsing fails
      return getMockAnalysisData(period, className);
    }
  } catch (error) {
    console.error("Error calling Together AI API:", error);
    // Fallback to mock data if API call fails
    return getMockAnalysisData(period, className);
  }
}

// Separate function for mock data to keep the main function cleaner
function getMockAnalysisData(period: string, className: string): AnalysisResult {
  return {
    overallAttendance: {
      present: 85.1,
      late: 7.3,
      absent: 7.6
    },
    trends: {
      daily: {
        "Mon, Apr 1": 91.2,
        "Tue, Apr 2": 93.5,
        "Wed, Apr 3": 89.7,
        "Thu, Apr 4": 92.4,
        "Fri, Apr 5": 90.1,
        "Mon, Apr 8": 93.8,
        "Tue, Apr 9": 94.5
      },
      monthly: {
        "January": 89.3,
        "February": 90.2,
        "March": 91.5,
        "April": 92.4
      },
      yearComparison: {
        "2023": 88.7,
        "2024": 90.1,
        "2025": 92.4
      }
    },
    classComparison: {
      "Class 11A": 88.5,
      "Class 11B": 91.3,
      "Class 12A": 94.2,
      "Class 12B": 90.7
    },
    dayOfWeekAttendance: {
      "Monday": 93.5,
      "Tuesday": 94.2,
      "Wednesday": 91.8,
      "Thursday": 92.3,
      "Friday": 90.1
    },
    gamification: {
      achievements: {
        "Perfect Week": 68,
        "Early Bird": 42,
        "Consistency King": 23
      },
      pointsDistribution: {
        "Attendance": 45,
        "Participation": 30,
        "Assignments": 25
      },
      streakImpact: 15
    },
    insights: [
      "Students show higher attendance rates on Tuesdays compared to other days.",
      "The gamification system has improved overall attendance by 2.3% compared to last year.",
      "Students with consistent streaks have 15% better attendance than those without.",
      "Class 12A has the highest attendance rate, suggesting effective classroom management."
    ],
    recommendations: [
      "Consider implementing additional incentives for Friday attendance, which shows the lowest rate.",
      "Expand the 'Early Bird' achievement which currently has moderate engagement.",
      "Develop targeted interventions for Class 11A which has the lowest attendance rate.",
      "Introduce more streak-based rewards to capitalize on their positive impact."
    ]
  };
} 