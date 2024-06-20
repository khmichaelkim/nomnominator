import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
import { PlusCircle, ArrowRight } from 'lucide-react';

const MealTrackerApp = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState('');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    // In a real app, we'd load meals from storage here
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  }, []);

  useEffect(() => {
    // Save meals to storage whenever the meals state changes
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = () => {
    if (newMeal.trim() !== '') {
      setMeals([...meals, { name: newMeal, timestamp: new Date().toISOString() }]);
      setNewMeal('');
    }
  };

  const getSuggestion = () => {
    // Simple suggestion algorithm based on least recently eaten meal
    if (meals.length > 0) {
      const sortedMeals = [...meals].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setSuggestion(sortedMeals[0].name);
    } else {
      setSuggestion("Add some meals first!");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Meal Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              placeholder="Enter a meal"
            />
            <Button onClick={addMeal}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Meal
            </Button>
          </div>
          <div className="space-y-2">
            {meals.map((meal, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded">
                {meal.name} - {new Date(meal.timestamp).toLocaleString()}
              </div>
            ))}
          </div>
          <Button onClick={getSuggestion} className="mt-4">
            <ArrowRight className="mr-2 h-4 w-4" /> Get Suggestion
          </Button>
          {suggestion && (
            <div className="mt-4 p-2 bg-blue-100 rounded">
              Suggestion: {suggestion}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MealTrackerApp;