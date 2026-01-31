import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Calculator, Scale, Activity, TrendingUp, AlertTriangle, Apple } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";

export function BMICalculatorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmiResult, setBmiResult] = useState<{
    bmi: number;
    category: string;
    color: string;
    description: string;
    recommendations: string[];
  } | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInM = parseFloat(height);
    let weightInKg = parseFloat(weight);

    if (unit === "imperial") {
      heightInM = heightInM * 0.0254; // inches to meters
      weightInKg = weightInKg * 0.453592; // pounds to kg
    } else {
      heightInM = heightInM / 100; // cm to meters
    }

    const bmi = weightInKg / (heightInM * heightInM);
    
    let category, color, description, recommendations;
    
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600";
      description = "Your BMI indicates you may be underweight for your height.";
      recommendations = [
        "Consult with a healthcare provider for personalized advice",
        "Consider a balanced diet with healthy weight gain foods",
        "Include strength training exercises",
        "Monitor your progress regularly"
      ];
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      color = "text-secondary";
      description = "Congratulations! You have a healthy weight for your height.";
      recommendations = [
        "Maintain your current healthy lifestyle",
        "Continue regular physical activity",
        "Eat a balanced, nutritious diet",
        "Regular health check-ups"
      ];
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-amber-600";
      description = "Your BMI indicates you may be overweight for your height.";
      recommendations = [
        "Consider gradual weight loss through diet and exercise",
        "Increase physical activity to 150+ minutes per week",
        "Focus on whole foods and portion control",
        "Consult healthcare provider for guidance"
      ];
    } else {
      category = "Obese";
      color = "text-red-600";
      description = "Your BMI indicates obesity. Consider professional guidance for weight management.";
      recommendations = [
        "Consult healthcare provider for comprehensive plan",
        "Consider medically supervised weight loss program",
        "Focus on sustainable lifestyle changes",
        "Regular monitoring of health indicators"
      ];
    }

    setBmiResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      color,
      description,
      recommendations
    });
  };

  const seoData = {
    title: "BMI Calculator - Free Body Mass Index Calculator | GONEP Healthcare",
    description: "Calculate your Body Mass Index (BMI) instantly with our free BMI calculator. Get personalized health insights, weight category assessment, and recommendations for maintaining a healthy weight.",
    keywords: [
      "BMI calculator",
      "body mass index calculator",
      "BMI calculator free",
      "calculate BMI",
      "BMI health calculator",
      "weight calculator"
    ],
    canonical: "/health-tools/bmi-calculator"
  };

  return (
    <div className="bg-background min-h-screen">
      <SEOHead seo={seoData} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                BMI Calculator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight for your height. 
              Get personalized recommendations based on your results.
            </p>
            
            {/* Navigation breadcrumb */}
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">•</span>
              <Link to="/health-tools/bmi-calculator" className="text-primary">BMI Calculator</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="border-2 border-border hover:border-primary/20 transition-colors">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="h-6 w-6 text-primary" />
                  <span>Calculate Your BMI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Unit System</label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger className="border-border focus:border-primary">
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Height ({unit === "metric" ? "cm" : "inches"})
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === "metric" ? "170" : "67"}
                      className="border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Weight ({unit === "metric" ? "kg" : "lbs"})
                    </label>
                    <Input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === "metric" ? "70" : "154"}
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateBMI}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
                  disabled={!height || !weight}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate BMI
                </Button>

                {/* BMI Categories Reference */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-foreground text-sm">BMI Categories</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Underweight</span>
                      <span className="text-blue-600 font-medium">Below 18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Normal weight</span>
                      <span className="text-secondary font-medium">18.5 - 24.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overweight</span>
                      <span className="text-amber-600 font-medium">25.0 - 29.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Obese</span>
                      <span className="text-red-600 font-medium">30.0 and above</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="border-2 border-border">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-secondary" />
                  <span>Your Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {bmiResult ? (
                  <div className="space-y-6">
                    {/* BMI Score */}
                    <div className="text-center space-y-4">
                      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {bmiResult.bmi}
                        </div>
                        <Badge className={`${bmiResult.color} bg-transparent border-2 text-base px-4 py-2 font-semibold`}>
                          {bmiResult.category}
                        </Badge>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4">
                        <p className="text-muted-foreground text-center">
                          {bmiResult.description}
                        </p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-secondary" />
                        Personalized Recommendations
                      </h4>
                      <ul className="space-y-3">
                        {bmiResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-muted-foreground text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-secondary/10 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-foreground text-sm">Next Steps</h4>
                      <div className="space-y-2">
                        <Link 
                          to="/health-tools/diet-recommendation" 
                          className="block text-sm text-secondary hover:text-secondary/80 font-medium"
                        >
                          → Get personalized diet recommendations
                        </Link>
                        <Link 
                          to="/contact" 
                          className="block text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          → Consult with our healthcare experts
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Calculate?</h3>
                    <p className="text-sm">Enter your height and weight to get your BMI results and personalized health recommendations.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Health Tools Navigation */}
      <section className="bg-muted/30 py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-semibold text-foreground mb-4">Explore More Health Tools</h3>
            <div className="flex justify-center space-x-4">
              <Link to="/health-tools/diet-recommendation">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Apple className="mr-2 h-4 w-4" />
                  Diet Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 dark:bg-amber-950/20 py-8">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This BMI calculator provides general health information and should not replace professional medical advice. 
                BMI is a screening tool and may not account for muscle mass, bone density, and other factors. 
                Always consult with qualified healthcare providers for personalized medical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}