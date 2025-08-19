import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Apple, Heart, TrendingUp, CheckCircle, AlertTriangle, Calculator, Target } from "lucide-react";
import { Link } from "react-router-dom";

export function DietRecommendationPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [dietRecommendation, setDietRecommendation] = useState<any>(null);

  const generateDietRecommendation = () => {
    if (!age || !gender || !activityLevel || !healthGoals) return;

    // Enhanced recommendation system
    const recommendations = {
      calories: calculateCalorieNeeds(),
      macros: calculateMacros(),
      foods: getFoodRecommendations(),
      mealPlan: getMealPlan(),
      tips: getHealthTips(),
      supplements: getSupplementRecommendations()
    };

    setDietRecommendation(recommendations);
  };

  const calculateCalorieNeeds = () => {
    const baseCalories = gender === "male" ? 2500 : 2000;
    const activityMultiplier = {
      "sedentary": 1.2,
      "light": 1.375,
      "moderate": 1.55,
      "active": 1.725,
      "very-active": 1.9
    }[activityLevel] || 1.2;

    const ageAdjustment = parseInt(age) > 30 ? 0.95 : 1;
    
    let goalAdjustment = 1;
    if (healthGoals === "weight-loss") goalAdjustment = 0.85;
    if (healthGoals === "muscle-gain") goalAdjustment = 1.15;
    
    return Math.round(baseCalories * activityMultiplier * ageAdjustment * goalAdjustment);
  };

  const calculateMacros = () => {
    const calories = calculateCalorieNeeds();
    
    if (healthGoals === "weight-loss") {
      return {
        protein: Math.round(calories * 0.3 / 4),
        carbs: Math.round(calories * 0.35 / 4),
        fats: Math.round(calories * 0.35 / 9)
      };
    } else if (healthGoals === "muscle-gain") {
      return {
        protein: Math.round(calories * 0.25 / 4),
        carbs: Math.round(calories * 0.45 / 4),
        fats: Math.round(calories * 0.3 / 9)
      };
    } else {
      return {
        protein: Math.round(calories * 0.2 / 4),
        carbs: Math.round(calories * 0.5 / 4),
        fats: Math.round(calories * 0.3 / 9)
      };
    }
  };

  const getFoodRecommendations = () => {
    const baseFoods = [
      "Lean proteins (chicken, fish, legumes)",
      "Whole grains (brown rice, quinoa, oats)",
      "Fresh vegetables (leafy greens, colorful vegetables)",
      "Healthy fats (avocado, nuts, olive oil)",
      "Fresh fruits (seasonal and local varieties)"
    ];

    if (dietaryRestrictions.toLowerCase().includes("vegetarian")) {
      return [
        "Plant-based proteins (lentils, chickpeas, tofu, tempeh)",
        "Whole grains and ancient grains (quinoa, amaranth, millet)",
        "Variety of vegetables and dark leafy greens",
        "Nuts, seeds, and healthy plant oils",
        "Dairy products and eggs (if lacto-ovo vegetarian)"
      ];
    }

    if (dietaryRestrictions.toLowerCase().includes("keto")) {
      return [
        "High-fat proteins (fatty fish, grass-fed beef)",
        "Low-carb vegetables (spinach, broccoli, cauliflower)",
        "Healthy fats (MCT oil, coconut oil, avocados)",
        "Nuts and seeds (macadamias, walnuts)",
        "Full-fat dairy products"
      ];
    }

    return baseFoods;
  };

  const getMealPlan = () => {
    if (healthGoals === "weight-loss") {
      return {
        breakfast: "Protein smoothie with spinach and berries",
        lunch: "Grilled chicken salad with mixed vegetables",
        dinner: "Baked fish with steamed broccoli and quinoa",
        snacks: ["Greek yogurt with nuts", "Apple with almond butter"]
      };
    } else if (healthGoals === "muscle-gain") {
      return {
        breakfast: "Oatmeal with protein powder and banana",
        lunch: "Turkey and avocado wrap with sweet potato",
        dinner: "Grilled salmon with brown rice and asparagus",
        snacks: ["Protein shake", "Trail mix with dried fruits"]
      };
    } else {
      return {
        breakfast: "Whole grain toast with avocado and eggs",
        lunch: "Quinoa bowl with roasted vegetables",
        dinner: "Lean protein with mixed vegetables and brown rice",
        snacks: ["Fresh fruit", "Handful of nuts"]
      };
    }
  };

  const getHealthTips = () => {
    const baseTips = [
      "Stay hydrated with 8-10 glasses of water daily",
      "Eat regular meals and avoid skipping breakfast",
      "Include a variety of colorful foods in your diet",
      "Practice portion control and mindful eating",
      "Limit processed foods and added sugars"
    ];

    if (healthGoals === "weight-loss") {
      baseTips.push("Create a moderate calorie deficit", "Increase fiber intake for satiety", "Consider intermittent fasting");
    } else if (healthGoals === "muscle-gain") {
      baseTips.push("Eat protein within 30 minutes post-workout", "Consider multiple smaller meals", "Don't neglect healthy carbohydrates");
    }

    return baseTips;
  };

  const getSupplementRecommendations = () => {
    const baseSupplements = ["Multivitamin", "Vitamin D3", "Omega-3"];
    
    if (healthGoals === "muscle-gain") {
      baseSupplements.push("Whey protein", "Creatine monohydrate");
    }
    
    if (dietaryRestrictions.toLowerCase().includes("vegetarian")) {
      baseSupplements.push("Vitamin B12", "Iron");
    }
    
    return baseSupplements;
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/5 to-primary/5 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Apple className="h-8 w-8 text-secondary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Diet Recommendations
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Get personalized nutrition guidance based on your health goals, lifestyle, and dietary preferences. 
              Create a sustainable eating plan that works for you.
            </p>
            
            {/* Navigation breadcrumb */}
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">•</span>
              <Link to="/health-tools/diet-recommendation" className="text-secondary">Diet Recommendations</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="section-padding">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assessment Form */}
            <Card className="border-2 border-border hover:border-secondary/20 transition-colors">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5">
                <CardTitle className="flex items-center space-x-2">
                  <Apple className="h-6 w-6 text-secondary" />
                  <span>Diet Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Age</label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      className="border-border focus:border-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Gender</label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="border-border focus:border-secondary">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Activity Level</label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="border-border focus:border-secondary">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very Active (very hard exercise/physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Health Goals</label>
                  <Select value={healthGoals} onValueChange={setHealthGoals}>
                    <SelectTrigger className="border-border focus:border-secondary">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="weight-maintenance">Weight Maintenance</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="general-health">General Health</SelectItem>
                      <SelectItem value="disease-prevention">Disease Prevention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Dietary Restrictions (Optional)</label>
                  <Input
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="e.g., vegetarian, vegan, gluten-free, keto"
                    className="border-border focus:border-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Medical Conditions (Optional)</label>
                  <Textarea
                    value={medicalConditions}
                    onChange={(e) => setMedicalConditions(e.target.value)}
                    placeholder="Any relevant medical conditions, allergies, or health concerns..."
                    rows={3}
                    className="border-border focus:border-secondary"
                  />
                </div>

                <Button 
                  onClick={generateDietRecommendation}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 text-lg"
                  disabled={!age || !gender || !activityLevel || !healthGoals}
                >
                  <Apple className="mr-2 h-5 w-5" />
                  Get Diet Recommendations
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-2 border-border">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>Your Personalized Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {dietRecommendation ? (
                  <div className="space-y-6">
                    {/* Calorie Target */}
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {dietRecommendation.calories} calories/day
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Recommended daily intake for your goals
                      </div>
                    </div>

                    {/* Macronutrients */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-secondary" />
                        Macronutrient Breakdown
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                          <div className="text-xl font-bold text-secondary">{dietRecommendation.macros.protein}g</div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </div>
                        <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                          <div className="text-xl font-bold text-primary">{dietRecommendation.macros.carbs}g</div>
                          <div className="text-xs text-muted-foreground">Carbs</div>
                        </div>
                        <div className="text-center p-4 bg-amber-100 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="text-xl font-bold text-amber-700 dark:text-amber-300">{dietRecommendation.macros.fats}g</div>
                          <div className="text-xs text-muted-foreground">Fats</div>
                        </div>
                      </div>
                    </div>

                    {/* Sample Meal Plan */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Sample Daily Meal Plan
                      </h4>
                      <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                        <div>
                          <span className="font-medium text-sm">Breakfast:</span>
                          <p className="text-sm text-muted-foreground">{dietRecommendation.mealPlan.breakfast}</p>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Lunch:</span>
                          <p className="text-sm text-muted-foreground">{dietRecommendation.mealPlan.lunch}</p>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Dinner:</span>
                          <p className="text-sm text-muted-foreground">{dietRecommendation.mealPlan.dinner}</p>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Snacks:</span>
                          <ul className="text-sm text-muted-foreground">
                            {dietRecommendation.mealPlan.snacks.map((snack: string, index: number) => (
                              <li key={index}>• {snack}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Food Recommendations */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Apple className="h-4 w-4 mr-2 text-secondary" />
                        Recommended Foods
                      </h4>
                      <ul className="space-y-2">
                        {dietRecommendation.foods.map((food: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Health Tips */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        Health Tips
                      </h4>
                      <ul className="space-y-2">
                        {dietRecommendation.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Supplement Recommendations */}
                    {dietRecommendation.supplements && (
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Consider These Supplements</h4>
                        <div className="flex flex-wrap gap-2">
                          {dietRecommendation.supplements.map((supplement: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                              {supplement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Apple className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Your Plan?</h3>
                    <p className="text-sm">Complete the assessment to get personalized diet recommendations tailored to your goals and lifestyle.</p>
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
              <Link to="/health-tools/bmi-calculator">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Calculator className="mr-2 h-4 w-4" />
                  BMI Calculator
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
                These diet recommendations provide general nutrition information and should not replace professional medical or nutritional advice. 
                Individual nutritional needs vary based on health conditions, medications, and other factors. 
                Always consult with qualified healthcare providers or registered dietitians for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}